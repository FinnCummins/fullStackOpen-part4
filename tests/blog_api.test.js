const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

const api = supertest(app)

test('Blogs are returned as JSON objects', async () => {
    const response = await api.get('/api/blogs')
    const blogs = await Blog.find({})
    
    expect(response.body).toHaveLength(blogs.length)
})

test('Blog post id field exists', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('Blog post successfully created', async () => {

    const newBlog = {
        "title": "New Blog",
        "author": "Steven O'Reilly",
        "url": "stevenoreilly.com/blogs/newblog",
        "likes": 300
    }
    const blogs = await Blog.find({})
    const response = await api.post('/api/blogs').send(newBlog)
    const getResponse = await api.get('/api/blogs')
    expect(getResponse.body.length).toEqual(blogs.length + 1)
})