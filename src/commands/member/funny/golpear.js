import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../config.js";
import { InvalidParameterError } from "../../errors/index.js";
import { onlyNumbers, toUserJidOrLid } from "../../utils/index.js";

export default {
  name: "golpear",
  description: "Golpea a un usuario con un puñetazo.",
  commands: ["golpear", "golpea", "puñetazo", "puñetazazo"],
  usage: `${PREFIX}golpear @usuario`,
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
        "Debes mencionar a un usuario o responder a un mensaje para golpear."
      );
      return;
    }

    const userNumber = onlyNumbers(userJid);
    const targetNumber = onlyNumbers(targetJid);

    await sendGifFromFile(
      path.resolve(
        ASSETS_DIR,
        "images",
        "funny",
        "some-guy-getting-punch-anime-punching-some-guy-anime.mp4"
      ),
      `@${userNumber} dio un puñetazo bombástico a @${targetNumber}!`,
      [userJid, targetJid]
    );
  },
};
