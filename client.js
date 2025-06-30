const readline = require("node:readline");

const link = "http://localhost:3000/";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askAction = () => {
  return new Promise((resolve) => {
    rl.question("Pick an action: ", resolve);
  });
};

async function main() {
  console.log("Starting...");
  try {
    const response = await fetch(link);
    const data = response.text();
    console.log("Server response: ", data);

    const action = await askAction();
    console.log("Action Taken: ", action);
  } catch (error) {
    console.log(error);
    rl.close();
  }
}

main();
