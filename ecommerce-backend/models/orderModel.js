// File: models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'placed' },
});

module.exports = mongoose.model('Order', orderSchema);
