import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible?'':'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const style = {
    border: 'solid 2px black',
    padding: 10,
    marginBottom: 2
  }
  return (
    <div style={style}>
      <h4 style={{ display:'block', margin:0 }}>
        {blog.title} by {blog.author}
        <button className='blog-toggle' onClick={toggleVisiblity}>{visible?'Hide':'Show'}</button>
      </h4>
      <div className='hidden' style={showWhenVisible}>
    URL: <a href={blog.url}>{blog.url}</a>
        <br />
    Likes: <span className='likes'>{blog.likes}</span> <button className='like-button' type="button" onClick={() => likeBlog(blog)}>Like</button>
        <br />
        {blog.user && blog.user.name}
        <br />
        {user.username===blog.user.username && <button style={{ backgroundColor:'red', color:'white' }} onClick={() => deleteBlog(blog)}>Delete</button>}</div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog