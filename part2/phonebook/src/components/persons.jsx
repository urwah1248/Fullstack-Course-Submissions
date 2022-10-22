import React from 'react'

export default function Persons({persons, filterQuery,deletePerson}) {
  return (
    <div>
        {persons
          .map((person) => (
          <div key={person.id}>{person.name} {person.number} 
          <button onClick={()=>deletePerson(person.id)}>Delete</button></div>
          ))
        }
    </div>
  )
}
