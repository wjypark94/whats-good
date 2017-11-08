const request = require('request-promise');
const seeds = require('../data.json');

const queryize = ({ city, state }) => {
  return `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text= "${city}, ${state}")`;
};

const getHeaders = (location) => {
  return {
    url: 'http://query.yahooapis.com/v1/public/yql',
    qs: {
      q: queryize(location),
      format: 'json'
    }
  };
};

module.exports.getWeather = (location, callback) => {
  const options = getHeaders(location);
  request(options)
    .then((weather) => {
      // console.log(weather);
      callback(JSON.parse(weather));
    })
    .catch((err) => {
      console.error('Yahoo API failed: ', err);
    });
  // callback(seeds);
};
