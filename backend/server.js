const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const path = require('path')

const account = require('./routes/account')

const app = express()
const port = process.env.PORT || 3000

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://syz:123@cluster0.wzm4x.mongodb.net/Cluster0?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())
app.use(express.static('dist'))

app.use(cookieSession({
  name: 'session',
  keys: ['key'],
  maxAge: 24 * 60 * 60 * 1000,
}))

app.use('/account', account)

// error handling
app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    res.send('An error has occurred')
  } else {
    next()
  }
})

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  console.log('mongoDB is connected')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
