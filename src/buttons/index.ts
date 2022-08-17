import { Interaction } from "discord.js";
import ClaimCharacter from "./ClaimCharacter";
class Buttons {
  public async run(interaction: Interaction): Promise<void> {
    if (!interaction.isButton()) return;

    if (ClaimCharacter.isTheCommandOf(interaction)) {
      return await ClaimCharacter.run(interaction);
    }
  }
}

export default Buttons;
