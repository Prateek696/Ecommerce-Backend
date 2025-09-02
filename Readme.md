# E-commerce Backend API

A robust e-commerce backend API built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product management
- Shopping cart functionality
- Order processing
- RESTful API design
- Docker containerization
- CI/CD pipeline with GitHub Actions
- Comprehensive testing
- Security best practices

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Testing**: Jest, Supertest
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Ecommerce-Backend/ecommerce-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### Docker Setup

#### Development Environment
```bash
# From the root directory
docker-compose -f docker-compose.dev.yml up --build
```

#### Production Environment
```bash
# From the root directory
docker-compose up --build -d
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

### Health Check
- `GET /api/health` - API health status

## Environment Variables

Create a `.env` file in the `ecommerce-backend` directory with the following variables:

```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:dev` - Run development environment with Docker
- `npm run docker:prod` - Run production environment with Docker

## CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline using GitHub Actions:

### CI Pipeline (`.github/workflows/ci.yml`)
- Runs on push to `main` and `develop` branches
- Runs on pull requests to `main` and `develop` branches
- Includes:
  - Code linting
  - Unit tests
  - Security scanning
  - Docker image building and pushing

### CD Pipeline (`.github/workflows/cd.yml`)
- Deploys to staging on push to `main` branch
- Deploys to production on version tags
- Includes rollback capabilities

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Rate limiting
- Input validation with Zod
- Security headers
- SSL/TLS support

## Deployment

### Using Docker

1. Build the image:
```bash
docker build -t ecommerce-backend .
```

2. Run the container:
```bash
docker run -p 3000:3000 ecommerce-backend
```

### Using Docker Compose

1. Start all services:
```bash
docker-compose up -d
```

This will start:
- Node.js application
- MongoDB database
- Nginx reverse proxy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the ISC License.