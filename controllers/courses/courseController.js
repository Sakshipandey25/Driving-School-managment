const courseModel = require('../../models/courses/courseModel');

const addCourse = async (req, res) => {
    try {
        const course = await courseModel.create({ ...req.body, instructor: req.user.userId, status: 'draft' });
        res.status(200).json({ status: true, message: "course created as draft", data: course });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", data: error.message });
    }
};

const getCourses = async (req, res) => {
    const courses = await courseModel.find({ status: 'approved' }).populate('category').populate('instructor', 'name');
    res.status(200).json({ status: true, message: "approved courses", data: courses });
};

const getMyCourses = async (req, res) => {
    const courses = await courseModel.find({ instructor: req.user.userId });
    res.status(200).json({ status: true, message: "your courses", data: courses });
};

const submitCourse = async (req, res) => {
    const course = await courseModel.findOneAndUpdate({ _id: req.params.id, instructor: req.user.userId }, { status: 'pending' }, { new: true });
    if (!course) return res.status(404).json({ status: false, message: "course not found", data: null });
    res.status(200).json({ status: true, message: "course submitted for approval", data: course });
};

const approveCourse = async (req, res) => {
    const course = await courseModel.findByIdAndUpdate(req.params.id, { status: 'approved', rejectionReason: '' }, { new: true });
    res.status(200).json({ status: true, message: "course approved", data: course });
};

const rejectCourse = async (req, res) => {
    const course = await courseModel.findByIdAndUpdate(req.params.id, { status: 'rejected', rejectionReason: req.body.reason }, { new: true });
    res.status(200).json({ status: true, message: "course rejected", data: course });
};

module.exports = { addCourse, getCourses, getMyCourses, submitCourse, approveCourse, rejectCourse };
