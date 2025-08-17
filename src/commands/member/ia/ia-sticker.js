const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ia-sticker",
  description: "Crea un sticker basado en una descripción",
  commands: ["ia-sticker", "ia-fig"],
  usage: `${PREFIX}ia-sticker descripción`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendStickerFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args[0]) {
      return sendWarningReply(
        "Necesitas proporcionar una descripción para la imagen."
      );
    }

    await sendWaitReply("generando sticker...");

    const data = await imageAI(fullArgs);

    if (data.image) {
      await sendStickerFromURL(data.image);
      await sendSuccessReact();
    } else {
      await sendWarningReply(
        "No fue posible generar el sticker. Intenta nuevamente más tarde."
      );
    }
  },
};
