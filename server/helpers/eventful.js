const request = require('request-promise');
const eventfulKey = require('./config.js');
const apiKey = eventfulKey.eventfulApiKey;
const parsexml = require('xml2js').parseString;

const getHeaders = (location) => {
  return {
    url: 'http://api.eventful.com/rest/events/search',
    qs: {
      app_key: apiKey,
      location: location.city + ', ' + location.state,
      date: location.date,
      keywords: 'concert'
    }
  };
};

module.exports.getEvents = (location, callback) => {
  const options = getHeaders(location);
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
