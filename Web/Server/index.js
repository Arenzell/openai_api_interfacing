const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { exec } = require('child_process');

app.use(express.static('../Client'));

server.listen(3000, () => {
    console.log('listening on *:3000. Open this link in a browser-> http://localhost:3000">');
});



io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
	console.log('user disconnected');
    });

    socket.on('query', (data)=>{
	console.log(data);
	data=data.replaceAll("\\","\\\\");
	data=data.replaceAll("\"","\\\"");
	data=data.replaceAll("'","\'");
	exec('../../davinci.sh'+' '+ JSON.stringify(data), (err, stdout, stderr) => {
	    if (err) {
		console.error(err);
		return;
	    }
	    console.log(stdout);
	    socket.emit('response', stdout);
	});

	
    });

    
    socket.on('img_query', (data)=>{
	console.log(data);
	data=data.replaceAll("\\","\\\\");
	data=data.replaceAll("\"","\\\"");
	data=data.replaceAll("'","\'");
	exec('../../image/image.sh'+' '+ JSON.stringify(data), (err, stdout, stderr) => {
	    if (err) {
		console.error(err);
		return;
	    }
	    console.log(stdout);
	    socket.emit('img_response', stdout);
	});

	
    });
    
});


