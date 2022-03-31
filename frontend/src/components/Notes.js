import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import noteContext from '../context/notes/noteContext'
import NotesItem from './NotesItem'
import { useNavigate } from 'react-router-dom'
import Addnote from './Addnote'

function Notes(props) {
    let navigate = useNavigate()
    const showAlert = props
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes() 
        }else{
        navigate('/login')
        }
        // eslint-disable-next-line
    }, []) 
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id:"",title: "", description: "", tag: "" })
    const updateNote = (id,title, description, tag) => {
        ref.current.click()
        setNote({id, title, description, tag })
    }
    const updateNoteBtn = () => {
        refClose.current.click()
        props.showAlert('Note updated', 'success')
        editNote(note.id, note.title, note.description, note.tag)
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h2>Add Note</h2>
            <Addnote showAlert={showAlert}/>
         {notes.length === 0 && "Your notes will appear here"}
            <button type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title*</label>
                                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" onChange={onChange} value={note.title} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description*</label>
                                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag(Optional)</label>
                                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={addNoteBtn}>Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateNoteBtn}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {notes.map(note => {
                        return <NotesItem title={note.title} key={note._id} description={note.description} _id={note._id} updateNote={updateNote} showAlert={showAlert}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
