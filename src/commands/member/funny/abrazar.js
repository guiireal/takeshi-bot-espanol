import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { onlyNumbers, toUserJidOrLid } from "../../utils/index.js";

export default {
  name: "abrazar",
  description: "Abraza a un usuario deseado.",
  commands: ["abrazar", "abrazo", "abrazos"],
  usage: `${PREFIX}abrazar @usuario`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendGifFromFile,
    sendErrorReply,
    userJid,
    replyJid,
    args,
    isReply,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(
        "¡Necesitas mencionar o marcar a un miembro!"
      );
    }

    const targetJid = isReply ? replyJid : toUserJidOrLid(args[0]);

    if (!targetJid) {
      await sendErrorReply(
        "Debes mencionar a un usuario o responder a un mensaje para abrazar."
      );
      return;
    }

    const userNumber = onlyNumbers(userJid);
    const targetNumber = onlyNumbers(targetJid);

    await sendGifFromFile(
      path.resolve(ASSETS_DIR, "images", "funny", "hug-darker-than-black.mp4"),
      `@${userNumber} le dio un abrazo apasionado a @${targetNumber}!`,
      [userJid, targetJid]
    );
  },
};
