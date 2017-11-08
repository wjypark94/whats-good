const yelpApi = require('./config.js');
const request = require('request-promise');


const yelpRequest = function(location, query, callback) {
  const params = { 
    location: location.city + ',' + location.state,
     radius: '5000',
     sort: '2',
     term: query,
     limit: '20' }

var options = { 
  url: 'https://api.yelp.com/v3/businesses/search',
  qs: params,
  headers: {
    authorization: yelpApi.YELP_ACCESS_TOKEN
  }
  // json:true
  }
    

  request(options)
  .then(function (res) {
    callback(res)
    // console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = yelpRequest;