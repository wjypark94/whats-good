//gotta use sequelize
var mysql = require('mysql');
var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'whatsGood'
});

dbConnection.connect();
module.exports = dbConnection;