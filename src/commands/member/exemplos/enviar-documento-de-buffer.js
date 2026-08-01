import { delay } from "baileys";
import fs from "node:fs";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";
import { getBuffer } from "../../../utils/index.js";

export default {
  name: "enviar-documento-de-buffer",
  description: "Ejemplo de como enviar documentos a partir de buffers",
  commands: ["enviar-documento-de-buffer"],
  usage: `${PREFIX}enviar-documento-de-buffer`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendReact, socket, remoteJid, webMessage }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply(
      "Voy enviar documentos a partir de buffers (archivo local e URL)"
    );

    await delay(3000);

    const fileBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf")
    );

    await socket.sendMessage(
      remoteJid,
      {
        document: fileBuffer,
        mimetype: "application/pdf",
        fileName: "documento-de-buffer-local.pdf",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply(
      "Ahora voy enviar um documento a partir de um buffer de URL"
    );

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-text.txt"
    );

    await socket.sendMessage(
      remoteJid,
      {
        document: urlBuffer,
        mimetype: "text/plain",
        fileName: "archivo-de-buffer-url.txt",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply(
      "Tú también pode enviar documentos de buffer com mimetype padrão:"
    );

    await delay(3000);

    await socket.sendMessage(
      remoteJid,
      {
        document: fileBuffer,
        fileName: "documento-buffer-default.pdf",
      },
      { quoted: webMessage }
    );

    await delay(3000);

    await sendReply(
      "Para enviar documentos de buffer, use socket.sendMessage() diretamente com o buffer.\n\n" +
        "Isso é útil quando tú tem documentos processados em memória ou precisa manipular o archivo antes de enviar."
    );

    await delay(3000);

    await sendReply(
      "💡 *Dica:* Buffers são úteis para documentos gerados dinamicamente ou quando tú precisa processar o archivo antes do envio."
    );
  },
};
