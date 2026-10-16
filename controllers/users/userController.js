const userModel = require('../../models/users/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json({ status: true, message: "users list", data: users });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", data: error.message });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).select('-password');
        res.status(200).json({ status: true, message: "user status updated", data: user });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", data: error.message });
    }
};

module.exports = { getUsers, updateUserStatus };
