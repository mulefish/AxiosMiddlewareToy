const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');
let count = 0;
function log(msg) {
  console.log( ++count + " | " + msg);
}
function populate_table(obj) {
  db.serialize(function () {
    const stmt = db.prepare(`INSERT INTO people VALUES (?, ?, ? )`);
    stmt.run(
      obj.firstname,
      obj.lastname,
      obj.choices, // Fake array: It will be a | delimited string. 'A|B|C|X|Y|Z'  to mean [A, B, C, X, Y, Z]
    );
    stmt.finalize();
  });
  log('populate_table');
}

const user_profiles = [
    {
        firstname: 'Able',
        lastname: 'Adams',
        choices: 'A|B|C|X|Y|Z',
    }, 
    {
        firstname: 'Beatrice',
        lastname: 'Bennington',
        choices: 'A|R|Z',
    }, 
    {
        firstname: 'Conner',
        lastname: 'Cook',
        choices: 'A|B|C',
    }, 
]


function create_table() {

  db.serialize(function () {
    db.run(`DROP TABLE IF EXISTS people`);
    db.run(
      `CREATE TABLE people (firstname TEXT, lastname TEXT, choices TEXT)`,
    );
  });
  log('create_table');

}

create_table()
user_profiles.forEach((profile) => {
  populate_table(profile);
});

log('The end');
db.close();