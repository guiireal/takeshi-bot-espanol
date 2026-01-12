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
  name: "contrast",
  description:
    "Genero un montaje que ajusta el contraste de la imagen que envíes",
  commands: ["contraste", "contrast", "mejora", "mejorar", "hd", "to-hd"],
  usage: `${PREFIX}contraste (menciona la imagen) o ${PREFIX}contraste (responde a la imagen)`,
  /**
   * @param {CommandHandleProps} props
   */
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
      const outputPath = await ffmpeg.adjustContrast(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
    } catch (error) {
      console.error(error);
      throw new Error("Error al aplicar el efecto de contraste");
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
