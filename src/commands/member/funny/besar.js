const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { toUserJidOrLid, onlyNumbers } = require(`${BASE_DIR}/utils`);
const path = require("node:path");
const { ASSETS_DIR } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "besar",
  description: "Besa a un usuario que amas.",
  commands: ["besar", "besa", "beso", "kiss"],
  usage: `${PREFIX}besar @usuario`,
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
        "Debes mencionar a un usuario o responder a un mensaje para besar."
      );
      return;
    }

    const userNumber = onlyNumbers(userJid);
    const targetNumber = onlyNumbers(targetJid);

    await sendGifFromFile(
      path.resolve(ASSETS_DIR, "images", "funny", "kiss.mp4"),
      `@${userNumber} besó a @${targetNumber}!`,
      [userJid, targetJid]
    );
  },
};
