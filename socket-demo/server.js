import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });

const clients = new Set();

server.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // 모든 클라이언트에게 메시지 브로드캐스트
    for (const client of clients) {
      if (client.readyState === ws.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
