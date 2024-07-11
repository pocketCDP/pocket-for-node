import fetch from "node-fetch";

const identifyEndpoint = "/api/Identify";
const trackEndpoint = "/api/Tracking";

const identifyStandardKeys = [
  "friendlyUserId",
  "email",
  "phone",
  "firstName",
  "lastName",
  "countryIsoCode2",
  "acceptedEmailCommunications",
  "languageCode",
  "metadata",
];

const separateStandardKeys = (data: any) => {
  const standardData: any = {};
  const customData: any = {};
  Object.keys(data).forEach((key) => {
    if (identifyStandardKeys.includes(key)) {
      standardData[key] = data[key];
    } else {
      customData[key] = data[key];
    }
  });
  return { ...standardData, customUserProperties: JSON.stringify(customData) };
};

type APIOptions = {
  apiKey: string;
  apiURL?: string;
  accountId: string;
  sourceId: string;
  verbose?: boolean;
};
class API {
  private apiKey: string;
  verbose = false;
  accountId: string;
  sourceId: string;

  private apiURL: string;

  constructor(options: APIOptions) {
    if (!options || !options.accountId) {
      throw new Error("You must provide a config object");
    }
    this.apiKey = options.apiKey;
    this.sourceId = options.sourceId;
    this.accountId = options.accountId;
    this.verbose = options.verbose || false;
    this.apiURL = options.apiURL || "https://api-dev.pocketcdp.com";
  }

  async track(data: any) {
    try {
      const endpoint = `${this.apiURL}${trackEndpoint}`;
      if (this.verbose) {
        console.log(endpoint, "| Track data ", data);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "POCKET-ACCOUNT-Id": this.accountId,
          "POCKET-SOURCE-SECRET-KEY": this.apiKey,
        },
        body: JSON.stringify(separateStandardKeys(data)),
      });
      if (!response.ok) {
        const parsedResponse = await response.text();
        throw new Error(`Error in track", ${parsedResponse}`);
      }
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (e) {
      console.error("Error in track", e);
      return "error in track";
    }
  }

  async identify(data: {
    friendlyUserId?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    userId?: string | null;
    deviceId?: string;
    countryIsoCode2?: string;
    acceptedEmailCommunications?: boolean;
    languageCode?: string;
    metadata?: any;
    customUserProperties?: any;
  }) {
    // TODO: Check the incoming keys in data, when are standard, pass them into the standard object, if not, stringify and send them via customUserProperties...

    try {
      const endpoint = `${this.apiURL}${identifyEndpoint}`;
      if (this.verbose) {
        console.log(endpoint, "| Identify data ", data);
      }

      const payload = {
        id: data.userId,
        sourceId: this.sourceId,
        userId: data.userId,
        deviceId: data.deviceId,
        userProperties: data,
        customUserProperties: JSON.stringify(data.customUserProperties),
      };

      if (!payload.userId || payload.userId === "") {
        delete payload.id;
        delete payload.userId;
      }

      if (!payload.deviceId || payload.deviceId === "") {
        delete payload.deviceId;
      }

      if (payload.userProperties.deviceId) {
        delete payload.userProperties.deviceId;
      }
      if (payload.userProperties.userId !== undefined) {
        delete payload.userProperties.userId;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "POCKET-ACCOUNT-ID": this.accountId,
          "Content-Type": "application/json",
          "POCKET-SOURCE-SECRET-KEY": this.apiKey,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const parsedResponse = await response.text();
        console.error(parsedResponse);
        throw new Error(`Error in indentify`);
      }
      const parsedResponse = await response.json();

      return { userId: parsedResponse as string };
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}

export default API;
