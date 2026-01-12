/*
 * Si hiciste clic aquí es porque probablemente ya usaste un bot de "case" y con un "index.js" de 20 mil líneas...
 * Lo sé, te entiendo!
 * ¿Qué es mejor? Dar error en tu play, vas al archivo "play.js" y lo corriges
 * o vas a la línea 71023 del "index.js" y lo corriges?
 *
 * Imagina si pegas tu "case" mal y olvidas cerrar
 * o abrir un paréntesis, una llave...
 * Pones el bot a correr, da varios errores y no sabes resolver...
 * ¿Adivina qué haces?
 * Vuelves el "index.js" al que estaba antes, ¿verdad?
 *
 * ¡Eso es lo que no queremos! Queremos un código limpio, legible y de fácil mantenimiento!
 * Creamos código para humanos, no para máquinas, entonces, cuanto más simple, mejor!
 *
 * A partir de ahora, vamos a cambiar la palabra "case" por "comando", ¿ok? ¡Vamos!
 *
 * ---------------- 🤖 ¿DÓNDE ESTÁN LOS COMANDOS? 🤖 ----------------
 *
 * Encuentras los comandos dentro de la carpeta "src/commands"
 * ¿No entendiste? Vamos:
 *
 * Abre la carpeta "src"
 * Después, abre la carpeta "commands"
 *
 * Nota que dentro de ella hay 3 carpetas:
 *
 * - 📁 admin
 * - 📁 member
 * - 📁 owner
 *
 * Dentro de la carpeta admin hay comandos administrativos.
 * Dentro de la carpeta member hay comandos para miembros.
 * Dentro de la carpeta owner hay comandos que son accedidos solo por el dueño del bot/grupo!
 *
 * ¡Simple, no es cierto? Ah, detalle, no necesitas poner un "if" para saber si el comando es de admin o de dueño.
 * ¡El bot ya hace eso por ti! Solo pon el comando en la carpeta correspondiente!
 *
 * El archivo 🤖-como-criar-comandos.js es un gabarito para copiar y pegar en tu comando!
 *
 * ---------------- 🤖 ¿DÓNDE MODIFICO EL MENÚ? 🤖 ----------------
 *
 * Abre la carpeta "src"
 * Ve al archivo "menu.js" y edita el menú!
 * Solo recordando, haz todo dentro de las comillas invertidas (`), porque es un template string!
 *
 * ¿No entendiste?
 * Mira:
 *
 * `Hola ¿todo bien?` - Esto está CORRECTO ✅
 *
 * Hola `¿todo bien?` - Esto está MAL (ve que "Hola" está fuera de las comillas invertidas) ❌
 *
 * ---------------- 🤖 ¿CÓMO CAMBIO LA FOTO DEL BOT? 🤖 ----------------
 *
 * Abre la carpeta "assets"
 * Después, abre la carpeta "images"
 * Sustituye la imagen "takeshi-bot.png" por otra de tu preferencia!
 * Solo no olvides mantener el nombre "takeshi-bot.png"
 *
 * O si prefieres, escribe <prefixo>set-menu-image mencionando
 * imagen que deseas definir como foto del menú.
 *
 * ---------------- 🚀 IMPORTANTE 🚀 ----------------
 *
 * Lee el tutorial completo en: https://github.com/guiireal/takeshi-bot?tab=readme-ov-file#instala%C3%A7%C3%A3o-no-termux-
 *
 * ¡No saltes pasos! Léelo completo, porque es muy importante para entender cómo funciona el bot!
 *
 * By: Dev Gui
 *
 * No modifiques nada abajo, a menos que sepas lo que estás haciendo!
 */
import { connect } from "./connection.js";
import { load } from "./loader.js";
import { badMacHandler } from "./utils/badMacHandler.js";
import {
  bannerLog,
  errorLog,
  infoLog,
  successLog,
  warningLog,
} from "./utils/logger.js";

process.on("uncaughtException", (error) => {
  if (badMacHandler.handleError(error, "uncaughtException")) {
    return;
  }

  errorLog(`Error crítico no capturado: ${error.message}`);
  errorLog(error.stack);

  if (
    !error.message.includes("ENOTFOUND") &&
    !error.message.includes("timeout")
  ) {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason) => {
  if (badMacHandler.handleError(reason, "unhandledRejection")) {
    return;
  }

  errorLog(`Promesa rechazada no manejada:`, reason);
});

async function startBot() {
  try {
    process.setMaxListeners(1500);

    bannerLog();
    infoLog("Iniciando mis componentes internos...");

    const stats = badMacHandler.getStats();
    if (stats.errorCount > 0) {
      warningLog(
        `Estadísticas de BadMacHandler: ${stats.errorCount}/${stats.maxRetries} errores`
      );
    }

    const socket = await connect();

    load(socket);

    successLog("✅ ¡Bot iniciado con éxito!");

    setInterval(() => {
      const currentStats = badMacHandler.getStats();
      if (currentStats.errorCount > 0) {
        warningLog(
          `Estadísticas de BadMacHandler: ${currentStats.errorCount}/${currentStats.maxRetries} errores`
        );
      }
    }, 300_000);
  } catch (error) {
    if (badMacHandler.handleError(error, "bot-startup")) {
      warningLog("Error de Bad MAC durante la inicialización, reintentando...");

      setTimeout(() => {
        startBot();
      }, 5000);
      return;
    }

    errorLog(`Error al iniciar el bot: ${error.message}`);
    errorLog(error.stack);
    process.exit(1);
  }
}

startBot();
