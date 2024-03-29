import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl,newBlog, config)
  return res.data
}

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${baseUrl}/${blog.id}`,{ likes:blog.likes+1 }, config)
  return res.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res.data
}

export default { getAll, addBlog, setToken, likeBlog, deleteBlog }