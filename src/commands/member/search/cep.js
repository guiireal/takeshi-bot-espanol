import { consultarCep } from "correios-brasil";
import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { errorLog } from "../../../utils/logger.js";

export default {
  name: "cep",
  description: "Consulta un código postal brasileño.",
  commands: ["cep"],
  usage: `${PREFIX}cep 01001-001`,
  handle: async ({ args, sendWarningReply, sendSuccessReply }) => {
    const cep = args[0];

    if (!cep || ![8, 9].includes(cep.length)) {
      throw new InvalidParameterError(
        "¡Debes enviar un CEP con el formato 00000-000 o 00000000!",
      );
    }

    try {
      const data = await consultarCep(cep);

      if (!data.cep) {
        await sendWarningReply("¡No se encontró el CEP!");
        return;
      }

      await sendSuccessReply(`*Resultado*

*CEP*: ${data.cep}
*Dirección*: ${data.logradouro}
*Complemento*: ${data.complemento}
*Barrio*: ${data.bairro}
*Localidad*: ${data.localidade}
*Estado*: ${data.uf}
*IBGE*: ${data.ibge}`);
    } catch (error) {
      errorLog(JSON.stringify(error, null, 2));
      throw new Error(error.message);
    }
  },
};
