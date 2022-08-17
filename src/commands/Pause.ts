import { Interaction } from "discord.js";
import Command from "./_Command";
import Game from "../Game";

class Pause extends Command {
  command = {
    name: "pause",
    description: "Pause the timer",
  };

  public run = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply("Timer paused!");
    Game.pause();
  };
}

export default new Pause();
