# Production-JS-Server-Express_with_Web-Sockets
A Template for a basic web server using Node.js and the Express module.

# Documentation Overview

### Table of Contents

1. [Introduction](#introduction)
2. [Dependencies](#dependencies)
3. [Configuration](#configuration)
4. [Socket Events](#socket-events)
   - [connect](#connect-event)
   - [message](#message-event)
   - [disconnect](#disconnect-event)
5. [HTTP Routes](#http-routes)
   - [HTML and JavaScript in the Client](#html-and-javascript-in-the-client)
7. [WebSocket Server](#websocket-server)
8. [Usage](#usage)
9. [License](#license)

## Introduction

This documentation provides an overview of a Node.js server using Express and Socket.io to establish a WebSocket connection. The server allows bidirectional communication between clients and the server over a WebSocket connection. The code snippet demonstrates the server setup, configuration, and handling of WebSocket events.

## Dependencies

The server relies on the following Node.js packages:

- **express:** A minimal and flexible Node.js web application framework.
- **http:** Node.js module for handling HTTP requests and responses.
- **socket.io:** A library for real-time web applications, enabling real-time, bidirectional, and event-based communication.

```bash
npm install express http socket.io
npm install cors
```

## Configuration

The server is configured to run on a specified port (`PORT`). It utilizes the `cors` middleware to allow cross-origin requests only from a specific origin.

Server:
```javascript
// CONFIGS
const PORT = process.env.PORT || 9999;

app.use(cors({
  origin: "https://production-express-web-sockets-js-server.akmalyahaya.repl.co",
  methods: ["GET", "POST"]
}));
```

## Socket Events

### `connect` Event

Server:
```javascript
io.on('connect', (socket) => {
   // Routing code

   // 'Opens' the websocket to allow communication
   server.listen(PORT, () => {
     console.log('Server is running on port ' + PORT);
});
```
Client:
```javascript
socket.on('connect', () => {
  // When connection is established
  console.log('Connection established');

  // Send a message to the server
  socket.send('Hello, server!');
});
```

- This event is triggered when a client establishes or re-establishes a connection to the server.
- It logs a message to the console indicating that the connection is established.
- The client sends a message to the server using `socket.send('Hello, server!')`.

### `message` Event
Server:
```javascript
socket.on('message', (message) => {
    // Print out the data sent by the website
    console.log('\x1b[31mDATA : ' + message + '\x1b[0m');

    // Send back data to the website
    socket.send('Data received from web');
  });
```
Client:
```javascript
socket.on('message', (message) => {
  $('#messages').append($('<p>').text(message));
  console.log('Server says:', message);
});
```

- The `message` event is triggered when the server sends a message to the client using `socket.send()`.
- The client appends the received message to the HTML element with the ID "messages" and logs the message to the console.

### `EmitKeyWord` Event
Server:
```javascript
// Emit uses the first parameter as the .on('XXXX') and the data sent is the second parameter
socket.emit('EmitKeyWord', 'Emit MWAHAHAH');
```
Client:
```javascript
socket.on('EmitKeyWord', (data) => {
  console.log('Received custom event:', data);
});
```

- The `EmitKeyWord` event is triggered when the server emits a custom event named "EmitKeyWord" using `socket.emit('EmitKeyWord', 'Emit MWAHAHAH')`.
- The client listens for this event and logs the received data to the console.

### `disconnect` Event
Server:
```javascript
socket.on('disconnect', () => {
 // When socket is disconnected
 console.log('\x1b[31mCONNECTION TERMINATED\x1b[0m');
});
```
Client:
```javascript
socket.on('disconnect', () => {
  console.log('Connection terminated');
});
```

- The `disconnect` event is triggered when a client disconnects from the server.
- It logs a message to the console indicating that the connection is terminated.

## HTTP Routes

The server defines an HTTP route that serves an HTML file when a client accesses the root URL ("/"). The HTML file is located in the "templates" directory.

Server:
```javascript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/index.html');
});
```

### HTML and JavaScript in the Client

The provided HTML file includes JavaScript code that uses Socket.io to establish a WebSocket connection and interact with the server.

- **Socket.io Library Inclusion:**
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.4/socket.io.js"></script>
  ```
  This script tag includes the Socket.io library from a CDN, making it available for use in the client-side JavaScript.

- **jQuery Library Inclusion:**
  ```html
  <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
  ```
  jQuery is included to simplify DOM manipulation and event handling in the client-side code.

- **Client-Side JavaScript:**
  ```javascript
  $(document).ready(function() {
    const socket = io();

    // ... (Socket event listeners and client-side logic)

    $('#push_data').on('click', function () {
      console.log('PUSHED');
      socket.send("Button has been pushed!");
    });
  });
  ```
  - The `$(document).ready()` function ensures that the JavaScript code executes when the document is fully loaded.
  - `const socket = io();` creates a Socket.io instance and establishes a WebSocket connection to the server.
  - Event listeners (`socket.on()`) handle various socket events, and the client can send messages to the server using `socket.send()`.

- **HTML Elements:**
  ```html
  <div id="messages" class="scroll">
    Messages received:
  </div>

  <button type="button" id="push_data" theme='dark'>Push</button>
  ```
  - A `<div>` with the ID "messages" is used to display messages received from the server.
  - A `<button>` with the ID "push_data" triggers the sending of a message to the server when clicked.

This client-side code creates a simple interface that allows interaction with the server through WebSocket communication. Messages received from the server are displayed, and the button click triggers a message to be sent to the server.


## WebSocket Server

The server creates an HTTP server using Express and integrates Socket.io to establish WebSocket connections. The `io` object handles WebSocket events.

Server:
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connect', (socket) => {
  // WebSocket event handling 
});

server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
```

## Usage

To run the server, ensure that Node.js is installed, and install the required packages using npm. Then execute the following command:

```bash
node index.js
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
