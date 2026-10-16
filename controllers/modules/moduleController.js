const moduleModel = require('../../models/modules/moduleModel');
const courseModel = require('../../models/courses/courseModel');
const enrollmentModel = require('../../models/enrollments/enrollmentModel');

const addModule = async (req, res) => {
    try {
        const course = await courseModel.findOne({ _id: req.body.course, instructor: req.user.userId });
        if (!course) return res.status(403).json({ status: false, message: "You can only add modules to your own course", data: null });
        const moduleData = await moduleModel.create(req.body);
        res.status(200).json({ status: true, message: "module added", data: moduleData });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", data: error.message });
    }
};

const getModules = async (req, res) => {
    const enrolled = await enrollmentModel.findOne({ learner: req.user.userId, course: req.params.courseId, paymentStatus: { $in: ['free', 'success'] } });
    if (!enrolled && req.user.role === 'learner') return res.status(403).json({ status: false, message: "Join or purchase this course first", data: null });
    const modules = await moduleModel.find({ course: req.params.courseId }).sort({ order: 1 });
    res.status(200).json({ status: true, message: "course modules", data: modules });
};

const updateModule = async (req, res) => {
    const moduleData = await moduleModel.findById(req.params.id).populate('course');
    if (!moduleData) return res.status(404).json({ status: false, message: "module not found", data: null });
    if (String(moduleData.course.instructor) !== req.user.userId) return res.status(403).json({ status: false, message: "You can only update your own course modules", data: null });
    Object.assign(moduleData, req.body);
    await moduleData.save();
    res.status(200).json({ status: true, message: "module updated", data: moduleData });
};

const deleteModule = async (req, res) => {
    const moduleData = await moduleModel.findById(req.params.id).populate('course');
    if (!moduleData) return res.status(404).json({ status: false, message: "module not found", data: null });
    if (String(moduleData.course.instructor) !== req.user.userId) return res.status(403).json({ status: false, message: "You can only delete your own course modules", data: null });
    await moduleModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: "module deleted", data: null });
};

module.exports = { addModule, getModules, updateModule, deleteModule };
