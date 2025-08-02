// File: controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateJWT } = require('../utils/jwt');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: role || 'user' });
    await user.save();

    const token = generateJWT(user);
    res.status(201).json({ user: { name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateJWT(user);
    res.json({ user: { name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
};
