// File: index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import DB connection
require('./db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());



const errorHandler = require('./middlewares/errorMiddleware');

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler (optional, before errorHandler)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler (always last)
app.use(errorHandler);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
