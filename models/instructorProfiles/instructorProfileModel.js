const mongoose = require('mongoose');

const instructorProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'DrivingSchoolUsers', required: true },
    name: { type: String, required: true },
    qualification: String,
    experience: Number,
    specialization: String,
    image: String
}, { timestamps: true });

module.exports = mongoose.model('InstructorProfile', instructorProfileSchema);
