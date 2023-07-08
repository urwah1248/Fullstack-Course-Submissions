import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null;

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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addBlog, setToken }