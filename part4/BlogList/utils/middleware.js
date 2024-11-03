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

module.exports = {
  errorHandler,
};
