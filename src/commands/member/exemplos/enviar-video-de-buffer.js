import { delay } from "baileys";
import fs from "node:fs";
import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";
import { getBuffer } from "../../../utils/index.js";

export default {
  name: "enviar-video-de-buffer",
  description: "Ejemplo de como enviar um video a partir de um buffer",
  commands: ["enviar-video-de-buffer"],
  usage: `${PREFIX}enviar-video-de-buffer`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendReact, sendVideoFromBuffer, userLid }) => {
    await sendReact("🎥");

    await delay(3000);

    await sendReply(
      "Voy enviar um video a partir de um buffer de archivo local"
    );

    await delay(3000);

    const videoBuffer = fs.readFileSync(
      path.join(ASSETS_DIR, "samples", "sample-video.mp4")
    );

    await sendVideoFromBuffer(videoBuffer, "Aqui está o video do buffer local");

    await delay(3000);

    await sendReply("Ahora voy enviar um video a partir de um buffer de URL");

    await delay(3000);

    const urlBuffer = await getBuffer(
      "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
    );

    await sendVideoFromBuffer(urlBuffer, "Aqui está o video do buffer de URL");

    await delay(3000);

    await sendReply("Tú también pode enviar videos de buffer sem legenda");

    await delay(3000);

    await sendVideoFromBuffer(videoBuffer);

    await delay(3000);

    await sendReply(
      "Também videos de buffer com legenda, mencionando o usuário:"
    );

    await delay(3000);

    await sendVideoFromBuffer(
      await getBuffer(
        "https://api.spiderx.com.br/storage/samples/sample-video.mp4"
      ),
      `Aqui está o video que tú pediu @${userLid.split("@")[0]}!`,
      [userLid]
    );

    await delay(3000);

    await sendReply(
      "Para enviar videos de buffer, use a función sendVideoFromBuffer(url, caption, [mentions], quoted).\n\n" +
        "Isso é útil quando tú tem videos hospedados online ou obtidos de APIs."
    );
  },
};
