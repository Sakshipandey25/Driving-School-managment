const express = require('express');
const router = express.Router();
const { makePayment, getPayments } = require('../../controllers/payments/paymentController');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth/authMiddleware');

router.post('/make', authMiddleware, roleMiddleware('learner'), makePayment);
router.get('/', authMiddleware, roleMiddleware('learner'), getPayments);

module.exports = router;
