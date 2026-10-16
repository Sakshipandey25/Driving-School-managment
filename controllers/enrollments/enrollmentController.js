const enrollmentModel = require('../../models/enrollments/enrollmentModel');
const courseModel = require('../../models/courses/courseModel');

const joinCourse = async (req, res) => {
    try {
        const course = await courseModel.findOne({ _id: req.body.course, status: 'approved' });
        if (!course) return res.status(404).json({ status: false, message: "approved course not found", data: null });
        let status = course.price === 0 ? 'free' : 'pending';
        const enrollment = await enrollmentModel.create({ learner: req.user.userId, course: course._id, paymentStatus: status });
        res.status(200).json({ status: true, message: status === 'free' ? "joined free course" : "please complete payment", data: enrollment });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", data: error.message });
    }
};

const getEnrollments = async (req, res) => {
    const enrollments = await enrollmentModel.find({ learner: req.user.userId }).populate('course');
    res.status(200).json({ status: true, message: "your enrollments", data: enrollments });
};

const updateProgress = async (req, res) => {
    const enrollment = await enrollmentModel.findOneAndUpdate(
        { _id: req.params.id, learner: req.user.userId, paymentStatus: { $in: ['free', 'success'] } },
        { progress: req.body.progress }, { new: true }
    );
    if (!enrollment) return res.status(403).json({ status: false, message: "course access not allowed", data: null });
    res.status(200).json({ status: true, message: "progress updated", data: enrollment });
};

module.exports = { joinCourse, getEnrollments, updateProgress };
