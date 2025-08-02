// File: controllers/productController.js
const mongoose = require('mongoose');
const Product = require('../models/productModel');

// Create a product
exports.createProduct = async (req, res, next) => {
  try {
    const prod = new Product(req.body);
    await prod.save();
    res.status(201).json(prod);
  } catch (err) {
    next(err);
  }
};

// Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get product by ID with validation
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product id format.' });
    }
    const prod = await Product.findById(id);
    if (!prod) return res.status(404).json({ error: 'Product not found' });
    res.json(prod);
  } catch (err) {
    next(err);
  }
};

// Update product by ID with validation
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product id format.' });
    }
    const prod = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!prod) return res.status(404).json({ error: 'Product not found' });
    res.json(prod);
  } catch (err) {
    next(err);
  }
};

// Delete product by ID with validation
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product id format.' });
    }
    const prod = await Product.findByIdAndDelete(id);
    if (!prod) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
