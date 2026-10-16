const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'DrivingSchoolUsers', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, default: 0 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    duration: String,
    requirements: String,
    learningOutcomes: String,
    status: { type: String, enum: ['draft', 'pending', 'approved', 'rejected'], default: 'draft' },
    rejectionReason: String
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
