var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request = require('request');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());


app.post('/', function(req, res, next) {
	//var webpage_html = ''
	//var fields = ''
	//var webpage_regex = /<input.*name="(.*?)"/g;
    console.log("Webhook received!");
    console.log("Url to GET: " + req.body.get_url)
    var request_url = req.body.get_url;

	request(request_url, function (error, response, body) {
  		console.log('error:', error); // Print the error if one occurred 
  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  		console.log('body:', body);
  		res.send(body);
	});
	
});


app.listen(8080, function () {
  	console.log('Listening on port 8080!');
});

