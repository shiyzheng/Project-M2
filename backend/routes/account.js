const express = require('express')

const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { body } = req
  const { username, password } = body

  try {
    const user = await User.findOne({ username })
    if (user) {
      res.send('username is in use')
    }
    await User.create({ username, password })
    res.send('user creation was successful')
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  const { body } = req
  const { username, password } = body

  try {
    const user = await User.findOne({ username })
    if (username === user.username && password === user.password) {
      req.session.username = username
      res.send('successful login')
    } else {
      res.send('login failed')
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  res.send('logged out')
})

router.get('/username', (req, res) => {
  res.json(req.session.username)
})

router.post('/user', async (req, res, next) => {
  const { body } = req
  const { user, seconds } = body
  const player = await User.findOne({ username: user })

  try {
    if (player.record > seconds) {
      await User.updateOne({ username: user }, { record: seconds })
    }
    res.send('user record updated')
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.get('/leaderboards', async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router
