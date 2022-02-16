//345678901234567890123456789012345678901234567890123456789012345678901234567890
///////////////////// START DB LOGIC ///////////////////////
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
sqlite3.verbose();

async function getPersonFromDB(firstname) {
  try {
    const db = await createDbConnection('db.sqlite');
    const sql = 'select * from people where firstname = ?';
    const resultSet = await doQuery(db, firstname, sql);
    return resultSet;
  } catch (boom) {
    console.error('Failbot says |' + boom + '|');
  }
}

async function doQuery(db, firstname, query) {
  try {
    const result = await db.all(query, firstname);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function createDbConnection(filename) {
  return open({
    filename: filename,
    driver: sqlite3.Database,
  });
}
//////////////////// END DB LOGIC ///////////////////////





//////////////////// FOLLOWS IS THE SERVER ///////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.argv[2] || 3030;
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
};
configure();
let count = 0 
function log(msg) {
  console.log( ++count + ' | ' + msg);
}

app.get('/person', async function (req, res) {
    const firstname = req.query.firstname;
    log('line 67 person ' + firstname );
    try {
      const resultSet = await getPersonFromDB(firstname);
      res.send(resultSet);
    } catch (boom) {
      console.error('Failbot says |' + boom + '|');
      res.send(boom);
    }
  });
  
app.get('/', function (req, res) {
  log('/fakeswagger.html');
  res.sendFile('fakeswagger.html', { root: __dirname });
});

const server = app.listen(port, function () {
  log(`running at localhost:${port}/`);
});


//////////////////// START AUTH LOGIC ///////////////////////
require('dotenv').config()

const jwt = require('jsonwebtoken')

app.use(express.json())


const posts = [
  {
    username: 'Finch',
    title: 'Blue'
  },
  {
    username: 'Bewick',
    title: 'Red'
  },  
  {
      username: 'Sparrow',
      title: 'Green'
  },
  {
  username: 'Robin',
  title: 'Orange'
  } 
]


app.get('/endpoint1', authenticateToken, (req, res) => {


  try { 

  // const result = posts.filter(post => post.username === req.user.name)
  // log('line 117 posts!  ' + authenticateToken + " and " + result  );

  // res.json( result )

      res.json("yay! ")

  } catch (error) {

    res.json({"ohno": error})
  } 

})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) { 
      console.log("FAILBOT! " + err)
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

//////////////////// END AUTH LOGIC ///////////////////////



