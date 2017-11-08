const router = require('express').Router();
const connection = require('../database/index');

exports.showUsers = function(req, res) {
  var queryString = `SELECT * from users`;
  connection.query(queryString, function(err, rows){
      res.json(rows);
  })
}

