const express = require('express');
const router = express.Router();
const { addProfile, getProfiles } = require('../../controllers/instructorProfiles/instructorProfileController');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/authMiddleware');

router.post('/', authMiddleware, roleMiddleware('instructor'), addProfile);
router.get('/', getProfiles);

module.exports = router;
