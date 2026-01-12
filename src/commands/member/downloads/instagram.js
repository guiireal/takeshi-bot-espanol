import { PREFIX } from "../../../config.js";
import { InvalidParameterError, WarningError } from "../../../errors/index.js";
import { download } from "../../../services/spider-x-api.js";
import { errorLog } from "../../../utils/logger.js";

export default {
  name: "instagram",
  description: "Realizo la descarga de vídeos/reels de Instagram",
  commands: ["instagram", "ig", "inst", "insta"],
  usage: `${PREFIX}instagram https://www.instagram.com/reel/Cx789012345/`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    sendVideoFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!fullArgs.length) {
      throw new InvalidParameterError(
        "¡Necesitas enviar una URL de Instagram!"
      );
    }

    await sendWaitReact();

    if (!fullArgs.includes("instagram.com")) {
      throw new WarningError("¡El enlace no es de Instagram!");
    }

    try {
      const data = await download("instagram", fullArgs);

      if (!data || !data.url) {
        await sendErrorReply("¡No se encontró ningún resultado!");
        return;
      }

      await sendSuccessReact();

      await sendVideoFromURL(data.url);
    } catch (error) {
      errorLog(JSON.stringify(error, null, 2));
      await sendErrorReply(error.message);
    }
  },
};
