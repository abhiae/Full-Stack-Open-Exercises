const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
};

module.exports = {
  errorHandler,
};
