const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

test('Blogs are returned as JSON objects', async () => {
    const response = await api.get('/api/blogs')
    const blogs = await Blog.find({})
    
    expect(response.body).toHaveLength(blogs.length)
})