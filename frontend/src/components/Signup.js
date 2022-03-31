import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Signup(props) {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleClick = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            props.showAlert('Account created successfully', 'success')
            navigate('/')

        } else {
            props.showAlert('Please enter valid details', 'danger')
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <h2>Create account to continue </h2><p className="makeItalic">Already have an account? <Link to="/login">Click here </Link> to login</p>
            <form onSubmit={handleClick}>
                <div className="form-group my-2">
                    <label htmlFor="name my-1">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter email" name="name" onChange={onChange} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email my-1">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={onChange} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password my1">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={onChange} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="cpassword my-1">Confirm password</label>
                    <input type="password" className="form-control" id="cpassword" placeholder="Confirm password" name="cpassword" onChange={onChange} />
                    <small id="emailHelp" className={`form-text text-muted d-${credentials.password === credentials.cpassword ? "none" : "block"}`}>Password didn't match (Enter same password as above)</small>
                </div>
                <button disabled={credentials.password === credentials.cpassword ? false : true} type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
