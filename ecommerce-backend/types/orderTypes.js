// File: types/orderTypes.js
const { z } = require('zod');

exports.orderSchema = z.object({
  // For this case, usually no payload as the cart is the source. This is just for demonstration:
  confirm: z.boolean().default(true),
});
