const Blog = ({blog}) => (
  <a href={blog.url} style={{display:"block"}}>
    {blog.title} {blog.author}
  </a>
)

export default Blog