const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../../controllers/authentication/authenticationController');

router.post('/registration', registerController);
router.post('/login', loginController);

module.exports = router;
