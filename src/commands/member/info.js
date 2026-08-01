/**
 * @author MRX
 */
import path from "path";
import { COMMANDS_DIR, PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";
import { readDirectoryRecursive } from "../../utils/index.js";

export default {
  name: "info",
  description: "Muestra la información de un comando",
  commands: ["info", "info-cmd", "info-comando", "info-command"],
  usage: `${PREFIX}info <comando>`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ sendReply, sendWaitReact, sendSuccessReact, args }) => {
    const commandName = args[0];

    if (!commandName) {
      throw new InvalidParameterError("Por favor, informa el nombre del comando.");
    }

    await sendWaitReact();

    try {
      const commandFiles = await readDirectoryRecursive(COMMANDS_DIR);
      const cmdFile = commandFiles.find((file) => {
        const fileName = path.basename(file, path.extname(file));
        return fileName === commandName || file.includes(commandName);
      });

      if (!cmdFile) {
        throw new WarningError(`Comando "${commandName}" no encontrado.`);
      }

      const cmd = await import(cmdFile);

      const info = `*Información del comando*\n
- *Nombre:* _${cmd.default.name}_
- *Descripción:* _${cmd.default.description}_
- *Comandos:* _${cmd.default.commands.join(", ")}_
- *Uso:* _${cmd.default.usage}_
`;

      await sendSuccessReact();
      await sendReply(info);
    } catch (error) {
      throw new WarningError(`Error al buscar el comando: ${error.message}`);
    }
  },
};
