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

var createPost = function(post, callback) {
  conn.query(
    'INSERT INTO `posts` (`userId`, `title`, `url`, `subredditId`, `createdAt`) VALUES (?, ?, ?, ?, ?)', [post.userId, post.title, post.url, post.subredditId, null],
    function(err, result) {
      if (err) {
        callback(err);
      }
      else {
        /*
        Post inserted successfully. Let's use the result.insertId to retrieve
        the post and send it to the caller!
        */
        conn.query(
          'SELECT `id`,`title`,`url`,`userId`, `createdAt`, `subredditId`, `updatedAt` FROM `posts` WHERE `id` = ?', [result.insertId],
          function(err, result) {
            if (err) {
              callback(err);
            }
            else {
              callback(null, result[0]);
            }
          }
        );
      }
    }
  );
}


createPost({
      title: 'YET ANOTHER CAT POST!!!!!!!',
      url: 'https://www.placekitten.com',
      userId: 1,
      subredditId: 3
    }, function(err, post) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(post);
      }
    });
    
module.exports = {getAllPosts, createPost};
