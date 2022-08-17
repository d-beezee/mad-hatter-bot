import {
  Guild,
  Interaction,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
import Command from "./_Command";
import Characters from "@src/Characters";

class Terraform extends Command {
  command = {
    name: "terraform",
    description: "Terraform server",
  };

  public run = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply({
      content: "Terraforming...",
    });

    await this.createRoles(interaction.guild);
    await this.createChannels(interaction.guild);

    await interaction.followUp({
      content: "Terraformed!",
    });
  };

  private createRoles = async (guild: Guild) => {
    const guildRoles = await guild.roles.fetch();
    for (const name of Characters.roles) {
      if (!guildRoles.find((r) => r.name === name)) {
        await guild.roles.create({
          name,
        });
      }
    }
  };

  private createChannels = async (guild: Guild) => {
    const guildChannels = await guild.channels.fetch();
    const guildRoles = await guild.roles.fetch();

    await createCluesChannels();
    await createDmChannels();

    return;
    async function createCluesChannels() {
      const cluesChannels = Characters.cluesChannels;
      for (const channel in cluesChannels) {
        if (!guildChannels.find((c) => c.name === channel)) {
          const channelObject = await guild.channels.create({
            name: channel,
            permissionOverwrites: [
              {
                id: guild.id,
                deny: [
                  PermissionFlagsBits.ViewChannel,
                  PermissionFlagsBits.SendMessages,
                ],
              },
              {
                id: guildRoles.find(
                  (r) => r.name === cluesChannels[channel].role
                ),
                allow: [PermissionFlagsBits.ViewChannel],
              },
            ],
          });
          (guild.channels.cache.get(channelObject.id) as TextChannel).send({
            files: [
              "./src/resources/images/it/cards/characters/" +
                cluesChannels[channel].role +
                ".png",
            ],
          });

          console.log(channelObject);
        }
      }
    }
    async function createDmChannels() {
      const dmChannels = Characters.dmChannels;
      for (const channelName in dmChannels) {
        if (!guildChannels.find((c) => c.name === channelName)) {
          await guild.channels.create({
            name: channelName,
            permissionOverwrites: [
              {
                id: guild.id,
                deny: [PermissionFlagsBits.ViewChannel],
              },
              {
                id: guildRoles.find(
                  (r) => r.name === dmChannels[channelName].firstRole
                ),
                allow: [PermissionFlagsBits.ViewChannel],
              },
              {
                id: guildRoles.find(
                  (r) => r.name === dmChannels[channelName].secondRole
                ),
                allow: [PermissionFlagsBits.ViewChannel],
              },
            ],
          });
        }
      }
    }
  };
}

export default new Terraform();
