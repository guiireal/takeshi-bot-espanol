import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { onlyNumbers } from "../../../utils/index.js";

export default {
  name: "besar",
  description: "Besa a un usuario que amas.",
  commands: ["besar", "beijar", "beija", "beijo", "kiss"],
  usage: `${PREFIX}besar @usuario`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    sendGifFromFile,
    sendErrorReply,
    userLid,
    replyLid,
    args,
    isReply,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(
        "¡Necesitas mencionar o marcar a un miembro!",
      );
    }

    const targetLid = isReply
      ? replyLid
      : args[0]
        ? `${onlyNumbers(args[0])}@lid`
        : null;

    if (!targetLid) {
      await sendErrorReply(
        "Necesitas mencionar a un usuario o responder a un mensaje para besar.",
      );

      return;
    }

    const userNumber = onlyNumbers(userLid);
    const targetNumber = onlyNumbers(targetLid);

    await sendGifFromFile(
      path.resolve(ASSETS_DIR, "images", "funny", "kiss.mp4"),
      `@${userNumber} ¡besó a @${targetNumber}!`,
      [userLid, targetLid],
    );
  },
};
