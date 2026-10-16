const express = require('express');
const router = express.Router();
const { addModule, getModules, updateModule, deleteModule } = require('../../controllers/modules/moduleController');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/authMiddleware');

router.post('/', authMiddleware, roleMiddleware('instructor'), addModule);
router.get('/course/:courseId', authMiddleware, getModules);
router.put('/:id', authMiddleware, roleMiddleware('instructor'), updateModule);
router.delete('/:id', authMiddleware, roleMiddleware('instructor'), deleteModule);

module.exports = router;
