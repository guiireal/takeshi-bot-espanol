const { PREFIX } = require(`${BASE_DIR}/config`);
const { isGroup, toUserJidOrLid } = require(`${BASE_DIR}/utils`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "promote",
  description: "Promueve a un usuario a administrador del grupo",
  commands: ["promote", "add-adm"],
  usage: `${PREFIX}promote @usuario`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    remoteJid,
    socket,
    sendWarningReply,
    sendSuccessReply,
    sendErrorReply,
  }) => {
    if (!isGroup(remoteJid)) {
      return sendWarningReply(
        "¡Este comando solo puede ser usado en un grupo!"
      );
    }

    if (!args.length || !args[0]) {
      return sendWarningReply(
        "Por favor, etiqueta a un usuario para promover."
      );
    }

    const userId = toUserJidOrLid(args[0]);

    try {
      await socket.groupParticipantsUpdate(remoteJid, [userId], "promote");
      await sendSuccessReply("¡Usuario promovido con éxito!");
    } catch (error) {
      errorLog(`Error al promover usuario: ${error.message}`);
      await sendErrorReply(
        "Ocurrió un error al intentar promover al usuario. ¡Necesito ser administrador del grupo para promover a otros usuarios!"
      );
    }
  },
};
