import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const add = newObject => {
  return axios.post(baseUrl, newObject) 
}

const del = (id, setPersons, persons) => {
  setPersons(persons.filter(item => item.id !== id))
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj)
}

const PersonService = {
  getAll, 
  add, 
  del,
  update
}
export default PersonService;