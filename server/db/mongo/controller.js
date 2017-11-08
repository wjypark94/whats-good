var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/eventlist',{useMongoClinet:true})
// Use below for Mlabs address
// var db = mongoose.connect('mongodb://localhost/',{useMongoClinet:true}) 
mongoose.Promise = global.Promise

db.once('open'),()=>{
  console.log('Connected to the DB')
}

var ItinerarySchema = new mongoose.Schema({
  listname: String,
  listid: Number,
  userid: String,
  date: String, // This might need to be DATE, but it's not a great format
  eventids: [],
  eventtime: [],
})

var EventSchema = new mongoose.Schema({
  eventname: String,
  eventid: Number,
  description: String,
  image: String,
  location: String,
  url: String,
})

var Itinerary = mongoose.model('Itinerary', ItinerarySchema)
var Event = mongoose.model('Event', EventSchema)

// Helper functions:

var getItem = function(type){
  db.type.find({}, (err, data) =>{
    if (err) {
      return console.log (err)
    } else {
      return data;
      console.log(data) //Slash this out later
    }
  })
}

// Will need options for an ID or something specific
// Possibly a function that reads an Itinerary, 
// Returns all event IDS in the event ID array,

var saveEvent = function(passE){

  var newE = new db.Event;
  newE.eventname = passE.eventname;
  newE.eventid = passE.eventid;
  newE.description = passE.description;
  newE.image = passE.image;
  newE.location = passE.location;
  newE.url = passE.url;

  newE.save(function (err, newE){
    if (err) return console.log(err);
    console.log('Event successfully added to db!')
  })
  return(newE);
}

var saveItinerary = function(passI){

  var newI = new db.Itinerary;
  newI.listname = passI.listname;
  newI.listid = passI.listid;
  newI.userid = passI.userid;
  newI.date = passI.date;
  newI.eventids = passI.eventids;
  newI.eventtime = passI.eventtime;

  newI.save(function (err, newItinerary){
    if (err) return console.log(err);
    console.log('Itinerary successfully added to db!')
  })
  return(newI);
}

// This function takes in an Itinerary ID, finds the itineray's eventsid,
// Which is an array of event ids, and then gets all those events,
// Attaches them to the iternary data as itdata.events;
// And returns the whole events obj with that array attached to it.

var getItsEvents = function(id){
  let id = parseInt(id);
  Itinerary.find({listid : id}, (err, itdata) =>{
    if (err) {
      return console.log(err)
    } else {
      Event.find({ eventid: { "$in" : itdata.eventids} }, (err, evdata) => {
        if (err) {
          return console.log(err)
        } else {
          itdata.events = [];
          for (var i = 0; i < evdata.length; i++){
            itdata.events.push(evdata[i])
          }
          return itdata;
        });
    }
  });
}

// db.type.find({}, (err, data) =>{
//   if (err) {
//     return console.log (err)
//   } else {
//     return data;
//     console.log(data) //Slash this out later
//   }
// })


module.exports = {Itinerary, Event, saveEvent, saveItinerary, getItsEvents}