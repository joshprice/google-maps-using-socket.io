var http = require('http'),
io = require('socket.io'),
fs = require('fs');

server = http.createServer(function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile("." + req.url, 'utf8', function (err, data) {
      if (err) {
        res.end();
      }
    res.end(data);
  });
});
server.listen(3000);

// socket.io
var socket = io.listen(server);

function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

socket.on('connection', function(client){
  // console.log('connection made');

  client.on('message', function(message){
    // console.log("message received", message);
    messageObject = JSON.parse(message);
    if (messageObject.type == "add") {
      messageObject.guid = guid();
    }
    var response = JSON.stringify(messageObject);
    // console.log("response", response);
    socket.broadcast(response);
  })
  // client.on('disconnect', function(){ })
});

