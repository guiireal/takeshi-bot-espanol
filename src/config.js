import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prefijo predeterminado de los comandos.
export const PREFIX = "/";

// Emoji del bot (cámbielo si prefiere).
export const BOT_EMOJI = "🤖";

// Nombre del bot (cámbielo si prefiere).
export const BOT_NAME = "Takeshi Bot";

// LID del bot.
// Para obtener el LID del bot, use el comando <prefijo>lid respondiendo a un mensaje del número del bot.
// Cambie <prefijo> por el prefijo del bot (ej: /lid).
export const BOT_LID = "12345678901234567890@lid";

// LID del dueño del bot.
// Para obtener el LID del dueño del bot, use el comando <prefijo>meu-lid
// Cambie <prefijo> por el prefijo del bot (ej: /meu-lid).
export const OWNER_LID = "12345678901234567890@lid";

// Directorio de los comandos.
export const COMMANDS_DIR = path.join(__dirname, "commands");

// Directorio de archivos de base de datos.
export const DATABASE_DIR = path.resolve(__dirname, "..", "database");

// Directorio de archivos de recursos (assets).
export const ASSETS_DIR = path.resolve(__dirname, "..", "assets");

// Directorio de archivos temporales.
export const TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

// Tiempo de espera en milisegundos por evento (evita baneos).
export const TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

// Plataforma de APIs.
export const SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";

// Obtenga su token creando una cuenta en: https://api.spiderx.com.br.
export const SPIDER_API_TOKEN = "seu_token_aqui";

// Plataforma de generación de enlaces a partir de imágenes.
export const LINKER_BASE_URL = "https://linker.devgui.dev/api";

// Obtenga su clave en: https://linker.devgui.dev.
export const LINKER_API_KEY = "seu_token_aqui";

// Si desea responder solo a un grupo específico,
// coloque el ID del mismo en la configuración de abajo.
// Para saber el ID del grupo, use el comando <prefijo>get-group-id
// Cambie <prefijo> por el prefijo del bot (ej: /get-group-id).
export const ONLY_GROUP_ID = "";

// Configuración para modo de desarrollo.
// cambie el valor a ( true ) sin los paréntesis
// si desea ver los registros (logs) de mensajes recibidos.
export const DEVELOPER_MODE = false;

// En caso de querer usar proxy.
export const PROXY_PROTOCOL = "http";
export const PROXY_HOST = "";
export const PROXY_PORT = "";
export const PROXY_USERNAME = "";
export const PROXY_PASSWORD = "";

// Versión de WhatsApp Web.
export const WAWEB_VERSION = [2, 3000, 1031821793];

// Clave de OpenAI para el comando de soporte.
export const OPENAI_API_KEY = "";
