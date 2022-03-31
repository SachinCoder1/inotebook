import React from 'react'
import { useContext } from 'react/cjs/react.development'
import noteContext from '../context/notes/noteContext'
function NotesItem(props) {
    // const showAlert = props
    const context = useContext(noteContext)
    const { deleteNote } = context
    const {updateNote} = props
    const deletingNoteBtn = ()=>{
        deleteNote(props._id)
    }
    return (
        <div className="col-md-4">

            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title d-flex align-items-center card-text card-titles">{props.title}
                    <div className="rightthings">

                        <i className="fas fa-trash mx-2" onClick={deletingNoteBtn}></i>
                        <i className="fas fa-edit mx-2" onClick={()=>updateNote(props._id,props.title, props.description, props.tag)}></i>
                    </div></h5>
                    <p className="card-text">{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NotesItem
