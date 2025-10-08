/**
 * Desarrollado por: Mkg
 * Refactorizado por: Dev Gui
 *
 * @author Dev Gui
 */
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJidOrLid } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "fake-chat",
  description: "Crea una cita falsa mencionando a un usuario",
  commands: ["fake-chat", "fq", "fake-quote", "f-quote", "fk"],
  usage: `${PREFIX}fake-chat @usuario / texto citado / mensaje que se enviará`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ remoteJid, socket, args }) => {
    if (args.length !== 3) {
      throw new InvalidParameterError(
        `Uso incorrecto del comando. Ejemplo: ${PREFIX}fake-chat @usuario / texto citado / mensaje que se enviará`
      );
    }

    const quotedText = args[1];
    const responseText = args[2];

    const mentionedJid = toUserJidOrLid(args[0]);

    if (quotedText.length < 2) {
      throw new InvalidParameterError(
        "El texto citado debe tener al menos 2 caracteres."
      );
    }

    if (responseText.length < 2) {
      throw new InvalidParameterError(
        "El mensaje de respuesta debe tener al menos 2 caracteres."
      );
    }

    const fakeQuoted = {
      key: {
        fromMe: false,
        participant: mentionedJid,
        remoteJid,
      },
      message: {
        extendedTextMessage: {
          text: quotedText,
          contextInfo: {
            mentionedJid: [mentionedJid],
          },
        },
      },
    };

    await socket.sendMessage(
      remoteJid,
      { text: responseText },
      { quoted: fakeQuoted }
    );
  },
};
