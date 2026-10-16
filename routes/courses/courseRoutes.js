const express = require('express');
const router = express.Router();
const { addCourse, getCourses, getMyCourses, submitCourse, approveCourse, rejectCourse } = require('../../controllers/courses/courseController');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/authMiddleware');

router.post('/', authMiddleware, roleMiddleware('instructor'), addCourse);
router.get('/', getCourses);
router.get('/my', authMiddleware, roleMiddleware('instructor'), getMyCourses);
router.put('/:id/submit', authMiddleware, roleMiddleware('instructor'), submitCourse);
router.put('/:id/approve', authMiddleware, roleMiddleware('admin'), approveCourse);
router.put('/:id/reject', authMiddleware, roleMiddleware('admin'), rejectCourse);

module.exports = router;
