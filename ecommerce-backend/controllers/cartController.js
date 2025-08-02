// File: controllers/cartController.js
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product id format.' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      // product stored as ObjectId; compare as string
      const item = cart.items.find(i => i.product.toString() === productId);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();

      const updatedCart = await Cart.findById(cart._id).populate('items.product');
      res.json(updatedCart);
    } else {
      const newCart = await Cart.create({
        userId: req.user.id,
        items: [{ product: productId, quantity }],
      });

      const populatedNewCart = await Cart.findById(newCart._id).populate('items.product');
      res.status(201).json(populatedNewCart);
    }
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log('BODY:', req.body);

      return res.status(400).json({ error: 'Invalid product id format.' });
    }

    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(item => {
      const prodId = item.product && item.product._id
        ? item.product._id.toString()
        : item.product.toString();
      return prodId !== productId;
    });

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(updatedCart);
  } catch (err) {
    next(err);
  }
};
