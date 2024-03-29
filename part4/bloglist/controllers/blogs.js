const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const res = await Blog
    .find({})

  response.json(res)
})

blogsRouter.post('/',userExtractor, async (request, response) => {
    const {title, author, url, likes} = request.body

    const user = request.user

    if(request.body.title==undefined || request.body.url==undefined){
      response.status(400).send("Missing Title or URL")
      return
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    })

    const savedBlog = await blog
      .save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id)
  .then(blog => {
    response.json(blog)
  })
})

blogsRouter.delete('/:id',userExtractor, async (request, response) => {
  const user = request.user

  if(user.blogs.includes(request.params.id)){
    Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).json({message: `Blog ${request.params.id} is deleted successfully.`})
    })
    .catch(() => response.status(400))
  } else {
    response.status(403).json({error: "This blog doesnt belong to the current user."})
  }

})

blogsRouter.put('/:id',userExtractor, async (request, response) => {
  const user = request.user

  if (user.blogs.includes(request.params.id)) {
    try {
      // Find the blog post by ID and update its properties
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );

      if (!updatedBlog) {
        return response.status(404).json({ error: 'Blog post not found' });
      }

      response.json(updatedBlog); // Return the updated blog post
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  } else {
    response.status(403).json({ error: 'This blog does not belong to the current user.' });
  }
});

module.exports = blogsRouter