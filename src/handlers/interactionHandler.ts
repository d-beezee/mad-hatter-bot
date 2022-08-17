import { Interaction } from "discord.js";
import Commands from "@src/commands";
import Buttons from "@src/buttons";

const handler = async (interaction: Interaction) => {
  const commandHandler = new Commands();
  commandHandler.run(interaction);
  const buttonHandler = new Buttons();
  buttonHandler.run(interaction);
};
export default handler;
