import { PREFIX } from "../../../config.js";
import { InvalidParameterError, WarningError } from "../../../errors/index.js";
import { xTwitter } from "../../../services/spider-x-api.js";
import { errorLog } from "../../../utils/logger.js";

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|mkv)(\?|$)/i;

export default {
  name: "x-twitter",
  description: "Descargo de videos ou imágenes do X (Twitter)",
  commands: ["x-twitter", "xtwitter", "twitter", "x"],
  usage: `${PREFIX}xtwitter https://x.com/usuario/status/1234567890`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    sendVideoFromURL,
    sendImageFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!fullArgs.length) {
      throw new InvalidParameterError(
        "Debes enviar uma URL do X (Twitter)!",
      );
    }

    await sendWaitReact();

    if (!fullArgs.includes("x.com") && !fullArgs.includes("twitter.com")) {
      throw new WarningError("El enlace no es do X (Twitter)!");
    }

    try {
      const data = await xTwitter(fullArgs);

      if (!data || !data.url) {
        await sendErrorReply("¡No se encontraron resultados!");
        return;
      }

      await sendSuccessReact();

      if (VIDEO_EXTENSIONS.test(data.url)) {
        await sendVideoFromURL(data.url);
        return;
      }

      await sendImageFromURL(data.url);
    } catch (error) {
      errorLog(JSON.stringify(error, null, 2));
      await sendErrorReply(error.message);
    }
  },
};
