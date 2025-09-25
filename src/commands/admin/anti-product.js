const {
  updateIsActiveGroupRestriction,
} = require(`${BASE_DIR}/utils/database`);

const { isActiveGroupRestriction } = require(`${BASE_DIR}/utils/database`);

const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "anti-product",
  description:
    "Activa/desactiva la función anti-producto en el grupo, eliminando el mensaje del producto si está activo.",
  commands: ["anti-product", "anti-produto", "anti-productos"],
  usage: `${PREFIX}anti-product (1/0)`,
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

    const antiProductOn = args[0] == "1";
    const antiProductOff = args[0] == "0";

    if (!antiProductOn && !antiProductOff) {
      throw new InvalidParameterError(
        "¡Necesitas escribir 1 o 0 (encender o apagar)!"
      );
    }

    const hasActive =
      antiProductOn && isActiveGroupRestriction(remoteJid, "anti-product");

    const hasInactive =
      antiProductOff && !isActiveGroupRestriction(remoteJid, "anti-product");

    if (hasActive || hasInactive) {
      throw new WarningError(
        `¡La función anti-producto ya está ${
          antiProductOn ? "activada" : "desactivada"
        }!`
      );
    }

    updateIsActiveGroupRestriction(remoteJid, "anti-product", antiProductOn);

    const status = antiProductOn ? "activada" : "desactivada";

    await sendSuccessReply(`¡Anti-producto ${status} con éxito!`);
  },
};
