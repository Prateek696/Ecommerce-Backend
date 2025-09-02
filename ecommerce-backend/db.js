// File: db.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

// Only connect to database if not in test environment
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}
