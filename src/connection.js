/**
 * Script de
 * inicialización del bot.
 *
 * Este script es
 * responsable de
 * iniciar la conexión
 * con WhatsApp.
 *
 * No se recomienda alterar
 * este archivo,
 * a menos que sepas
 * lo que estás haciendo.
 *
 * @author Dev Gui
 */
const path = require("node:path");
const { question, onlyNumbers } = require("./utils");
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  makeCacheableSignalKeyStore,
  isJidStatusBroadcast,
  isJidNewsletter,
} = require("baileys");
const pino = require("pino");
const { load } = require("./loader");
const {
  warningLog,
  infoLog,
  errorLog,
  sayLog,
  successLog,
} = require("./utils/logger");
const NodeCache = require("node-cache");
const { TEMP_DIR } = require("./config");
const { badMacHandler } = require("./utils/badMacHandler");
const fs = require("node:fs");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const logger = pino(
  { timestamp: () => `,"time":"${new Date().toJSON()}"` },
  pino.destination(path.join(TEMP_DIR, "wa-logs.txt"))
);

logger.level = "error";

const msgRetryCounterCache = new NodeCache();

async function connect() {
  const baileysFolder = path.resolve(
    __dirname,
    "..",
    "assets",
    "auth",
    "baileys"
  );

  const { state, saveCreds } = await useMultiFileAuthState(baileysFolder);

  const { version, isLatest } = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    version,
    logger,
    defaultQueryTimeoutMs: undefined,
    retryRequestDelayMs: 5000,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    keepAliveIntervalMs: 30_000,
    maxMsgRetryCount: 5,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    msgRetryCounterCache,
    shouldSyncHistoryMessage: () => false,
  });

  if (!socket.authState.creds.registered) {
    warningLog("¡Credenciales aún no configuradas!");

    infoLog(
      'Ingresa el número de teléfono del bot (ejemplo: "5511920202020"):'
    );

    const phoneNumber = await question(
      "Ingresa el número de teléfono del bot: "
    );

    if (!phoneNumber) {
      errorLog(
        '¡Número de teléfono inválido! Inténtalo de nuevo con el comando "npm start".'
      );

      process.exit(1);
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    sayLog(`Código de emparejamiento: ${code}`);
  }

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const error = lastDisconnect?.error;
      const statusCode = error?.output?.statusCode;

      if (
        error?.message?.includes("Bad MAC") ||
        error?.toString()?.includes("Bad MAC")
      ) {
        errorLog("Error Bad MAC en la desconexión detectado");

        if (badMacHandler.handleError(error, "connection.update")) {
          if (badMacHandler.hasReachedLimit()) {
            warningLog(
              "Límite de errores Bad MAC alcanzado. Limpiando archivos de sesión problemáticos..."
            );
            badMacHandler.clearProblematicSessionFiles();
            badMacHandler.resetErrorCount();

            const newSocket = await connect();
            load(newSocket);
            return;
          }
        }
      }

      if (statusCode === DisconnectReason.loggedOut) {
        errorLog("¡Bot desconectado!");
        badMacErrorCount = 0;
      } else {
        switch (statusCode) {
          case DisconnectReason.badSession:
            warningLog("¡Sesión inválida!");

            const sessionError = new Error("Bad session detected");
            if (badMacHandler.handleError(sessionError, "badSession")) {
              if (badMacHandler.hasReachedLimit()) {
                warningLog(
                  "Límite de errores de sesión alcanzado. Limpiando archivos de sesión..."
                );
                badMacHandler.clearProblematicSessionFiles();
                badMacHandler.resetErrorCount();
              }
            }
            break;
          case DisconnectReason.connectionClosed:
            warningLog("¡Conexión cerrada!");
            break;
          case DisconnectReason.connectionLost:
            warningLog("¡Conexión perdida!");
            break;
          case DisconnectReason.connectionReplaced:
            warningLog("¡Conexión reemplazada!");
            break;
          case DisconnectReason.multideviceMismatch:
            warningLog("¡Dispositivo incompatible!");
            break;
          case DisconnectReason.forbidden:
            warningLog("¡Conexión prohibida!");
            break;
          case DisconnectReason.restartRequired:
            infoLog('¡Por favor reiníciame! Escribe "npm start".');
            break;
          case DisconnectReason.unavailableService:
            warningLog("¡Servicio no disponible!");
            break;
        }

        const newSocket = await connect();
        load(newSocket);
      }
    } else if (connection === "open") {
      successLog("¡Me conecté exitosamente!");
      infoLog("Versión de WhatsApp Web: " + version.join("."));
      infoLog(
        "¿Es la última versión de WhatsApp Web?: " + (isLatest ? "Sí" : "No")
      );
      badMacErrorCount = 0;
      badMacHandler.resetErrorCount();
    } else {
      infoLog("Actualizando conexión...");
    }
  });

  socket.ev.on("creds.update", saveCreds);

  return socket;
}

exports.connect = connect;
