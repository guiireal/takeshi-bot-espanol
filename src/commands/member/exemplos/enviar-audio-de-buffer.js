import { delay } from "baileys";
import fs from "node:fs";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";
import { getBuffer } from "../../../utils/index.js";

export default {
  name: "enviar-audio-de-buffer",
  description: "Ejemplo de como enviar um audio a través de um buffer",
  commands: ["enviar-audio-de-buffer"],
  usage: `${PREFIX}enviar-audio-de-buffer`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendAudioFromBuffer, sendReact }) => {
    await sendReact("🔈");

    await delay(3000);

    await sendReply(
      "Voy enviar um audio de um buffer extraído de uma URL, enviarei como reprodução de archivo."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
      )
    );

    await delay(3000);

    await sendReply(
      "Ahora enviarei um audio de um buffer extraído de um archivo, porém como se eu tivesse gravado o audio."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-audio.mp3")),
      true
    );

    await delay(3000);

    await sendReply(
      "Ahora enviarei um audio de um buffer extraído de um archivo, porém sem mencionar em cima da sua mensaje."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-audio.mp3")),
      false,
      false
    );

    await delay(3000);

    await sendReply(
      "E por fim, enviarei um audio de um buffer extraído de uma URL, como se eu tivesse gravado, porém sem mencionar em cima da sua mensaje."
    );

    await delay(3000);

    await sendAudioFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-audio.mp3"
      ),
      true,
      false
    );
  },
};
