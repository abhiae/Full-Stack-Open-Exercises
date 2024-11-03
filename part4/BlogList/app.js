const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
require('dotenv').config();
const config = require('./utils/config');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

mongoose.connect(config.mongoUrl);
// console.log(config.mongoUrl);

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);
module.exports = app;
