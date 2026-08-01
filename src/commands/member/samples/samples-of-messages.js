import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "samples-of-messages",
  description:
    "Lista todos los ejemplos disponibles de envío de mensajes para desarrolladores",
  commands: ["samples-of-messages", "sample-of-messages"],
  usage: `${PREFIX}samples-of-messages`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("📚");

    await delay(2000);

    await sendReply(
      "*📚 EJEMPLOS DISPONIBLES*\n\n" +
        "Usa los comandos a continuación para ver ejemplos prácticos de cómo usar mis comandos:",
    );

    await delay(2000);

    await sendReply(
      "*🔊 AUDIO:*\n" +
        `• \`${PREFIX}send-audio-from-file\` - Enviar audio desde archivo local\n` +
        `• \`${PREFIX}send-audio-from-url\` - Enviar audio desde URL\n` +
        `• \`${PREFIX}send-audio-from-buffer\` - Enviar audio desde buffer`,
    );

    await delay(2000);

    await sendReply(
      "*🖼️ IMAGEN:*\n" +
        `• \`${PREFIX}send-image-from-file\` - Enviar imagen desde archivo local\n` +
        `• \`${PREFIX}send-image-from-url\` - Enviar imagen desde URL\n` +
        `• \`${PREFIX}send-image-from-buffer\` - Enviar imagen desde buffer`,
    );

    await delay(2000);

    await sendReply(
      "*🎬 VIDEO:*\n" +
        `• \`${PREFIX}send-video-from-file\` - Enviar video desde archivo local\n` +
        `• \`${PREFIX}send-video-from-url\` - Enviar video desde URL\n` +
        `• \`${PREFIX}send-video-from-buffer\` - Enviar video desde buffer`,
    );

    await delay(2000);

    await sendReply(
      "*🎞️ GIF:*\n" +
        `• \`${PREFIX}send-gif-from-file\` - Enviar GIF desde archivo local\n` +
        `• \`${PREFIX}send-gif-from-url\` - Enviar GIF desde URL\n` +
        `• \`${PREFIX}send-gif-from-buffer\` - Enviar GIF desde buffer`,
    );

    await delay(2000);

    await sendReply(
      "*🏷️ STICKER:*\n" +
        `• \`${PREFIX}send-sticker-from-file\` - Enviar sticker desde archivo local\n` +
        `• \`${PREFIX}send-sticker-from-url\` - Enviar sticker desde URL\n` +
        `• \`${PREFIX}send-sticker-from-buffer\` - Enviar sticker desde buffer`,
    );

    await delay(2000);

    await sendReply(
      "*📊 ENCUESTA:*\n" +
        `• \`${PREFIX}send-poll\` - Enviar encuestas/votaciones (selección única o múltiple)`,
    );

    await delay(2000);

    await sendReply(
      "*📄 DOCUMENTO:*\n" +
        `• \`${PREFIX}send-document-from-file\` - Enviar documento desde archivo local\n` +
        `• \`${PREFIX}send-document-from-url\` - Enviar documento desde URL\n` +
        `• \`${PREFIX}send-document-from-buffer\` - Enviar documento desde buffer`,
    );

    await delay(2000);

    await sendReply(
      "*💬 TEXTO Y RESPUESTAS:*\n" +
        `• \`${PREFIX}send-text\` - Enviar texto (con/sin mención)\n` +
        `• \`${PREFIX}send-quoted\` - Responder mensajes (con/sin mención)\n` +
        `• \`${PREFIX}send-reaction\` - Enviar reacciones (emojis)`,
    );

    await delay(2000);

    await sendReply(
      "*📊 DATOS Y METADATOS:*\n" +
        `• \`${PREFIX}get-group-data\` - Obtener datos del grupo (nombre, dueño, participantes)\n` +
        `• \`${PREFIX}get-message-data\` - Obtener metadatos del mensaje\n` +
        `• \`${PREFIX}group-functions\` - Funciones utilitarias de grupo (demostración)\n` +
        `• \`${PREFIX}raw-message\` - Obtener datos brutos del mensaje`,
    );

    await delay(2000);

    await sendReply(
      "*🎯 CÓMO USAR:*\n\n" +
        "1️⃣ Ejecuta cualquier comando de la lista anterior\n" +
        "2️⃣ Observa el comportamiento práctico\n" +
        "3️⃣ Revisa el código fuente en `/src/commands/member/samples/`\n" +
        "4️⃣ Úsalo como base para tus propios comandos\n\n" +
        "*💡 Consejo:* ¡Todos los ejemplos incluyen explicaciones detalladas y casos de uso!",
    );

    await delay(2000);

    await sendReply(
      "*📝 FUNCIONES DISPONIBLES:*\n\n" +
        "¡Consulta el archivo `@types/index.d.ts` para la documentación completa de todas las funciones disponibles con ejemplos de código!",
    );
  },
};
