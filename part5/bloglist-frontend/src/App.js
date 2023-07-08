import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { logIn } from './services/login'
import Login from './components/Login'
import AddBlogForm from './components/AddBlogForm'
import BlogNotification from './components/BlogNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const response = JSON.parse(loggedUserJSON)
      setUser(response)
      blogService.setToken(response.token)
    }
  },[])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await logIn({ username, password });
      if (response) {
        setUser(response);
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(response));
        blogService.setToken(response.token);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An error occurred during login");
      }
    }
  }

  const handleLogout = e => {
    e.preventDefault();
    if(user){
      window.localStorage.removeItem('loggedBloglistUser')
      window.location.reload()
    }
  }

  if(!user){
    return <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} errorMessage={errorMessage}/>
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogMessage&&<BlogNotification blog={blogMessage}/>}
      <h2>{user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>Add New Blog</h2>
      <AddBlogForm setBlogMessage={setBlogMessage} blogs={blogs} setBlogs={setBlogs}/>
    </div>
  )
}

export default App