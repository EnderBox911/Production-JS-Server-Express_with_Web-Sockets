// IMPORTS
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// CONFIGS
const PORT = process.env.PORT || 9999;

app.use(cors({
  origin: "https://production-express-web-sockets-js-server.akmalyahaya.repl.co",
  methods: ["GET", "POST"]
}));

// SERVER
io.on('connect', (socket) => {
  // When connection and reconnection is established
  console.log('\x1b[31mCONNECTION ESTABLISHED\x1b[0m');

  // Send uses on.('message')
  socket.send('Send data');

  // Emit uses the first parameter as the .on('XXXX') and the data sent is the second parameter
  socket.emit('EmitKeyWord', 'Emit MWAHAHAH');

  socket.on('message', (message) => {
    // Print out the data sent by the website
    console.log('\x1b[31mDATA : ' + message + '\x1b[0m');

    // Send back data to the website
    socket.send('Data received from web');
  });

  socket.on('disconnect', () => {
    // When socket is disconnected
    console.log('\x1b[31mCONNECTION TERMINATED\x1b[0m');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/index.html');
});

// 'Opens' the websocket to allow communication
server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
