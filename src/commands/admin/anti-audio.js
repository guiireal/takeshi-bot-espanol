const {
  updateIsActiveGroupRestriction,
} = require(`${BASE_DIR}/utils/database`);

const { isActiveGroupRestriction } = require(`${BASE_DIR}/utils/database`);

const { WarningError, InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "anti-audio",
  description:
    "Activa/desactiva la función de anti-audio en el grupo, eliminando el mensaje de audio si está activo.",
  commands: ["anti-audio", "anti-audios"],
  usage: `${PREFIX}anti-audio (1/0)`
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */,
  handle: async ({ remoteJid, isGroup, args, sendSuccessReply }) => {
    if (!isGroup) {
      throw new WarningError("¡Este comando solo debe usarse en grupos!");
    }

    if (!args.length) {
      throw new InvalidParameterError(
        "¡Necesitas escribir 1 o 0 (activar o desactivar)!"
      );
    }

    const antiAudioOn = args[0] == "1";
    const antiAudioOff = args[0] == "0";

    if (!antiAudioOn && !antiAudioOff) {
      throw new InvalidParameterError(
        "¡Necesitas escribir 1 o 0 (activar o desactivar)!"
      );
    }

    const hasActive =
      antiAudioOn && isActiveGroupRestriction(remoteJid, "anti-audio");

    const hasInactive =
      antiAudioOff && !isActiveGroupRestriction(remoteJid, "anti-audio");

    if (hasActive || hasInactive) {
      throw new WarningError(
        `¡La función de anti-audio ya está ${
          antiAudioOn ? "activada" : "desactivada"
        }!`
      );
    }

    updateIsActiveGroupRestriction(remoteJid, "anti-audio", antiAudioOn);

    const status = antiAudioOn ? "activado" : "desactivado";

    await sendSuccessReply(`¡Anti-audio ${status} con éxito!`);
  },
};
