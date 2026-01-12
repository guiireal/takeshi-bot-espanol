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
  name: "gray",
  description:
    "Genero un montaje que convierte la imagen que envíes a blanco y negro",
  commands: ["gray", "blanco-y-negro", "pb"],
  usage: `${PREFIX}gray (menciona la imagen) o ${PREFIX}gray (responde a la imagen)`,
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
      const outputPath = await ffmpeg.convertToGrayscale(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error al aplicar el efecto de blanco y negro");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
