import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-video-de-url",
  description: "Ejemplo de como enviar um video a partir de uma URL",
  commands: ["enviar-video-de-url"],
  usage: `${PREFIX}enviar-video-de-url`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendVideoFromURL, sendReact, userLid }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply("Voy enviar um video a partir de uma URL");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await delay(3000);

    await sendReply("Enviar también sem mencionar a mensaje do usuário:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      null,
      false
    );

    await delay(3000);

    await sendReply("Tú también pode enviar videos com legenda:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      "Aqui está o video que tú pediu!"
    );

    await delay(3000);

    await sendReply("Também videos com legenda, mencionando o usuário:");

    await delay(3000);

    await sendVideoFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4",
      `Aqui está o video que tú pediu @${userLid.split("@")[0]}!`,
      [userLid]
    );

    await delay(3000);

    await sendReply(
      "Para enviar videos de URL, use a función sendVideoFromURL(url, caption, [mentions], quoted).\n\n" +
        "Isso é útil quando tú tem videos hospedados online ou obtidos de APIs."
    );

    await delay(3000);

    await sendReply(
      "💡 *Dica:* Certifique-se de que a URL aponta para um archivo de video válido e acessível."
    );
  },
};
