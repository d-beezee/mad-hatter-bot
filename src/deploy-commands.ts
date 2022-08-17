import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import Commands from "./commands";

dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: new Commands().list,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
