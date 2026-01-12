import fs from "node:fs";
import { PREFIX } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { upload } from "../../services/linker.js";
import { getRandomNumber } from "../../utils/index.js";

export default {
  name: "generate-link",
  description: "Realizo la carga de imágenes y genero un enlace",
  commands: ["to-link", "up", "upload", "gera-link", "gerar-link"],
  usage: `${PREFIX}gerar-link (menciona la imagen) o .* (responde a la imagen)`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendReply,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "¡Debes mencionar o responder a una imagen!"
      );
    }

    await sendWaitReact();

    const fileName = getRandomNumber(10_000, 99_999).toString();
    const filePath = await downloadImage(webMessage, fileName);

    const buffer = fs.readFileSync(filePath);

    const link = await upload(buffer, `${fileName}.png`);

    if (!link) {
      throw new Error(
        "Error al cargar la imagen. Inténtalo de nuevo más tarde."
      );
    }

    await sendSuccessReact();

    await sendReply(`¡Aquí tienes el enlace de tu imagen!\n\n- ${link}`);

    fs.unlinkSync(filePath);
  },
};
