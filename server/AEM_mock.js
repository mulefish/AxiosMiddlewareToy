//345678901234567890123456789012345678901234567890123456789012345678901234567890

const express = require('express');
const port = process.argv[2] || 3000;
const app = express();
let count = 0 
function log(msg) {
  console.log("AEM_mock: " + ++count + ' | ' + msg);
}
app.get('/', function (req, res) {
  log('/webpage.html');
  res.sendFile('webpage.html', { root: __dirname });
});

const server = app.listen(port, function () {
  log(`AEM_mock: web page visible at localhost:${port}/`);
});

