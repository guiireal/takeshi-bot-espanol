const {
  updateIsActiveGroupRestriction,
} = require(`${BASE_DIR}/utils/database`);

const { isActiveGroupRestriction } = require(`${BASE_DIR}/utils/database`);

const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "anti-image",
  description:
    "Activa/desactiva la función anti-imagen en el grupo, eliminando el mensaje de imagen si está activo.",
  commands: ["anti-image", "anti-img", "anti-imagen", "anti-imagens"],
  usage: `${PREFIX}anti-image (1/0)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ remoteJid, isGroup, args, sendSuccessReply }) => {
    if (!isGroup) {
      throw new WarningError("¡Este comando solo debe usarse en grupos!");
    }

    if (!args.length) {
      throw new InvalidParameterError(
        "¡Necesitas escribir 1 o 0 (encender o apagar)!"
      );
    }

    const antiImageOn = args[0] == "1";
    const antiImageOff = args[0] == "0";

    if (!antiImageOn && !antiImageOff) {
      throw new InvalidParameterError(
        "¡Necesitas escribir 1 o 0 (encender o apagar)!"
      );
    }

    const hasActive =
      antiImageOn && isActiveGroupRestriction(remoteJid, "anti-image");

    const hasInactive =
      antiImageOff && !isActiveGroupRestriction(remoteJid, "anti-image");

    if (hasActive || hasInactive) {
      throw new WarningError(
        `¡La función anti-imagen ya está ${
          antiImageOn ? "activada" : "desactivada"
        }!`
      );
    }

    updateIsActiveGroupRestriction(remoteJid, "anti-image", antiImageOn);

    const status = antiImageOn ? "activada" : "desactivada";

    await sendSuccessReply(`¡Anti-imagen ${status} con éxito!`);
  },
};
