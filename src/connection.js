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
 * este arquivo,
 * este archivo,
 * a menos que sepa
 * lo que está haciendo.
 *
 * @author Dev Gui
 */
import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  isJidNewsletter,
  isJidStatusBroadcast,
  useMultiFileAuthState,
} from "baileys";
import NodeCache from "node-cache";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pino from "pino";
import { PREFIX, TEMP_DIR } from "./config.js";
import { load } from "./loader.js";
import { badMacHandler } from "./utils/badMacHandler.js";
import { onlyNumbers, question } from "./utils/index.js";
import {
  bannerLog,
  errorLog,
  infoLog,
  successLog,
  warningLog,
} from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const logger = pino(
  { timestamp: () => `,"time":"${new Date().toJSON()}"` },
  pino.destination(path.join(TEMP_DIR, "wa-logs.txt")),
);

logger.level = "error";

const msgRetryCounterCache = new NodeCache();

function formatPairingCode(code) {
  if (!code) return code;

  return code?.match(/.{1,4}/g)?.join("-") || code;
}

function clearScreenWithBanner() {
  console.clear();
  bannerLog();
}

export async function connect() {
  const baileysFolder = path.resolve(
    __dirname,
    "..",
    "assets",
    "auth",
    "baileys",
  );

  const { state, saveCreds } = await useMultiFileAuthState(baileysFolder);

  const { version } = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    version,
    logger,
    defaultQueryTimeoutMs: undefined,
    retryRequestDelayMs: 5000,
    auth: state,
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    connectTimeoutMs: 20_000,
    keepAliveIntervalMs: 30_000,
    maxMsgRetryCount: 5,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    emitOwnEvents: false,
    msgRetryCounterCache,
    shouldSyncHistoryMessage: () => false,
  });

  if (!socket.authState.creds.registered) {
    clearScreenWithBanner();
    console.log(
      'Ingrese el número del bot (SP/RJ requieren el noveno dígito). \nEjemplo: "+5511912345678", demás estados: "+554112345678":',
    );

    const phoneNumber = await question("Número: ");

    if (!phoneNumber) {
      errorLog(
        '¡Número de teléfono inválido! Inténtelo nuevamente con el comando "npm start".',
      );

      process.exit(1);
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    console.log(`Código de vinculación: ${formatPairingCode(code)}`);
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
        errorLog("Error de Bad MAC detectado en la desconexión");

        if (badMacHandler.handleError(error, "connection.update")) {
          if (badMacHandler.hasReachedLimit()) {
            warningLog(
              "Límite de errores Bad MAC alcanzado. Limpiando archivos de sesión problemáticos...",
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
      } else {
        switch (statusCode) {
          case DisconnectReason.badSession:
            warningLog("¡Sesión inválida!");

            const sessionError = new Error("Bad session detected");
            if (badMacHandler.handleError(sessionError, "badSession")) {
              if (badMacHandler.hasReachedLimit()) {
                warningLog(
                  "Límite de errores de sesión alcanzado. Limpiando archivos de sesión...",
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
            infoLog('¡Por favor, reinícieme! Escriba "npm start".');
            break;
          case DisconnectReason.unavailableService:
            warningLog("¡Servicio no disponible!");
            break;
        }

        const newSocket = await connect();
        load(newSocket);
      }
    } else if (connection === "open") {
      clearScreenWithBanner();
      successLog("✅ ¡Bot iniciado con éxito!");
      successLog("¡Me he conectado con éxito!");
      infoLog("Versión de WhatsApp Web: " + version.join("."));
      successLog(
        `✅ ¡Estoy listo para usar! 
Verifique el prefijo escribiendo la palabra "prefixo" en WhatsApp.
El prefijo predeterminado definido en config.js es ${PREFIX}`,
      );
      badMacHandler.resetErrorCount();
    } else if (connection === "connecting") {
      infoLog("Conectando...");
    } else {
      infoLog("Atualizando conexão...");
    }
  });

  socket.ev.on("creds.update", saveCreds);

  return socket;
}
