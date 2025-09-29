// tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Authentication API', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Clean up and close the database connection
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('email', userData.email);
    });

    it('should not register a user with an existing email', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/users/register')
         .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /api/users/login', () => {
    it('should log in a user', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'password123',
        };

      const response = await request(app)
        .post('/api/users/login')
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should not log in with invalid credentials', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });
  });

  describe('GET /api/users/profile', () => {
    let token;

    beforeAll(async () => {
      // Register a user and log in to get a token
       const userData = {
        email: 'testuser@example.com',
        password: 'password123',
      };

      await request(app).post('/api/users/register').send(userData);
      const loginResponse = await request(app).post('/api/users/login').send(userData);
      token = loginResponse.body.token;
    });

    it('should fetch user profile', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('email', 'testuser@example.com');
      expect(response.body).not.toHaveProperty('password'); // Password should not be returned
    });

    it('should not access profile without a token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'No token, authorization denied');
    });
});
});