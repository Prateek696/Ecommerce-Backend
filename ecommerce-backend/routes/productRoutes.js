// File: routes/productRoutes.js
const express = require('express');
const productCtrl = require('../controllers/productController');
const { validate } = require('../middlewares/validateMiddleware');
const { productSchema } = require('../types/productTypes');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productCtrl.getProducts);
router.get('/:id', productCtrl.getProductById);

router.post('/', auth, validate(productSchema), productCtrl.createProduct);
router.put('/:id', auth, validate(productSchema), productCtrl.updateProduct);
router.delete('/:id', auth, productCtrl.deleteProduct);

module.exports = router;
