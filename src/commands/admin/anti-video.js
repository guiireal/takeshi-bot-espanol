const {
  updateIsActiveGroupRestriction,
} = require(`${BASE_DIR}/utils/database`);

const { isActiveGroupRestriction } = require(`${BASE_DIR}/utils/database`);

const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "anti-video",
  description:
    "Activa/desactiva la función anti-video en el grupo, eliminando el mensaje de video si está activo.",
  commands: ["anti-video", "anti-videos"],
  usage: `${PREFIX}anti-video (1/0)`,
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

    const antiVideoOn = args[0] == "1";
    const antiVideoOff = args[0] == "0";

    if (!antiVideoOn && !antiVideoOff) {
      throw new InvalidParameterError(
        "¡Necesitas escribir 1 o 0 (encender o apagar)!"
      );
    }

    const hasActive =
      antiVideoOn && isActiveGroupRestriction(remoteJid, "anti-video");

    const hasInactive =
      antiVideoOff && !isActiveGroupRestriction(remoteJid, "anti-video");

    if (hasActive || hasInactive) {
      throw new WarningError(
        `¡La función anti-video ya está ${
          antiVideoOn ? "activada" : "desactivada"
        }!`
      );
    }

    updateIsActiveGroupRestriction(remoteJid, "anti-video", antiVideoOn);

    const status = antiVideoOn ? "activada" : "desactivada";

    await sendSuccessReply(`¡Anti-video ${status} con éxito!`);
  },
};
