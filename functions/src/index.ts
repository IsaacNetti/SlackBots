import * as functions from "firebase-functions";
import {WebClient} from "@slack/web-api";
import {readFileSync} from "fs";
import {join} from "path";

const bot = new WebClient(functions.config().slack.token);
// const{PubSub} = require("@google-cloud/pubsub");
// const pubsubClient = new PubSub();

// Read greetings from a text file
const getRandomGreeting = () => {
  const greetingsPath = join(__dirname, "textbanks/gertieRandom.txt");
  // Filter out empty lines
  const greetings = readFileSync(greetingsPath,
    "utf-8").split("\n").filter(Boolean);
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
};

export const Gertie = functions.https.onRequest(async (req, res) => {
  // Obtain chaneel from request, then respond in that channel
  const {event} = req.body;
  try {
    // Pick a random greeting
    const randomGreeting = getRandomGreeting();
    const response = await bot.chat.postMessage({
      channel: event.channel,
      text: randomGreeting,
    });
    console.log("Message sent", response.ts);
  } catch (error) {
    console.log("Current directory:", __dirname);
    console.error("error sending message", error);
  }
  res.sendStatus(200);
});
