import { PREFIX } from "../../config.js";
import InvalidParameterError from "../../errors/InvalidParameterError.js";

export default {
  name: "my-lid",
  description: "Devuelve el LID de la persona",
  commands: ["mi-lid", "my-lid", "lid"],
  usage: `${PREFIX}my-lid`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendSuccessReply, replyLid, userLid, args }) => {
    if (args.length) {
      throw new InvalidParameterError(`Ya no es posible poner el número delante.

Para obtener tu LID:

${PREFIX}mi-lid

Para ver el LID de otra persona, esta debe estar en el grupo y
debes responder con el comando:

${PREFIX}lid (respondiendo a cualquier mensaje de ella)`);
    }

    if (replyLid) {
      await sendSuccessReply(`LID del contacto mencionado: ${replyLid}`);
    } else {
      await sendSuccessReply(`Tu LID: ${userLid}`);
    }
  },
};
