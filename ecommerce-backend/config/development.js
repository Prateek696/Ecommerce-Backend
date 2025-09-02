module.exports = {
  NODE_ENV: 'development',
  PORT: 3000,
  MONGO_URI: 'mongodb://localhost:27017/ecommerce',
  JWT_SECRET: 'development-jwt-secret-change-in-production',
  JWT_EXPIRES_IN: '7d',
  CORS_ORIGIN: 'http://localhost:3000'
};
