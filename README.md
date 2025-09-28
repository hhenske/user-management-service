# CodeCraftHub

## Overview

CodeCraftHub is a personalized learning platform designed specifically for developers. This repository contains the server-side architecture and backend components built with Node.js and MongoDB, leveraging the power of Generative AI to create a comprehensive learning experience.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Personalized Learning Paths**: AI-driven content recommendation based on user skill level and preferences
- **User Management System**: Comprehensive authentication and authorization
- **Progress Tracking**: Monitor learning progress and achievements
- **Interactive Content**: Support for various learning materials and formats
- **Real-time Updates**: Live progress updates and notifications
- **Scalable Architecture**: Built to handle growing user base and content

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Additional Technologies
- **JWT**: Authentication and authorization
- **bcrypt**: Password hashing
- **Generative AI**: Content personalization and recommendations

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14.0 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hhenske/user-management-service.git
   cd user-management-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a new database for the project

## Configuration

1. **Create environment variables**
   ```bash
   cp .env.example .env
   ```

2. **Update the .env file with your configuration**
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/codecrafthub
   JWT_SECRET=your-jwt-secret-key
   JWT_EXPIRES_IN=7d
   ```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured port).

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### User Management
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Learning Content
- `GET /api/content` - Get personalized content
- `POST /api/content` - Create new content (admin)
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

## Project Structure

```
user-management-service/
├── src/
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── app.js              # Express app setup
├── config/                 # Configuration files
├── tests/                  # Test files
├── docs/                   # Documentation
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Development

### Code Style
This project follows standard JavaScript conventions. Use ESLint for code formatting:

```bash
npm run lint
npm run lint:fix
```

### Database Migrations
Run database migrations:

```bash
npm run migrate
```

### Environment Setup
1. Set up your development environment variables
2. Install dependencies
3. Start the development server
4. Begin development

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Deployment

### Using Docker
```bash
docker build -t codecrafthub-backend .
docker run -p 3000:3000 codecrafthub-backend
```

### Manual Deployment
1. Set production environment variables
2. Install production dependencies: `npm ci --only=production`
3. Start the application: `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues, please:
- Create an issue in this repository
- Contact the development team
- Check the [documentation](docs/) for more details

---

**CodeCraftHub** - Empowering developers through personalized learning experiences.
