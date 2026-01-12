import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "get-group-id",
  description: "Retorna el ID del grupo.",
  commands: ["get-group-id", "id-get", "id-group"],
  usage: `${PREFIX}get-group-id`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ remoteJid, sendSuccessReply, isGroup }) => {
    if (!isGroup) {
      throw new WarningError("Este comando debe ser usado dentro de un grupo.");
    }

    await sendSuccessReply(`*ID del grupo*: ${remoteJid}`);
  },
};
