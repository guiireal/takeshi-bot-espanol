import fs from "node:fs";
import { PREFIX } from "../../../config.js";
import { DangerError, InvalidParameterError } from "../../../errors/index.js";
import { upload } from "../../../services/linker.js";
import { canvas } from "../../../services/spider-x-api.js";
import { getRandomNumber } from "../../../utils/index.js";

export default {
  name: "bolsonaro",
  description: "Genera un montaje de Bolsonaro con la imagen que envíes",
  commands: ["bolsonaro"],
  usage: `${PREFIX}bolsonaro (menciona la imagen) o ${PREFIX}bolsonaro (responde a la imagen)`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromURL,
    sendErrorReply,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "Debes mencionar una imagen o responder a una imagen"
      );
    }

    await sendWaitReact();

    const fileName = getRandomNumber(10_000, 99_999).toString();
    const filePath = await downloadImage(webMessage, fileName);
    const buffer = fs.readFileSync(filePath);
    const link = await upload(buffer, `${fileName}.png`);
    if (!link) {
      throw new DangerError(
        "¡No pude subir la imagen, inténtalo de nuevo más tarde!"
      );
    }
    const url = canvas("bolsonaro", link);
    const response = await fetch(url);
    if (!response.ok) {
      const data = await response.json();
      await sendErrorReply(
        `¡Ocurrió un error al ejecutar una llamada remota a la Spider X API en el comando bolsonaro!
      
📄 *Detalles*: ${data.message}`
      );
      return;
    }
    await sendSuccessReact();
    await sendImageFromURL(url, "¡Imagen generada!");
    fs.unlinkSync(filePath);
  },
};
