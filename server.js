var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request = require('request');

PORT = process.env.PORT || 8080;

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
    var username = req.body.username;
    var api_key = req.body.api_key;

	request(request_url, function (error, response, body) {
  		console.log('body:', body);
  		var fields = []
  		var regex = /<input[\s\S]*?name="(.*?)"/g
		var item
		while (item = regex.exec(body))
			fields.push(item[1]);
      fields = fields.join(',');
  		res.send(fields);
	});
	
});

app.post('/test-tool', function(req, res, next) {
    var flow_id = req.body.posting_url.split('/')[4];


    var api_key = req.body.api_key;
    base_64_encoded  = new Buffer('gettingstarted' + ":" + api_key).toString('base64');
    var options = {
      url: "https://next.leadconduit.com/flows/" + flow_id + "/fields",
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + base_64_encoded
      }
    }

    request(options, function (error, response, body) {
      var field_pairs = {};
      var field_names = [];
      var field_ids = [];

      console.log(response.statusCode)
      var json_object = JSON.parse(body);
      if (json_object.length > 0) {
        for (var i = 0; i < json_object.length; i++) {
          field_ids.push(json_object[i].id)
          field_names.push(json_object[i].name)
          
          /*res.send(fields_ids);*/
        };
        for (var i = 0; i < field_names.length; i++) {
          field_pairs[field_names[i]] = field_ids[i];
        }
        res.send(field_pairs);
      } else {
        res.send({response: 'none'})
      }
      
    });
});


app.listen(PORT, function () {
  	console.log('Listening on port 8080!');
});

/* var request = new Request("https://next.leadconduit.com/flows/" + flow_id + "/fields", {
        method: 'GET', 
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/vnd.com.leadconduit.field+json',
          'Authorization': 'Basic ' + base_64_encode
        })
      });
*/
