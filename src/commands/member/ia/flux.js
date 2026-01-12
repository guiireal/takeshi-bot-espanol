import { PREFIX } from "../../../config.js";
import { imageAI } from "../../../services/spider-x-api.js";

export default {
  name: "flux",
  description: "Crea una imagen usando la IA Flux",
  commands: ["flux"],
  usage: `${PREFIX}flux descripción`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendImageFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args[0]) {
      return sendWarningReply(
        "Necesitas proporcionar una descripción para la imagen."
      );
    }

    await sendWaitReply("Generando imagen...");

    const data = await imageAI(fullArgs);

    if (!data?.image) {
      return sendWarningReply(
        "¡No fue posible generar la imagen! Inténtalo de nuevo más tarde."
      );
    }

    await sendSuccessReact();
    await sendImageFromURL(data.image);
  },
};
