import { PREFIX } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { setSpiderApiToken } from "../../utils/database.js";

export default {
  name: "set-spider-api-token",
  description: "Cambia el token de la API de Spider X.",
  commands: [
    "set-spider-api-token",
    "altera-spider-api-token",
    "alterar-spider-api-token",
    "muda-spider-api-token",
    "mudar-spider-api-token",
    "spider-api-token",
  ],
  usage: `${PREFIX}set-spider-api-token token aqui`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ args, sendSuccessReply }) => {
    if (!args.length) {
      throw new InvalidParameterError("Debes fornecer um token!");
    }

    if (args[0].length < 8 || args[0].length > 25) {
      throw new InvalidParameterError(
        "O token deve ter entre .* y .* caracteres!"
      );
    }

    const newToken = args[0];

    setSpiderApiToken(newToken);

    await sendSuccessReply(
      `Token de la API de Spider X configurado con éxito!`
    );
  },
};
