const User = require('../models/user');
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const express = require('express');
const cors = require('cors');

usersRouter.use(express.json());
//usersRouter.use(cors());

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (username === undefined) {
    return response.status(400).json({ error: 'username missing' });
  } else if (password === undefined) {
    return response.status(400).json({ error: 'password missing' });
  }

  if (username.length < 3) {
    return response.status(400).json({ error: 'username is too short' });
  } else if (password.length < 3) {
    return response.status(400).json({ error: 'password is too short' });
  }

  const users = await User.find({});

  users.forEach((user) => {
    if (user.username === username) {
      return response.status(400).json({ error: 'username is not unique' });
    }
  });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    blogs: ["64ea0eefc5977b6b8e0a4bee"]
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
