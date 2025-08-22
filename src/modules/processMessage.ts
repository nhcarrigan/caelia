/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { markdown } from "alex";
import { MessageFlags, type Message } from "discord.js";
import { replaceCodeBlocks, replaceLinks } from "extra-markdown-text";
import { alexConfig } from "../config/alex.js";
import { logger } from "../utils/logger.js";

/**
 * Checks if a message contains non-inclusive language. If so,
 * provides a suggestion to improve vocabulary.
 * @param message -- The message payload from Discord.
 */
export const processMessage = async(message: Message): Promise<void> => {
  try {
    const { content, author, system } = message;
    if (author.bot || system) {
      return;
    }
    if (content.length <= 0) {
      return;
    }
    const noCodeBlocks = replaceCodeBlocks(content, () => {
      return "";
    });
    const noLinks = replaceLinks(noCodeBlocks, () => {
      return "";
    });
    const matches = markdown(noLinks, alexConfig).messages;
    if (matches.length === 0) {
      return;
    }
    const responses = matches.map((match) => {
      return `- You used the word \`${match.actual ?? "unknown word"}\`. This may not be inclusive language, because: ${match.reason.length > 0
        ? match.reason
        : "I said so."}${match.note === null
        ? ""
        : `-- ${match.note}`}`;
    });

    await message.reply({ components: [
      { content: `Hi darling~! It looks like you may have used some language that is not the most inclusive...\n\n${responses.join("\n")}`,
        type:    10 },
      {
        components: [
          {
            label: "Is this inaccurate? Let us know!",
            style: 5,
            type:  2,
            url:   "https://chat.nhcarrigan.com",
          },
        ],
        type: 1,
      },
    ],
    flags: [ MessageFlags.IsComponentsV2 ] });
  } catch (error) {
    if (error instanceof Error) {
      await logger.error("process message module", error);
    }
  }
};
