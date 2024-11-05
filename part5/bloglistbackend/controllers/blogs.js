const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
// const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(403)
        .json({ error: 'unauthorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(request.params.id);
    await User.findByIdAndUpdate(
      user.id,
      { $pull: { blogs: request.params.id } },
      { new: true }
    );

    response.status(204).end();
  }
);

blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  );
  response.json(updatedBlog);
});

module.exports = blogRouter;
