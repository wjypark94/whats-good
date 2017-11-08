const users = require('./users');
const connection = require('./database/index');

var seedData = function(users) {
    for (var i = 0; i < users.length; i++) {
        var queryString = `INSERT INTO users () `
        connection.query(queryString, function(err, rows) {
        });
    }
;}

module.exports = seedData;