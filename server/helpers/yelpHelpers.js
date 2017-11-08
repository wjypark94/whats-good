const yelpRequest = function(location, callback) {
  const params ={
    location: location,
      radius: 5000,
      sort: 2,
      term: 'food'
      limit: 20,
  }

  const options ={
      uri: 'https://api.yelp.com/v2/search',
      qs: params,
      headers: {'User Agent': 'request-promise'},
      json: true
    }
    

  request(options)
  .then(function (res) {
    callback(res)
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });
}