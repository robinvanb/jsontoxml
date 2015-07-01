var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/handle', function (req, res) {
  var body = req.body;
  console.log("Form Name:", body.view.meta.name);
  console.log("Registration Id:", body.registration.data);
  console.log("Configuration", body.configuration);

  res.json({ status : 'SUCCESS'});
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
});


