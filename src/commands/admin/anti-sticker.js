const {
  updateIsActiveGroupRestriction,
} = require(`${BASE_DIR}/utils/database`);

const { isActiveGroupRestriction } = require(`${BASE_DIR}/utils/database`);

const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "anti-sticker",
  description:
    "Activa/desactiva la función anti-sticker en el grupo, eliminando el sticker si está activo.",
  commands: ["anti-sticker", "anti-figu", "anti-figurinha", "anti-figurinhas"],
  usage: `${PREFIX}anti-sticker (1/0)`,
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

    const antiStickerOn = args[0] == "1";
    const antiStickerOff = args[0] == "0";

    if (!antiStickerOn && !antiStickerOff) {
      throw new InvalidParameterError(
        "¡Necesitas escribir 1 o 0 (encender o apagar)!"
      );
    }

    const hasActive =
      antiStickerOn && isActiveGroupRestriction(remoteJid, "anti-sticker");

    const hasInactive =
      antiStickerOff && !isActiveGroupRestriction(remoteJid, "anti-sticker");

    if (hasActive || hasInactive) {
      throw new WarningError(
        `¡La función anti-sticker ya está ${
          antiStickerOn ? "activada" : "desactivada"
        }!`
      );
    }

    updateIsActiveGroupRestriction(remoteJid, "anti-sticker", antiStickerOn);

    const status = antiStickerOn ? "activada" : "desactivada";

    await sendSuccessReply(`¡Anti-sticker ${status} con éxito!`);
  },
};
