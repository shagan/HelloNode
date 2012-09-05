var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(process.env.PORT);

var sys  = require('sys')

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/emit', function (req, res) {
  	 sys.puts("heyllo")
	 if(sockets.length>0)
	 {
		for(var i=0;i < sockets.length; i++)
		{
			sockets[i].emit('news', { hello: req.query.data });
		}
	 }
	 res.end("done\n");
});


var sockets = [];

io.sockets.on('connection', function (socket) {
	sockets.push(socket);
	socket.on('message', function(data){
        sys.puts("got data"+ data);
        if(sockets.length>0)
         	{
                	for(var i=0;i < sockets.length; i++)
                	{
                        sockets[i].emit('news', { hello: data.img });
                	}
        	 }
	});
});



io.sockets.on('end', function(socket){
	var i = sockets.indexOf(socket);
	sockets.delete(i);
});

io.sockets.on('message', function(data){
	sys.puts("got data"+ data);
	if(sockets.length>0)
         {
                for(var i=0;i < sockets.length; i++)
                {
                        sockets[i].emit('news', { hello: data.img });
                }
         }
});



