// File: routes/orderRoutes.js
const express = require('express');
const orderCtrl = require('../controllers/orderController');
const { validate } = require('../middlewares/validateMiddleware');
const { orderSchema } = require('../types/orderTypes');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, validate(orderSchema), orderCtrl.placeOrder);
router.get('/', auth, orderCtrl.getOrders);

module.exports = router;
