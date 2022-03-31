import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesData = []
  const [notes, setnotes] = useState(notesData)


  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json)
    setnotes(json)



  }
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setnotes(notes.concat(note))
  


    // let note = {
    //   "_id": "61a5e3b899b1faea7d8ca5e5",
    //   "user": "61a5e30099b1faea7d8ca5da",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2021-11-30T08:41:28.420Z",
    //   "__v": 0
    // }

  }
  const deleteNote = async (id) => {
    console.log(`this is the id of deleting it ${id}`)
    const newNote = notes.filter((note) => { return note._id !== id })
    setnotes(newNote)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // setnotes(json)
    // console.log(json)
  }

  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    // console.log(json)
    
     let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      // const element = notes[index];
      if (newNotes[index]._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setnotes(newNotes)
    // console.log(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState