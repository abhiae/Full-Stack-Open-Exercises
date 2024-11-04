const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).json({
      error: 'username must be unique,this usermame is already taken.',
    });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
};

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'token missing' });
  }

  const token = authorization.replace('Bearer ', '');
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(401).json({ error: 'user not found' });
  }

  request.user = user;
  next();
};

module.exports = {
  errorHandler,
  userExtractor,
};
