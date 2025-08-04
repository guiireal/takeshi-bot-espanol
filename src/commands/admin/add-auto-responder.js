const { addAutoResponderItem } = require(`${BASE_DIR}/utils/database`);

const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "add-auto-responder",
  description: "Agrega un término al auto-responder",
  commands: [
    "add-auto-responder",
    "add-auto",
    "add-responder",
    "agregar-auto",
    "añadir-respuesta",
  ],
  usage: `${PREFIX}add-auto-responder ¡Buenas tardes! / ¡Buenas tardes para ti también!`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, args, prefix, sendErrorReply }) => {
    if (args.length !== 2) {
      throw new InvalidParameterError(`Debes informar el término y la respuesta del auto-responder de la siguiente forma:

${prefix}add-auto-responder término / lo que debo responder`);
    }

    const success = await addAutoResponderItem(args[0], args[1]);

    if (!success) {
      await sendErrorReply(
        `¡El término "${args[0]}" ya existe en el auto-responder!`
      );

      return;
    }

    await sendSuccessReply(
      `El término "${args[0]}" fue agregado al auto-responder con la respuesta "${args[1]}".`
    );
  },
};
