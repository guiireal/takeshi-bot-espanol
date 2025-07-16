const { PREFIX } = require(`${BASE_DIR}/config`);
const { ttp } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "ttp",
  description: "Crea stickers de texto.",
  commands: ["ttp"],
  usage: `${PREFIX}ttp prueba`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendWaitReact,
    args,
    sendStickerFromURL,
    sendSuccessReact,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Necesitas ingresar el texto que quieres transformar en sticker."
      );
    }

    await sendWaitReact();

    const url = await ttp(args[0].trim());

    const response = await fetch(url);

    if (!response.ok) {
      const data = await response.json();

      await sendErrorReply(
        `¡Ocurrió un error al ejecutar una llamada remota a la API de Spider X en el comando ttp!
      
📄 *Detalles*: ${data.message}`
      );
      return;
    }

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
