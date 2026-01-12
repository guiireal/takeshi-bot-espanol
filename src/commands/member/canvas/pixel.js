/**
 * Desarrollado por: MRX
 * Refactorizado por: Dev Gui
 *
 * @author Dev Gui
 */
import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { Ffmpeg } from "../../../services/ffmpeg.js";

export default {
  name: "pixel",
  description:
    "Genero un montaje que convierte la imagen que envíes en pixel-art",
  commands: ["pixel", "pixel-art", "px"],
  usage: `${PREFIX}pixel (menciona la imagen) o ${PREFIX}pixel (responde a la imagen)`,
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "Necesitas mencionar una imagen o responder a una imagen"
      );
    }

    await sendWaitReact();
    const filePath = await downloadImage(webMessage);
    const ffmpeg = new Ffmpeg();

    try {
      const outputPath = await ffmpeg.applyPixelation(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error al aplicar el efecto píxel");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
