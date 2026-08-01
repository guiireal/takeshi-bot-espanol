import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-lista",
  description: "Ejemplo de como enviar mensajes em formato de lista",
  commands: ["enviar-lista", "lista-ejemplo", "lista-exemplo", "enviar-list"],
  usage: `${PREFIX}enviar-lista`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    socket,
    remoteJid,
    sendReply,
    sendReact,
    prefix,
  }) => {
    await sendReact("📋");

    const triggerCommand = (parametro) =>
      `${prefix || PREFIX}ejemplo-gatilho ${parametro}`;

    await delay(2000);

    await sendReply(`Voy enviar um ejemplo de mensaje em lista
      
⚠️ Atención: no funciona no WhatsApp Business!`);

    await delay(3000);

    await socket.sendMessage(remoteJid, {
      text: "Elige uma categoria para ver ejemplos",
      title: "Menu de ejemplos",
      footer: "Lista de opciones",
      buttonText: "Abrir lista",
      sections: [
        {
          title: "Mídias",
          rows: [
            {
              title: "Imagen",
              description: "Ejemplos de envio de imágenes",
              rowId: triggerCommand("imagen"),
            },
            {
              title: "Video",
              description: "Ejemplos de envio de videos",
              rowId: triggerCommand("video"),
            },
            {
              title: "Audio",
              description: "Ejemplos de envio de audios",
              rowId: triggerCommand("audio"),
            },
          ],
        },
        {
          title: "Interação",
          rows: [
            {
              title: "Botones",
              description: "Ejemplos com botones",
              rowId: triggerCommand("botoes"),
            },
            {
              title: "Carrusel",
              description: "Ejemplos em formato de cards",
              rowId: triggerCommand("carrusel"),
            },
          ],
        },
      ],
      viewOnce: true,
    });

    await delay(3000);

    await sendReply(`📋 *Como usar mensajes em lista:*

\`\`\`
await socket.sendMessage(remoteJid, {
  text: 'Descrição da lista',
  title: 'Título da lista',
  footer: 'Rodapé',
  buttonText: 'Abrir lista',
  viewOnce: true,
  sections: [
    {
      title: 'Seção',
      rows: [
        {
          title: 'Opción 1',
          description: 'Descrição da opción',
          rowId: '${prefix || PREFIX}ejemplo-gatilho imagen'
        }
      ]
    }
  ]
});
\`\`\`

💡 *Dicas:*
• \`buttonText\` é obrigatório para abrir a lista
• \`sections\` cria uma lista usando native flow por padrão
• \`useLegacyList: true\` força o formato antigo \`listMessage\`
• Cada seção pode ter várias linhas
• Use \`rowId\` para identificar a opción escolhida
⚠️ Importante: a baileys do Takeshi foi modificada para suportar listas!`);
  },
};
