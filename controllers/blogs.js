const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const express = require('express')
const cors = require('cors')

blogsRouter.use(express.json())
blogsRouter.use(cors())

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog(body)
  
    const result = await blog.save()
    response.status(201).json(result)
  })

module.exports = blogsRouter