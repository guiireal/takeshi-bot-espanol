const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "delete",
  description: "Elimino mensajes",
  commands: ["delete", "d"],
  usage: `${PREFIX}delete (menciona un mensaje)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ deleteMessage, webMessage, remoteJid }) => {
    if (!webMessage?.message?.extendedTextMessage?.contextInfo) {
      throw new InvalidParameterError(
        "¡Debes mencionar un mensaje para eliminar!"
      );
    }

    const { stanzaId, participant } =
      webMessage?.message?.extendedTextMessage?.contextInfo;

    if (!stanzaId || !participant) {
      throw new InvalidParameterError(
        "¡Debes mencionar un mensaje para eliminar!"
      );
    }

    await deleteMessage({
      remoteJid,
      fromMe: false,
      id: stanzaId,
      participant,
    });
  },
};
