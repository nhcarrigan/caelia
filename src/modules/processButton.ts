/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { logger } from "../utils/logger.js";
import type {
  ButtonInteraction,
} from "discord.js";

/**
 * Handles a slash command. Only responds with the about information,
 * because that's all we need.
 * @param interaction - The interaction payload from Discord.
 */

/**
 * Handles a button interaction. If the user is not the author of the reminder,
 * they cannot acknowledge it.
 * @param interaction - The interaction payload from Discord.
 */
export const processButton = async(
  interaction: ButtonInteraction,
): Promise<void> => {
  try {
    await interaction.deferReply({ ephemeral: true });
    const { customId, user, message } = interaction;
    if (customId !== user.id) {
      await interaction.editReply({
        content: "You cannot acknowledge someone else's reminder.",
      });
    }
    await message.delete();
    await interaction.editReply({
      content: "Acknowledged!",
    });
  } catch (error) {
    if (error instanceof Error) {
      await logger.error("process interaction module", error);
    }
    await interaction.editReply({
      content: "Oh dear, something went wrong.",
    });
  }
};
