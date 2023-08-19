const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const helper = require('./test_helper');

const api = supertest(app);

describe('testing GET, POST, DELETE and POST on a database of blogs...', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('Blogs are returned as JSON objects', async () => {
    const response = await api.get('/api/blogs');
    const blogs = await Blog.find({});

    expect(response.body).toHaveLength(blogs.length);
  }, 10000);

  test('Blog post id field exists', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('Blog post successfully created', async () => {
    const newBlog = {
      title: 'New Blog',
      author: "Steven O'Reilly",
      url: 'stevenoreilly.com/blogs/newblog',
      likes: 341,
    };
    const blogs = await Blog.find({});
    const response = await api.post('/api/blogs').send(newBlog);
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body.length).toEqual(blogs.length + 1);
  });

  test('Blog post created without a likes field', async () => {
    const newBlog = {
      title: 'New Blog',
      author: "Steven O'Reilly",
      url: 'stevenoreilly.com/blogs/newblog',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.body.likes).toEqual(0);
  });

  test('Blog post created without a title field', async () => {
    const newBlog = {
      author: "Steven O'Reilly",
      url: 'stevenoreilly.com/blogs/newblog',
      likes: 400,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('Blog post created without a url field', async () => {
    const newBlog = {
      title: 'New Blog',
      author: "Steven O'Reilly",
      likes: 341,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('Deleted a blog', async () => {
    const blogsAtTheStart = await api.get('/api/blogs');
    const blogToDelete = blogsAtTheStart.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtTheEnd = await api.get('/api/blogs');

    expect(blogsAtTheEnd.body).toHaveLength(blogsAtTheStart.body.length - 1);

    const contents = blogsAtTheEnd.body.map((r) => r.id);

    expect(contents).not.toContain(blogToDelete.id);
  });

  test('Updated a blog', async () => {
    const blogsAtTheStart = await api.get('/api/blogs');
    const blogToUpdate = blogsAtTheStart.body[0];

    console.log(blogsAtTheStart.body);

    const newBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 10,
    };

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog);

    expect(updatedBlog.body.likes).toEqual(blogToUpdate.likes + 10);
  });
});
