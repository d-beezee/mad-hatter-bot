import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Interaction,
} from "discord.js";
import Characters from "@src/Characters";

const characters = [
  { name: "Charlie" },
  { name: "Dakota" },
  { name: "Evan" },
  { name: "Julia" },
  { name: "Jack" },
];
class ClaimCharacter {
  private claimedCharacters: string[] = [];
  get characters() {
    return Characters.list;
  }

  buttons() {
    if (this.characters.length === 0) return null;
    const row = new ActionRowBuilder() as ActionRowBuilder<ButtonBuilder>;
    for (const character of this.characters) {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(character.id)
          .setLabel(character.name)
          .setStyle(ButtonStyle.Primary)
      );
    }
    return row;
  }

  isTheCommandOf(interaction: Interaction) {
    if (!interaction.isButton()) return false;
    return this.characters.find(
      (character) => interaction.customId === character.id
    );
  }

  async run(interaction: Interaction) {
    if (!interaction.isButton()) return;
    const character = Characters.fetch(interaction.customId);
    Characters.claim(interaction.customId);
    if (this.characters.length === 0) {
      await interaction.message.delete();
      await interaction.reply(character.name + " claimed!");
    } else {
      await interaction.update({ components: [this.buttons()] });
      await interaction.followUp(character.name + " claimed!");
    }
  }
}

export default new ClaimCharacter();
