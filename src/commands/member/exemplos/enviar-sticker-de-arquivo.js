import { delay } from "baileys";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";

export default {
  name: "enviar-sticker-de-archivo",
  description: "Ejemplo de como enviar um sticker a partir de um archivo local",
  commands: ["enviar-sticker-de-archivo"],
  usage: `${PREFIX}enviar-sticker-de-archivo`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendStickerFromFile, sendReact }) => {
    await sendReact("🏷️");

    await delay(3000);

    await sendReply("Voy enviar um sticker a partir de um archivo local");

    await delay(3000);

    await sendStickerFromFile(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await delay(3000);

    await sendReply("Tú también pode usar outros stickers do projeto:");

    await delay(3000);

    await sendStickerFromFile(
      path.join(ASSETS_DIR, "samples", "sample-sticker.webp")
    );

    await delay(3000);

    await sendReply(
      "Para enviar stickers de archivo, use a función sendStickerFromFile(filePath, quoted).\n\n" +
        "Isso é útil quando tú tem stickers armazenados localmente no servidor."
    );

    await delay(3000);

    await sendReply(
      "💡 *Dica:* O formato ideal para stickers é .webp. Outros formatos podem precisar de conversão."
    );
  },
};
