import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-contato",
  description: "Ejemplo de como enviar um contato",
  commands: ["enviar-contato"],
  usage: `${PREFIX}enviar-contato`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendReact, sendContact }) => {
    await sendReact("📲");

    await delay(3000);

    await sendReply("Voy enviar o contato do meu criador.");

    await delay(3000);

    await sendContact("+55 11 99612-2056", "Dev Gui");

    await delay(3000);

    await sendReply(
      "Use a función `sendContact('+55 99 99999-9999', 'Nome do contato')` para enviar um contato!"
    );
  },
};
