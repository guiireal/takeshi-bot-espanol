/**
 * Desarrollado por: Mkg
 * Refactorizado por: Dev Gui
 *
 * @author Dev Gui
 */
const {
  checkIfMemberIsMuted,
  unmuteMember,
} = require(`${BASE_DIR}/utils/database`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { toUserJidOrLid } = require(`${BASE_DIR}/utils`);

const { DangerError, WarningError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "unmute",
  description: "Le quita el silencio a un miembro del grupo",
  commands: ["unmute", "desilenciar"],
  usage: `${PREFIX}unmute @usuario`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */ handle: async ({
    remoteJid,
    sendSuccessReply,
    args,
    isGroup,
    replyJid,
  }) => {
    if (!isGroup) {
      throw new DangerError("Este comando solo se puede usar en grupos.");
    }

    if (!args.length && !replyJid) {
      throw new DangerError(
        `Necesitas mencionar a un usuario para quitarle el silencio.\n\nEjemplo: ${PREFIX}unmute @usuario`
      );
    }

    const userId = replyJid ? replyJid : toUserJidOrLid(args[0]);

    if (!checkIfMemberIsMuted(remoteJid, userId)) {
      throw new WarningError("¡Este usuario no está silenciado!");
    }

    unmuteMember(remoteJid, userId);

    await sendSuccessReply(
      "¡Se le ha quitado el silencio al usuario con éxito!"
    );
  },
};
