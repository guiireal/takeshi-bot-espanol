import { delay } from "baileys";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";

export default {
  name: "enviar-video-de-archivo",
  description: "Ejemplo de como enviar um video a partir de um archivo local",
  commands: ["enviar-video-de-archivo"],
  usage: `${PREFIX}enviar-video-de-archivo`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendVideoFromFile, sendReact }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply("Voy enviar um video a partir de um archivo local");

    await delay(3000);

    await sendVideoFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4"),
      "Este es um video de ejemplo com legenda"
    );

    await delay(3000);

    await sendReply("Tú también pode enviar videos sem legenda:");

    await delay(3000);

    await sendVideoFromFile(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4")
    );

    await delay(3000);

    await sendReply(
      "Para enviar videos de archivo, use a función sendVideoFromFile(filePath, caption, [mentions], quoted).\n\n" +
        "Isso é útil quando tú tem videos armazenados localmente no servidor."
    );

    await delay(3000);

    await sendReply(
      "💡 *Dica:* Formatos suportados incluem MP4, AVI, MOV, etc. O WhatsApp converte automaticamente se necessário."
    );
  },
};
