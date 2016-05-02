var express = require('express');
var app = express();

function sayHelloTo(name){
    return "<h1>Hello " + name + "</h2>";
}

function calculator(operation, first, second){
  
  if (operation === "add"){
    return first + second;
  }
  if (operation === "subtract"){
    return first - second;
  }
  if (operation === "multiply"){
    return first * second;
  }
  if (operation === "divide"){
    return first / second;
  }
  else {
    return "Possible operations are add, subtract, multiply, divide"
  }
}

// app.get('/', function (req, res) {
//   res.send('<h1>Hello World!</h1>');
// });

app.get('/greet', function(request, response){
    var name = request.query.name;
    var result = sayHelloTo(name);
    response.send(result);
})

//^ https://express-workshop-jbain1.c9users.io/greet?name=John


app.get('/calculator/:operation', function(req, res) {
    var operation = req.params.operation;
    var num1 = parseInt(req.query.num1);
    var num2 = parseInt(req.query.num2);
    
    
    
    var data = {
        "calculator": {
            "operation": operation,
            "firstOperand": num1,
            "secondOperand": num2,
            "calculated" : calculator(operation, num1, num2)
        }
    }; 

    res.send(data);
});

//calculator/:operation?num1=XX&num2=XX and respond with a JSON object that looks like the following. For example, /op/add?num1=31&num2=11:

app.get('/hello/:tagId', function(req, res) {
  res.send("<h1><i>Hello " + req.params.tagId + "</i></h2>");
});

//^ https://express-workshop-jbain1.c9users.io/hello/John



/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

