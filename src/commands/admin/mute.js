/**
 * Desarrollado por: Mkg
 * Refactorizado por: Dev Gui
 *
 * @author Dev Gui
 */
const { toUserJid, onlyNumbers, toUserJidOrLid } = require(`${BASE_DIR}/utils`);
const {
  checkIfMemberIsMuted,
  muteMember,
} = require(`${BASE_DIR}/utils/database`);
const {
  PREFIX,
  BOT_NUMBER,
  OWNER_NUMBER,
  OWNER_LID,
} = require(`${BASE_DIR}/config`);

const { DangerError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "mute",
  description:
    "Silencia a un usuario en el grupo (borra los mensajes del usuario automáticamente).",
  commands: ["mute", "mutear", "silenciar"],
  usage: `${PREFIX}mute @usuario o (responde al mensaje del usuario que deseas silenciar)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */ handle: async ({
    args,
    remoteJid,
    replyJid,
    sendErrorReply,
    sendSuccessReply,
    getGroupMetadata,
    isGroup,
  }) => {
    if (!isGroup) {
      throw new DangerError("Este comando solo se puede usar en grupos.");
    }

    if (!args.length && !replyJid) {
      throw new DangerError(
        `Necesitas mencionar a un usuario o responder al mensaje del usuario que deseas silenciar.\n\nEjemplo: ${PREFIX}mute @usuario`
      );
    }

    const userId = replyJid ? replyJid : toUserJidOrLid(args[0]);

    const targetUserNumber = onlyNumbers(userId);

    if (
      [OWNER_NUMBER, OWNER_LID.replace("@lid", "")].includes(targetUserNumber)
    ) {
      throw new DangerError("¡No puedes silenciar al dueño del bot!");
    }

    if (userId === toUserJid(BOT_NUMBER)) {
      throw new DangerError("No puedes silenciar al bot.");
    }

    const groupMetadata = await getGroupMetadata();

    const isUserInGroup = groupMetadata.participants.some(
      (participant) => participant.id === userId
    );

    if (!isUserInGroup) {
      return sendErrorReply(
        `El usuario @${targetUserNumber} no está en este grupo.`,
        [userId]
      );
    }

    const isTargetAdmin = groupMetadata.participants.some(
      (participant) => participant.id === userId && participant.admin
    );

    if (isTargetAdmin) {
      throw new DangerError("No puedes silenciar a un administrador.");
    }

    if (checkIfMemberIsMuted(remoteJid, userId)) {
      return sendErrorReply(
        `El usuario @${targetUserNumber} ya está silenciado en este grupo.`,
        [userId]
      );
    }

    muteMember(remoteJid, userId);

    await sendSuccessReply(
      `¡@${targetUserNumber} fue silenciado con éxito en este grupo!`,
      [userId]
    );
  },
};
