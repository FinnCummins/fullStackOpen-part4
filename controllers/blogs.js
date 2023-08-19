const Blog = require('../models/blog');
const blogsRouter = require('express').Router();
const express = require('express');
const cors = require('cors');

blogsRouter.use(express.json());
blogsRouter.use(cors());

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.hasOwnProperty('likes')) {
    body.likes = 0;
  }

  if (!body.hasOwnProperty('title') || !body.hasOwnProperty('url')) {
    response.status(400).end();
  } else {
    const blog = new Blog(body);

    const result = await blog.save();
    response.status(201).json(result);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const updatedBlog = {
    ...body,
    likes: body.likes,
  };

  const returned = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true }
  );

  response.json(returned);
});

module.exports = blogsRouter;
