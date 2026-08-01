import { PREFIX } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { toUserJid } from "../../utils/index.js";
import { errorLog } from "../../utils/logger.js";

export default {
  name: "block-wpp",
  description: "Bloquea un número en el WhatsApp del bot",
  commands: ["block-wpp", "blok-wpp", "bloquear-wpp"],
  usage: `${PREFIX}block-wpp <telefone>`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ args, socket, sendSuccessReply, sendErrorReply }) => {
    if (args.length !== 1) {
      throw new InvalidParameterError(
        `Informa un teléfono válido.
        
Ejemplo: ${PREFIX}block-wpp +5541123456789`,
      );
    }

    const memberToBlockJid = toUserJid(args[0]);

    try {
      await socket.updateBlockStatus(memberToBlockJid, "block");
      await sendSuccessReply("¡Número bloqueado con éxito!");
    } catch (error) {
      errorLog(`Error al bloquear el número: ${error.message}`);
      await sendErrorReply(
        `¡No fue posible bloquear el número!
        
Error: ${error.message}`,
      );
    }
  },
};
