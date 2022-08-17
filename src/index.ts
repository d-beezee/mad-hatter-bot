import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import interactionHandler from "./handlers/interactionHandler";

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log(client.eventNames());
});

client.on("interactionCreate", interactionHandler);
client.login(process.env.TOKEN);
