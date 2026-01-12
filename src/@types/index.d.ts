import { GroupMetadata, proto, WAMessage, WASocket } from "baileys";

declare global {
  /**
   * Parámetros del customMiddleware disponibles para personalización del bot.
   * Use este middleware para agregar lógica personalizada sin modificar archivos principales.
   *
   * @example
   * ```javascript
   * export async function customMiddleware({ type, commonFunctions, socket, webMessage }) {
   *   if (type === "message" && commonFunctions) {
   *     const { sendReply, userMessageText } = commonFunctions;
   *     if (userMessageText?.toLowerCase() === "oi") {
   *       await sendReply("Hola! 👋");
   *     }
   *   }
   * }
   * ```
   */
  interface CustomMiddlewareProps {
    /**
     * Socket del Baileys para operaciones avanzadas.
     */
    socket: WASocket;

    /**
     * Mensaje completo de WhatsApp.
     */
    webMessage: WAMessage;

    /**
     * Tipo del evento siendo procesado.
     * - "message": Mensaje normal del usuario
     * - "participant": Evento de agregar/remover participante
     */
    type: "message" | "participant";

    /**
     * Todas las funciones comunes del bot (sendReply, args, isImage, etc.).
     * Disponible solo cuando type === "message".
     * Será null cuando type === "participant".
     *
     * @see CommandHandleProps para lista completa de funciones disponibles
     */
    commonFunctions: CommandHandleProps | null;

    /**
     * Acción del participante en el  grupo.
     * Disponible solo cuando type === "participant".
     * - "add": Participante fue agregado al  grupo
     * - "remove": Participante fue removido/salió del  grupo
     */
    action?: "add" | "remove";

    /**
     * Datos del participante (LID).
     * Disponible solo cuando type === "participant".
     * Ejemplo: "12345678901234567890@lid"
     */
    data?: string;
  }

  /**
   * Propiedades y funciones disponibles en el objeto pasado a la función handle
   * de cada comando. Puedes accederlas con desestructuración:
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
     * os argumentos são as barras / | ou \
     * Ejemplo: ["arg1", "arg2"]
     */
    args: string[];

    /**
     *  Nombre del comando que fue ejecutado
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
     *  Si la  mensaje es un áudio.
     */
    isAudio: boolean;

    /**
     * Si el mensaje vino de un  grupo.
     */
    isGroup: boolean;

    /**
     * Si el mensaje vino de un  grupo cuyos participantes poseen LID.
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
     * Si el mensaje es un  sticker.
     */
    isSticker: boolean;

    /**
     * Si el mensaje es un  vídeo.
     */
    isVideo: boolean;

    /**
     * Prefijo del bot configurado.
     */
    prefix: string;

    /**
     * ID del  grupo/usuario que está recibiendo el mensaje.
     */
    remoteJid: string;

    /**
     * ID del mensaje que está siendo respondido.
     */
    replyLid: string;

    /**
     * Texto del mensaje que viene de un mensaje que respondes encima.
     */
    replyText: string;

    /**
     * Socket del baileys para operaciones avanzadas.
     */
    socket: WASocket;

    /**
     * Timestamp en que el comando fue iniciado.
     */
    startProcess?: number;

    /**
     * Tipo de comando por rol, si es "admin", "owner" o "member".
     */
    type?: string;

    /**
     * ID del usuario que está mandando el mensaje.
     *
     * WhatsApp está migrando del antiguo identificador JID (basado en número de teléfono) al LID (Local Identifier),
     * que es un identificador privado, aleatorio y no revela el número del usuario. El LID refuerza la privacidad, pues el número
     * solo es compartido si el propio usuario lo permite. Vea más en: https://digisac.com.br/jid-lid-no-whatsapp/
     */
    userLid: string;

    /**
     * Información detallada del mensaje de WhatsApp.
     */
    webMessage: WAMessage;

    /**
     * Elimina un mensaje de un participante de WhatsApp.
     * Necesita ser administrador del  grupo para eliminar mensajes de otros participantes.
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
     * Hace download de un audio del mensaje actual.
     * @returns Promise con el camino del audio
     */
    downloadAudio(webMessage: any, fileName: string): Promise<string>;

    /**
     * Hace download de uma  imagen da  mensaje atual.
     * @returns Promise con el camino da  imagen
     */
    downloadImage(webMessage: any, fileName: string): Promise<string>;

    /**
     * Hace download de um  sticker da  mensaje atual.
     * @returns Promise con el camino do  sticker
     */
    downloadSticker(webMessage: any, fileName: string): Promise<string>;

    /**
     * Hace download de um  vídeo da  mensaje atual.
     * @returns Promise con el camino do  vídeo
     */
    downloadVideo(webMessage: any, fileName: string): Promise<string>;

    /**
     * Envia um áudio a partir de un  archivo.
     *
     * Ejemplo:
     * ```javascript
     * import { ASSETS_DIR } from "../../config.js";
     * import path from "node:path";
     *
     * const filePath = path.join(ASSETS_DIR, "samples", "sample-audio.mp3");
     * await sendAudioFromFile(filePath);
     * ```
     * @param filePath  Camino del  archivo
     * @param asVoice  Si el áudio debe ser enviado como  mensaje de  voz (true o false)
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendAudioFromFile(
      filePath: string,
      asVoice: boolean,
      quoted: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um áudio a partir de un  archivo.
     *
     * Ejemplo:
     * ```javascript
     * import { ASSETS_DIR } from "../../config.js";
     * import { getBuffer } from "../../utils/index.js";
     * import path from "node:path";
     * import fs from "node:fs";
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-audio.mp3"));
     * // ou
     * const buffer = await getBuffer("https://exemplo.com/audio.mp3");
     * await sendAudioFromBuffer(buffer, true, false);
     * ```
     * @param buffer  Buffer del  archivo de áudio
     * @param asVoice  Si el áudio debe ser enviado como  mensaje de  voz (true o false)
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendAudioFromBuffer(
      buffer: Buffer,
      asVoice: boolean,
      quoted: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um áudio a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendAudioFromURL("https://exemplo.com/audio.mp3");
     * ```
     * @param url  URL del áudio a ser enviado
     * @param asVoice  Si el áudio debe ser enviado como  mensaje de  voz (true o false)
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendAudioFromURL(
      url: string,
      asVoice: boolean,
      quoted: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  contacto para o  grupo ou  usuario.
     *
     * Ejemplo:
     * ```javascript
     * await sendContact("5511920202020", "Usuario Exemplo");
     * ```
     * @param phoneNumber  Número de telefone do  contacto (formato internacional, ej: "5511920202020")
     * @param displayName  Nombre del  contacto a ser exibido
     */
    sendContact(phoneNumber: string, displayName: string): Promise<void>;

    /**
     * Envía una  mensaje editado como  respuesta a un  mensaje anterior.
     *
     * Ejemplo:
     * ```javascript
     * const response = await sendReply("Mensagem 1", [mentions]);
     * await sendEditedReply("Mensagem editada", response, [mentions]);
     * ```
     * @param text Texto da  mensaje
     * @param messageToEdit Mensagem a ser editada
     * @param mentions Array opcional de IDs de  usuarios para mencionar
     */
    sendEditedReply(
      text: string,
      messageToEdit: proto.WebMessageInfo,
      mentions?: string[]
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  mensaje de  texto, opcionalmente mencionando  usuarios.
     *
     * Ejemplo:
     * ```javascript
     * const response = await sendText("Olá @ usuario!", ["123456789@s.whatsapp.net"]);
     * await sendEditedText("Mensagem editada", response, ["123456789@s.whatsapp.net"]);
     * ```
     * @param text Texto da  mensaje
     * @param messageToEdit Mensagem a ser editada
     * @param mentions Array opcional de IDs de  usuarios para mencionar
     */
    sendEditedText(
      text: string,
      messageToEdit: proto.WebMessageInfo,
      mentions?: string[]
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  gif a partir de un  archivo local.
     *
     * Ejemplo:
     * ```javascript
     * await sendGifFromFile("./assets/alguma-coisa. gif", "Aqui está seu  gif @5511920202020", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file  Camino del  archivo en el servidor
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendGifFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  gif a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendGifFromURL("https://exemplo.com/video. gif", "Aqui está seu  gif @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url  URL del  gif a ser enviado
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendGifFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  gif a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * import { ASSETS_DIR } from "../../config.js";
     * import { getBuffer } from "../../utils/index.js";
     * import path from "node:path";
     * import fs from "node:fs";
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));
     * // ou
     * const buffer = await getBuffer("https://exemplo.com/video. gif");
     * await sendGifFromBuffer(buffer, "Aqui está seu  gif @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer  Buffer del  gif
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendGifFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  imagen a partir de un  archivo local.
     *
     * Ejemplo:
     * ```javascript
     * await sendImageFromFile("./assets/image.png", "Aqui está sua  imagen @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file  Camino del  archivo en el servidor
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendImageFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  imagen a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * import fs from "node:fs";
     * import { getBuffer } from "../../utils/index.js";
     *
     * const buffer = fs.readFileSync("./assets/image.png");
     * // ou
     * const buffer = await getBuffer("https://exemplo.com/ imagen.png");
     * await sendImageFromBuffer(buffer, "Aqui está sua  imagen @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer Buffer da  imagen
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendImageFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  imagen a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendImageFromURL("https://exemplo.com/ imagen.png", "Aqui está sua  imagen @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url URL da  imagen a ser enviada
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendImageFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  localización geográfica.
     *
     * Ejemplo:
     * ```javascript
     * await sendLocation(-23.550520, -46.633308);
     * ```
     * @param latitude Latitude da  localización
     * @param longitude Longitude da  localización
     */
    sendLocation(latitude: number, longitude: number): Promise<void>;

    /**
     * Envía una  reacción (emoji) na  mensaje.
     *
     * Ejemplo:
     * ```javascript
     * await sendReact("👍");
     * ```
     * @param emoji Emoji para reagir
     */
    sendReact(emoji: string): Promise<proto.WebMessageInfo>;

    /**
     * Simula uma ação de gravação de áudio, enviando uma  mensaje de estado.
     *
     * @param anotherJid ID de outro  grupo/ usuario para enviar o estado (opcional)
     */
    sendRecordState(anotherJid?: string): Promise<void>;

    /**
     * Envía una  reacción de  éxito (emoji ✅) na  mensaje
     */
    sendSuccessReact(): Promise<proto.WebMessageInfo>;

    /**
     * Simula uma ação de digitação, enviando uma  mensaje de estado.
     *
     * @param anotherJid ID de outro  grupo/ usuario para enviar o estado (opcional)
     */
    sendTypingState(anotherJid?: string): Promise<void>;

    /**
     * Envía una  reacción de  error (emoji ⏳) na  mensaje.
     */
    sendWaitReact(): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  reacción de  error (emoji ⚠️) na  mensaje.
     */
    sendWarningReact(): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  reacción de  error (emoji ❌) na  mensaje.
     */
    sendErrorReact(): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  mensaje como resposta.
     *
     * Ejemplo:
     * ```javascript
     * await sendReply("Aqui está sua resposta!", [mentions]);
     * ```
     * @param text Texto da  mensaje
     * @param mentions Array opcional de IDs de  usuarios para mencionar
     */
    sendReply(text: string, mentions?: string[]): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  mensaje de  éxito como resposta.
     *
     * Ejemplo:
     * ```javascript
     * await sendSuccessReply("Operação concluída com  éxito!");
     * ```
     * @param text Texto da  mensaje de  éxito
     * @param mentions Array opcional de IDs de  usuarios para mencionar
     */
    sendSuccessReply(
      text: string,
      mentions?: string[]
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  mensaje de atención como resposta.
     *
     * Ejemplo:
     * ```javascript
     * await sendWarningReply("Atenção! Algo não está certo.");
     * ```
     * @param text Texto da  mensaje de  error
     * @param mentions Array opcional de IDs de  usuarios para mencionar
     */
    sendWarningReply(
      text: string,
      mentions?: string[]
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  mensaje de espera como resposta.
     *
     * Ejemplo:
     * ```javascript
     * await sendWaitReply("Aguarde, estou processando sua solicitação...");
     * ```
     * @param text Texto da  mensaje de  error
     * @param mentions Array opcional de IDs de  usuarios para mencionar
     */
    sendWaitReply(
      text: string,
      mentions?: string[]
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  mensaje de  error como resposta.
     *
     * Ejemplo:
     * ```javascript
     * await sendErrorReply("Não foi possível encontrar resultados!");
     * ```
     * @param text Texto da  mensaje de  error
     * @param mentions Array opcional de IDs de  usuarios para mencionar
     */
    sendErrorReply(
      text: string,
      mentions?: string[]
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  sticker a partir de un  archivo local.
     *
     * Ejemplo:
     * ```javascript
     * await sendStickerFromFile("./assets/ sticker.webp");
     * ```
     * @param path  Camino del  archivo en el servidor
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendStickerFromFile(
      path: string,
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  sticker a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendStickerFromURL("https://exemplo.com/ sticker.webp");
     * ```
     * @param url  URL del  sticker a ser enviado
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendStickerFromURL(
      url: string,
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  sticker a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * import { ASSETS_DIR } from "../../config.js";
     * import { getBuffer } from "../../utils/index.js";
     * import path from "node:path";
     * import fs from "node:fs";
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample- sticker.webp"));
     * // ou
     * const buffer = await getBuffer("https://exemplo.com/ sticker.webp");
     * await sendStickerFromBuffer(buffer);
     * ```
     * @param buffer  Buffer del  sticker
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendStickerFromBuffer(
      buffer: Buffer,
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envía una  mensaje de  texto, opcionalmente mencionando  usuarios.
     *
     * Ejemplo:
     * ```javascript
     * await sendText("Olá @ usuario!", ["123456789@s.whatsapp.net"]);
     * ```
     * @param text Texto da  mensaje
     * @param mentions Array opcional de IDs de  usuarios para mencionar
     */
    sendText(text: string, mentions?: string[]): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  vídeo a partir de un  archivo local.
     *
     * Ejemplo:
     * ```javascript
     * await sendVideoFromFile("./assets/video.mp4", "Aqui está seu  vídeo!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param file  Camino del  archivo en el servidor
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendVideoFromFile(
      file: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  vídeo a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendVideoFromURL("https://exemplo.com/video.mp4", "Aqui está seu  vídeo @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param url  URL del  vídeo a ser enviado
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendVideoFromURL(
      url: string,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  vídeo a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * import { ASSETS_DIR } from "../../config.js";
     * import { getBuffer } from "../../utils/index.js";
     * import path from "node:path";
     * import fs from "node:fs";
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-video.mp4"));
     * // ou
     * const buffer = await getBuffer("https://exemplo.com/video.mp4");
     * await sendVideoFromBuffer(buffer, "Aqui está o  vídeo @5511920202020!", ["5511920202020@s.whatsapp.net"]);
     * ```
     * @param buffer  Buffer del  vídeo
     * @param caption Texto da  mensaje (opcional)
     * @param mentions Array opcional de JIDs de  usuarios para mencionar
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendVideoFromBuffer(
      buffer: Buffer,
      caption?: string,
      mentions?: string[],
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  documento a partir de un  archivo local.
     *
     * Ejemplo:
     * ```javascript
     * import { ASSETS_DIR } from "../../config.js";
     * import path from "node:path";
     *
     * const filePath = path.join(ASSETS_DIR, "samples", "sample-document.pdf");
     * await sendDocumentFromFile(filePath, "application/pdf", " documento.pdf");
     * ```
     * @param filePath  Camino del  archivo
     * @param mimetype Tipo MIME do  documento (ej: "application/pdf", "text/plain")
     * @param fileName  Nombre del  archivo que será exibido no WhatsApp
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendDocumentFromFile(
      filePath: string,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  documento a partir de una URL.
     *
     * Ejemplo:
     * ```javascript
     * await sendDocumentFromURL("https://exemplo.com/ documento.pdf", "application/pdf", " documento.pdf");
     * ```
     * @param url  URL del  documento a ser enviado
     * @param mimetype Tipo MIME do  documento (ej: "application/pdf", "text/plain")
     * @param fileName  Nombre del  archivo que será exibido no WhatsApp
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendDocumentFromURL(
      url: string,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Envia um  documento a partir de un buffer.
     *
     * Ejemplo:
     * ```javascript
     * import { ASSETS_DIR } from "../../config.js";
     * import { getBuffer } from "../../utils/index.js";
     * import path from "node:path";
     * import fs from "node:fs";
     *
     * const buffer = fs.readFileSync(path.join(ASSETS_DIR, "samples", "sample-document.pdf"));
     * // ou
     * const buffer = await getBuffer("https://exemplo.com/ documento.pdf");
     * await sendDocumentFromBuffer(buffer, "application/pdf", " documento.pdf");
     * ```
     * @param buffer  Buffer del  documento
     * @param mimetype Tipo MIME do  documento (ej: "application/pdf", "text/plain")
     * @param fileName  Nombre del  archivo que será exibido no WhatsApp
     * @param quoted  Si la  mensaje deve ser enviada mencionando outra  mensaje (true o false)
     */
    sendDocumentFromBuffer(
      buffer: Buffer,
      mimetype?: string,
      fileName?: string,
      quoted?: boolean
    ): Promise<proto.WebMessageInfo>;

    /**
     * Obtém metadados completos do  grupo.
     *
     * Ejemplo:
     * ```javascript
     * const metadata = await getGroupMetadata();
     * console.log(" Nombre del  grupo:", metadata.subject);
     * console.log("Participantes:", metadata.participants.length);
     * ```
     * @param jid ID do  grupo (opcional, usa o  grupo atual se não fornecido)
     * @returns Promise com metadados do  grupo ou null se não for um  grupo
     */
    getGroupMetadata(jid?: string): Promise<GroupMetadata | null>;

    /**
     * Obtém o nome do  grupo.
     *
     * Ejemplo:
     * ```javascript
     * const groupName = await getGroupName();
     * await sendReply(` Nombre del  grupo: ${groupName}`);
     * ```
     * @param groupJid ID do  grupo (opcional, usa o  grupo atual se não fornecido)
     * @returns Promise com o nome do  grupo ou string vazia se não for um  grupo
     */
    getGroupName(groupJid?: string): Promise<string>;

    /**
     * Obtém o ID do dono/criador do  grupo.
     *
     * Ejemplo:
     * ```javascript
     * const owner = await getGroupOwner();
     * await sendReply(`Dono do  grupo: @${owner.split("@")[0]}`, [owner]);
     * ```
     * @param groupJid ID do  grupo (opcional, usa o  grupo atual se não fornecido)
     * @returns Promise com o ID do dono ou string vazia se não for um  grupo
     */
    getGroupOwner(groupJid?: string): Promise<string>;

    /**
     * Obtém lista de participantes do  grupo.
     *
     * Ejemplo:
     * ```javascript
     * const participants = await getGroupParticipants();
     * await sendReply(`Total de participantes: ${participants.length}`);
     * ```
     * @param groupJid ID do  grupo (opcional, usa o  grupo atual se não fornecido)
     * @returns Promise com array de participantes ou array vazio se não for um  grupo
     */
    getGroupParticipants(groupJid?: string): Promise<any[]>;

    /**
     * Obtém lista de administradores do  grupo.
     *
     * Ejemplo:
     * ```javascript
     * const admins = await getGroupAdmins();
     * const adminList = admins.map(admin => `@${admin.split("@")[0]}`).join(", ");
     * await sendReply(`Administradores: ${adminList}`, admins);
     * ```
     * @param groupJid ID do  grupo (opcional, usa o  grupo atual se não fornecido)
     * @returns Promise com array de IDs dos administradores ou array vazio se não for um  grupo
     */
    getGroupAdmins(groupJid?: string): Promise<string[]>;

    /**
     * Envía una  encuesta/ votación no  chat.
     *
     * Ejemplo:
     * ```javascript
     * const options = [
     *   { optionName: "Opção 1" },
     *   { optionName: "Opção 2" },
     *   { optionName: "Opção 3" }
     * ];
     *
     * await sendPoll("Qual a sua opção favorita?", options, true);
     * ```
     *
     * @param title Título da  encuesta
     * @param options Array de objetos com a propriedade optionName que são as opções da  encuesta
     * @param singleChoice Se true, permite apenas uma escolha por  usuario. Se false, permite múltiplas escolhas
     * @returns Promise com o resultado da operação
     */
    sendPoll(
      title: string,
      options: { optionName: string }[],
      singleChoice?: boolean
    ): Promise<proto.WebMessageInfo>;
  }
}

export {};
