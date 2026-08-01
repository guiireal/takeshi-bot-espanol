import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";
import {
  isActiveGroupRestriction,
  updateIsActiveGroupRestriction,
} from "../../utils/database.js";
import { isFalse, isTrue } from "../../utils/index.js";

export default {
  name: "anti-lottie-sticker",
  description:
    "Activa/desactiva anti-lottie-sticker en el grupo y elimina el sticker lottie cuando está activo.",
  commands: [
    "anti-lottie-sticker",
    "anti-lottie-figu",
    "anti-lottie-figurinha",
    "anti-lottie-figurinhas",
  ],
  usage: `${PREFIX}anti-lottie-sticker (1/0)`,
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
    const antiLottieStickerOn = isTrue(args[0]);
    const antiLottieStickerOff = isFalse(args[0]);
    if (!antiLottieStickerOn && !antiLottieStickerOff) {
      throw new InvalidParameterError(
        "Debes escribir 1 ou 0 (activar o desactivar)!",
      );
    }
    const hasActive =
      antiLottieStickerOn &&
      isActiveGroupRestriction(remoteJid, "anti-lottieSticker");
    const hasInactive =
      antiLottieStickerOff &&
      !isActiveGroupRestriction(remoteJid, "anti-lottieSticker");
    if (hasActive || hasInactive) {
      throw new WarningError(
        `El recurso de anti-lottie-sticker ya está ${
          antiLottieStickerOn ? "activado" : "desactivado"
        }!`,
      );
    }
    updateIsActiveGroupRestriction(
      remoteJid,
      "anti-lottieSticker",
      antiLottieStickerOn,
    );
    const status = antiLottieStickerOn ? "activado" : "desactivado";
    await sendSuccessReply(`Anti-lottie-sticker ${status} correctamente!`);
  },
};
