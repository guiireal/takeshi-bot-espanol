import { PREFIX } from "../../../config.js";

export default {
  name: "ejemplos-de-mensajes",
  description:
    "Lista todos os ejemplos disponibles de envio de mensajes para desenvolvedores",
  commands: [
    "ejemplos-de-mensajes",
    "ejemplos",
    "help-ejemplos",
    "ejemplo-de-mensaje",
    "ejemplo-de-mensajes",
    "enviar-ejemplos",
    "enviar-ejemplo",
  ],
  usage: `${PREFIX}ejemplos-de-mensajes`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendReact, prefix }) => {
    await sendReact("📚");

    await sendReply(
      "*📚 EXEMPLOS DISPONÍVEIS*\n\n" +
        "Use os comandos abaixo para ver ejemplos práticos de cómo usar os meus comandos:\n\n" +

        "*🔊 ÁUDIO*\n" +
        `• \`${prefix}enviar-audio-de-archivo\` - Enviar audio de archivo local\n` +
        `• \`${prefix}enviar-audio-de-url\` - Enviar audio de URL\n` +
        `• \`${prefix}enviar-audio-de-buffer\` - Enviar audio de buffer\n\n` +

        "*🖼️ IMAGEM*\n" +
        `• \`${prefix}enviar-imagen-de-archivo\` - Enviar imagen de archivo local\n` +
        `• \`${prefix}enviar-imagen-de-url\` - Enviar imagen de URL\n` +
        `• \`${prefix}enviar-imagen-de-buffer\` - Enviar imagen de buffer\n\n` +

        "*🎬 VÍDEO*\n" +
        `• \`${prefix}enviar-video-de-archivo\` - Enviar video de archivo local\n` +
        `• \`${prefix}enviar-video-de-url\` - Enviar video de URL\n` +
        `• \`${prefix}enviar-video-de-buffer\` - Enviar video de buffer\n\n` +

        "*🎞️ GIF*\n" +
        `• \`${prefix}enviar-gif-de-archivo\` - Enviar GIF de archivo local\n` +
        `• \`${prefix}enviar-gif-de-url\` - Enviar GIF de URL\n` +
        `• \`${prefix}enviar-gif-de-buffer\` - Enviar GIF de buffer\n\n` +

        "*🏷️ STICKER*\n" +
        `• \`${prefix}enviar-sticker-de-archivo\` - Enviar sticker de archivo local\n` +
        `• \`${prefix}enviar-sticker-de-url\` - Enviar sticker de URL\n` +
        `• \`${prefix}enviar-sticker-de-buffer\` - Enviar sticker de buffer\n\n` +

        "*📊 ENQUETE*\n" +
        `• \`${prefix}enviar-enquete\` - Enviar enquetes/votações (elige única ou múltipla)\n\n` +

        "*📍 LOCALIZAÇÃO*\n" +
        `• \`${prefix}enviar-localizacao\` - Enviar localização\n\n` +

        "*📲 CONTATO*\n" +
        `• \`${prefix}enviar-contato\` - Enviar contato\n\n` +

        "*📄 DOCUMENTO*\n" +
        `• \`${prefix}enviar-documento-de-archivo\` - Enviar documento de archivo local\n` +
        `• \`${prefix}enviar-documento-de-url\` - Enviar documento de URL\n` +
        `• \`${prefix}enviar-documento-de-buffer\` - Enviar documento de buffer\n\n` +

        "*💬 TEXTO E RESPOSTAS*\n" +
        `• \`${prefix}enviar-texto\` - Enviar texto (com/sem menção)\n` +
        `• \`${prefix}enviar-respuesta\` - Responder mensajes (com/sem menção)\n` +
        `• \`${prefix}enviar-reacoes\` - Enviar reações (emojis)\n` +
        `• \`${prefix}enviar-mensaje-editada\` - Enviar mensajes editadas\n\n` +

        "*📊 DADOS E METADADOS*\n" +
        `• \`${prefix}obter-dados-grupo\` - Obter dados do grupo (nome, dono, participantes)\n` +
        `• \`${prefix}obter-metadados-mensaje\` - Obter metadados da mensaje\n` +
        `• \`${prefix}funcoes-grupo\` - Funciones utilitárias de grupo (demonstração)\n` +
        `• \`${prefix}raw-message\` - Obter dados brutos da mensaje\n\n` +

        "*🎠 CARROSSEL (CARDS)*\n" +
        `• \`${prefix}enviar-carrusel\` - Enviar mensaje em formato carrusel (cards)\n\n` +

        "*🔘 BOTÕES E LISTAS*\n" +
        `• \`${prefix}enviar-botoes\` - Enviar mensajes com botones simples, templates e interativos\n` +
        `• \`${prefix}enviar-lista\` - Enviar mensaje em formato de lista\n` +
        `• \`${prefix}ejemplo-gatilho <parâmetro>\` - Receber o clique de botones e listas\n\n` +

        "*🧩 RICH RESPONSE*\n" +
        `• \`${prefix}enviar-texto-colorido\` - Enviar texto destacado/colorido em rich response\n` +
        `• \`${prefix}enviar-codigo\` - Enviar bloco de código em rich response\n` +
        `• \`${prefix}enviar-tabela\` - Enviar tabela em rich response\n` +
        `• \`${prefix}enviar-reels\` - Enviar reels em rich response\n` +
        `• \`${prefix}enviar-latex\` - Enviar fórmula LaTeX em rich response\n\n` +

        "*🎯 COMO USAR*\n\n" +
        "1️⃣ Execute qualquer comando da lista acima\n" +
        "2️⃣ Observe o comportamento prático\n" +
        "3️⃣ Veja o código fonte em `/src/commands/member/ejemplos/`\n" +
        "4️⃣ Use como base para seus próprios comandos\n\n" +
        "*💡 Dica:* Todos os ejemplos incluem explicações detalhadas e casos de uso!\n\n" +

        "*📝 FUNÇÕES DISPONÍVEIS*\n\n" +
        "Veja o archivo `@types/index.d.ts` para documentação completa de todas as funciones disponibles com ejemplos de código!",
    );
  },
};
