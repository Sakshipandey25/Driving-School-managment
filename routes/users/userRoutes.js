const express = require('express');
const router = express.Router();
const { getUsers, updateUserStatus } = require('../../controllers/users/userController');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/authMiddleware');

router.get('/', authMiddleware, roleMiddleware('admin'), getUsers);
router.put('/:id/status', authMiddleware, roleMiddleware('admin'), updateUserStatus);

module.exports = router;
