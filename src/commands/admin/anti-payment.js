import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";
import {
  isActiveGroupRestriction,
  updateIsActiveGroupRestriction,
} from "../../utils/database.js";
import { isFalse, isTrue } from "../../utils/index.js";

export default {
  name: "anti-payment",
  description:
    "Ativa/desativa o recurso de anti-payment no grupo, fechando o grupo, removendo o autor e limpando o chat.",
  commands: ["anti-payment", "anti-pagamento"],
  usage: `${PREFIX}anti-payment (1/0)`,
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
    const antiPaymentOn = isTrue(args[0]);
    const antiPaymentOff = isFalse(args[0]);
    if (!antiPaymentOn && !antiPaymentOff) {
      throw new InvalidParameterError(
        "Debes escribir 1 ou 0 (activar o desactivar)!",
      );
    }
    const hasActive =
      antiPaymentOn && isActiveGroupRestriction(remoteJid, "anti-payment");
    const hasInactive =
      antiPaymentOff && !isActiveGroupRestriction(remoteJid, "anti-payment");
    if (hasActive || hasInactive) {
      throw new WarningError(
        `El recurso de anti-payment ya está ${
          antiPaymentOn ? "activado" : "desactivado"
        }!`,
      );
    }
    updateIsActiveGroupRestriction(remoteJid, "anti-payment", antiPaymentOn);
    const status = antiPaymentOn ? "activado" : "desactivado";
    await sendSuccessReply(`Anti-payment ${status} correctamente!`);
  },
};

