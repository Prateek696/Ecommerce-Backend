// File: types/cartTypes.js
const { z } = require('zod');

exports.cartSchema = z.object({
  productId: z.string().length(24), // MongoDB ObjectId length
  quantity: z.number().int().positive(),
});
