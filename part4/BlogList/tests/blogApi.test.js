const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('correct amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('id is an unique identifier property of blog posts', async () => {
  const blogsInDb = await helper.blogsInDb();
  const ids = blogsInDb.map((blog) => blog.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(uniqueIds.size, ids.length);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Mastering the Art of Debugging in JavaScript',
    author: 'Emily White',
    url: 'https://example.com/javascript-debugging',
    likes: 21,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const blogTitles = blogsAtEnd.map((blog) => blog.title);
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  assert(blogTitles.includes(newBlog.title));
});

test('if like property is missing it will be 0', async () => {
  const newBlog = {
    title: 'Mastering the Art of Debugging in JavaScript',
    author: 'Emily White',
    url: 'https://example.com/javascript-debugging',
  };

  const response = await api.post('/api/blogs').send(newBlog);
  assert.strictEqual(response.body.likes, 0);
});

test('if title or url are missing backend responds with 400', async () => {
  const newBlog = {
    author: 'Emily White',
    url: 'https://example.com/javascript-debugging',
  };
  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('delete with valid blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  await api.delete(`/api/blogs/${blogsAtStart[0].id}`).expect(204);
});
test('delete with valid id but not present', async () => {
  const nonExistingValidId = await helper.nonExistingId;
  await api.delete(`/api/blogs/${nonExistingValidId}`).expect(404); // better to use status code 204 if it doesn't exist but id is valid
});
test('delete with invalid id', async () => {
  const invalidId = '213412312423';
  await api.delete(`/api/blogs/${invalidId}`).expect(400);
});

test('updating likes works', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const updatedBlog = await api
    .put(`/api/blogs/${blogsAtStart[0].id}`)
    .send({ likes: 30 });
  console.log('updatedblog', updatedBlog);
  assert.strictEqual(updatedBlog.body.likes, 30);
});

after(async () => {
  await mongoose.connection.close();
});
