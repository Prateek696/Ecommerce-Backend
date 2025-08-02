// File: types/authTypes.js
const { z } = require('zod');

exports.signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']).optional(),
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
