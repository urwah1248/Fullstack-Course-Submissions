import axios from 'axios'
import {useState, useEffect} from 'react'

const App = () => {
  
  const baseUrl = 'http://localhost:3001/notes' //baseURL is the URL of the Local API
  
  const [notes, setNotes] = useState([]) //Declaring State Variables

  //Fetching Data from API
  useEffect(()=>{
    axios
    .get(baseUrl)
    .then(response => (setNotes(response.data)))
  }, [])
  
  //Adds a new Note using the form data
  const addNote = (con, imp) => {
    axios
    .post(baseUrl, {
       content: con,
       date: new Date(),
       important: imp
     })
     .then(response=> setNotes(notes.concat(response.data)))
  }

  //handleSubmit gets form data and send it as a parameter to the addNote function
  const handleSubmit = e => {
    e.preventDefault();
    const myFormData = new FormData(e.target);
    const formContent = myFormData.get('content');
    const formImportant = myFormData.get('important');
    console.log(formContent, formImportant); 

    addNote(formContent, formImportant)
  }

  //Deletes the note from the server as well as from the state variable
  const deleteNote = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(setNotes(notes.filter(item => item.id !== id)))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>Add New Note</h3>
        <input type="hidden" name="id" id='id' value={notes.length+2} />
        <div>content: <input type="text" name='content' id='content' /></div>
        <input type="hidden" name="date" id='date' value={new Date()} />
        <div>importance: 
          <label>true</label><input type="radio" name="important" id="important" value={true}/>
          <label>false</label><input type="radio" name="important" id="important" value={false}/>
        </div>
        <button type='submit'>add new note</button>
      </form>
      
      {notes.map(note => (

        <div key={note.id}>

          <p>Content: {note.content}</p>
          <p>Date: {note.date}</p>
          <p>Importance: {note.important.toString()}</p>
        
          <button onClick={()=> deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
