import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
const clients = new Set();

try {
  wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", function message(data) {
      console.log(`Client: ${data}`);
      for (const client of clients) {
        if (client !== ws && client.readyState == WebSocket.OPEN) {
          client.send(data);
        }
      }
    });

    clients.add(ws);

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected.");
    });
  });
  console.log("Server opened at port %s", PORT);
} catch (e) {
  console.error(e);
}

