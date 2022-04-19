import React, { useState } from 'react'
import axios from 'axios'

function Login({ loggedIn, navigate }) {
  if (loggedIn) {
    navigate('/')
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const loginUser = async () => {
    try {
      const error = await axios.post('/account/login', { username, password })
      if (error.data === 'an error has occurred') {
        alert('login failed')
      } else if (error.data === 'login failed') {
        alert('invalid username/password')
      }
    } catch (e) {
      console.log(e)
      alert('error occurred during login')
    }
  }
  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      Username:&nbsp;
      <input className="form-control w-25" onChange={e => setUsername(e.target.value)} />
      <br />
      Password:&nbsp;
      <input className="form-control w-25" onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="button" className="btn btn-primary" onClick={() => loginUser()}> Login </button>
      <br />
      Dont have an account? Sign up instead.
      <br />
      <button type="button" className="btn btn-info" onClick={() => navigate('/signup')}>Sign up!</button>
      <br />
      Or return to the home page.
      <br />
      <button type="button" className="btn btn-success" onClick={() => navigate('/')}> Home </button>
    </>
  )
}

export default Login
