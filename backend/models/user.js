const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },
  record: Number,
})

const User = model('User', userSchema)

module.exports = User
