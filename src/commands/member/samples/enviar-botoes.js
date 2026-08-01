import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-botoes",
  description: "Ejemplo de como enviar mensajes com botones",
  commands: ["enviar-botoes", "enviar-botao", "botoes-ejemplo", "botoes-exemplo"],
  usage: `${PREFIX}enviar-botoes`,
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
    await sendReact("🔘");

    const triggerCommand = (parametro) =>
      `${prefix || PREFIX}ejemplo-gatilho ${parametro}`;

    await delay(2000);

    await sendReply(`Voy enviar ejemplos de mensajes com botones
      
⚠️ Atención: no funciona no WhatsApp Business!`);

    await delay(3000);

    await socket.sendMessage(remoteJid, {
      text: "Ejemplo com botones simples",
      footer: "Botones simples",
      buttons: [
        {
          buttonId: triggerCommand("opcao1"),
          buttonText: { displayText: "Opción 1" },
        },
        {
          buttonId: triggerCommand("opcao2"),
          buttonText: { displayText: "Opción 2" },
        },
      ],
      viewOnce: true,
    });

    await delay(3000);

    await socket.sendMessage(remoteJid, {
      text: "Ejemplo com botones interativos",
      footer: "Respuesta rápida, link, chamada e cópia",
      interactiveButtons: [
        {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: "Respuesta rápida",
            id: triggerCommand("respuesta-rapida"),
          }),
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Abrir site",
            url: "https://github.com/guiireal",
          }),
        },
        {
          name: "cta_call",
          buttonParamsJson: JSON.stringify({
            display_text: "Ligar",
            phone_number: "+5511999999999",
          }),
        },
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "Copiar código",
            copy_code: "TAKESHI2026",
          }),
        },
      ],
      viewOnce: true,
    });

    await delay(3000);

    await socket.sendMessage(remoteJid, {
      text: "Ejemplo com botones legados",
      footer: "Compatibilidade com buttonsMessage antigo",
      buttons: [
        {
          buttonId: triggerCommand("legado1"),
          buttonText: { displayText: "Legado 1" },
        },
        {
          buttonId: triggerCommand("legado2"),
          buttonText: { displayText: "Legado 2" },
        },
      ],
      useLegacyButtons: true,
    });

    await delay(3000);

    await sendReply(`📋 *Como usar mensajes com botones:*

\`\`\`
await socket.sendMessage(remoteJid, {
  text: 'Elige uma opción',
  footer: 'Rodapé',
  interactiveButtons: [
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: 'Abrir site',
        url: 'https://github.com/guiireal'
      })
    }
  ],
  viewOnce: true
});
\`\`\`

💡 *Dicas:*
• \`buttons\` cria botones simples usando native flow por padrão
• \`useLegacyButtons: true\` força o formato antigo \`buttonsMessage\`
• \`interactiveButtons\` aceita \`quick_reply\`, \`cta_url\`, \`cta_call\`, \`cta_copy\`, \`single_select\`, entre outros
• \`templateButtons\` não é mais renderizado pelo WhatsApp em números comuns, use \`interactiveButtons\`
⚠️ Importante: a baileys do Takeshi foi modificada para suportar esses formatos!`);
  },
};
