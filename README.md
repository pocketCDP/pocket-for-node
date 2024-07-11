# Library for server actions to interact with your pocketCDP account

## Getting started

```bash

npm install pocketcdp

```

## Usage

```javascript
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
```

TODOs:

- [ ] Get event type definitions.
- [ ] Add the event type definiton endpoint to the public-API.
