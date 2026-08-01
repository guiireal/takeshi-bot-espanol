import fs from "node:fs";
import { PREFIX } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { transcribe } from "../../services/spider-x-api.js";
import {
  getContent,
  getExtensionFromMimeType,
  getRandomName,
  removeFileIfExists,
} from "../../utils/index.js";

const MAX_AUDIO_DURATION_IN_SECONDS = 5 * 60;
const MAX_AUDIO_SIZE_IN_BYTES = 25 * 1024 * 1024;

export default {
  name: "transcrever",
  description: "Transcreve audios usando o Whisper V3 Turbo.",
  commands: ["transcrever", "transcribe"],
  usage: `${PREFIX}transcrever (envie ou responda um audio)`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    isAudio,
    webMessage,
    downloadAudio,
    sendWaitReply,
    sendSuccessReply,
  }) => {
    if (!isAudio) {
      throw new InvalidParameterError(
        "Envie este comando com um audio ou responda a um audio.",
      );
    }

    const audioMessage = getContent(webMessage, "audio");
    const duration = Number(audioMessage?.seconds || 0);
    const fileSize = Number(audioMessage?.fileLength || 0);

    if (duration > MAX_AUDIO_DURATION_IN_SECONDS) {
      throw new InvalidParameterError(
        "O audio deve ter no máximo 5 minutos de duração.",
      );
    }

    if (fileSize > MAX_AUDIO_SIZE_IN_BYTES) {
      throw new InvalidParameterError(
        "O audio deve ter no máximo 25 MB.",
      );
    }

    await sendWaitReply("Transcrevendo audio...");

    let audioPath = null;

    try {
      const mimeType = audioMessage?.mimetype || "audio/ogg";
      const fileName = `audio.${getExtensionFromMimeType(mimeType, "ogg")}`;

      audioPath = await downloadAudio(webMessage, getRandomName());
      const audioBuffer = await fs.promises.readFile(audioPath);
      const transcription = await transcribe(audioBuffer, mimeType, fileName);

      await sendSuccessReply(`*Transcripción*\n\n${transcription}`);
    } finally {
      removeFileIfExists(audioPath);
    }
  },
};

