//Load mysql
const mysql = require("mysql2");

module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bane1203",
    database: "microserviceFlight",
});
