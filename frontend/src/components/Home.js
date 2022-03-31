import React from 'react'
// import Addnote from './Addnote'
import Notes from './Notes'
function Home(props) {
    let {showAlert} = props
    return (
        <div className="my-3">
            <div className="container my-3" >
                <Notes showAlert={showAlert} />
            </div>
        </div>
    )
}

export default Home
