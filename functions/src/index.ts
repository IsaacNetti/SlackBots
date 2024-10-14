import * as functions from "firebase-functions";
import {WebClient} from "@slack/web-api";

const bot = new WebClient(functions.config().slack.token);
// const{PubSub} = require("@google-cloud/pubsub");
// const pubsubClient = new PubSub();

export const Gertie = functions.https.onRequest(async (req, res) => {
  // Obtain chaneel from request, then respond in that channel
  const {event} = req.body;
  try {
    const response = await bot.chat.postMessage({
      channel: event.channel,
      text: "Hello world",
    });
    console.log("Message sent", response.ts);
  } catch (error) {
    console.error("error sending message", error);
  }
  res.sendStatus(200);
});
