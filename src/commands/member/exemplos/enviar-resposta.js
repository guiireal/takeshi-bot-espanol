import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-respuesta",
  description:
    "Ejemplo de diferentes tipos de respuestas (sucesso, erro, aviso, espera)",
  commands: ["enviar-respuesta"],
  usage: `${PREFIX}enviar-respuesta`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    sendReply,
    sendSuccessReply,
    sendErrorReply,
    sendWarningReply,
    sendWaitReply,
    sendReact,
  }) => {
    await sendReact("💬");

    await delay(3000);

    await sendReply(
      "Voy demonstrar diferentes tipos de respuestas disponibles:"
    );

    await delay(3000);

    await sendSuccessReply("Esta es uma mensaje de sucesso! ✅");

    await delay(3000);

    await sendErrorReply("Esta es uma mensaje de erro! ❌");

    await delay(3000);

    await sendWarningReply("Esta es uma mensaje de aviso! ⚠️");

    await delay(3000);

    await sendWaitReply("Esta es uma mensaje de espera! ⏳");

    await delay(3000);

    await sendReply("E esta é uma respuesta normal usando sendReply");

    await delay(3000);

    await sendReply(
      "📋 *Tipos de respuesta disponibles:*\n\n" +
        "• `sendReply()` - Respuesta normal\n" +
        "• `sendSuccessReply()` - Respuesta de sucesso (com ✅)\n" +
        "• `sendErrorReply()` - Respuesta de erro (com ❌)\n" +
        "• `sendWarningReply()` - Respuesta de aviso (com ⚠️)\n" +
        "• `sendWaitReply()` - Respuesta de espera (com ⏳)\n\n" +
        "Use cada uma conforme o contexto apropriado!"
    );
  },
};
