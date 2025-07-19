/**
 * Comando para obtener el link del grupo
 *
 * @author Valéria
 */
const { errorLog } = require(`${BASE_DIR}/utils/logger`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "link-group",
  description: "Obtiene el link del grupo",
  commands: ["link-group", "link-gp"],
  usage: `${PREFIX}link-group`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    socket,
    sendReact,
    sendReply,
    sendErrorReply,
    remoteJid,
  }) => {
    try {
      const groupCode = await socket.groupInviteCode(remoteJid);

      if (!groupCode) {
        throw new DangerError("¡Necesito ser admin!");
      }

      const groupInviteLink = `https://chat.whatsapp.com/${groupCode}`;

      await sendReact("🪀");
      await sendReply(groupInviteLink);
    } catch (error) {
      errorLog(error);
      await sendErrorReply("¡Necesito ser admin!");
    }
  },
};
