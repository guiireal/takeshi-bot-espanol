import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";

const TRIGGERS = {
  opcao1: {
    origem: "Botones simples",
    destino: "Opción 1 do ejemplo de botones simples",
  },
  opcao2: {
    origem: "Botones simples",
    destino: "Opción 2 do ejemplo de botones simples",
  },
  respuestarapida: {
    origem: "Botones de template",
    destino: "Respuesta rápida do template button",
  },
  interativo1: {
    origem: "Botones interativos",
    destino: "Botón interativo 1",
  },
  interativo2: {
    origem: "Botones interativos",
    destino: "Botón interativo 2",
  },
  legado1: {
    origem: "Botones legados",
    destino: "Botón legado 1",
  },
  legado2: {
    origem: "Botones legados",
    destino: "Botón legado 2",
  },
  imagen: {
    origem: "Lista de ejemplos",
    destino: "Item Imagen",
  },
  video: {
    origem: "Lista de ejemplos",
    destino: "Item Video",
  },
  audio: {
    origem: "Lista de ejemplos",
    destino: "Item Audio",
  },
  botoes: {
    origem: "Lista de ejemplos",
    destino: "Item Botones",
  },
  carrusel: {
    origem: "Lista de ejemplos",
    destino: "Item Carrusel",
  },
};

function normalizeTrigger(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export default {
  name: "ejemplo-gatilho",
  description: "Mostra qual botón ou item de lista acionou o comando",
  commands: ["ejemplo-gatilho", "gatilho-ejemplo", "exemplo-gatilho", "gatilho-exemplo"],
  usage: `${PREFIX}ejemplo-gatilho <parâmetro>`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ fullArgs, prefix, sendReact, sendReply }) => {
    const parametro = fullArgs?.trim() || "";

    if (!parametro) {
      throw new InvalidParameterError(
        `Informe o parâmetro. Ejemplo: ${prefix || PREFIX}ejemplo-gatilho opcao1`,
      );
    }

    const trigger = TRIGGERS[normalizeTrigger(parametro)];

    await sendReact("🎯");

    if (!trigger) {
      await sendReply(
        "🎯 *Gatilho recebido*\n\n" +
          `• Parâmetro: \`${parametro}\`\n` +
          "• Status: não mapeado\n\n" +
          "Esse comando recebeu o clique corretamente. Ahora tú pode mapear esse parâmetro para a ação desejada.",
      );
      return;
    }

    await sendReply(
      "🎯 *Gatilho recebido*\n\n" +
        `• Origem: ${trigger.origem}\n` +
        `• Parâmetro: \`${parametro}\`\n` +
        `• Destino: ${trigger.destino}\n\n` +
        "Esse é o ponto onde tú coloca a lógica que deve acontecer quando o usuário toca no botón ou item da lista.",
    );
  },
};
