import React from 'react'
import { useContext } from 'react/cjs/react.development'
import noteContext from '../context/notes/noteContext'
import { useState } from 'react'


function Addnote() {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "generals" })
    const addNoteBtn = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        // props.showAlert('Item added', 'success')
        //  setNote({title:"", description:"", tag:"general" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title* (min. 5 Characters)</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" onChange={onChange} value={note.title} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description* (min. 5 Characters)</label>
                <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag(Optional)</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
            </div>
            <button disabled={note.title.length <5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={addNoteBtn}>Add Note</button>
        </form>
    )
}

export default Addnote
