const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

// Mock database connection for testing
beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_test';
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.log('MongoDB connection failed, tests will run without database');
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

describe('API Health Check', () => {
  test('GET /api/health should return 200', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'OK');
  });
});

describe('Authentication Routes', () => {
  test('GET /api/auth should return 404 for undefined routes', async () => {
    await request(app)
      .get('/api/auth')
      .expect(404);
  });
});

describe('Product Routes', () => {
  test('GET /api/products should return 200', async () => {
    await request(app)
      .get('/api/products')
      .expect(200);
  });
});

describe('Cart Routes', () => {
  test('GET /api/cart should return 401 without authentication', async () => {
    await request(app)
      .get('/api/cart')
      .expect(401);
  });
});

describe('Order Routes', () => {
  test('GET /api/orders should return 401 without authentication', async () => {
    await request(app)
      .get('/api/orders')
      .expect(401);
  });
});

describe('Error Handling', () => {
  test('GET /nonexistent should return 404', async () => {
    await request(app)
      .get('/nonexistent')
      .expect(404);
  });
});
