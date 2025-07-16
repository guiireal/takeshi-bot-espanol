/**
 * Enrutador
 * de comandos.
 *
 * @author Dev Gui
 */
const {
  DangerError,
  WarningError,
  InvalidParameterError,
} = require("../errors");
const { findCommandImport } = require(".");
const {
  verifyPrefix,
  hasTypeAndCommand,
  isLink,
  isAdmin,
} = require("../middlewares");
const { checkPermission } = require("../middlewares/checkPermission");
const {
  isActiveGroup,
  getAutoResponderResponse,
  isActiveAutoResponderGroup,
  isActiveAntiLinkGroup,
  isActiveOnlyAdmins,
} = require("./database");
const { errorLog } = require("../utils/logger");
const { ONLY_GROUP_ID } = require("../config");
const { badMacHandler } = require("./badMacHandler");

exports.dynamicCommand = async (paramsHandler, startProcess) => {
  const {
    commandName,
    prefix,
    sendWarningReply,
    sendErrorReply,
    remoteJid,
    sendReply,
    socket,
    userJid,
    fullMessage,
    webMessage,
  } = paramsHandler;

  const activeGroup = isActiveGroup(remoteJid);

  if (activeGroup && isActiveAntiLinkGroup(remoteJid) && isLink(fullMessage)) {
    if (!userJid) {
      return;
    }

    if (!(await isAdmin({ remoteJid, userJid, socket }))) {
      await socket.groupParticipantsUpdate(remoteJid, [userJid], "remove");

      await sendReply(
        "¡Anti-enlace activado! ¡Has sido eliminado por enviar un enlace!"
      );

      await socket.sendMessage(remoteJid, {
        delete: {
          remoteJid,
          fromMe: false,
          id: webMessage.key.id,
          participant: webMessage.key.participant,
        },
      });

      return;
    }
  }

  const { type, command } = findCommandImport(commandName);

  if (ONLY_GROUP_ID && ONLY_GROUP_ID !== remoteJid) {
    return;
  }

  if (activeGroup) {
    if (!verifyPrefix(prefix) || !hasTypeAndCommand({ type, command })) {
      if (isActiveAutoResponderGroup(remoteJid)) {
        const response = getAutoResponderResponse(fullMessage);

        if (response) {
          await sendReply(response);
        }
      }

      return;
    }

    if (!(await checkPermission({ type, ...paramsHandler }))) {
      await sendErrorReply("¡No tienes permiso para ejecutar este comando!");
      return;
    }

    if (
      isActiveOnlyAdmins(remoteJid) &&
      !(await isAdmin({ remoteJid, userJid, socket }))
    ) {
      await sendWarningReply(
        "¡Solo los administradores pueden ejecutar comandos!"
      );
      return;
    }
  }

  if (!activeGroup) {
    if (verifyPrefix(prefix) && hasTypeAndCommand({ type, command })) {
      if (command.name !== "on") {
        await sendWarningReply(
          "¡Este grupo está desactivado! ¡Pídele al dueño del grupo que active el bot!"
        );
        return;
      }

      if (!(await checkPermission({ type, ...paramsHandler }))) {
        await sendErrorReply("¡No tienes permiso para ejecutar este comando!");
        return;
      }
    } else {
      return;
    }
  }

  try {
    await command.handle({
      ...paramsHandler,
      type,
      startProcess,
    });
  } catch (error) {
    if (badMacHandler.handleError(error, `command:${command?.name}`)) {
      await sendWarningReply(
        "Error temporal de sincronización. Inténtalo de nuevo en unos segundos."
      );
      return;
    }

    if (badMacHandler.isSessionError(error)) {
      errorLog(
        `Error de sesión durante la ejecución del comando ${command?.name}: ${error.message}`
      );
      await sendWarningReply(
        "Error de comunicación. Intenta ejecutar el comando de nuevo."
      );
      return;
    }

    if (error instanceof InvalidParameterError) {
      await sendWarningReply(`¡Parámetros inválidos! ${error.message}`);
    } else if (error instanceof WarningError) {
      await sendWarningReply(error.message);
    } else if (error instanceof DangerError) {
      await sendErrorReply(error.message);
    } else if (error.isAxiosError) {
      const messageText = error.response?.data?.message || error.message;
      const url = error.config?.url || "URL no disponible";

      const isSpiderAPIError = url.includes("api.spiderx.com.br");

      await sendErrorReply(
        `Ocurrió un error al ejecutar una llamada remota a ${
          isSpiderAPIError ? "la API de Spider X" : url
        } en el comando ${command.name}.
      
📄 *Detalles*: ${messageText}`
      );
    } else {
      errorLog("Error al ejecutar comando", error);
      await sendErrorReply(
        `Ocurrió un error al ejecutar el comando ${command.name}.
      
📄 *Detalles*: ${error.message}`
      );
    }
  }
};
