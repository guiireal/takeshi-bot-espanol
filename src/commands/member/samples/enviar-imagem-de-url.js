import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-imagen-de-url",
  description: "Ejemplo de como enviar uma imagen a partir de uma URL",
  commands: ["enviar-imagen-de-url"],
  usage: `${PREFIX}enviar-imagen-de-url`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendImageFromURL, sendReact, userLid }) => {
    await sendReact("🖼️");

    await delay(3000);

    await sendReply("Voy enviar uma imagen a partir de uma URL");

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg",
      "Esta es uma legenda para a imagen da URL"
    );

    await delay(3000);

    await sendReply("Tú también pode enviar imágenes de URL sem legenda:");

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg"
    );

    await delay(3000);

    await sendReply("Ahora voy enviar uma imagen de URL mencionando tú:");

    await delay(3000);

    await sendImageFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-image.jpg",
      `Logo do Takeshi Bot para tú ${userLid.split("@")[0]}!`,
      [userLid]
    );

    await sendReply(
      "Para enviar imágenes de URL, use a función sendImageFromURL(url, caption, [mentions], quoted).\n\n" +
        "Isso é útil quando tú tem imágenes hospedadas online ou obtidas de APIs."
    );
  },
};
