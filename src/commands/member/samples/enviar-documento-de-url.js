import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-documento-de-url",
  description: "Ejemplo de como enviar documentos a partir de URLs",
  commands: ["enviar-documento-de-url"],
  usage: `${PREFIX}enviar-documento-de-url`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendDocumentFromURL, sendReact }) => {
    await sendReact("📄");

    await delay(3000);

    await sendReply(
      "Voy enviar diferentes tipos de documentos a partir de URLs"
    );

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-document.pdf",
      "application/pdf",
      "documento-pdf-da-url.pdf"
    );

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-text.txt",
      "text/plain",
      "archivo-texto-da-url.txt"
    );

    await delay(3000);

    await sendDocumentFromURL(
      "https://raw.githubusercontent.com/guiireal/takeshi-bot/refs/heads/main/README.md",
      "text/markdown",
      "readme-ejemplo.md"
    );

    await delay(3000);

    await sendReply("Tú también pode enviar documentos com mimetype padrão:");

    await delay(3000);

    await sendDocumentFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-document.pdf"
    );

    await delay(3000);

    await sendReply(
      "Para enviar documentos de URL, use a función sendDocumentFromURL(url, mimetype, fileName).\n\n" +
        "Isso é útil quando tú tem documentos hospedados online ou obtidos de APIs."
    );

    await delay(3000);

    await sendReply(
      "💡 *Dica:* Certifique-se de que a URL aponta para um archivo válido e acessível."
    );
  },
};
