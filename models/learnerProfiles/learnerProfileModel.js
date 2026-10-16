const mongoose = require('mongoose');

const learnerProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'DrivingSchoolUsers', required: true },
    name: { type: String, required: true },
    phone: String,
    address: String,
    dateOfBirth: Date
}, { timestamps: true });

module.exports = mongoose.model('LearnerProfile', learnerProfileSchema);
