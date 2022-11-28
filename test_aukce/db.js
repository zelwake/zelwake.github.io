let mysql = require('mysql2');

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test"   //! Změnit na správnou databázi
});

conn.connect((err) => {
    if (err) {
        console.error('Cannot connect to the database', err);
        return;
    }
    console.log('Connection established');
});

module.exports = conn; 