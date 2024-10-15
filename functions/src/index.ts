import * as functions from "firebase-functions";
import {WebClient} from "@slack/web-api";
import {readFileSync} from "fs";
import {join} from "path";

const gertie = new WebClient(functions.config().slack.token);
const jitter = new WebClient(functions.config().slack.token1);
// const{PubSub} = require("@google-cloud/pubsub");
// const pubsubClient = new PubSub();

// Read greetings from a text file
const getRandomGreeting = (botName: string) => {
  const greetingsPath = join(__dirname, "textbanks/"+botName+"Random.txt");
  // Filter out empty lines
  const greetings = readFileSync(greetingsPath,
    "utf-8").split("\n").filter(Boolean);
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
};

export const Gertie = functions.https.onRequest(async (req, res) => {
  // Obtain chaneel from request, then respond in that channel
  const {event} = req.body;
  const botName = "gertie";
  try {
    // Pick a random greeting
    const randomGreeting = getRandomGreeting(botName);
    const response = await gertie.chat.postMessage({
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

export const Jitter = functions.https.onRequest(async (req, res) => {
  // Obtain chaneel from request, then respond in that channel
  const {event} = req.body;
  const botName = "jitter";
  try {
  //   // Pick a random greeting
    const randomGreeting = getRandomGreeting(botName);
    const response = await jitter.chat.postMessage({
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
