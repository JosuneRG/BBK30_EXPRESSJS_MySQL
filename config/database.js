const mysql = require('mysql2')
    const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop',
})

db.connect()

module.exports = db