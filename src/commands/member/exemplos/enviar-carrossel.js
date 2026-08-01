import { delay } from "baileys";
import { PREFIX } from "../../../config.js";

export default {
  name: "enviar-carrusel",
  description: "Ejemplo de como enviar mensajes em formato carrusel (cards)",
  commands: ["enviar-carrusel", "enviar-carrossel"],
  usage: `${PREFIX}enviar-carrusel`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ socket, remoteJid, sendReply, sendReact }) => {
    await sendReact("🎠");

    await delay(2000);

    await sendReply(`Voy enviar um ejemplo de mensaje em carrusel (cards)
  
⚠️ Atención: no funciona no WhatsApp Business!`);

    await delay(3000);

    await socket.sendMessage(remoteJid, {
      text: "🎨 Galeria de Ejemplos",
      footer: "Deslize para ver todos os cards →",
      cards: [
        {
          title: "🖼️ Card 1: Imagen de Ejemplo",
          image: {
            url: "https://api.spiderx.com.br/storage/samples/sample-image.jpg",
          },
          caption: "Esta es a primeira imagen do carrusel",
        },
        {
          title: "📸 Card 2: Outra Imagen",
          image: {
            url: "https://api.spiderx.com.br/assets/images/logo.png",
          },
          caption: "Segunda imagen com descrição diferente",
        },
        {
          title: "🎭 Card 3: Terceira Opción",
          image: {
            url: "https://api.spiderx.com.br/storage/samples/sample-image.jpg",
          },
          caption: "Outro ejemplo de card no carrusel",
        },
      ],
      viewOnce: true,
    });

    await delay(3000);

    await sendReply(`📋 *Como usar mensajes carrusel:*

\`\`\`
await socket.sendMessage(remoteJid, {
  text: 'Título principal',
  footer: 'Rodapé da mensaje',
  cards: [
    {
      title: 'Título do card',
      image: { url: 'URL da imagen' },
      caption: 'Descrição do card'
    }
  ],
  viewOnce: true
});
\`\`\`

💡 *Dicas:*
• Tú pode adicionar quantos cards quiser
• \`viewOnce: true\` é obrigatório
• Cada card precisa de \`title\`, \`image\` e \`caption\`
⚠️ Importante: a baileys do Takeshi foi modificada para suportar mensajes em carrusel!`);
  },
};
