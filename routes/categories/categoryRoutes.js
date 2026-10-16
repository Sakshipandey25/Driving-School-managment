const express = require('express');
const router = express.Router();
const { addCategory, getCategories, updateCategory, deleteCategory } = require('../../controllers/categories/categoryController');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/authMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin'), addCategory);
router.get('/', getCategories);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateCategory);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteCategory);

module.exports = router;
