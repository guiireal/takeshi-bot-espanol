import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";
import {
  isActiveGroupRestriction,
  updateIsActiveGroupRestriction,
} from "../../utils/database.js";
import { isFalse, isTrue } from "../../utils/index.js";

export default {
  name: "anti-call",
  description:
    "Ativa/desativa o recurso de anti-call no grupo, removendo quem iniciar ligação.",
  commands: ["anti-call", "anti-ligacao"],
  usage: `${PREFIX}anti-call (1/0)`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ remoteJid, isGroup, args, sendSuccessReply }) => {
    if (!isGroup) {
      throw new WarningError("¡Este comando solo puede usarse en grupos!");
    }
    if (!args.length) {
      throw new InvalidParameterError(
        "Debes escribir 1 ou 0 (activar o desactivar)!",
      );
    }
    const antiCallOn = isTrue(args[0]);
    const antiCallOff = isFalse(args[0]);
    if (!antiCallOn && !antiCallOff) {
      throw new InvalidParameterError(
        "Debes escribir 1 ou 0 (activar o desactivar)!",
      );
    }
    const hasActive =
      antiCallOn && isActiveGroupRestriction(remoteJid, "anti-call");
    const hasInactive =
      antiCallOff && !isActiveGroupRestriction(remoteJid, "anti-call");
    if (hasActive || hasInactive) {
      throw new WarningError(
        `El recurso de anti-call ya está ${
          antiCallOn ? "activado" : "desactivado"
        }!`,
      );
    }
    updateIsActiveGroupRestriction(remoteJid, "anti-call", antiCallOn);
    const status = antiCallOn ? "activado" : "desactivado";
    await sendSuccessReply(`Anti-call ${status} correctamente!`);
  },
};

