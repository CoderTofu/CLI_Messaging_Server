import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
const clients = new Map();
let curClientID = 0;

try {
  wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", function message(data) {
      const senderID = clients.get(ws);
      console.log(`Client ${senderID}: ${data}`);
      for (const [client, id] of clients) {
        if (client !== ws && client.readyState == WebSocket.OPEN) {
          client.send(`Client ${id}: ${data}`);
        }
      }
    });

    console.log(`Client ${curClientID} connected`);
    clients.set(ws, curClientID);
    curClientID += 1;

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected.");
    });
  });
  console.log("Server opened at port %s", PORT);
} catch (e) {
  console.error(e);
}

