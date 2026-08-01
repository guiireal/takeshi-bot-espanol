import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-mensaje-editada",
  description: "Ejemplo de como enviar uma mensaje editada",
  commands: ["enviar-mensaje-editada"],
  usage: `${PREFIX}enviar-mensaje-editada`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    sendReact,
    sendReply,
    sendText,
    sendEditedReply,
    sendEditedText,
  }) => {
    await sendReact("✏️");

    await delay(3000);

    await sendReply(
      "Voy demonstrar como enviar uma mensaje de texto e depois editar ela.",
    );

    await delay(3000);

    const messageTextResponse = await sendText("Esta es a mensaje original.");

    await delay(3000);

    await sendEditedText("Esta es a mensaje editada. ✅", messageTextResponse);

    await delay(3000);

    await sendReply(
      "Ahora voy enviar uma mensaje de texto em cima da sua e editar ela.",
    );

    await delay(3000);

    const messageEditedResponse = await sendReply(
      "Esta es a mensaje original.",
    );

    await delay(3000);

    await sendEditedReply(
      "Esta es a mensaje editada. ✅",
      messageEditedResponse,
    );

    await delay(3000);

    await sendReply(
      `*Ejemplo prático*
      
\`\`\`
const messageTextResponse = await sendText("Esta es a mensaje original.");

await sendEditedText("Esta es a mensaje editada. ✅", messageTextResponse);
\`\`\``,
    );
  },
};
