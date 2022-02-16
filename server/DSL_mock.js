//345678901234567890123456789012345678901234567890123456789012345678901234567890
const express = require('express');
const data = require('./database.js');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.argv[2] || 3030;
const jwt = require('jsonwebtoken')
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
const app = express();
const configure = () => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(allowCrossDomain);
  app.use(express.json())
};
configure();
let count = 0 
function log(msg) {
  console.log( 'DSL_mock: ' + ++count + ' | ' + msg);
}
/////////////////////////// SET UP COMPLETE ////////////////////////////////////
// Real logic follows 
//345678901234567890123456789012345678901234567890123456789012345678901234567890

function authenticateTokenMiddleWare(req, res, next) {
  log( req.headers )
  const authHeader = req.headers['authorization'] //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) { 
    log("null " + token)
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) { 
      log( "err for \n" + token + " \n" + err)
      return res.sendStatus(403)
    } else {
      log("token is good! " + token )
    }
    req.user = user
    next()
  })
}

/////////////////// ENDPOINTS FOLLOW //////////////////////
// app.get('/healthcheck', async function (req, res) {
//   res.send("OK get");
// })

app.post('/healthcheck', async function (req, res) {
  res.send("OK post");
})

const server = app.listen(port, function () {
  log(`DLS_mock: listening at localhost:${port}/`);




});

app.get('/endpoint1', authenticateTokenMiddleWare, (req, res) => {
  try { 
    log( " !!!! req user " + JSON.stringify( req.user, null, 2 ))
    res.json(" OK " ) 
  } catch (error) {
    res.json({"ohno": error})
  } 
})