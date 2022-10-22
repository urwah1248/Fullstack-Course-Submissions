import React from 'react'

export default function Personform({name, number, handleName, handleNumber, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input type='text' value={name} onChange={handleName}/>
        </div>
        <div>
          number: <input type='number' value={number} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
