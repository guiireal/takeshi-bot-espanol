import { delay } from "baileys";
import fs from "node:fs";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";
import { getBuffer } from "../../../utils/index.js";

export default {
  name: "enviar-imagen-de-buffer",
  description: "Ejemplo de como enviar uma imagen a partir de um buffer",
  commands: ["enviar-imagen-de-buffer"],
  usage: `${PREFIX}enviar-imagen-de-buffer`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendImageFromBuffer, sendReact, userLid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply(
      "Voy enviar uma imagen a partir de um buffer de archivo local"
    );

    await delay(3000);

    const imageBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-image.jpg")
    );

    await sendImageFromBuffer(
      imageBuffer,
      "Esta es uma imagen de um buffer de archivo local"
    );

    await delay(3000);

    await sendReply("Ahora voy enviar uma imagen a partir de um buffer de URL");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg"
    );

    await sendImageFromBuffer(
      urlBuffer,
      "Esta es uma imagen de um buffer de URL"
    );

    await delay(3000);

    await sendReply("Tú también pode enviar imágenes de buffer sem legenda");

    await delay(3000);

    await sendImageFromBuffer(urlBuffer);

    await delay(3000);

    await sendReply("Ahora voy enviar uma imagen de buffer mencionando tú:");

    await delay(3000);

    await sendImageFromBuffer(
      urlBuffer,
      `Tá ai a imagen @${userLid.split("@")[0]}!`,
      [userLid]
    );

    await delay(3000);

    await sendReply(
      "Para enviar imágenes de buffer, use a función sendImageFromBuffer(buffer, caption, [mentions], quoted).\n\n" +
        "Isso é útil quando tú tem imágenes processadas em memória ou precisa manipular a imagen antes de enviar."
    );
  },
};
