import { useEffect } from 'react'
import { useState } from 'react'
import Filter from './components/filter'
import Personform from './components/personform'
import Persons from './components/persons'
import PersonService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {

  //given Data
  const [persons, setPersons] = useState([])
  
  //State Variables
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [message, setMessage] = useState(null)

  //Importing data from localhost
  useEffect(() => {
    PersonService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  //Handling onChange Events
  const handleNewName = e => setNewName(e.target.value)
  const handleNewNumber = e => setNewNumber(e.target.value)
  const handleFilterQuery = e => setFilterQuery(e.target.value)
  
  //Alert if same name or number is added
  const handleAddNew = e => {
    e.preventDefault();
    const newPerson = {name: newName, number: newNumber}
    const foundPerson = persons.find(person => (person.name === newName) && (person.number !== newNumber))
    if(foundPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        PersonService
        .update(foundPerson.id, newPerson)
        .then(returnedPerson => {
          console.log(`${returnedPerson.name} successfully updated`)
          setPersons(persons.map(personItem => personItem.id !== returnedPerson.id ? personItem : newPerson))
          setMessage(`${newName}'s number is successfully Updated`)
          setTimeout(() => {
            setMessage(null)
            setNewName('')
            setNewNumber('')
          }, 5000)
        })
        .catch((error) => {
          console.log(error)
          setPersons(persons.filter(person => person.id !== foundPerson.id))
          setMessage(
            `[ERROR] ${newName} was already deleted from server`
          )
          setTimeout(() => {
            setNewName('')
            setNewNumber('')
            setMessage(null)
          }, 5000)
        })
      }
    }
    else if(persons.find(person => person.number === newNumber)){
      setMessage(`ERROR: ${newNumber} already exists`)
      setTimeout(() => {
        setMessage(null)
        setNewName('')
        setNewNumber('')
      }, 5000)
    }
    else{
      setPersons(persons.concat(newPerson))
      PersonService.add(newPerson)
    }
  }
  const deletePerson = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    try {
      if (window.confirm(`Delete ${personName} ?`)) {
        PersonService
          .del(personId, setPersons, persons)
        console.log(`${personName} successfully deleted`)
        setMessage(
          `${personName} was successfully deleted`
        )
        setPersons(persons.filter(person => person.id !== personId))
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (error) {
      console.log(error)
      setPersons(persons.filter(person => person.id !== personId))
      setNewName('')
      setNewNumber('')
      setMessage(
        `[ERROR] ${personName} was already deleted from server`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    
  }

  return (
    <div>

      <h1>Phonebook</h1>

      <Notification message={message} />

      <Filter query={setFilterQuery} handleChange={handleFilterQuery}/>

      <h2>Add a new</h2>
      
      <Personform name={newName} number={newNumber} handleName={handleNewName} handleNumber={handleNewNumber} handleSubmit={handleAddNew} />
      <h2>Numbers</h2>  

      <Persons setMessage={setMessage} setPersons={setPersons} persons={persons} filterQuery={filterQuery} deletePerson={deletePerson}/>

    </div>
  )
}

export default App
