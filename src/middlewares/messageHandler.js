const { getContent } = require("../utils");
const { errorLog } = require("../utils/logger");
const {
  readGroupRestrictions,
  readRestrictedMessageTypes,
} = require("../utils/database");

exports.messageHandler = async (socket, webMessage) => {
  try {
    const {
      remoteJid,
      fromMe,
      id: messageId,
      participant: userJid,
    } = webMessage.key;

    const antiGroups = readGroupRestrictions();

    const messageType = Object.keys(readRestrictedMessageTypes()).find((type) =>
      getContent(webMessage, type)
    );

    if (!messageType) {
      return;
    }

    const isAntiActive = antiGroups[remoteJid]?.[`anti-${messageType}`];

    if (!isAntiActive) {
      return;
    }

    await socket.sendMessage(remoteJid, {
      delete: {
        remoteJid,
        fromMe,
        id: messageId,
        participant: userJid,
      },
    });
  } catch (error) {
    errorLog(
      `Error al procesar mensaje restringido. ¡Verifica si soy administrador del grupo! Detalles: ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
  }
};
