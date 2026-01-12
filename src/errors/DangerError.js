/**
 * Clase de error personalizada para
 * errores críticos.
 *
 * @author Dev Gui
 */
export default class DangerError extends Error {
  constructor(message) {
    super(message);
    this.name = "DangerError";
  }
}
