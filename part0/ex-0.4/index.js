import data from './data.json' assert { type: 'json' }

var notelist = document.getElementById('noteslist');
var note = document.getElementById('note');
var btn = document.querySelector('button');

for(let i=0;i<data.content.length;i++){
    notelist.innerHTML += "<li>"+data.content[i]+"</li>";
}

btn.addEventListener("click", addnote);

function addnote(){
    data.content.push(note.value);
    notelist.innerHTML += "<li>"+note.value+"</li>";
    //want to update data.json everytime addnote is called 
    // by adding a new note.
}



