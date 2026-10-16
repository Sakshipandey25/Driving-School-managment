const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    learner: { type: mongoose.Schema.Types.ObjectId, ref: 'DrivingSchoolUsers', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    paymentStatus: { type: String, enum: ['free', 'pending', 'success', 'failed'], default: 'free' },
    progress: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
