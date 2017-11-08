const yelpRequest = function(location, callback) {
  const params ={
    location: location,
      radius: 5000,
      sort: 2,
      term: 'food'
      limit: 20,
  }

  const options ={
      uri: 'https://api.yelp.com/v3/businesses/search',
      qs: params,
      headers: {'Authorization': 'ACCESS_TOKEN'},
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