import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { play } from "../../../services/spider-x-api.js";

export default {
  name: "play-audio",
  description: "Realizo la descarga de canciones",
  commands: ["play-audio", "play", "pa"],
  usage: `${PREFIX}play-audio MC Hariel`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    sendAudioFromURL,
    sendImageFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!fullArgs.length) {
      throw new InvalidParameterError("¡Necesitas decirme qué deseas buscar!");
    }

    if (fullArgs.includes("http://") || fullArgs.includes("https://")) {
      throw new InvalidParameterError(
        `¡No puedes usar enlaces para descargar canciones! Usa ${PREFIX}yt-mp3 enlace`
      );
    }

    await sendWaitReact();

    const data = await play("audio", fullArgs);

    if (!data) {
      await sendErrorReply("¡No se encontró ningún resultado!");
      return;
    }

    await sendSuccessReact();

    await sendImageFromURL(
      data.thumbnail,
      `*Título*: ${data.title}
        
*Descripción*: ${data.description}
*Duración en segundos*: ${data.total_duration_in_seconds}
*Canal*: ${data.channel.name}`
    );

    await sendAudioFromURL(data.url);
  },
};
