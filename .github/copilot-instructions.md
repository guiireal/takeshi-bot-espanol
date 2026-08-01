# Takeshi Bot - Instrucciones del AI Coding Assistant

## Descripción del Proyecto

Takeshi Bot es un bot modular de WhatsApp construido sobre Baileys (WhatsApp Web API) con una arquitectura basada en comandos. Los comandos NO son "cases" en un switch gigante. Cada comando es un archivo separado en carpetas basadas en roles (`admin/`, `member/`, `owner/`). Esto mantiene el código limpio y mantenible.

## Arquitectura

### Sistema de Comandos

* **Ubicación**: `src/commands/{admin|member|owner}/`
* **Carga automática**: Los comandos se cargan dinámicamente al iniciar mediante `src/utils/dynamicCommand.js`
* **Modelo de permisos**: La ubicación en la carpeta determina quién puede ejecutarlo:
* `owner/` - Solo el dueño del bot/grupo
* `admin/` - Solo administradores del grupo
* `member/` - Todos los miembros del grupo



**Plantilla de comando** (`src/commands/🤖-como-criar-comandos.js`):

```javascript
import { PREFIX } from "../../config.js";

export default {
  name: "comando",
  description: "Descripción del comando",
  commands: ["comando1", "comando2"], // alias
  usage: `${PREFIX}comando`,
  handle: async ({ sendReply, args, isImage, /* ... */ }) => {
    // Implementación - NO requiere validación de permisos, la carpeta lo gestiona
  },
};

```

### Flujo de Mensajes

1. **Entrada**: `src/middlewares/onMesssagesUpsert.js` - Recibe todos los mensajes de WhatsApp.
2. **Hook Personalizado**: `src/middlewares/customMiddleware.js` - Personalizaciones del usuario (ANTES del procesamiento de comandos).
3. **Funciones Comunes**: `src/utils/loadCommonFunctions.js` - Extrae datos del mensaje y provee helpers `send*`.
4. **Router**: `src/utils/dynamicCommand.js` - Coincide comandos, aplica permisos y gestiona errores.
5. **Ejecución**: Función `handle()` del archivo de comando individual.

### Sistema de Base de Datos

* **Formato**: Archivos JSON en el directorio `database/`.
* **Acceso**: ÚNICAMENTE a través de las funciones de `src/utils/database.js`.
* **Patrón**: Leer JSON → Modificar → Escribir JSON (basado en archivos, sin SQL).
* **Archivos clave**:
* `config.json` - Ajustes de runtime (prefijo, tokens, números).
* `auto-responder.json` - Pares de coincidencia/respuesta.
* `muted.json` - Miembros silenciados por grupo.



**Nunca** leas/escribas archivos JSON directamente. Usa funciones exportadas como `activateAntiLinkGroup()`, `getPrefix()`.

## Patrones Críticos de Desarrollo

### 1. Uso de CommandHandleProps

La función `handle` recibe un objeto de contexto enriquecido. Las propiedades están **documentadas en TypeScript** en `src/@types/index.d.ts`:

```javascript
handle: async ({ 
  args,           // ["arg1", "arg2"] - dividido por / | \
  fullArgs,       // "arg1 / arg2" - string crudo
  isImage,        // boolean - chequeo de tipo de mensaje
  sendReply,      // Envía respuesta citada
  sendSuccessReply, sendErrorReply, sendWarningReply, // Respuestas pre-estilizadas
  downloadImage,  // Extrae media del mensaje
  getGroupAdmins, // Obtiene metadata del grupo
  // ... más de 50 utilidades
}) => { /* ... */ }

```

**Regla**: Desestructura siempre solo lo que necesites. Consulta `src/@types/index.d.ts` para la API completa.

### 2. Patrón Custom Middleware

`src/middlewares/customMiddleware.js` es la ZONA SEGURA para personalizaciones:

```javascript
export async function customMiddleware({ type, commonFunctions, socket, webMessage, action, data }) {
  // type: "message" | "participant"
  
  if (type === "message" && commonFunctions) {
    const { sendReply, userMessageText } = commonFunctions;
    // Lógica personalizada para mensajes
  }
  
  if (type === "participant" && action === "add") {
    // Lógica personalizada para nuevos miembros
  }
}

```

### 3. Patrón de Manejo de Media

Tres variantes para cada tipo de media (audio, imagen, video, sticker, documento, gif):

```javascript
// Desde archivo local
await sendImageFromFile("./assets/image.jpg", "Leyenda", [mentions], quoted);

// Desde URL
await sendImageFromURL("https://example.com/img.png", "Leyenda");

// Desde buffer (tras descarga/procesamiento)
const buffer = await getBuffer(url);
await sendImageFromBuffer(buffer, "Leyenda");

```

**Importante**: El audio usa `sendAudioFrom*` con el parámetro booleano `asVoice` para PTT (Push-to-Talk).

### 4. Manejo de Errores

Usa clases de error personalizadas de `src/errors/`:

```javascript
import { InvalidParameterError, WarningError } from "../../../errors/index.js";

// Los "throws" son capturados por dynamicCommand y formateados automáticamente
if (!args[0]) throw new InvalidParameterError("Falta parámetro requerido");
if (notAllowed) throw new WarningError("Acción no permitida");

```

### 5. Acceso a la Configuración

Los **ajustes de runtime** pueden sobrescribir `src/config.js`:

```javascript
import { getBotNumber, getPrefix, getSpiderApiToken } from "../../utils/database.js";

// NO HACER: import { PREFIX } from "../../config.js"; 
// SÍ HACER:
const prefix = getPrefix(remoteJid); // Prioriza base de datos, fallback a config

```

### 6. Manejo de Error "Bad MAC"

El bot tiene recuperación automática para errores "Bad MAC" de WhatsApp vía `src/utils/badMacHandler.js`:

* Rastrea el conteo de errores con un límite de 15 intentos.
* Limpia automáticamente archivos de sesión al alcanzar el límite.

**No** añadas manejo manual de Bad MAC en los comandos.

## Flujos de Trabajo del Desarrollador

### Ejecución del Bot

```bash
npm start           # Desarrollo con flag --watch
npm test            # Ejecuta todos los tests de Node.js
npm run test:all    # Alias de compatibilidad para la suite de tests
bash update.sh      # Descarga últimos cambios de git
bash reset-qr-auth.sh # Borra archivos de sesión y reconecta

```

### Añadir un Nuevo Comando

1. Crea el archivo en `src/commands/{admin|member|owner}/nombre-del-comando.js`.
2. Copia la plantilla de `🤖-como-criar-comandos.js`.
3. Implementa la función `handle` con propiedades desestructuradas.
4. **No requiere reinicio** - el cargador dinámico lo detecta.

### Depuración (Debugging)

* Activa `DEVELOPER_MODE = true` en `src/config.js` para loguear mensajes entrantes.
* Logs almacenados en `assets/temp/wa-logs.txt` vía Pino.
* Usa `errorLog()`, `warningLog()`, `successLog()` de `src/utils/logger.js`.

## Puntos de Integración

### API Externa - Spider X API

* **Config**: `SPIDER_API_TOKEN` en `src/config.js` o vía `setSpiderApiToken()`.
* **Servicio**: `src/services/spider-x-api.js`.
* **Uso**: Descargas de TikTok, YouTube, búsqueda en Google, AI stickers, etc.

### Baileys (WhatsApp)

* **Conexión**: `src/connection.js` - Gestiona emparejamiento, reconexión y caché.
* **Estado**: Almacenado en `assets/auth/baileys/`.
* **Caché de grupos**: TTL de 24 horas vía NodeCache para reducir llamadas a la API.

## Convenciones Específicas

### Nomenclatura

* Comandos: `kebab-case.js` (ej: `anti-link.js`).
* Tutoriales: Prefijo emoji `🤖-archivo.js`.

### Variables Globales

* `BASE_DIR`: Definida en `src/loader.js`, apunta al directorio `src/`.
* Uso en imports: `require(\`${BASE_DIR}/config`)`.

### Formato de Menciones

Formato JID: `"5511999999999@s.whatsapp.net"`.
En mensajes: `@5511999999999` (solo número, array pasado por separado).
