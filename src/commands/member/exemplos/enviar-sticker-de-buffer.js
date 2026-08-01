import { delay } from "baileys";
import fs from "node:fs";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";
import { getBuffer } from "../../../utils/index.js";

export default {
  name: "enviar-sticker-de-buffer",
  description: "Ejemplo de como enviar um sticker a partir de um buffer",
  commands: ["enviar-sticker-de-buffer"],
  usage: `${PREFIX}enviar-sticker-de-buffer`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendReact, sendStickerFromBuffer }) => {
    await sendReact("🏷️");

    await delay(3000);

    await sendReply(
      "Voy enviar um sticker a partir de um buffer de archivo local"
    );

    await delay(3000);

    const stickerBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await sendStickerFromBuffer(stickerBuffer);

    await delay(3000);

    await sendReply(
      "Ahora voy enviar um sticker a partir de um buffer de URL e sem mencionar a mensaje"
    );

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-sticker.webp"
    );

    await sendStickerFromBuffer(urlBuffer, false);

    await delay(3000);

    await sendReply(
      "Para enviar stickers de buffer, use a función sendStickerFromBuffer(buffer, quoted)."
    );

    await delay(3000);

    await sendReply(
      "💡 *Dica:* Buffers são úteis para stickers gerados dinamicamente ou convertidos de outros formatos."
    );
  },
};
