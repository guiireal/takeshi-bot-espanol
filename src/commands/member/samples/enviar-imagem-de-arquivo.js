import { delay } from "baileys";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";

export default {
  name: "enviar-imagen-de-archivo",
  description: "Ejemplo de como enviar uma imagen a partir de um archivo local",
  commands: ["enviar-imagen-de-archivo"],
  usage: `${PREFIX}enviar-imagen-de-archivo`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendImageFromFile, sendReact, userLid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply("Voy enviar uma imagen a partir de um archivo local");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg"),
      "Esta es uma legenda opcional para a imagen"
    );

    await delay(3000);

    await sendReply("Tú también pode enviar imágenes sem legenda:");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg")
    );

    await delay(3000);

    await sendReply("Ou usar outras imágenes do projeto:");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      "Logo do Takeshi Bot!"
    );

    await delay(3000);

    await sendReply("Ahora voy enviar uma imagen de archivo mencionando tú:");

    await delay(3000);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      `Logo do Takeshi Bot para tú @${userLid.split("@")[0]}!`,
      [userLid]
    );

    await delay(3000);

    await sendReply(
      "Para enviar imágenes de archivo, use a función sendImageFromFile(filePath, caption, [mentions], quoted).\n\n" +
        "Isso é útil quando tú tem imágenes armazenadas localmente no servidor."
    );
  },
};
