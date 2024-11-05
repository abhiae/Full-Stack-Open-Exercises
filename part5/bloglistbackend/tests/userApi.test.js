const { test, after, beforeEach, describe } = require('node:test');
const assert = require('assert');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const api = supertest(app);

describe('testing user api', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('0905', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('by adding valid user', async () => {
    const newUser = {
      username: 'validUsername',
      name: 'New User',
      password: '0905',
    };
    await api.post('/api/users').send(newUser).expect(201);
  });
  test('by adding shorter password', async () => {
    const newUser = {
      username: 'validUsername',
      name: 'New User',
      password: '1',
    };
    await api.post('/api/users').send(newUser).expect(400);
  });
  test('by adding shorter username', async () => {
    const newUser = {
      username: 'va',
      name: 'New User',
      password: '0905',
    };
    await api.post('/api/users').send(newUser).expect(400);
  });
  test('by adding already present username', async () => {
    const newUser = {
      username: 'root',
      name: 'New User',
      password: '0905',
    };
    await api.post('/api/users').send(newUser).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
