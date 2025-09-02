// Jest setup file
// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.MONGO_URI = 'mongodb://localhost:27017/ecommerce_test';

// Increase timeout for database operations
jest.setTimeout(30000);
