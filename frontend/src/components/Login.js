import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Login(props) {
    let navigate = useNavigate()

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const handleClick = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            props.showAlert('Login successful', 'success')
            navigate('/')
            // console.log(json.authToken)

        } else {
            // props.showAlert('Invalid credentials', 'danger')
            props.showAlert('Please enter valid email and password', 'danger')
        }
    }
    const onChange = (e) => {
        // setcredentials({email:document.querySelector('.email').value, password:document.querySelector('.password').value})
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <h2>Login to continue. </h2><p><Link to="/signup">click here </Link> to create new account</p>
            <form onSubmit={handleClick}>
                <div className="form-group" >
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control email" name="email" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control password" name="password" value={credentials.password} onChange={onChange} id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Login</button>
            </form>
        </div>
    )
}

export default Login
