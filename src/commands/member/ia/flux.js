const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);

const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "flux",
  description: "Crea una imagen usando la IA Flux",
  commands: ["flux"],
  usage: `${PREFIX}flux descripción`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendImageFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args[0]) {
      return sendWarningReply(
        "Necesitas proporcionar una descripción para la imagen."
      );
    }

    await sendWaitReply("generando imagen...");

    const data = await imageAI(fullArgs);

    if (!data?.image) {
      return sendWarningReply(
        "¡No fue posible generar la imagen! Intenta nuevamente más tarde."
      );
    }

    await sendSuccessReact();
    await sendImageFromURL(data.image);
  },
};
