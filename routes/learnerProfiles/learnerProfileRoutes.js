const express = require('express');
const router = express.Router();
const { addProfile, getProfiles } = require('../../controllers/learnerProfiles/learnerProfileController');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/authMiddleware');

router.post('/', authMiddleware, roleMiddleware('learner'), addProfile);
router.get('/', getProfiles);

module.exports = router;
