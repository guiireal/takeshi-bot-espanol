/*
 * Este archivo index.js es el mismo que existe en "src/index.js", solo está aquí
 * para facilitar la ejecución del bot en algunas hosts.
 *
 * Si hiciste clic aquí, es porque probablemente ya usaste un bot de "case" y con un "index.js" de 20 mil líneas...
 * ¡Lo sé, te entiendo!
 * ¿Qué es mejor? ¿Que te dé un error en tu "play", vayas al archivo "play.js" y lo corrijas
 * o que vayas a la línea 71023 de "index.js" y lo corrijas?
 *
 * Imagina si pegas tu "case" mal y olvidas cerrar
 * o abrir un paréntesis, una llave...
 * Pones el bot a funcionar, te da varios errores y no sabes cómo resolverlos...
 * ¿Adivina qué haces?
 * Vuelves a la "index.js" que tenías antes, ¿verdad?
 *
 * ¡Eso es lo que no queremos! ¡Queremos un código limpio, legible y de fácil mantenimiento!
 * Creamos código para humanos, no para máquinas, así que, ¡cuanto más simple, mejor!
 *
 * A partir de ahora, vamos a cambiar la palabra "case" por "comando", ¿ok? ¡Vamos allá!
 *
 * ---------------- 🤖 ¿DÓNDE ESTÁN LOS COMANDOS? 🤖 ----------------
 *
 * Encontrarás los comandos dentro de la carpeta "src/commands"
 * ¿No lo entiendes? ¡Vamos a ver!
 *
 * Abre la carpeta "src"
 * Luego, abre la carpeta "commands"
 *
 * Observa que dentro de ella hay 3 carpetas:
 *
 * - 📁 admin
 * - 📁 member
 * - 📁 owner
 *
 * Dentro de la carpeta "admin" hay comandos administrativos.
 * Dentro de la carpeta "member" hay comandos para miembros.
 * Dentro de la carpeta "owner" hay comandos a los que solo puede acceder el dueño del bot/grupo.
 *
 * Sencillo, ¿verdad? Ah, un detalle: no necesitas poner un "if" para saber si el comando es de admin o de dueño.
 * ¡El bot ya lo hace por ti! ¡Solo necesitas colocar el comando en la carpeta correspondiente!
 *
 * El archivo 🤖-como-crear-comandos.js es una plantilla para que copies y pegues en tu comando!
 *
 * ---------------- 🤖 ¿DÓNDE MODIFICO EL MENÚ? 🤖 ----------------
 *
 * Abre la carpeta "src"
 * Ve al archivo "menu.js" y ¡edita el menú!
 * Solo recuerda, haz todo dentro de las comillas (`), ya que es un template string.
 *
 * ¿No lo entiendes?
 * Mira:
 *
 * `¡Hola, qué tal!` - Esto es CORRECTO ✅
 *
 * Hola `¿qué tal?` - Esto es INCORRECTO (observa que "Hola" está fuera de las comillas) ❌
 *
 * ---------------- 🤖 ¿CÓMO CAMBIO LA FOTO DEL BOT? 🤖 ----------------
 *
 * Abre la carpeta "assets"
 * Luego, abre la carpeta "images"
 * ¡Sustituye la imagen "takeshi-bot.png" por otra de tu preferencia!
 * Solo no olvides mantener el nombre "takeshi-bot.png"
 *
 * ---------------- 🚀 IMPORTANTE 🚀 ----------------
 *
 * Lee el tutorial completo en: https://github.com/guiireal/takeshi-bot-espanol
 *
 * ¡No saltes pasos! Léelo completo, ¡ya que es muy importante para que entiendas cómo funciona el bot!
 *
 * Por: Dev Gui
 *
 * ¡No modifiques nada a continuación, a menos que sepas lo que estás haciendo!
 */
const { connect } = require("./src/connection");
const { load } = require("./src/loader");
const { badMacHandler } = require("./src/utils/badMacHandler");
const {
  successLog,
  errorLog,
  warningLog,
  bannerLog,
  infoLog,
} = require("./src/utils/logger");

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

process.on("unhandledRejection", (reason, promise) => {
  if (badMacHandler.handleError(reason, "unhandledRejection")) {
    return;
  }

  errorLog(`Promesa rechazada no manejada:`, reason);
});

async function startBot() {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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
      warningLog(
        "Error de Bad MAC durante la inicialización, intentando nuevamente..."
      );

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
