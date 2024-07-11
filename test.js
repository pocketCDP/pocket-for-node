const API = require("./dist/index");

try {
  const pocketCDP = new API.default({
    apiKey: "API_KEY",
    verbose: true,
    apiURL: "http://localhost:5002",
  });

  pocketCDP.track({ data: "value" });
} catch (e) {
  console.log(e);
}
