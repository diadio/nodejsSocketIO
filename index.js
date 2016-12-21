var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTimeNow() {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return h + ":" + m + ":" + s;
}

app.get('/', function(req, res){
	res.sendfile('index.html');
});
io.emit('chat messagex', { for: 'everyone' });
/*
io.on('connection', function(socket){
	socket.broadcast.emit('hi');
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});
});
*/

io.on('connection', function(socket){
	console.log('a user connected');
	socket.broadcast.emit('hi, welcome');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg){
		if(!msg || msg.msg=='')
		{
			return false;
		}
		console.log('message: ' + msg.msg +msg.id);
		msg.ctime = getTimeNow();
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});