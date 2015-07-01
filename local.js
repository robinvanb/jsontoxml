var request = require('request');

var data = {
  view : { meta : { name : "My Form"}},
  registration : {
    data : {
      foo : "bar"
    }
  },
  configuration : {
    someUrl : 'http://...'
  }
};

request.post({
  url : 'http://localhost:3000/handle',
  json : data
}, function(err, res) {
  if (err) {
    console.log("ERROR!");
    console.log(err);
    return
  }
  console.log("SUCCESS:", res.body)
});