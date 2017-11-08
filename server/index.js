const express = require('express');
const parser = require('body-parser');
const path = require('path');
const db = require('./db/mongo/controller.js');
const sqlDb = require('./db/sql/controller.js)
// const utils = require('./helpers');


const app = express();

app.use(parser.json())
app.use(parser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../client')))


//LANDING PAGE
app.get('/', function(req, res){
	//landing page is userlist AFTER login
	//get from mongoBD (see below)
res.send()

})


//SIGNUP-LOGIN
app.post('/signup', function(req, res){
	var signUp = req.body
	//save to sql database
	// sqlDb.POST(signUp, function(res){

	// 	res.send(200)
	// })

	
})

app.post('/login', function(req, res){
	//check if exists on sql db
	//return boolean
	
})


//SEARCH
app.post('/search', function(req, res){
	var data = req.body
	//grab the payload from the request(req.body)
	//check data.type
	//if data.type === activity
	
	//utils.activityhelper(data, function(items){
		//res.send(items);
	//})
	//if data.type === food
	
	//utils.foodhelper(data, function(items){
		//res.send(items);
	//})
	//return data to client

	
})



//CREATING ITINERARY

// app.get('/userlist', function(req, res){
// 	// get from mongodb


// })

app.post('/itinerary', function(req, res){
	const itinBody = req.body;
	//save userId, userlist to sql, grab id
	//sqlDb.POST(itinBody, function(res){
		//take both ids and put into new table in mongoDB
	// 	db.POST(res, function(res){
	// 		res.send(201, res?);
	// 	})
	// })
	
	
	
})














app.listen(3000, ()=> console.log('Listening on port 3000'));