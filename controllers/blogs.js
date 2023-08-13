const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const express = require('express')
const cors = require('cors')

blogsRouter.use(express.json())
blogsRouter.use(cors())

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
        response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
    const body = request.body

    const blog = new Blog(body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogsRouter