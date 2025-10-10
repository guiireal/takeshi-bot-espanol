/**
 * Evento que se activa cuando un mensaje
 * se envía al grupo de WhatsApp
 *
 * @author Dev Gui
 */
const {
  isAtLeastMinutesInPast,
  GROUP_PARTICIPANT_ADD,
  GROUP_PARTICIPANT_LEAVE,
  isAddOrLeave,
} = require("../utils");
const { DEVELOPER_MODE } = require("../config");
const { dynamicCommand } = require("../utils/dynamicCommand");
const { loadCommonFunctions } = require("../utils/loadCommonFunctions");
const { onGroupParticipantsUpdate } = require("./onGroupParticipantsUpdate");
const { errorLog, infoLog } = require("../utils/logger");
const { badMacHandler } = require("../utils/badMacHandler");
const { checkIfMemberIsMuted } = require("../utils/database");
const { messageHandler } = require("./messageHandler");
const connection = require("../connection");

exports.onMessagesUpsert = async ({ socket, messages, startProcess }) => {
  if (!messages.length) {
    return;
  }

  for (const webMessage of messages) {
    if (DEVELOPER_MODE) {
      infoLog(
        `\n\n⪨========== [ MENSAJE RECIBIDO ] ==========⪩ \n\n${JSON.stringify(
          messages,
          null,
          2
        )}`
      );
    }

    try {
      const timestamp = webMessage.messageTimestamp;

      if (webMessage?.message) {
        messageHandler(socket, webMessage);
      }

      if (isAtLeastMinutesInPast(timestamp)) {
        continue;
      }

      if (isAddOrLeave.includes(webMessage.messageStubType)) {
        let action = "";
        if (webMessage.messageStubType === GROUP_PARTICIPANT_ADD) {
          action = "add";
          const randomTimeout = Math.floor(Math.random() * 10000) + 1000;
          setTimeout(async () => {
            try {
              const remoteJid = webMessage?.key?.remoteJid;
              if (!remoteJid) {
                return;
              }
              const data = await socket.groupMetadata(remoteJid);
              connection.updateGroupMetadataCache(remoteJid, data);
            } catch (error) {
              errorLog(
                `Error al actualizar metadatos del grupo: ${error.message}`
              );
            }
          }, randomTimeout);
        } else if (webMessage.messageStubType === GROUP_PARTICIPANT_LEAVE) {
          action = "remove";
        }

        await onGroupParticipantsUpdate({
          userJid: webMessage.messageStubParameters[0],
          remoteJid: webMessage.key.remoteJid,
          socket,
          action,
        });
      } else {
        if (
          checkIfMemberIsMuted(
            webMessage?.key?.remoteJid,
            webMessage?.key?.participant?.replace(/:[0-9][0-9]|:[0-9]/g, "")
          )
        ) {
          try {
            const { id, remoteJid, participant } = webMessage.key;

            const deleteKey = {
              remoteJid,
              fromMe: false,
              id,
              participant,
            };

            await socket.sendMessage(remoteJid, { delete: deleteKey });
          } catch (error) {
            errorLog(
              `Error al eliminar mensaje de miembro silenciado, ¡probablemente no soy administrador del grupo! ${error.message}`
            );
          }

          return;
        }

        const commonFunctions = loadCommonFunctions({ socket, webMessage });

        if (!commonFunctions) {
          continue;
        }

        await dynamicCommand(commonFunctions, startProcess);
      }
    } catch (error) {
      if (badMacHandler.handleError(error, "message-processing")) {
        continue;
      }

      if (badMacHandler.isSessionError(error)) {
        errorLog(`Error de sesión al procesar mensaje: ${error.message}`);
        continue;
      }

      errorLog(
        `Error al procesar mensaje: ${error.message} | Stack: ${error.stack}`
      );

      continue;
    }
  }
};
