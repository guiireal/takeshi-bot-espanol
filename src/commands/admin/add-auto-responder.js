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
  handle: async ({ sendSuccessReply, prefix, sendErrorReply, fullArgs }) => {
    const parts = fullArgs.split(/\s\/\s/);

    if (parts.length !== 2) {
      throw new InvalidParameterError(`Debes informar el término y la respuesta del auto-responder de la siguiente forma:

${prefix}add-auto-responder término / lo que debo responder`);
    }

    const [term, response] = parts;

    const success = await addAutoResponderItem(term, response);

    if (!success) {
      await sendErrorReply(
        `¡El término "${term}" ya existe en el auto-responder!`
      );

      return;
    }

    await sendSuccessReply(
      `El término "${term}" fue agregado al auto-responder con la respuesta "${response}".`
    );
  },
};
