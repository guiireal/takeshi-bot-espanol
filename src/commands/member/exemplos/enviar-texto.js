import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-texto",
  description:
    "Ejemplo de como enviar mensajes de texto simples e com menções",
  commands: ["enviar-texto"],
  usage: `${PREFIX}enviar-texto`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendText, sendReact, userLid }) => {
    await sendReact("💬");

    await delay(3000);

    await sendReply("Voy demonstrar diferentes formas de enviar texto");

    await delay(3000);

    await sendText("Esta es uma mensaje de texto simples usando sendText");

    await delay(3000);

    await sendText(
      `Olá! Esta mensaje menciona tú: @${userLid.split("@")[0]}`,
      [userLid]
    );

    await delay(3000);

    await sendReply("Esta es uma respuesta usando sendReply");

    await delay(3000);

    await sendText(
      "Tú pode usar *negrito*, _itálico_, ~riscado~ e ```código``` no texto!"
    );

    await delay(3000);

    await sendText(
      "📝 *Diferenças entre as funciones:*\n\n" +
        "• `sendText()` - Envia texto simples, com opción de mencionar usuários\n" +
        "• `sendReply()` - Envia texto como respuesta à mensaje atual\n\n" +
        "Ambas suportam formatação do WhatsApp!"
    );
  },
};
