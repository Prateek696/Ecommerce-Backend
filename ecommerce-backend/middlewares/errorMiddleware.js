// File: middlewares/errorMiddleware.js

module.exports = (err, req, res, next) => {
  // Log error details — useful in dev and production (adjust log level as needed)
  console.error(err);

  // Handle Mongoose invalid ObjectId errors
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format.' });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ error: messages.join(', ') });
  }

  // Handle Zod validation errors
  if (err.name === 'ZodError' || err.errors) {
    return res.status(400).json({ error: err.errors || err.message });
  }

  // Handle JWT errors (invalid token, expiration)
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  // Default to 500 server error if status not set
  const statusCode = err.status || 500;

  // In development, include stack trace, otherwise hide to avoid leaking sensitive info
  const response = { error: err.message || 'Server error' };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
