// File: routes/cartRoutes.js
const express = require('express');
const cartCtrl = require('../controllers/cartController');
const { validate } = require('../middlewares/validateMiddleware');
const { cartSchema } = require('../types/cartTypes');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', auth, cartCtrl.getCart);
router.post('/add', auth, validate(cartSchema), cartCtrl.addToCart);
router.post('/remove', auth, validate(cartSchema), cartCtrl.removeFromCart);

module.exports = router;
