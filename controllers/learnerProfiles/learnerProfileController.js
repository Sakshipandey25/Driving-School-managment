const profileModel = require('../../models/learnerProfiles/learnerProfileModel');

const addProfile = async (req, res) => {
    try {
        const profile = await profileModel.create({ ...req.body, user: req.user.userId });
        res.status(200).json({ status: true, message: "learner profile created", data: profile });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", data: error.message });
    }
};

const getProfiles = async (req, res) => {
    const profiles = await profileModel.find().populate('user', 'name email');
    res.status(200).json({ status: true, message: "learner profiles", data: profiles });
};

module.exports = { addProfile, getProfiles };
