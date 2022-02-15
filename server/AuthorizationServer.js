require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) {
    console.log("401! token")
    return res.sendStatus(401)
  } 
  if (!refreshTokens.includes(refreshToken)) {
    console.log("403 token")
    return res.sendStatus(403)
  }

 jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    // jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log("403 verify token")
        return res.sendStatus(403)
      }
      console.log( "yay! " + user.name )
    const accessToken = generateAccessToken({ name: user.name })
    console.log("accessToken: " + accessToken )
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  // const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' }) // '20m' 
  // return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
const port = 4000
app.listen(port)
console.log("auth server running on port 2 " + port)