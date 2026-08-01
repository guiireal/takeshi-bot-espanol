import { delay } from "baileys";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";
export default {
  name: "enviar-audio-de-archivo",
  description: "Ejemplo de como enviar um audio a través de um archivo",
  commands: ["enviar-audio-de-archivo"],
  usage: `${PREFIX}enviar-audio-de-archivo`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendAudioFromFile, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "Voy enviar um audio de um archivo, enviarei como reprodução de archivo."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3")
    );

    await delay(3000);

    await sendReply(
      "Ahora enviarei um audio de um archivo, porém como se eu tivesse gravado o audio."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      true
    );

    await delay(3000);

    await sendReply(
      "Ahora enviarei um audio de um archivo, porém sem mencionar em cima da sua mensaje."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "E por fim, enviarei um audio de um archivo, como se eu tivesse gravado, porém sem mencionar em cima da sua mensaje."
    );

    await delay(3000);

    await sendAudioFromFile(
      path.join(ASSETS_DIR, "samples", "sample-audio.mp3"),
      true,
      false
    );
  },
};
