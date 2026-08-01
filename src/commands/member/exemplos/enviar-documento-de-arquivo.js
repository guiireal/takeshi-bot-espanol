import { delay } from "baileys";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";

export default {
  name: "enviar-documento-de-archivo",
  description: "Ejemplo de como enviar documentos a partir de archivos locais",
  commands: ["enviar-documento-de-archivo"],
  usage: `${PREFIX}enviar-documento-de-archivo`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendDocumentFromFile, sendReact }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply(
      "Voy enviar diferentes tipos de documentos a partir de archivos locais"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf"),
      "application/pdf",
      "documento-ejemplo.pdf"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-text.txt"),
      "text/plain",
      "archivo-texto-ejemplo.txt"
    );

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.txt"),
      "text/plain",
      "outro-documento.txt"
    );

    await delay(3000);

    await sendReply("Tú también pode enviar documentos com mimetype padrão:");

    await delay(3000);

    await sendDocumentFromFile(
      path.join(ASSETS_DIR, "samples", "sample-document.pdf")
    );

    await delay(3000);

    await sendReply(
      "Para enviar documentos de archivo, use a función sendDocumentFromFile(filePath, mimetype, fileName).\n\n" +
        "Isso é útil quando tú tem documentos armazenados localmente no servidor."
    );

    await delay(3000);

    await sendReply(
      "💡 *Dica:* Tú pode especificar o mimetype para diferentes tipos: PDF, TXT, DOC, XLS, etc."
    );
  },
};
