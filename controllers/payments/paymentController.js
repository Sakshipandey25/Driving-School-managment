const paymentModel = require('../../models/payments/paymentModel');
const enrollmentModel = require('../../models/enrollments/enrollmentModel');
const courseModel = require('../../models/courses/courseModel');

const makePayment = async (req, res) => {
    try {
        const course = await courseModel.findOne({ _id: req.body.course, status: 'approved' });
        if (!course || course.price <= 0) return res.status(400).json({ status: false, message: "paid course not found", data: null });
        const payment = await paymentModel.create({
            learner: req.user.userId,
            course: course._id,
            amount: course.price,
            status: req.body.status === 'success' ? 'success' : 'failed',
            transactionId: req.body.transactionId || ''
        });
        if (payment.status === 'success') {
            await enrollmentModel.findOneAndUpdate({ learner: req.user.userId, course: course._id }, { paymentStatus: 'success' }, { upsert: true, new: true });
        } else {
            await enrollmentModel.findOneAndUpdate({ learner: req.user.userId, course: course._id }, { paymentStatus: 'failed' }, { upsert: true, new: true });
        }
        res.status(200).json({ status: true, message: "demo payment recorded", data: payment });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", data: error.message });
    }
};

const getPayments = async (req, res) => {
    const payments = await paymentModel.find({ learner: req.user.userId });
    res.status(200).json({ status: true, message: "payment list", data: payments });
};

module.exports = { makePayment, getPayments };
