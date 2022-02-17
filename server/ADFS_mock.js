require('dotenv').config()
const express = require('express')
const { get_user }  = require('./database.js');
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors');
let count = 0; 
function log(msg) {
  console.log( 'ADFS_mock: ' + ++count + ' | ' + msg);
} 
const configure = () => {
    app.use(cors());
    app.use(allowCrossDomain);
    app.use(express.json())

  };

  const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
  };
  configure();

  let refreshTokens = [] /// In production this would be a  DATABASE or REDDIS or something. 

  app.post('/refreshTheToken', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) {
      console.log(" 401! " + refreshToken)
      return res.sendStatus(401)
    } 
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
  })
  
  app.delete('/tokenCancel', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.accessToken)

    console.log( req.body.accessToken ) 

    refreshTokens.forEach((token, index) => {
      console.log( index + "\n"  + token )
    }) 

    res.send("HttpStatus: 204")
    // res.sendStatus(204)
  })
  



app.post('/login', (req, res) => {

  const username = req.body.username
  log("\n\n\n****\nADFS_mock login: " + username)
  // TWO THINGS OF NOTE HERE:
  // 1. Look in database for this user
  // 2. I did not have to put a fully baked user object in the JWT - depending on the topology of the app, I could have just put the username in the JWT.
  const user = get_user(username)
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })

})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' }) // '20m' 
}
const port = 4000
app.listen(port)
log("ADFS_mock: listening at port " + port)

