var mysql = require('mysql')

// create a connection to our Cloud9 server
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'jbain1', // CHANGE THIS :)
  password: '',
  database: 'reddit'
});

var getAllPosts = function(callback) {
  conn.query(`
        SELECT *, posts.id AS postID, users.username FROM posts JOIN users ON posts.userId = users.id
        ORDER BY posts.createdAt DESC
        `,
    function(err, results) { //We should abstract this all to a function
      if (err) {
        callback(err);
      }
      else {
        var x = results.map(function(post) {
          return {
            id: post.postID,
            title: post.title,
            url: post.url,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            userId: post.userId,
            user: post.username,
          };
        });
        callback(x);
      }
    }
  )
}


module.exports =getAllPosts;
