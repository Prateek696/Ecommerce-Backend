// File: models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
