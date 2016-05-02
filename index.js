var express = require('express');
var app = express();

function sayHelloTo(name){
    return "<h1>Hello " + name + "</h2>";
}

// app.get('/', function (req, res) {
//   res.send('<h1>Hello World!</h1>');
// });

app.get('/greet', function(request, response){
    var name = request.query.name;
    var result = sayHelloTo(name);
    response.send(result);
})


app.get('/hello/:tagId', function(req, res) {
  res.send("<h1><i>Hello " + req.params.tagId + "</i></h2>");
});




/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

