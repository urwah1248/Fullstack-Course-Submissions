import React from 'react'

export default function Filter({query, handleChange}) {

    

  return (
    <form>
        filter shown with <input onChange={handleChange}/>
    </form>
  )
}
