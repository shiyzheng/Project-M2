import React, { useState } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Homepage from './components/homepage'
import Signup from './components/signup'
import Login from './components/login'
import Leaderboards from './components/leaderboards'
import Play from './components/play'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const checkUser = async () => {
    try {
      const u = await axios.get('/account/username')
      setLoggedIn(u)
      const info = await axios.get('/account/user')
      setUser(info)
      if (username !== u.data) {
        setUsername(u.data)
      }
    } catch (e) {
      console.log(e)
      alert('unexpected error occurred')
    }
  }
  checkUser()

  const element = useRoutes([{ path: '/', element: <Homepage loggedIn={loggedIn.data} navigate={navigate} /> },
    { path: '/signup', element: <Signup loggedIn={loggedIn.data} navigate={navigate} /> },
    { path: '/login', element: <Login loggedIn={loggedIn.data} navigate={navigate} /> },
    { path: '/play', element: <Play loggedIn={loggedIn.data} navigate={navigate} /> },
    { path: '/leaderboards', element: <Leaderboards navigate={navigate} /> },
  ])
  return element
}

export default App
