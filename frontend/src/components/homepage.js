import React from 'react'
import axios from 'axios'

function Homepage({ loggedIn, navigate }) {
  const logout = async () => {
    try {
      await axios.post('/account/logout')
      navigate('/')
    } catch (e) {
      console.log(e)
      alert('error occurred during logout')
    }
  }

  return (
    <>
      {loggedIn && (
      <>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/play')}> Click here to play the game! </button>
        &nbsp;
        <button type="button" className="btn btn-primary" onClick={() => navigate('/leaderboards')}> Leaderboards </button>
        &nbsp;
        <button type="button" className="btn btn-danger" onClick={() => logout()}> Logout </button>
      </>
      )}
      {!loggedIn && (
      <>
        <div>
          <h1><b> Memory Game </b></h1>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/login')}> Login to play the game! </button>
        &nbsp;
        <button type="button" className="btn btn-success" onClick={() => navigate('/leaderboards')}> Leaderboards </button>
      </>
      )}
    </>
  )
}

export default Homepage
