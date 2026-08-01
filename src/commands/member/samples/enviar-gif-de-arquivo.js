import { delay } from "baileys";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";

export default {
  name: "enviar-gif-de-archivo",
  description: "Ejemplo de como enviar gifs a partir de archivos locais",
  commands: ["enviar-gif-de-archivo"],
  usage: `${PREFIX}enviar-gif-de-archivo`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendGifFromFile, sendReact, userLid }) => {
    await sendReact("🎬");

    await delay(3000);

    await sendReply("Voy enviar gifs a partir de archivos locais");

    await delay(3000);

    await sendGifFromFile(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));

    await delay(3000);

    await sendReply("Ahora com legenda:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "Este es um gif com legenda!"
    );

    await delay(3000);

    await sendReply("Ahora mencionando tú:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      `Olá @${userLid.split("@")[0]}! Este gif é para tú!`,
      [userLid]
    );

    await delay(3000);

    await sendReply("E ahora sem responder em cima da sua mensaje:");

    await delay(3000);

    await sendGifFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "Gif sem reply/menção na mensaje",
      null,
      false
    );

    await delay(3000);

    await sendReply(
      "Para enviar imágenes de archivo, use a función sendGifFromFile(url, caption, [mentions], quoted).\n\n" +
        "Isso é útil quando tú tem gifs armazenados localmente no servidor."
    );
  },
};
