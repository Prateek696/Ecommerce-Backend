// File: types/productTypes.js
const { z } = require('zod');

exports.productSchema = z.object({
  title: z.string().min(1),
  desc: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  category: z.string().optional(),
});
