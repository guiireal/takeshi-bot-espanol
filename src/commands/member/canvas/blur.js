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
  name: "blur",
  description: "Generó un montaje que desenfoca la imagen que envíes",
  commands: ["blur", "desenfocar", "embaçar"],
  usage: `${PREFIX}blur (menciona la imagen) o ${PREFIX}blur (responde a la imagen)`,
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
      const outputPath = await ffmpeg.applyBlur(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error al aplicar el efecto de desenfoque (blur)");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
