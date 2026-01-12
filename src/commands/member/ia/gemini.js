import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { gemini } from "../../../services/spider-x-api.js";

export default {
  name: "gemini",
  description: "¡Usa la inteligencia artificial de Google Gemini!",
  commands: ["gemini", "takeshi"],
  usage: `${PREFIX}gemini ¿cómo se hace una canoa?`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendSuccessReply, sendWaitReply, args }) => {
    const text = args[0];

    if (!text) {
      throw new InvalidParameterError("¡Necesitas decirme qué debo responder!");
    }

    await sendWaitReply();

    const responseText = await gemini(text);

    await sendSuccessReply(responseText);
  },
};
