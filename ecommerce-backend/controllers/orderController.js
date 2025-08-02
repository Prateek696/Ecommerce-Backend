// File: controllers/orderController.js
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.placeOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart empty' });
    }

    let total = 0;
    const products = [];

    for (const item of cart.items) {
      if (!item.product) {
        return res.status(400).json({ error: 'One or more products in cart are invalid or no longer available' });
      }
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${item.product.title}` });
      }
      total += item.product.price * item.quantity;
      products.push({ product: item.product._id, quantity: item.quantity });
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }

    const order = await Order.create({
      userId: req.user.id,
      products,
      total,
      status: 'placed',
      date: new Date(),
    });

    // Empty cart after order placement
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
