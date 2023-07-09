const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  url: String,
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.pre(/^find/, function (next) {
  this.populate('user');
  next();
});

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog