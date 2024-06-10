const mysql = require('mysql');

function createSQLConnection(config) {
  const conn = mysql.createConnection(config);

  conn.connect((err) => {
    if (err) throw err;
  });

  return conn;
}


module.exports = {createSQLConnection};