import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";
import {
  isActiveGroupRestriction,
  updateIsActiveGroupRestriction,
} from "../../utils/database.js";
import { isFalse, isTrue } from "../../utils/index.js";

export default {
  name: "anti-status-grupo",
  description:
    "Ativa/desativa o recurso de anti-status-grupo no grupo, removendo quem marcar status no grupo.",
  commands: [
    "anti-status-grupo",
    "anti-marcacao-status-grupo",
    "anti-marcação-status-grupo",
  ],
  usage: `${PREFIX}anti-status-grupo (1/0)`,
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
    const antiStatusGrupoOn = isTrue(args[0]);
    const antiStatusGrupoOff = isFalse(args[0]);
    if (!antiStatusGrupoOn && !antiStatusGrupoOff) {
      throw new InvalidParameterError(
        "Debes escribir 1 ou 0 (activar o desactivar)!",
      );
    }
    const hasActive =
      antiStatusGrupoOn &&
      isActiveGroupRestriction(remoteJid, "anti-status-grupo");
    const hasInactive =
      antiStatusGrupoOff &&
      !isActiveGroupRestriction(remoteJid, "anti-status-grupo");
    if (hasActive || hasInactive) {
      throw new WarningError(
        `El recurso de anti-status-grupo ya está ${
          antiStatusGrupoOn ? "activado" : "desactivado"
        }!`,
      );
    }
    updateIsActiveGroupRestriction(
      remoteJid,
      "anti-status-grupo",
      antiStatusGrupoOn,
    );
    const status = antiStatusGrupoOn ? "activado" : "desactivado";
    await sendSuccessReply(`Anti-status-grupo ${status} correctamente!`);
  },
};

