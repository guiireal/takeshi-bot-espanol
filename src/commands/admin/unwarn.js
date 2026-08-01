import { BOT_LID, OWNER_LID } from "../../config.js";
import { DangerError, InvalidParameterError } from "../../errors/index.js";
import { onlyNumbers } from "../../utils/index.js";
import { errorLog } from "../../utils/logger.js";
import {
  getAllWarns,
  removeLastWarn,
  revokeWarnByIndex,
} from "../../utils/warnSystem.js";

export default {
  name: "unwarn",
  description: "Remove ou lista advertencias válidas.",
  commands: [
    "unwarn",
    "perdoaradvertência",
    "perdoaradvt",
    "removeradvertencia",
    "advtremove",
  ],
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    args,
    isReply,
    replyLid,
    remoteJid,
    sendReply,
    sendErrorReply,
  }) => {
    try {
      if (!args.length && !isReply) {
        throw new InvalidParameterError(
          "Menciona a un usuario o responde a un mensaje.",
        );
      }

      if (args.length && !args[0].includes("@")) {
        throw new InvalidParameterError('Usa "@" al mencionar a un usuario.');
      }

      const targetLid = isReply ? replyLid : `${onlyNumbers(args[0])}@lid`;

      if (!targetLid) {
        throw new InvalidParameterError("¡Miembro inválido!");
      }

      if (targetLid === BOT_LID || targetLid === OWNER_LID) {
        throw new DangerError(
          "No es posible alterar las advertencias de este usuario.",
        );
      }

      const action = args[1]?.toLowerCase();
      const allWarns = getAllWarns(remoteJid, targetLid);
      const validWarns = allWarns.filter((w) => w.valid);

      if (validWarns.length === 0) {
        return sendReply("El usuario no tiene advertencias válidas.");
      }

      if (action === "list") {
        let msg = `📋 *Advertencias válidas de @${targetLid.split("@")[0]}:*\n\n`;
        validWarns.forEach((w, i) => {
          const date = new Date(w.timestamp).toLocaleDateString("pt-BR");
          msg += `${i + 1}. "${w.reason}" (${date})\n`;
        });

        return sendReply(msg, [targetLid]);
      }

      if (action && !isNaN(action)) {
        const index = parseInt(action, 10) - 1;
        if (index >= 0 && index < validWarns.length) {
          revokeWarnByIndex(remoteJid, targetLid, index);
          return sendReply(`✅ Advertencia #${index + 1} eliminada.`);
        }
      }

      removeLastWarn(remoteJid, targetLid);
      await sendReply(`✅ Última advertência eliminada.`);
    } catch (error) {
      errorLog(JSON.stringify(error, null, 2));
      await sendErrorReply(`Error: ${error.message}`);
    }
  },
};
