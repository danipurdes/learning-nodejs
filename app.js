const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
var path_prefix = '/NodeProjects/Intro';
var notfound_path = path_prefix + '/404.html';
var index_path = path_prefix + '/index.html';

const server = http.createServer((req, res) => {
  var q = url.parse(req.url, true);
  var qdata = q.query;

  console.log(q.pathname);
  
  var fullpath = path_prefix + q.pathname;
  fs.stat(fullpath, function(fullpath_err, fullpath_stats) {
    if (fullpath_err) {
      fs.readFile(notfound_path, function(notfound_err, notfound_data) {
        if (notfound_err) {
          res.write('404 page not found :(');
        }
        else {
          res.write(notfound_data);
        }

        res.end();
      });
    }
    else {
      if (fullpath_stats.isDirectory()) {
        fs.readFile(index_path, function(index_err, index_data) {
          if (index_err) {
            res.write('index page not found :(');
          }
          else {
            res.write(index_data);
          }

          res.end();
        });
      }
      else {
        fs.readFile(fullpath, function(fullpath_err, fullpath_data) {
          if (fullpath_err) {
            fs.readFile(notfound_path, function(notfound_err, notfound_data) {
              if (notfound_err) {
                res.write('404 page not found :(');
              }
              else {
                res.write(notfound_data);
              }

              res.end();
            });
          }
          else {
            res.write(fullpath_data);
          }

          res.end();
        });
      }
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});