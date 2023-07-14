import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const logIn = async user => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

export { logIn }