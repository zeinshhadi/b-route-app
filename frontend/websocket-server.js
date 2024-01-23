const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 5000 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Handle your logic here based on the received message
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on port 5000");
