const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if(request.body.title==undefined || request.body.url==undefined){
      response.status(400).send("Missing Title or URL")
      return
    }
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
    })
})

blogsRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id)
  .then(blog => {
    response.json(blog)
  })
})

blogsRouter.delete('/:id', (request, response) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).send(request.params.id+" is deleted")
    })
    .catch(() => response.status(400))
})

blogsRouter.put('/:id', async (request, response) => {

  try {
    if(request.body.title=="" || request.body.url==""){
      response.status(400).send("Title and URL cannot be empty")
      return
    }
    // Find the blog post by ID and update its properties
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true, // Return the updated blog post
    });

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog post not found' });
    }
    response.json(updatedBlog); // Return the updated blog post
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = blogsRouter