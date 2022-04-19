const isAuthenticated = (req, res, next) => {
  if (req.session.username || req.session.username === '') {
    next()
  } else {
    res.send('user not authenticated')
  }
}

module.exports = isAuthenticated
