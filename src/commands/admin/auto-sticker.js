import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";
import {
  activateAutoStickerGroup,
  deactivateAutoStickerGroup,
  isActiveAutoStickerGroup,
} from "../../utils/database.js";

export default {
  name: "auto-sticker",
  description: "Activa/desactiva el recurso de auto-sticker en el grupo.",
  commands: ["auto-sticker", "auto-figu", "auto-fig", "auto-stick"],
  usage: `${PREFIX}auto-sticker (1/0)`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Necesitas proporcionar 1 para activar o 0 para desactivar el auto-sticker."
      );
    }

    const autoStickerEncender = args[0] == "1";
    const autoStickerApagar = args[0] == "0";

    if (!autoStickerEncender && !autoStickerApagar) {
      throw new InvalidParameterError(
        "Necesitas proporcionar 1 para activar o 0 para desactivar el auto-sticker."
      );
    }

    const hasActive =
      autoStickerEncender && isActiveAutoStickerGroup(remoteJid);
    const hasInactive =
      autoStickerApagar && !isActiveAutoStickerGroup(remoteJid);

    if (hasActive || hasInactive) {
      throw new WarningError(
        `El recurso de auto-sticker fue activado con éxito!
          autoStickerEncender ? "activado" : "desactivado"
        }!`
      );
    }

    if (autoStickerEncender) {
      activateAutoStickerGroup(remoteJid);
    } else {
      deactivateAutoStickerGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = autoStickerEncender ? "activado" : "desactivado";
    await sendReply(`Recurso de auto-sticker ${context} con éxito!`);
  },
};
