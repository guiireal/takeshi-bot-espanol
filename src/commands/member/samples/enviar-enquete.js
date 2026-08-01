import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-enquete",
  description: "Ejemplo de como enviar enquetes/votações em grupos",
  commands: ["enviar-enquete", "poll-example", "ejemplo-poll", "exemplo-poll"],
  usage: `${PREFIX}enviar-enquete`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendPoll, sendReply, sendReact }) => {
    await sendReact("📊");

    await delay(2000);

    await sendPoll(
      "Enquete de elige única: Cuál sua opción preferida?",
      [
        { optionName: "Opción 1" },
        { optionName: "Opción 2" },
        { optionName: "Opción 3" },
      ],
      true
    );

    await delay(2000);

    await sendPoll(
      "Enquete múltipla elige: Quais comidas tú gosta?",
      [
        { optionName: "Pizza 🍕" },
        { optionName: "Hambúrguer 🍔" },
        { optionName: "Sushi 🍣" },
        { optionName: "Salada 🥗" },
        { optionName: "Sorvete 🍦" },
      ],
      false
    );

    await delay(2000);

    await sendReply(
      "Tú pode criar suas próprias enquetes facilmente usando a función sendPoll(title, options, singleChoice)."
    );
  },
};
