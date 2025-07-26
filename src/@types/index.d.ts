declare global {
  /** Ruta base del proyecto, usada para imports. */
  const BASE_DIR: string;

  /**
   * Propiedades y funciones disponibles en el objeto pasado a la función handle
   * de cada comando. Puedes acceder a ellas con desestructuración:
   *
   * ```javascript
   * handle: async ({ args, sendReply, isImage }) => {
   *    // Tu código aquí
   * }
   * ```
   */
  interface CommandHandleProps {
    /**
     * Argumentos pasados junto con el comando como un array, lo que separa
     * los argumentos son las barras / | o \
     * Ejemplo: ["arg1", "arg2"]
     */
    args: string[];

    /**
     * Nombre del comando que fue ejecutado
     */
    commandName: string;

    /**
     * Argumentos pasados junto con el comando como string única.
     * Ejemplo: "arg1 / arg2"
     */
    fullArgs: string;

    /**
     * Mensaje entero incluyendo el comando.
     */
    fullMessage: string;

    /**
     * Si el mensaje es un audio.
     */
    isAudio: boolean;

    /**
     * Si el mensaje viene de un grupo.
     */
    isGroup: boolean;

    /**
     * Si el mensaje viene de un grupo cuyos participantes poseen LID.
     */
    isGroupWithLid: boolean;

    /**
     * Si el mensaje es una imagen.
     */
    isImage: boolean;

    /**
     * Si el mensaje es una respuesta a otro mensaje.
     */
    isReply: boolean;

    /**
     * Si el mensaje es un sticker.
     */
    isSticker: boolean;

    /**
     * Si el mensaje es un video.
     */
    isVideo: boolean;

    /**
     * Prefijo del bot configurado.
     */
    prefix: string;

    /**
     * ID del grupo/usuario que está recibiendo el mensaje.
     */
    remoteJid: string;

    /**
     * ID del mensaje que está siendo respondido.
     */
    replyJid: string;

    /**
     * Socket de baileys para operaciones avanzadas.
     */
    socket: any;

    /**
     * Timestamp en que el comando fue iniciado.
     */
    startProcess?: number;

    /**
     * Tipo de comando por cargo, si es "admin", "owner" o "member".
     */
    type?: string;

    /**
     * ID del usuario que está enviando el mensaje.
     */
    userJid: string;

    /**
     * Información detallada del mensaje de WhatsApp.
     */
    webMessage: any;

    /**
     * Elimina un mensaje de un participante de WhatsApp.
     * Necesita ser administrador del grupo para eliminar mensajes de otros participantes.
     *
     *  Ejemplo:
     * ```javascript
     * await deleteMessage(webMessage.key);
     * ```
     * @param key Clave de identificación del mensaje a ser eliminado.
     */
    deleteMessage(key: {
      remoteJid: string;
      fromMe: boolean;
      id: string;
      participant: string;
    }): Promise<void>;

    /**
     * Descarga un audio del mensaje actual.
     * @returns Promise con la ruta del audio
     */
    downloadAudio(): Promise<string>;

    /**
     * Descarga una imagen del mensaje actual.
     * @returns Promise con la ruta de la imagen
     */
    downloadImage(): Promise<string>;

    /**
     * Descarga un sticker del mensaje actual.
     * @returns Promise con la ruta del sticker
     */
    downloadSticker(): Promise<string>;

    /**
     * Descarga un video del mensaje actual.
     * @returns Promise con la ruta del video
     */
    downloadVideo(): Promise<string>;

    /**
     * Envía un audio a partir de un archivo.
     *
     * Ejemplo:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/src/config`);
     * const path = require("node:path");
     *
     * const filePath = path.join(ASSETS_DIR, "samples" "sample-audio.mp3");
     * await sendAudioFromFile(filePath);
     * ```
     * @param filePath Ruta del archivo
     * @param asVoice Si el audio debe ser enviado como mensaje de voz (true o false)
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendAudioFromFile(
      filePath: string,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Envía un audio a partir de un archivo.
     *
     * Ejemplo:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/src/config`);
     * const { getBuffer } = require(`${BASE_DIR}/src/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples" "sample-audio.mp3"))
     * o
     * const buffer = await getBuffer("https://ejemplo.com/audio.mp3");
     * await sendAudioFromBuffer(filePath);
     * ```
     * @param buffer Buffer del archivo de audio
     * @param asVoice Si el audio debe ser enviado como mensaje de voz (true o false)
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendAudioFromBuffer(
      buffer: Buffer,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Envía un audio a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendAudioFromURL("https://ejemplo.com/audio.mp3");
     * ```
     * @param url URL del audio a ser enviado
     * @param asVoice Si el audio debe ser enviado como mensaje de voz (true o false)
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendAudioFromURL(
      url: string,
      asVoice: boolean,
      quoted: boolean
    ): Promise<void>;

    /**
     * Envía un gif a partir de un archivo local.
     *
     * Ejemplo:
     * ```javascript
     * await sendGifFromFile("./assets/alguna-cosa.gif", "Aquí está tu gif @5511920202020", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file Ruta del archivo en el servidor
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendGifFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía un gif a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendGifFromURL("https://ejemplo.com/video.gif", "¡Aquí está tu gif @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL del gif a ser enviado
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendGifFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía un gif a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));
     * o
     * const buffer = await getBuffer("https://ejemplo.com/video.gif");
     * await sendGifFromBuffer(buffer, "¡Aquí está tu gif @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Buffer del gif
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendGifFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía una imagen a partir de un archivo local.
     *
     * Ejemplo:
     * ```javascript
     * await sendImageFromFile("./assets/image.png", "¡Aquí está tu imagen @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file Ruta del archivo en el servidor
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendImageFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía una imagen a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * const fs = require("node:fs");
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     *
     * const buffer = fs.readFileSync("./assets/image.png");
     * o
     * const buffer = await getBuffer("https://ejemplo.com/imagen.png");
     * await sendImageFromBuffer(buffer, "¡Aquí está tu imagen @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Buffer de la imagen
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendImageFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía una imagen a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendImageFromURL("https://ejemplo.com/imagen.png", "¡Aquí está tu imagen @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL de la imagen a ser enviada
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendImageFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía una reacción (emoji) en el mensaje.
     *
     * Ejemplo:
     * ```javascript
     * await sendReact("👍");
     * ```
     * @param emoji Emoji para reaccionar
     */
    sendReact(emoji: string): Promise<void>;

    /**
     * Simula una acción de grabación de audio, enviando un mensaje de estado.
     *
     * @param anotherJid ID de otro grupo/usuario para enviar el estado (opcional)
     */
    sendRecordState(anotherJid?: string): Promise<void>;

    /**
     * Envía una reacción de éxito (emoji ✅) en el mensaje
     */
    sendSuccessReact(): Promise<void>;

    /**
     * Simula una acción de escritura, enviando un mensaje de estado.
     *
     * @param anotherJid ID de otro grupo/usuario para enviar el estado (opcional)
     */
    sendTypingState(anotherJid?: string): Promise<void>;

    /**
     * Envía una reacción de espera (emoji ⏳) en el mensaje.
     */
    sendWaitReact(): Promise<void>;

    /**
     * Envía una reacción de advertencia (emoji ⚠️) en el mensaje.
     */
    sendWarningReact(): Promise<void>;

    /**
     * Envía una reacción de error (emoji ❌) en el mensaje.
     */
    sendErrorReact(): Promise<void>;

    /**
     * Envía un mensaje como respuesta.
     *
     * Ejemplo:
     * ```javascript
     * await sendReply("¡Aquí está tu respuesta!", [mentions]);
     * ```
     * @param text Texto del mensaje
     * @param mentions Array opcional de IDs de usuarios para mencionar
     */
    sendReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Envía un mensaje de éxito como respuesta.
     *
     * Ejemplo:
     * ```javascript
     * await sendSuccessReply("¡Operación completada con éxito!");
     * ```
     * @param text Texto del mensaje de éxito
     * @param mentions Array opcional de IDs de usuarios para mencionar
     */
    sendSuccessReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Envía un mensaje de atención como respuesta.
     *
     * Ejemplo:
     * ```javascript
     * await sendWarningReply("¡Atención! Algo no está bien.");
     * ```
     * @param text Texto del mensaje de error
     * @param mentions Array opcional de IDs de usuarios para mencionar
     */
    sendWarningReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Envía un mensaje de espere como respuesta.
     *
     * Ejemplo:
     * ```javascript
     * await sendWaitReply("Espere, estoy procesando su solicitud...");
     * ```
     * @param text Texto del mensaje de error
     * @param mentions Array opcional de IDs de usuarios para mencionar
     */
    sendWaitReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Envía un mensaje de error como respuesta.
     *
     * Ejemplo:
     * ```javascript
     * await sendErrorReply("¡No fue posible encontrar resultados!");
     * ```
     * @param text Texto del mensaje de error
     * @param mentions Array opcional de IDs de usuarios para mencionar
     */
    sendErrorReply(text: string, mentions?: string[]): Promise<void>;

    /**
     * Envía un sticker a partir de un archivo local.
     *
     * Ejemplo:
     * ```javascript
     * await sendStickerFromFile("./assets/sticker.webp");
     * ```
     * @param path Ruta del archivo en el servidor
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendStickerFromFile(path: string, quoted?: boolean): Promise<void>;

    /**
     * Envía un sticker a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendStickerFromURL("https://ejemplo.com/sticker.webp");
     * ```
     * @param url URL del sticker a ser enviado
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendStickerFromURL(url: string, quoted?: boolean): Promise<void>;

    /**
     * Envía un sticker a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-sticker.webp"));
     * o
     * const buffer = await getBuffer("https://ejemplo.com/sticker.webp");
     * await sendStickerFromBuffer(buffer);
     * ```
     * @param buffer Buffer del sticker
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendStickerFromBuffer(buffer: Buffer, quoted?: boolean): Promise<void>;

    /**
     * Envía un mensaje de texto, opcionalmente mencionando usuarios.
     *
     * Ejemplo:
     * ```javascript
     * await sendText("¡Hola @usuario!", ["123456789@s.whatsapp.net"]);
     * ```
     * @param text Texto del mensaje
     * @param mentions Array opcional de IDs de usuarios para mencionar
     */
    sendText(text: string, mentions?: string[]): Promise<void>;

    /**
     * Envía un video a partir de un archivo local.
     *
     * Ejemplo:
     * ```javascript
     * await sendVideoFromFile("./assets/video.mp4", "¡Aquí está tu video!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file Ruta del archivo en el servidor
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendVideoFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía un video a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendVideoFromURL("https://ejemplo.com/video.mp4", "¡Aquí está tu video @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL del video a ser enviado
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendVideoFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía un video a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));
     * o
     * const buffer = await getBuffer("https://ejemplo.com/video.mp4");
     * await sendVideoFromBuffer(buffer, "¡Aquí está el video @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Buffer del video
     * @param caption Texto del mensaje (opcional)
     * @param mentions Array opcional de JIDs de usuarios para mencionar
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendVideoFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía un documento a partir de un archivo local.
     *
     * Ejemplo:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const path = require("node:path");
     *
     * const filePath = path.join(ASSETS_DIR, "samples", "sample-document.pdf");
     * await sendDocumentFromFile(filePath, "application/pdf", "documento.pdf");
     * ```
     * @param filePath Ruta del archivo
     * @param mimetype Tipo MIME del documento (ej: "application/pdf", "text/plain")
     * @param fileName Nombre del archivo que será mostrado en WhatsApp
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendDocumentFromFile(
      filePath: string,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía un documento a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendDocumentFromURL("https://ejemplo.com/documento.pdf", "application/pdf", "documento.pdf");
     * ```
     * @param url URL del documento a ser enviado
     * @param mimetype Tipo MIME del documento (ej: "application/pdf", "text/plain")
     * @param fileName Nombre del archivo que será mostrado en WhatsApp
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendDocumentFromURL(
      url: string,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Envía un documento a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * const { ASSETS_DIR } = require(`${BASE_DIR}/config`);
     * const { getBuffer } = require(`${BASE_DIR}/utils`);
     * const path = require("node:path");
     * const fs = require("node:fs");
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-document.pdf"));
     * o
     * const buffer = await getBuffer("https://ejemplo.com/documento.pdf");
     * await sendDocumentFromBuffer(buffer, "application/pdf", "documento.pdf");
     * ```
     * @param buffer Buffer del documento
     * @param mimetype Tipo MIME del documento (ej: "application/pdf", "text/plain")
     * @param fileName Nombre del archivo que será mostrado en WhatsApp
     * @param quoted Si el mensaje debe ser enviado mencionando otro mensaje (true o false)
     */
    sendDocumentFromBuffer(
      buffer: Buffer,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<void>;

    /**
     * Obtiene metadatos completos del grupo.
     *
     * Ejemplo:
     * ```javascript
     * const metadata = await getGroupMetadata();
     * console.log("Nombre del grupo:", metadata.subject);
     * console.log("Participantes:", metadata.participants.length);
     * ```
     * @param jid ID del grupo (opcional, usa el grupo actual si no se proporciona)
     * @returns Promise con metadatos del grupo o null si no es un grupo
     */
    getGroupMetadata(jid?: string): Promise<any | null>;

    /**
     * Obtiene el nombre del grupo.
     *
     * Ejemplo:
     * ```javascript
     * const groupName = await getGroupName();
     * await sendReply(`Nombre del grupo: ${groupName}`);
     * ```
     * @param groupJid ID del grupo (opcional, usa el grupo actual si no se proporciona)
     * @returns Promise con el nombre del grupo o string vacía si no es un grupo
     */
    getGroupName(groupJid?: string): Promise<string>;

    /**
     * Obtiene el ID del propietario/creador del grupo.
     *
     * Ejemplo:
     * ```javascript
     * const owner = await getGroupOwner();
     * await sendReply(`Propietario del grupo: @${owner.split("@")[0]}`, [owner]);
     * ```
     * @param groupJid ID del grupo (opcional, usa el grupo actual si no se proporciona)
     * @returns Promise con el ID del propietario o string vacía si no es un grupo
     */
    getGroupOwner(groupJid?: string): Promise<string>;

    /**
     * Obtiene lista de participantes del grupo.
     *
     * Ejemplo:
     * ```javascript
     * const participants = await getGroupParticipants();
     * await sendReply(`Total de participantes: ${participants.length}`);
     * ```
     * @param groupJid ID del grupo (opcional, usa el grupo actual si no se proporciona)
     * @returns Promise con array de participantes o array vacío si no es un grupo
     */
    getGroupParticipants(groupJid?: string): Promise<any[]>;

    /**
     * Obtiene lista de administradores del grupo.
     *
     * Ejemplo:
     * ```javascript
     * const admins = await getGroupAdmins();
     * const adminList = admins.map(admin => `@${admin.split("@")[0]}`).join(", ");
     * await sendReply(`Administradores: ${adminList}`, admins);
     * ```
     * @param groupJid ID del grupo (opcional, usa el grupo actual si no se proporciona)
     * @returns Promise con array de IDs de los administradores o array vacío si no es un grupo
     */
    getGroupAdmins(groupJid?: string): Promise<string[]>;

    /**
     * Envía una encuesta/votación en el chat.
     *
     * Ejemplo:
     * ```javascript
     * const options = [
     *   { optionName: "Opción 1" },
     *   { optionName: "Opción 2" },
     *   { optionName: "Opción 3" }
     * ];
     *
     * await sendPoll("¿Cuál es tu opción favorita?", options, true);
     * ```
     *
     * @param title Título de la encuesta
     * @param options Array de objetos con la propiedad optionName que son las opciones de la encuesta
     * @param singleChoice Si es true, permite solo una elección por usuario. Si es false, permite múltiples elecciones
     * @returns Promise con el resultado de la operación
     */
    sendPoll(
      title: string,
      options: { optionName: string }[],
      singleChoice?: boolean
    ): Promise<void>;
  }
}

export {};
