const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("node:child_process");

const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const { getBuffer, getRandomName } = require(`${BASE_DIR}/utils`);
const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);

module.exports = {
  name: "ia-sticker",
  description: "Crea un sticker basado en una descripción",
  commands: ["ia-sticker", "ia-fig"],
  usage: `${PREFIX}ia-sticker descripción`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendStickerFromFile,
    sendErrorReply,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args[0]) {
      return sendWarningReply(
        "Necesitas proporcionar una descripción para la imagen."
      );
    }

    await sendWaitReply("generando sticker...");

    const data = await imageAI(fullArgs);

    if (data.image) {
      const buffer = await getBuffer(data.image);

      const inputTempPath = path.resolve(TEMP_DIR, getRandomName("png"));
      const outputTempPath = path.resolve(TEMP_DIR, getRandomName("webp"));

      fs.writeFileSync(inputTempPath, buffer);

      const cmd = `ffmpeg -i "${inputTempPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease" -f webp -quality 90 "${outputTempPath}"`;

      exec(cmd, async (error, _, stderr) => {
        if (error) {
          console.error("Error FFmpeg:", error);
          await sendErrorReply(
            `Hubo un error al procesar la imagen. ¡Intenta de nuevo más tarde!

Detalles: ${stderr}`
          );
        } else {
          await sendSuccessReact();
          await sendStickerFromFile(outputTempPath);
          fs.unlinkSync(inputTempPath);
          fs.unlinkSync(outputTempPath);
        }
      });
    } else {
      await sendWarningReply(
        "No fue posible generar el sticker. Intenta de nuevo más tarde."
      );
    }
  },
};
