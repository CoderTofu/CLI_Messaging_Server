import WebSocket from "ws";
import readline from "node:readline";

const ws = new WebSocket("ws://localhost:8080/");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

try {
  ws.on("open", () => {
    console.log("Connected to server.");
    rl.prompt();
    rl.on("line", (userMsg) => {
      ws.send(userMsg);
      rl.prompt();
    });
  });

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    console.log(`${data}`);
    rl.prompt();
  });

  ws.on("close", () => {
    console.log("Disconnected from server.");
    rl.close();
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err.message);
  });
} catch (error) {
  console.log("Server error...");
}
