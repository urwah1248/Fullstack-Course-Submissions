import { useState } from "react"

const Blog = ({blog, likeBlog, deleteBlog}) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = {display: visible?"":"none"}

  const toggleVisiblity = () => {
    setVisible(!visible);
  }

  const style = {
    border: "solid 2px black",
    padding: 10,
    marginBottom: 2
  }
  return (
<div style={style}>
    <h4 style={{display:"block", margin:0}}>
      {blog.title} by {blog.author}
      <button onClick={toggleVisiblity}>{visible?"Hide":"Show"}</button>
    </h4>
  <div style={showWhenVisible}>
    URL: <a href={blog.url}>{blog.url}</a>
    <br />
    Likes: {blog.likes} <button type="button" onClick={()=>likeBlog(blog)}>Like</button>
    <br />
    {blog.user.name}
    <br />
    <button style={{backgroundColor:"red", color:"white"}} onClick={()=>deleteBlog(blog)}>Delete</button>
  </div>
</div>
)}

export default Blog