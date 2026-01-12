import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { gpt5Mini } from "../../../services/spider-x-api.js";

export default {
  name: "gpt-5-mini",
  description: "¡Usa la inteligencia artificial GPT-5 Mini!",
  commands: ["gpt-5-mini", "gpt-5", "gpt"],
  usage: `${PREFIX}gpt-5-mini ¿cuál es el sentido de la vida?`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendSuccessReply, sendWaitReply, args }) => {
    const text = args[0];

    if (!text) {
      throw new InvalidParameterError("¡Necesitas decirme qué debo responder!");
    }

    await sendWaitReply();

    const responseText = await gpt5Mini(text);

    await sendSuccessReply(responseText);
  },
};
