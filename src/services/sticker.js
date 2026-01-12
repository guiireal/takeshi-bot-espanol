/**
 * Servicios para procesar pegatinas (stickers) en ffmpeg.
 *
 * @author MRX
 */
import { exec } from "child_process";
import webp from "node-webpmux";
import fs from "node:fs";
import path from "node:path";
import { BOT_EMOJI, BOT_NAME, TEMP_DIR } from "../config.js";
import { getRandomName, getRandomNumber } from "../utils/index.js";

export async function addStickerMetadata(media, metadata) {
  const tmpFileIn = getRandomName("webp");
  const tmpFileOut = getRandomName("webp");

  await fs.promises.writeFile(tmpFileIn, media);

  const img = new webp.Image();

  const json = {
    "sticker-pack-id": `${getRandomNumber(10_000, 99_999)}`,
    "sticker-pack-name": metadata.username,
    "sticker-pack-publisher": metadata.botName,
    emojis: metadata.categories ? metadata.categories : [""],
  };

  const exifAttr = Buffer.from([
    0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
    0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
  ]);

  const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
  const exif = Buffer.concat([exifAttr, jsonBuff]);
  exif.writeUIntLE(jsonBuff.length, 14, 4);

  await img.load(tmpFileIn);
  await fs.promises.unlink(tmpFileIn);
  img.exif = exif;
  await img.save(tmpFileOut);
  return tmpFileOut;
}

export async function isAnimatedSticker(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);

    const hasAnim = buffer.includes(Buffer.from("ANIM"));
    const hasFrame = buffer.includes(Buffer.from("ANMF"));

    return hasAnim || hasFrame;
  } catch (err) {
    return false;
  }
}

export async function processStaticSticker(inputPath, metadata) {
  return new Promise((resolve, reject) => {
    const tempOutputPath = path.resolve(TEMP_DIR, getRandomName("webp"));

    const cmd = `ffmpeg -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2" -f webp -quality 90 "${tempOutputPath}"`;

    exec(cmd, async (error, _, stderr) => {
      try {
        if (error) {
          console.error("FFmpeg error:", stderr);
          reject(new Error("Error al procesar la pegatina estática."));
          return;
        }

        const processedBuffer = await fs.promises.readFile(tempOutputPath);
        const finalPath = await addStickerMetadata(processedBuffer, metadata);

        if (fs.existsSync(tempOutputPath)) {
          fs.unlinkSync(tempOutputPath);
        }

        resolve(finalPath);
      } catch (error) {
        if (fs.existsSync(tempOutputPath)) {
          fs.unlinkSync(tempOutputPath);
        }
        reject(error);
      }
    });
  });
}

export async function processAnimatedSticker(inputPath, metadata) {
  try {
    const img = new webp.Image();
    await img.load(inputPath);

    const json = {
      "sticker-pack-id": `${getRandomNumber(10_000, 99_999)}`,
      "sticker-pack-name": metadata.username,
      "sticker-pack-publisher": metadata.botName,
      emojis: metadata.categories ? metadata.categories : [""],
    };

    const exifAttr = Buffer.from([
      0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
      0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
    ]);

    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
    const exif = Buffer.concat([exifAttr, jsonBuff]);
    exif.writeUIntLE(jsonBuff.length, 14, 4);

    img.exif = exif;

    const finalPath = inputPath.replace(".webp", "_done.webp");
    await img.save(finalPath);

    return finalPath;
  } catch (err) {
    console.log("Error node-webpmux:", err);
    throw new Error("Error al procesar el sticker animado sin FFmpeg.");
  }
}

export async function createSticker(paramsHandler) {
  const {
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendStickerFromFile,
    userLid,
  } = paramsHandler;

  const username =
    webMessage.pushName || webMessage.notifyName || userLid.replace(/@lid/, "");

  const metadata = {
    username: username,
    botName: `${BOT_EMOJI} ${BOT_NAME}`,
  };

  const outputTempPath = path.resolve(TEMP_DIR, getRandomName("webp"));
  let inputPath = null;

  try {
    if (isImage) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          inputPath = await downloadImage(webMessage, getRandomName());
          break;
        } catch (downloadError) {
          console.error(
            `Intento ${attempt} de descarga de imagen falló:`,
            downloadError.message
          );

          if (attempt === 3) {
            throw new Error(
              `Fallo al descargar la imagen tras 3 intentos: ${downloadError.message}`
            );
          }

          await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
        }
      }

      await new Promise((resolve, reject) => {
        const cmd = `ffmpeg -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease" -f webp -quality 90 "${outputTempPath}"`;

        exec(cmd, (error, _, stderr) => {
          if (error) {
            console.error("FFmpeg error:", stderr);
            reject(error);
          } else {
            resolve();
          }
        });
      });
    } else if (isVideo) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          inputPath = await downloadVideo(webMessage, getRandomName());
          break;
        } catch (downloadError) {
          console.error(
            `Intento ${attempt} de descarga de vídeo falló:`,
            downloadError.message
          );

          if (attempt === 3) {
            throw new Error(
              `Fallo al descargar el vídeo tras 3 intentos. Problema de conexión con WhatsApp.`
            );
          }

          await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
        }
      }

      const maxDuration = 10;
      const seconds =
        webMessage.message?.videoMessage?.seconds ||
        webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
          ?.videoMessage?.seconds;

      if (!seconds || seconds > maxDuration) {
        if (inputPath && fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath);
        }
        throw new Error(
          `¡El vídeo enviado tiene más de ${maxDuration} segundos! Envíe un vídeo más corto.`
        );
      }

      await new Promise((resolve, reject) => {
        const cmd = `ffmpeg -y -i "${inputPath}" -vf "scale=350:350,fps=15" -c:v libwebp -loop 0 -quality 8 -compression_level 6 -method 6 -preset picture -an -f webp "${outputTempPath}"`;

        exec(cmd, (error, _, stderr) => {
          if (error) {
            console.error("FFmpeg error:", stderr);
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }

    if (inputPath && fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
      inputPath = null;
    }

    if (!fs.existsSync(outputTempPath)) {
      throw new Error("El archivo de salida no fue creado por FFmpeg");
    }

    const stickerPath = await addStickerMetadata(
      await fs.promises.readFile(outputTempPath),
      metadata
    );

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await sendStickerFromFile(stickerPath, true);
        break;
      } catch (stickerError) {
        console.error(
          `Intento ${attempt} de envío de sticker falló:`,
          stickerError.message
        );

        if (attempt === 3) {
          throw new Error(
            `Fallo al enviar la pegatina tras 3 intentos: ${stickerError.message}`
          );
        }

        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }

    if (fs.existsSync(outputTempPath)) {
      fs.unlinkSync(outputTempPath);
    }

    if (fs.existsSync(stickerPath)) {
      fs.unlinkSync(stickerPath);
    }
  } catch (error) {
    if (inputPath && fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }
    if (fs.existsSync(outputTempPath)) {
      fs.unlinkSync(outputTempPath);
    }

    if (
      error.message.includes("ETIMEDOUT") ||
      error.message.includes("AggregateError") ||
      error.message.includes("getaddrinfo ENOTFOUND") ||
      error.message.includes("connect ECONNREFUSED") ||
      error.message.includes("mmg.whatsapp.net")
    ) {
      throw new Error(
        `Error de conexión al descargar medios de WhatsApp. Reintente en unos segundos.`
      );
    }

    if (error.message.includes("FFmpeg")) {
      throw new Error(
        `Error al procesar medios con FFmpeg. Verifique que el archivo no esté corrupto.`
      );
    }

    throw error;
  }
}

export async function processAutoSticker(paramsHandler) {
  const { isImage, isVideo, sendSuccessReact } = paramsHandler;

  if (!isImage && !isVideo) {
    return false;
  }

  try {
    await createSticker(paramsHandler);
    await sendSuccessReact();

    return true;
  } catch (error) {
    console.error("Error en el procesamiento automático de sticker:", error);
    return false;
  }
}
