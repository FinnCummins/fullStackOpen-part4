const mongoose = require('mongoose')

const logger = require('./utils/logger')
const config = require('./utils/config')

const express = require('express')
const app = express()

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})