import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Navbar() {
    let navigate = useNavigate()
    let location = useLocation()
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'? "active":''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'? "active":''}`} to="/about">About</Link>
                            </li>
                        </ul>
                       { !localStorage.getItem('token')? <form className="d-flex">
                        <Link to="/login" className="btn btn-primary btn-lg active mx-1" role="button" aria-pressed="true">Login</Link>
                        <Link to="signup" className="btn btn-primary btn-lg active mx-1" role="button" aria-pressed="true">Signup</Link>
                        </form>: <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
