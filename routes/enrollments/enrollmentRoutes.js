const express = require('express');
const router = express.Router();
const { joinCourse, getEnrollments, updateProgress } = require('../../controllers/enrollments/enrollmentController');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/authMiddleware');

router.post('/join', authMiddleware, roleMiddleware('learner'), joinCourse);
router.get('/', authMiddleware, roleMiddleware('learner'), getEnrollments);
router.put('/:id/progress', authMiddleware, roleMiddleware('learner'), updateProgress);

module.exports = router;
