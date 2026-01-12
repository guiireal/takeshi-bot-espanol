/**
 * Clase de error personalizada para
 * parámetros inválidos.
 *
 * @author Dev Gui
 */
export default class InvalidParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidParameterError";
  }
}
