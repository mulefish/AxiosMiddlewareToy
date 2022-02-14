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
