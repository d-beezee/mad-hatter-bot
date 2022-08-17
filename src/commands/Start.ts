import { Interaction } from "discord.js";
import Command from "./_Command";
import Game from "../Game";

class Start extends Command {
  command = {
    name: "start",
    description: "Start the timer",
  };

  public run = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply("Timer started!");
    Game.start();
  };
}

export default new Start();
