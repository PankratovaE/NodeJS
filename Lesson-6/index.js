const io = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = http.createServer((request, response) => {
    if (request.method === 'GET') {
          
      const filePath = path.join(__dirname, 'index.html');
  
      readStream = fs.createReadStream(filePath);
  
      readStream.pipe(response);
    } else if (request.method === 'POST') {
      let data = '';
  
      request.on('data', chunk => {
      data += chunk;
      });
  
      request.on('end', () => {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
  
        response.writeHead(200, { 'Content-Type': 'json'});
        response.end(data);
      });
    } else {
        response.statusCode = 405;
        response.end();
    }
  });

    const socket = io(app);
    const allClients = [];
    socket.on('connection', function (socket) {
        console.log('New connection');
        allClients.push(socket.id);
        const name = socket.id
        socket.on('CLIENT_MSG', (data) => {
                
            // socket.emit('SERVER_MSG', { msg: data.msg.split('').reverse().join('')});
            socket.emit('SERVER_MSG', { msg: `${name}:  ${data.msg}`});

            socket.broadcast.emit('SERVER_MSG', { msg: `${name}:  ${data.msg}`});

        });
        socket.emit('NEW_CONN_EVENT', { msg: `You are connected. Your name is ${name}. Now connect ${allClients.length} clients`});

        socket.broadcast.emit('NEW_CONN_EVENT', { msg: `The new client ${name} connected. Now connect ${allClients.length} clients`});
        socket.on('disconnect', function() {
            console.log('Got disconnect!');

            let i = allClients.indexOf(socket.id);
            allClients.splice(i, 1);

            socket.broadcast.emit('DISCONNECT', { msg: `The client ${name} disconnected. Now connect ${allClients.length} clients` });

        });
    });




app.listen(3000, 'localhost');