const mongoose = require('mongoose')

const config = require('./utils/config')

const express = require('express')
const app = express()

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

module.exports = app