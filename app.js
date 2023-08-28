const mongoose = require('mongoose');

const config = require('./utils/config');

const express = require('express');
const app = express();

const blogsRouter = require('./controllers/blogs');
app.use('/api/blogs', blogsRouter);

const usersRouter = require('./controllers/users');
app.use('/api/users', usersRouter);

const loginRouter = require('./controllers/login');
app.use('/api/login', loginRouter)

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

module.exports = app;
