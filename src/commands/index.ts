import { Interaction } from "discord.js";
import Start from "./Start";
import Pause from "./Pause";
import Terraform from "./Terraform";
import Nuke from "./Nuke";
import Setup from "./Setup";
import Command from "./_Command";

class Commands {
  get list(): Array<Command["command"]> {
    return [
      Start.command,
      Pause.command,
      Setup.command,
      Terraform.command,
      Nuke.command,
    ];
  }

  public async run(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    if (Start.isTheCommandOf(interaction)) {
      return await Start.run(interaction);
    }
    if (Pause.isTheCommandOf(interaction)) {
      return await Pause.run(interaction);
    }
    if (Setup.isTheCommandOf(interaction)) {
      return await Setup.run(interaction);
    }
    if (Terraform.isTheCommandOf(interaction)) {
      return await Terraform.run(interaction);
    }
    if (Nuke.isTheCommandOf(interaction)) {
      return await Nuke.run(interaction);
    }
  }
}

export default Commands;
