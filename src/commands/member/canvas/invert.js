const fs = require("node:fs");
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { upload } = require(`${BASE_DIR}/services/upload`);
const { canvas } = require(`${BASE_DIR}/services/spider-x-api`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "invert",
  description:
    "Genero uma edição com cores invertidos usando a imagem que envíes",
  commands: ["invertir", "invert", "inverter"],
  usage: `${PREFIX}invert (marca la imagen) o ${PREFIX}invert (responde la imagen)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromURL,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "¡Necesitas marcar una imagen o responder a una imagen!"
      );
    }

    await sendWaitReact();

    const fileName = getRandomNumber(10_000, 99_999).toString();
    const filePath = await downloadImage(webMessage, fileName);

    const buffer = fs.readFileSync(filePath);
    const link = await upload(buffer, `${fileName}.png`);

    if (!link) {
      throw new Error(
        "Error al subir la imagen, inténtalo de nuevo más tarde."
      );
    }

    const url = canvas("invert", link);

    const response = await fetch(url);

    if (!response.ok) {
      const data = await response.json();

      await sendErrorReply(
        `¡Ocurrió un error al ejecutar una llamada remota a la API de Spider X en el comando invert!
      
📄 *Detalles*: ${data.message}`
      );
      return;
    }

    await sendSuccessReact();

    await sendImageFromURL(url, "¡Imagen generada!");

    fs.unlinkSync(filePath);
  },
};
