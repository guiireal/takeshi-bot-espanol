import { PREFIX } from "../../../config.js";
import { InvalidParameterError, WarningError } from "../../../errors/index.js";
import { download } from "../../../services/spider-x-api.js";
import { errorLog } from "../../../utils/logger.js";

export default {
  name: "tik-tok-audio",
  description: "Descargo de audios de videos do TikTok",
  commands: [
    "tik-tok-audio",
    "tik-tok-mp3",
    "tik-audio",
    "tik-mp3",
    "ttk-audio",
    "ttk-mp3",
  ],
  usage: `${PREFIX}tik-tok-audio https://www.tiktok.com/@topicoquiz/video/7384803418855984389`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    sendAudioFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!fullArgs.length) {
      throw new InvalidParameterError("Debes enviar uma URL do TikTok!");
    }

    await sendWaitReact();

    if (!fullArgs.includes("tiktok")) {
      throw new WarningError("El enlace no es do TikTok!");
    }

    try {
      const data = await download("tik-tok-audio", fullArgs);

      if (!data) {
        await sendErrorReply("¡No se encontraron resultados!");
        return;
      }

      await sendSuccessReact();

      await sendAudioFromURL(data.download_link);
    } catch (error) {
      errorLog(JSON.stringify(error, null, 2));
      await sendErrorReply(error.message);
    }
  },
};

