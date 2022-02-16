//345678901234567890123456789012345678901234567890123456789012345678901234567890


//////////////////// FOLLOWS IS THE SERVER ///////////////////////
const express = require('express');
const port = process.argv[2] || 3000;
const app = express();
let count = 0 
function log(msg) {
  console.log( ++count + ' | ' + msg);
}
app.get('/', function (req, res) {
  log('/fakeswagger.html');
  res.sendFile('fakeswagger.html', { root: __dirname });
});

const server = app.listen(port, function () {
  log(`page running at localhost:${port}/`);
});

