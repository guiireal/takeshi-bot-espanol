import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-localizacao",
  description: "Ejemplo de como enviar uma localização",
  commands: ["enviar-localizacao"],
  usage: `${PREFIX}enviar-localizacao`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendReact, sendLocation }) => {
    await sendReact("📍");

    await delay(3000);

    await sendReply("Voy enviar a localização da Praça da Sé - SP.");

    await delay(3000);

    await sendLocation(-23.55052, -46.633308);

    await delay(3000);

    await sendReply("Ahora enviarei de Nova York, EUA.");

    await delay(3000);

    await sendLocation(40.712776, -74.005974);

    await delay(3000);

    await sendReply(
      "Use a función `sendLocation(latitude, longitude)` para enviar uma localização!"
    );
  },
};
