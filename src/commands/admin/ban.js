const {
  PREFIX,
  BOT_NUMBER,
  OWNER_NUMBER,
  ONWER_LID,
} = require(`${BASE_DIR}/config`);
const { DangerError, InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid, onlyNumbers, toUserJidOrLid } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "ban",
  description: "Elimino un miembro del grupo",
  commands: ["ban", "kick"],
  usage: `${PREFIX}ban @mencionar_miembro 
  
o 

${PREFIX}ban (mencionando un mensaje)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    isReply,
    socket,
    remoteJid,
    replyJid,
    sendReply,
    userJid,
    sendSuccessReact,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(
        "¡Necesitas mencionar o marcar un miembro!"
      );
    }

    const userId = toUserJidOrLid(args[0]);

    const memberToRemoveJid = isReply ? replyJid : userId;
    const memberToRemoveNumber = onlyNumbers(memberToRemoveJid);

    if (!memberToRemoveJid) {
      throw new InvalidParameterError("¡Membro inválido!");
    }

    if (memberToRemoveJid === userJid) {
      throw new DangerError("¡No puedes eliminarte a ti mismo!");
    }

    if (
      memberToRemoveNumber === OWNER_NUMBER ||
      memberToRemoveNumber + "@lid" === ONWER_LID
    ) {
      throw new DangerError("¡No puedes eliminar al dueño del bot!");
    }

    const botJid = toUserJid(BOT_NUMBER);

    if (memberToRemoveJid === botJid) {
      throw new DangerError("¡No puedes eliminarme!");
    }

    await socket.groupParticipantsUpdate(
      remoteJid,
      [memberToRemoveJid],
      "remove"
    );

    await sendSuccessReact();

    await sendReply("¡Miembro eliminado con éxito!");
  },
};
