const { PREFIX } = require(`${BASE_DIR}/config`);
const { delay } = require("baileys");

module.exports = {
  name: "send-edited-message",
  description: "Ejemplo de cómo enviar un mensaje editado",
  commands: ["send-edited-message"],
  usage: `${PREFIX}send-edited-message`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
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
      "Voy a demostrar cómo enviar un mensaje de texto y después editarlo."
    );

    await delay(3000);

    const messageTextResponse = await sendText("Este es el mensaje original.");

    await delay(3000);

    await sendEditedText("Este es el mensaje editado. ✅", messageTextResponse);

    await delay(3000);

    await sendReply(
      "Ahora voy a enviar un mensaje de texto encima del tuyo y editarlo."
    );

    await delay(3000);

    const messageEditedResponse = await sendReply(
      "Este es el mensaje original."
    );

    await delay(3000);

    await sendEditedReply(
      "Este es el mensaje editado. ✅",
      messageEditedResponse
    );

    await delay(3000);

    await sendReply(
      `*Ejemplo práctico*
      
\`\`\`const messageTextResponse = await sendText("Este es el mensaje original.");

await sendEditedText("Este es el mensaje editado. ✅", messageTextResponse);\`\`\``
    );
  },
};
