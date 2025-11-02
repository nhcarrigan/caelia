/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { DiscordAnalytics } from "@nhcarrigan/discord-analytics";
import {
  Client,
  GatewayIntentBits,
  Events,
} from "discord.js";
import { processButton } from "./modules/processButton.js";
import { processInteraction } from "./modules/processInteraction.js";
import { processMessage } from "./server/processMessage.js";
import { instantiateServer } from "./server/serve.js";
import { logger } from "./utils/logger.js";

const caelia = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const analytics = new DiscordAnalytics(caelia, logger);

caelia.once(Events.ClientReady, () => {
  void logger.log("debug", `Logged in as ${caelia.user?.username ?? "unknown user"}.`);
  analytics.startCron();
});

caelia.on(Events.MessageCreate, (message) => {
  void processMessage(message);
});

caelia.on(Events.InteractionCreate, (interaction) => {
  void analytics.logGatewayEvent(Events.InteractionCreate, { ...interaction });
  if (interaction.isChatInputCommand()) {
    void processInteraction(interaction);
  }
  if (interaction.isButton()) {
    void processButton(interaction);
  }
});

await caelia.login(process.env.BOT_TOKEN);
instantiateServer();
