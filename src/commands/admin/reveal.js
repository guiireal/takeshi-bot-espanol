import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { PREFIX, TEMP_DIR } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { getRandomName } from "../../utils/index.js";

export default {
  name: "reveal",
  description: "Revela una imagen o video con vista única",
  commands: ["reveal", "rv"],
  usage: `${PREFIX}reveal (menciona una imagen/video) o ${PREFIX}revelar (responde a la imagen/video).`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    sendVideoFromFile,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "¡Necesitas etiquetar una imagen/video o responder a una imagen/video para revelarla!",
      );
    }

    await sendWaitReact();

    const mediaCaption = `¡Aquí está tu ${
      isImage ? "imagen" : "video"
    } revelada!`;

    const outputPath = path.resolve(
      TEMP_DIR,
      `${getRandomName()}.${isImage ? "jpg" : "mp4"}`,
    );

    let inputPath;

    try {
      if (isImage) {
        inputPath = await downloadImage(webMessage, "input");

        await new Promise((resolve, reject) => {
          exec(`ffmpeg -y -i "${inputPath}" -q:v 2 "${outputPath}"`, async (error) => {
            if (error) {
              console.error("Error FFmpeg:", error);
              reject(error);
              return;
            }
            await sendImageFromFile(outputPath, mediaCaption);
            await sendSuccessReact();
            resolve();
          });
        });
      } else if (isVideo) {
        inputPath = await downloadVideo(webMessage, "input");

        await new Promise((resolve, reject) => {
          exec(`ffmpeg -y -i "${inputPath}" -c copy "${outputPath}"`, async (error) => {
            if (error) {
              console.error("Error FFmpeg:", error);
              reject(error);
              return;
            }
            await sendVideoFromFile(outputPath, mediaCaption);
            await sendSuccessReact();
            resolve();
          });
        });
      }
    } catch (error) {
      console.error("Error general:", error);
      throw new Error(
        "Ocurrió un error al procesar el medio. Intenta de nuevo.",
      );
    } finally {
      const cleanFile = (filePath) => {
        if (filePath && fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (cleanError) {
            console.error("Error al limpiar archivo:", cleanError);
          }
        }
      };

      cleanFile(inputPath);
      cleanFile(outputPath);
    }
  },
};
