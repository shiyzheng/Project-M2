import React, { useState } from 'react'
import axios from 'axios'

function Signup({ loggedIn, navigate }) {
  if (loggedIn) {
    navigate('/')
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const registerUser = async () => {
    try {
      const error = await axios.post('/account/signup', { username, password })
      if (error.data === 'username is in use') {
        alert('username is in use')
      } else {
        alert('user creation was successful')
        navigate('/')
      }
    } catch (e) {
      console.log(e)
      alert('error occurred during signup')
    }
  }

  return (
    <>
      <div>
        <h1>Sign Up</h1>
      </div>
      Username:&nbsp;
      <input className="form-control w-25" onChange={e => setUsername(e.target.value)} />
      <br />
      Password:&nbsp;
      <input className="form-control w-25" onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="button" className="btn btn-primary" onClick={() => registerUser()}> Sign up </button>
      <br />
      Already registered? Login instead.
      <br />
      <button type="button" className="btn btn-info" onClick={() => navigate('/login')}>Log in</button>
      <br />
      Or return to the home page.
      <br />
      <button type="button" className="btn btn-success" onClick={() => navigate('/')}> Home </button>
    </>
  )
}

export default Signup
