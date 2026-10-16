const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: String,
    order: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('TrainingModule', moduleSchema);
