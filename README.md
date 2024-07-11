# Library for server actions to interact with your pocketCDP account

## Getting started

```bash
npm i @pocketcdp/pocket-for-node
```

## Usage

```javascript

import PocketCDP from "pocketcdp";

const pocketCDP = new PocketCDP({
  apiKey: process.env.POCKET_API_BACKEND_KEY,
  // verbose: true,
  accountId: process.env.POCKET_API_ACCOUNT_ID,
  sourceId: process.env.POCKET_API_SOURCE_ID,
});

try {
  responseFromPocket = await pocketCDP.identify({
    email: email as string,
    deviceId: pocketContext?.pocketClient,
    acceptedEmailCommunications: true,
    customUserProperties: {
      "subscribed-to-beta-waitlist": "true",
    },
  });
} catch (e) {
  console.info("Error in identify", e);
}
```
