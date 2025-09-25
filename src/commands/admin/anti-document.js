const {
  updateIsActiveGroupRestriction,
} = require(`${BASE_DIR}/utils/database`);

const { isActiveGroupRestriction } = require(`${BASE_DIR}/utils/database`);

const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "anti-document",
  description:
    "Activa/desactiva la función anti-documento en el grupo, eliminando el mensaje de documento si está activo.",
  commands: ["anti-document", "anti-doc", "anti-documento", "anti-documentos"],
  usage: `${PREFIX}anti-document (1/0)`,
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

    const antiDocumentOn = args[0] == "1";
    const antiDocumentOff = args[0] == "0";

    if (!antiDocumentOn && !antiDocumentOff) {
      throw new InvalidParameterError(
        "¡Necesitas escribir 1 o 0 (encender o apagar)!"
      );
    }

    const hasActive =
      antiDocumentOn && isActiveGroupRestriction(remoteJid, "anti-document");

    const hasInactive =
      antiDocumentOff && !isActiveGroupRestriction(remoteJid, "anti-document");

    if (hasActive || hasInactive) {
      throw new WarningError(
        `¡La función anti-documento ya está ${
          antiDocumentOn ? "activada" : "desactivada"
        }!`
      );
    }

    updateIsActiveGroupRestriction(remoteJid, "anti-document", antiDocumentOn);

    const status = antiDocumentOn ? "activada" : "desactivada";

    await sendSuccessReply(`¡Anti-documento ${status} con éxito!`);
  },
};
