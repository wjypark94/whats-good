const request = require('request-promise');
const eventfulKey = require('./config.js');
const apiKey = eventfulKey.eventfulApiKey;
const parsexml = require('xml2js').parseString;

//location = {city, state, date}
//search = '';
const getHeaders = (location, search) => {
  return {
    url: 'http://api.eventful.com/rest/events/search',
    qs: {
      app_key: apiKey,
      location: location.city + ', ' + location.state,
      date: 'this week',
      keywords: search
    }
  };
};

module.exports.getEvents = (location, search, callback) => {
  const options = getHeaders(location, search);
  // console.log(options);
  request(options)
    .then((events) => {
      // console.log(weather);
      var eventsJSON = parsexml(events, function(err, results) {
        callback(results.search.events[0].event);
      });
    })
    .catch((err) => {
      console.error('Eventful API failed: ', err);
    });
  // callback(seeds);
};
