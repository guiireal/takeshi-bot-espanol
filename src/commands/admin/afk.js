import { PREFIX } from "../../config.js";
import { DangerError } from "../../errors/index.js";
import { setAfkMember } from "../../utils/database.js";

export default {
  name: "afk",
  description: "Informa que tú está ausente e registra o motivo.",
  commands: ["afk", "ausente"],
  usage: `${PREFIX}afk <motivo>`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    fullArgs,
    isGroup,
    remoteJid,
    sendSuccessReply,
    userLid,
  }) => {
    if (!isGroup) {
      throw new DangerError("Este comando solo puede usarse en grupos.");
    }

    const reason = fullArgs.trim() || "no indicado";

    setAfkMember(remoteJid, userLid, reason);

    await sendSuccessReply("Ausência cadastrada correctamente!");
  },
};
