const { OWNER_NUMBER } = require("../../config");

const { PREFIX, BOT_NUMBER } = require(`${BASE_DIR}/config`);
const { DangerError, InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJid, onlyNumbers } = require(`${BASE_DIR}/utils`);

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
    isLid,
    sendSuccessReact,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(
        "¡Necesitas mencionar o marcar un miembro!"
      );
    }

    const userId =
      args[0].length > 14
        ? `${args[0].replace("@", "")}@lid`
        : args[0].replace("@", "") + "@s.whatsapp.net";

    const replyJidToRemove =
      isReply && replyJid?.length > 14
        ? `${replyJid.replace("@", "")}@lid`
        : replyJid;

    let memberToRemoveId = null;

    const memberToRemoveJid = isReply ? replyJidToRemove : userId;
    const memberToRemoveNumber = onlyNumbers(memberToRemoveJid);

    if (memberToRemoveNumber.length < 7 || memberToRemoveNumber.length > 15) {
      throw new InvalidParameterError("¡Número inválido!");
    }

    if (memberToRemoveJid === userJid) {
      throw new DangerError("¡No puedes eliminarte a ti mismo!");
    }

    if (memberToRemoveNumber === OWNER_NUMBER) {
      throw new DangerError("¡No puedes eliminar al dueño del bot!");
    }

    const botJid = toUserJid(BOT_NUMBER);

    if (memberToRemoveJid === botJid) {
      throw new DangerError("¡No puedes eliminarme!");
    }

    memberToRemoveId = memberToRemoveJid;

    await socket.groupParticipantsUpdate(
      remoteJid,
      [memberToRemoveId],
      "remove"
    );

    await sendSuccessReact();

    await sendReply("¡Miembro eliminado con éxito!");
  },
};
