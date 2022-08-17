import { Interaction } from "discord.js";

class Command {
  public command: {
    name: string;
    description: string;
  } = { name: "", description: "" };

  public isTheCommandOf = (interaction: Interaction): boolean => {
    if (!interaction.isChatInputCommand()) return;
    return interaction.commandName === this.command.name;
  };
  public run(interaction: Interaction): void {
    throw new Error("Method not implemented.");
  }
}
export default Command;
