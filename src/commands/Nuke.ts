import { Interaction } from "discord.js";
import Command from "./_Command";
import Characters from "@src/Characters";

class Nuke extends Command {
  command = {
    name: "nuke",
    description: "Nuke the server, undo terraform",
  };

  public run = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    interaction.reply("Nuking...");
    const channels = await interaction.guild.channels.fetch();
    const aliceDmChannels = channels.filter((c) =>
      Object.keys(Characters.dmChannels).includes(c.name)
    );
    for (const channel of aliceDmChannels.values()) {
      channel.name === "general" || (await channel.delete());
    }
    const aliceCluesChannels = channels.filter((c) =>
      Object.keys(Characters.cluesChannels).includes(c.name)
    );
    for (const channel of aliceCluesChannels.values()) {
      channel.name === "general" || (await channel.delete());
    }
    const roles = await interaction.guild.roles.fetch();
    const aliceRoles = roles.filter((r) => Characters.roles.includes(r.name));
    for (const role of aliceRoles.values()) {
      await role.delete();
    }
    await interaction.followUp(":boom:");
  };
}

export default new Nuke();
