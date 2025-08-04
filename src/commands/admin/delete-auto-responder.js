const {
  removeAutoResponderItemByKey,
  getAutoResponderItemByKey,
} = require(`${BASE_DIR}/utils/database`);

const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "delete-auto-responder",
  description: "Elimina un término del auto-responder por ID",
  commands: [
    "delete-auto-responder",
    "delete-auto",
    "delete-responder",
    "del-auto",
    "del-responder",
    "remove-auto-responder",
    "remove-auto",
    "remove-responder",
    "eliminar-auto",
    "eliminar-respuesta",
    "borrar-auto",
  ],
  usage: `${PREFIX}delete-auto-responder 1`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, args, prefix, sendErrorReply }) => {
    if (args.length !== 1) {
      throw new InvalidParameterError(`Debes informar el ID del término a ser eliminado:

${prefix}remove-auto-responder 1

Usa ${prefix}list-auto-responder para ver todos los IDs`);
    }

    const id = parseInt(args[0]);

    if (isNaN(id) || id <= 0) {
      throw new InvalidParameterError(`El ID debe ser un número válido mayor que 0.

Usa ${prefix}list-auto-responder para ver todos los IDs`);
    }

    const success = removeAutoResponderItemByKey(id);

    if (!success) {
      await sendErrorReply(
        `No fue posible eliminar el término con el ID ${id}. ¡Puede que no exista o ya haya sido eliminado!`
      );

      return;
    }

    await sendSuccessReply(
      `¡El término con el ID ${id} fue eliminado del auto-responder con éxito!`
    );
  },
};
