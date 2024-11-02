const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Introduction to Mongoose for MongoDB',
    author: 'John Doe',
    url: 'https://example.com/mongoose-intro',
    likes: 10,
  },
  {
    title: 'Building REST APIs with Node.js and Express',
    author: 'Jane Smith',
    url: 'https://example.com/node-rest-api',
    likes: 25,
  },
  {
    title: 'Understanding Asynchronous JavaScript',
    author: 'Peter Jones',
    url: 'https://example.com/async-javascript',
    likes: 18,
  },
  {
    title: 'Deploying Node.js Applications to Heroku',
    author: 'Alice Brown',
    url: 'https://example.com/heroku-deployment',
    likes: 32,
  },
  {
    title: 'Securing Your Node.js Applications',
    author: 'Bob Green',
    url: 'https://example.com/node-security',
    likes: 15,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Exploring the Power of Functional Programming in JavaScript',
    author: 'David Black',
    url: 'https://example.com/functional-javascript',
    likes: 28,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
