/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  type ChatInputCommandInteraction,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageFlags,
} from "discord.js";
import { logger } from "../utils/logger.js";

/**
 * Handles a slash command. Only responds with the about information,
 * because that's all we need.
 * @param interaction - The interaction payload from Discord.
 */
// eslint-disable-next-line max-lines-per-function -- Mostly components.
export const processInteraction = async(
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
  try {
    const components = [
      new ContainerBuilder().
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("# About Caelia"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "Hi there~! I am Caelia, a bot that gives you gentle reminders when you use language that is not inclusive.",
          ),
        ).
        addSeparatorComponents(
          new SeparatorBuilder().
            setSpacing(SeparatorSpacingSize.Small).
            setDivider(true),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("## What can I do?"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "This is super duper quick! All you need to do is add me to your server, give me access to see messages and respond in channels you want me to monitor, and I will take care of the rest~!",
          ),
        ).
        addSeparatorComponents(
          new SeparatorBuilder().
            setSpacing(SeparatorSpacingSize.Small).
            setDivider(true),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("## What if I need help?"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "My deepest apologies if I have made a mistake! Please reach out to us in our Discord server and we will do our best to assist you.",
          ),
        ),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().
          setStyle(ButtonStyle.Link).
          setLabel("Discord Server").
          setURL("https://chat.nhcarrigan.com"),
      ),
    ];
    await interaction.reply({
      components: components,
      flags:      MessageFlags.IsComponentsV2,
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
