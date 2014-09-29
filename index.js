var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function(socket){
	console.log('a user connected');
	
    socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
	 
//pelda majd sensor ertekek olvasasara. 1 mp -kent kuld a server broadcast a klienseknek.	
//a 2 szamlalo aszinkron mukodik. Akar 2 sensor egyideju lekerdezese is lehetseges egymastol fuggetlenul 
	socket.on('chat message', function(msg) {
	var interval1, interval2;
	if(msg=='1'){
		var i =0;
		interval1 = setInterval(function() {
		io.emit('counter1',i);
		i++;
		console.log(i+' sent');
	  }, 1 * 1000);
	 }else if(msg=='2'){
		var i =0;
		interval2 = setInterval(function() {
		io.emit('counter2',i);
		i++;
		console.log(i+' sent');
	  }, 1 * 1000);
	 }
	});
  
    socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



http.listen(3000, function(){
	console.log('listening on *:3000');
});