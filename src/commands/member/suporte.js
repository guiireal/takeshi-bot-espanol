import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
    args,
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

    const doubleContext = args.length > 0 && replyText;
    const text = args.length > 0 ? fullArgs : replyText;

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

    const rootDir = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../..",
    );

    let imagePath = null;
    try {
      if (isImage) {
        imagePath = await downloadImage(webMessage, getRandomName());
      }

      const finalText = doubleContext
        ? `Contexto anterior: ${replyText}\n\nNueva pregunta: ${text}`
        : text;

      if (finalText && (finalText.length < 5 || finalText.length > 2048)) {
        throw new DangerError(
          "La pregunta debe tener entre 5 y 2048 caracteres.",
        );
      }

      const messages = [
        {
          role: "system",
          content: `Eres un asistente especializado en soporte técnico del Takeshi Bot.

Responde solo sobre tecnología, programación, desarrollo de bots, inteligencia artificial, machine learning o asuntos relacionados con Takeshi Bot.
Responde en español claro y directo. No uses frases de apertura o cierre innecesarias ni guiones largos para estructurar ideas.
En WhatsApp, nunca escribas el lenguaje después de las tres comillas de un bloque de código.
La parte en prosa debe tener como máximo 3 párrafos cortos o 150 palabras, salvo que el usuario pida una explicación más profunda.
Entrega solamente lo solicitado y termina la respuesta sin ofrecer ayuda adicional.

Usa los archivos del proyecto enviados como contexto técnico.`,
        },
      ];

      const contextFiles = [
        "README.md",
        "CONTRIBUTING.md",
        "package.json",
        "src/menu.js",
        "src/connection.js",
        "src/loader.js",
        "src/@types/index.d.ts",
      ];

      for (const relativePath of contextFiles) {
        const contextPath = path.join(rootDir, relativePath);
        if (fs.existsSync(contextPath)) {
          messages.push({
            role: "system",
            content: fs.readFileSync(contextPath, "utf8"),
          });
        }
      }

      const userContent = [];
      if (finalText) userContent.push({ type: "text", text: finalText });

      if (imagePath && fs.existsSync(imagePath)) {
        const buffer = fs.readFileSync(imagePath);
        const base64 = buffer.toString("base64");
        const extension = path.extname(imagePath).toLowerCase();
        const mimeType =
          extension === ".png"
            ? "image/png"
            : extension === ".webp"
              ? "image/webp"
              : extension === ".gif"
                ? "image/gif"
                : "image/jpeg";

        userContent.push({
          type: "image_url",
          image_url: { url: `data:${mimeType};base64,${base64}`, detail: "low" },
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
