const categoryModel = require('../../models/categories/categoryModel');

const addCategory = async (req, res) => {
    try {
        const category = await categoryModel.create(req.body);
        res.status(200).json({ status: true, message: "category created", data: category });
    } catch (error) {
        res.status(500).json({ status: false, message: "server error", data: error.message });
    }
};

const getCategories = async (req, res) => {
    const categories = await categoryModel.find();
    res.status(200).json({ status: true, message: "category list", data: categories });
};

const updateCategory = async (req, res) => {
    const category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: "category updated", data: category });
};

const deleteCategory = async (req, res) => {
    await categoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: "category deleted", data: null });
};

module.exports = { addCategory, getCategories, updateCategory, deleteCategory };
