import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-audio-de-url",
  description: "Ejemplo de como enviar um audio a través de um link/url",
  commands: ["enviar-audio-de-url"],
  usage: `${PREFIX}enviar-audio-de-url`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendAudioFromURL, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "Voy enviar um audio de um link, enviarei como reprodução de archivo."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
    );

    await delay(3000);

    await sendReply(
      "Ahora enviarei um audio de um link, porém como se eu tivesse gravado o audio."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      true
    );

    await delay(3000);

    await sendReply(
      "Ahora enviarei um audio de um link, porém sem mencionar em cima da sua mensaje."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "E por fim, enviarei um audio de um link, como se eu tivesse gravado, porém sem mencionar em cima da sua mensaje."
    );

    await delay(3000);

    await sendAudioFromURL(
      "https://api.spiderx.com.br/storage/samples/sample-audio.mp3",
      true,
      false
    );
  },
};
