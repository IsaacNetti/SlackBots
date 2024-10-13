import * as functions from "firebase-functions";
import {WebClient} from "@slack/web-api";

const bot = new WebClient(functions.config().slack.token);
// const{PubSub} = require("@google-cloud/pubsub");
// const pubsubClient = new PubSub();

export const Gertie = functions.https.onRequest(async (req, res) => {
  // Obtain event and make sure it is the proper event, then respond
  // const message = req.body;
  // console.log(message);
  try {
    const response = await bot.chat.postMessage({
      channel: "#general",
      text: "Hello world",
    });
    console.log("Message sent", response.ts);
  } catch (error) {
    console.error("error sending message", error);
  }
  res.sendStatus(200);
});

