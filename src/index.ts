/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  Client,
  GatewayIntentBits,
  Events,
} from "discord.js";
import { processMessage } from "./modules/processMessage.js";
import { instantiateServer } from "./server/serve.js";
import { logger } from "./utils/logger.js";

const caelia = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

caelia.once(Events.ClientReady, () => {
  void logger.log("debug", `Logged in as ${caelia.user?.username ?? "unknown user"}.`);
});

caelia.on(Events.MessageCreate, (message) => {
  void processMessage(message);
});

await caelia.login(process.env.BOT_TOKEN);
instantiateServer();
