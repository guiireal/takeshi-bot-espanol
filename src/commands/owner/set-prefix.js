const { setPrefix } = require(`${BASE_DIR}/utils/database`);

const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "set-prefix",
  description: "Cambio el prefijo de uso de mis comandos",
  commands: [
    "set-prefix",
    "cambiar-prefijo",
    "alterar-prefijo",
    "modificar-prefijo",
    "prefijo",
    "set-prefijo",
    "cambiar-prefix",
    "alterar-prefix",
    "modificar-prefix",
    "establecer-prefijo",
  ],
  usage: `${PREFIX}set-prefix =`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ remoteJid, args, sendSuccessReply }) => {
    if (!args.length) {
      throw new InvalidParameterError("¡Debes proporcionar un prefijo!");
    }

    if (args.length !== 1) {
      throw new InvalidParameterError("¡El prefijo debe ser solo 1 carácter!");
    }

    const newPrefix = args[0];

    setPrefix(remoteJid, newPrefix);

    await sendSuccessReply(`¡Prefijo cambiado a: ${newPrefix} en este grupo!`);
  },
};
