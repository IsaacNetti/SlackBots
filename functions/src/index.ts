import * as functions from "firebase-functions";
// import {WebClient} from "@slack/web-api";

// const bot = new WebClient(functions.config().slack.token);
// const{PubSub} = require("@google-cloud/pubsub");
// const pubsubClient = new PubSub();

export const Gertie = functions.https.onRequest(async (req, res) =>{
  // Obtain event and make sure it is the proper event, then respond
  const event = req.body.event;
  if (event && event.type === "app_mention") {
    const response ="Me and my 482 cats say hello";
    const slackMessage = {
      text: response,
      channel: event.channel,
    };

    res.status(200).send(slackMessage);
  } else {
    res.status(200).send({message: "event received but not processed"});
  }
});

