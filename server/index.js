const express = require('express');
const parser = require('body-parser');
const path = require('path');
const db = require('./db/mongo/controller.js');
// const utils = require('./helpers');


const app = express();

app.use(parser.json())
app.use(parser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../client')))


//LANDING PAGE
app.get('/', function(req, res){
	//landing page is userlist
	//get from mongoBD
res.send()

})


//SIGNUP-LOGIN
app.post('/signup', function(req, res){
	//save to sql database

	
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

	//save userId, userlist to sql, grab id
	// 
	//take both ids and put into new itin table in mongoDB
	res.send('Itinerary saved');
})














app.listen(3000, ()=> console.log('Listening on port 3000'));