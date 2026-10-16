const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/users/userModel');

const registerController = async (req, res) => {
    try {
        let { name, email, password, Cpassword, role } = req.body;
        if (!name || !email || !password || !Cpassword || !role) {
            return res.status(400).json({ status: false, message: "fields can't be empty", data: null });
        }
        if (!['instructor', 'learner'].includes(role)) {
            return res.status(400).json({ status: false, message: "Only instructor or learner can register", data: null });
        }
        if (password !== Cpassword) {
            return res.status(400).json({ status: false, message: "password didn't match", data: null });
        }
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ status: false, message: "user already exists", data: null });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const registerUser = await userModel.create({ name, email, password: hashpassword, role });
        return res.status(200).json({ status: true, message: "user registered successfully", data: registerUser });
    } catch (error) {
        return res.status(500).json({ status: false, message: "registration error", data: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ status: false, message: "user not found", data: null });
        if (user.status === 'inactive') return res.status(403).json({ status: false, message: "Your account is inactive", data: null });
        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) return res.status(400).json({ status: false, message: "Password not match", data: null });
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).json({ status: true, message: "login successful", data: token });
    } catch (error) {
        return res.status(500).json({ status: false, message: "login error", data: error.message });
    }
};

module.exports = { registerController, loginController };
