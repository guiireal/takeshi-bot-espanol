/**
 * Middleware personalizado para agregar lógica personalizada
 * sin modificar los archivos principales del bot.
 *
 * Este middleware es llamado en dos momentos:
 * 1. Antes de procesar cualquier mensaje (type: "message")
 * 2. Antes de procesar eventos de participantes add/remove (type: "participant")
 *
 * @param {CustomMiddlewareProps} params - Parámetros del middleware
 *
 * Para ejemplos de uso, consulte:
 * - README.md (sección "Custom Middleware")
 *
 * @author Dev Gui
 */
export async function customMiddleware({
  socket,
  webMessage,
  type,
  commonFunctions,
  action,
  data,
}) {
  // Agregue su lógica personalizada aquí
  // Este archivo es SUYO - modifique a voluntad!
}
