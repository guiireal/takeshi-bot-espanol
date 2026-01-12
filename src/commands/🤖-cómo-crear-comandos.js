/**
 * Este es un modelo de comando.
 * Copia y pega este archivo para crear un nuevo comando en una de las carpetas: admin, member o owner.
 * Debes renombrarlo para que sea fácil de identificar en la carpeta de destino.
 *
 * Carpeta owner: Comandos que solo pueden ser ejecutados por el dueño del grupo/bot.
 * Carpeta admin: Comandos que solo pueden ser ejecutados por administradores del grupo.
 * Carpeta member: Comandos que pueden ser ejecutados por cualquier miembro del grupo.
 *
 * Funciones y variables que pueden extraerse del handle en "handle: async ({ aquí })":
 * Lo que puedes extraer del handle está definido en src/@types/index.d.ts
 * ¡Cuidado, respeta las letras mayúsculas y minúsculas!
 *
 * @author Dev Gui
 */
import { PREFIX } from "../../config.js";

export default {
  name: "comando",
  description: "Descripción del comando",
  commands: ["comando1", "comando2"],
  usage: `${PREFIX}comando`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({}) => {
    // código del comando
  },
};
