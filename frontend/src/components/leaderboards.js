import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Leaderboards({ navigate }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get('/account/leaderboards')
      const arr = data.sort((a, b) => b.record - a.record)
      const sliced = arr.slice(0, 10)
      setUsers(sliced)
    }
    const interval = setInterval(() => {
      getUsers()
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <button type="button" className="btn btn-success" onClick={() => navigate('/')}> Home </button>
      <div>
        <h1><b>Leaderboards</b></h1>
      </div>
      <br />
      {
        users.map(u => (
          <div className="card w-50" key={u.username}>
            <div className="card-body">
              <p className="card-text">
                <b>
                  {u.username}
                  :&nbsp;
                  {u.record}
                </b>
              </p>
            </div>
          </div>
        )).reverse()
      }
    </>
  )
}

export default Leaderboards
