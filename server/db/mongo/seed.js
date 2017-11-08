// 1 => Connect to the DB

var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost/eventlist', { useMongoClient: true })
// Use below for Mlabs address
// var db = mongoose.connect('mongodb://localhost/',{useMongoClinet:true}) 
mongoose.Promise = global.Promise;

// 2 => Drop the DB

db.dropDatabase();

// 3 => Re-open connection and DB

db.once('open', ()=> {
  console.log('Connecting to your DB for mass insert')
})

// 4 => Set the model to mass import

var EventSchema = new mongoose.Schema({
  eventname: String,
  eventid: Number,
  description: String,
  image: String,
  location: String,
})
var Event = mongoose.model('Event', EventSchema)

// 5 => Add data from `events.json`

var seedData = require('./events.json')

Event.insertMany(seedData, function(err,result) {
  if (err) {
    console.log(err)
  } else {
    console.log('Successfully added data to your DB, disconnecting please hold')
  }
});

setTimeout(function(){ db.disconnect }, 2000)
setTimeout(function(){ console.log('Disconnected from DB, ending script now!') }, 2001)
setTimeout(function(){ process.exit() }, 2002)

// You're done!!