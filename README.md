# Production-JS-Server-Express_with_Web-Sockets
A Template for a basic web server using Node.js and the Express module.

# Documentation Overview

### Table of Contents

1. [Introduction](#introduction)
2. [Dependencies](#dependencies)
3. [Configuration](#configuration)
4. [Socket Events](#socket-events)
   - [connect](#connect)
   - [message](#message)
   - [disconnect](#disconnect)
5. [HTTP Routes](#http-routes)
6. [WebSocket Server](#websocket-server)
7. [Usage](#usage)
8. [License](#license)

## Introduction

This documentation provides an overview of a Node.js server using Express and Socket.io to establish a WebSocket connection. The server allows bidirectional communication between clients and the server over a WebSocket connection. The code snippet demonstrates the server setup, configuration, and handling of WebSocket events.

## Dependencies

The server relies on the following Node.js packages:

- **express:** A minimal and flexible Node.js web application framework.
- **http:** Node.js module for handling HTTP requests and responses.
- **socket.io:** A library for real-time web applications, enabling real-time, bidirectional, and event-based communication.

```bash
npm install express http socket.io
```

## Configuration

The server is configured to run on a specified port (`PORT`). It utilizes the `cors` middleware to allow cross-origin requests only from a specific origin.

```javascript
const PORT = process.env.PORT || 9999;

app.use(cors({
  origin: "https://production-express-web-sockets-js-server.akmalyahaya.repl.co",
  methods: ["GET", "POST"]
}));
```

## Socket Events

### connect

The `connect` event is triggered when a client establishes or re-establishes a connection to the server. It logs a message to the console indicating that the connection is established.

### message

The `message` event is triggered when the server receives a message from a client. It logs the received data to the console and sends a response back to the client.

### disconnect

The `disconnect` event is triggered when a client disconnects from the server. It logs a message to the console indicating that the connection is terminated.

## HTTP Routes

The server defines an HTTP route that serves an HTML file when a client accesses the root URL ("/"). The HTML file is located in the "templates" directory.

```javascript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/index.html');
});
```

## WebSocket Server

The server creates an HTTP server using Express and integrates Socket.io to establish WebSocket connections. The `io` object handles WebSocket events.

```javascript
const server = http.createServer(app);
const io = new Server(server);

io.on('connect', (socket) => {
  // WebSocket event handling goes here
});

server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
```

## Usage

To run the server, ensure that Node.js is installed, and install the required packages using npm. Then execute the following command:

```bash
node your_server_file.js
```

Replace `your_server_file.js` with the filename containing the provided code.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
