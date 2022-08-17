import {
  ActionRowBuilder,
  ButtonBuilder,
  Interaction,
  ButtonStyle,
} from "discord.js";
import Command from "./_Command";
import ClaimCharacter from "@src/buttons/ClaimCharacter";

class Setup extends Command {
  command = {
    name: "setup",
    description: "Setup characters",
  };

  public run = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply({
      content: "Scegli un personaggio!",
      components: [ClaimCharacter.buttons()],
    });
  };
}

export default new Setup();
