import fs from "node:fs";
import OpenAI from "openai";
import { BOT_EMOJI, OPENAI_API_KEY, PREFIX } from "../../config.js";
import { DangerError, WarningError } from "../../errors/index.js";
import {
  getRandomName,
  normalizeWhatsAppCodeBlocks,
  removeUnsolicitedFollowUps,
} from "../../utils/index.js";

export default {
  name: "suporte",
  description: "Soporte inteligente del Takeshi Bot con IA.",
  commands: ["suporte", "soporte", "help", "ayuda"],
  usage: `${PREFIX}suporte cómo instalar Takeshi en Termux?`,
  handle: async ({
    fullArgs,
    replyText,
    sendReply,
    sendWaitReply,
    sendReact,
    isImage,
    isVideo,
    isAudio,
    downloadImage,
    webMessage,
  }) => {
    if (!OPENAI_API_KEY) {
      throw new WarningError(
        "El soporte inteligente no está disponible en este momento. Contacta al administrador del bot.",
      );
    }

    if (isVideo || isAudio) {
      throw new WarningError(
        "Todavía no puedo interpretar videos ni audios. Envía una imagen o texto.",
      );
    }

    const text = fullArgs.trim() || replyText;

    if (!text && !isImage) {
      await sendReact(BOT_EMOJI);
      await sendReply(
        `*Soporte Takeshi*\n\nHaz una pregunta sobre el bot y te ayudaré.\n\nEjemplos:\n\n${PREFIX}suporte el bot se apaga solo\n${PREFIX}suporte cómo instalarlo en Termux\n${PREFIX}suporte error 401 de Spider X\nEnvía una imagen con ${PREFIX}suporte para analizarla`,
      );
      return;
    }

    await sendWaitReply("Analizando tu pregunta...");

    if (text && (text.length < 5 || text.length > 2048)) {
      throw new DangerError(
        "La pregunta debe tener entre 5 y 2048 caracteres.",
      );
    }

    let imagePath = null;
    try {
      if (isImage) {
        imagePath = await downloadImage(webMessage, getRandomName());
      }

      const messages = [
        {
          role: "system",
          content: `Eres un asistente especializado en soporte técnico del Takeshi Bot. Responde solo sobre tecnología, programación, bots, IA o Takeshi Bot. Responde en español claro y directo. No uses frases de apertura o cierre innecesarias. No uses guiones largos para estructurar ideas. En WhatsApp, nunca pongas el lenguaje después de las tres comillas de un bloque de código. Usa el README del proyecto como referencia:\n\n${fs.readFileSync("README.md", "utf8")}`,
        },
      ];

      const userContent = [];
      if (text) userContent.push({ type: "text", text });

      if (imagePath && fs.existsSync(imagePath)) {
        const base64 = fs.readFileSync(imagePath).toString("base64");
        userContent.push({
          type: "image_url",
          image_url: { url: `data:image/jpeg;base64,${base64}`, detail: "low" },
        });
      }

      messages.push({
        role: "user",
        content: userContent.length ? userContent : [{ type: "text", text: "¿Qué ves en esta imagen?" }],
      });

      const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
      const response = await openai.chat.completions.create({
        model: "gpt-5.6-luna",
        messages,
        reasoning_effort: "low",
        max_completion_tokens: 2048,
      });

      const answer = removeUnsolicitedFollowUps(
        normalizeWhatsAppCodeBlocks(response.choices[0].message.content?.trim()),
      );

      if (!answer) {
        throw new DangerError(
          "No encontré una respuesta. Reformula la pregunta con más detalles.",
        );
      }

      await sendReact(BOT_EMOJI);
      await sendReply(answer);
    } finally {
      if (imagePath && fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
  },
};
