const { PREFIX } = require(`${BASE_DIR}/config`);
const { updateGroupMetadataCache } = require(`${BASE_DIR}/connection`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "refresh",
  description: "Actualiza los datos del participante",
  commands: ["refresh", "fresh"],
  usage: `${PREFIX}refresh`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    prefix,
    socket,
    remoteJid,
    sendSuccessReply,
    sendErrorReply,
  }) => {
    try {
      const data = await socket.groupMetadata(remoteJid);
      updateGroupMetadataCache(remoteJid, data);
      await sendSuccessReply(
        `¡Datos actualizados con éxito! ¡Intenta de nuevo lo que estabas haciendo!

Si eres el dueño del grupo, no olvides configurar el número y el LID del dueño en:

\`src/config.js\`

\`\`\`
exports.OWNER_NUMBER = "5511999999999";

exports.OWNER_LID = "1234567890@lid";
\`\`\`

Para configurar el LID,
usa el comando

${prefix}get-lid tu_numero_aqui

Luego toma el número de LID que se respondió y ponlo en la configuración de arriba.

Si ya hiciste todo esto, ignora.`
      );
    } catch (error) {
      errorLog(
        `Error al actualizar los datos del participante: ${
          error.message || error
        }`
      );
      await sendErrorReply(
        "Ocurrió un error al actualizar los datos del participante."
      );
    }
  },
};
