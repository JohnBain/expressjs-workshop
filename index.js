var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var redditAPI = require('./redditstuff.js')

app.get('/posts', function(req, res) {
  redditAPI.getAllPosts(function(result){
    var finalstring = `<div id="contents">
    <h1>List of contents</h1>
    <ul class="contents-list">`
  
    result.forEach(function (post){
      finalstring += `<li class="content-item">
      <h2 class='${post.title}'>
        <a href='${post.url}'/>${post.title}</a>
      </h2>
      <p>Created by ${post.user}</p>`
    })
    
    finalstring += "</li> </ul> </div>"
    res.send(finalstring)
  })
});

app.use(bodyParser());

app.get('/createContent', function(req, res){
  console.log(req)
  res.sendFile('/home/ubuntu/workspace/form.html')
})

app.post('/createContent', function(req, res){
  var postUrl = req.body.url;
  var postTitle = req.body.title;
  redditAPI. createPost({
      title: postTitle,
      url: postUrl,
      userId: 1,
      subredditId: 3
    }, function(err, post) {
      if (err) {
        res.send("Error. Post not created.");
      }
      else {
        res.redirect('/posts')
      }
    });
});


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


/*<div id="contents">
  <h1>List of contents</h1>
  <ul class="contents-list">
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">The content title</a>
      </h2>
      <p>Created by CONTENT AUTHOR USERNAME</p>
    </li>
    ... one <li> per content that your Sequelize query found
  </ul>
</div>*/