/**
 * Servicios de carga de imágenes y generación de enlaces.
 *
 * @author Dev Gui
 */
import axios from "axios";
import FormData from "form-data";
import { LINKER_API_KEY, LINKER_BASE_URL } from "../config.js";

/**
 * No configure la clave de API de Linker aquí, hágalo en: src/config.js
 */
let linkerAPIKeyConfigured =
  LINKER_API_KEY &&
  LINKER_API_KEY.trim() !== "" &&
  LINKER_API_KEY !== "seu_token_aqui";

const messageIfKeyNotConfigured = `¡API Key de Linker no configurada!
      
Para configurar, acceda a la carpeta: \`src\` 
y edite el archivo \`config.js\`:

Busque:

\`export const LINKER_API_KEY = "su_token_aqui";\`

Para obtener su API Key:
1. Acceda a: https://linker.devgui.dev
2. Inicie sesión o cree una cuenta ingresando con su cuenta de Google
3. Vaya a *Configuraciones*
4. Copie su API Key`;

export async function upload(imageBuffer, filename) {
  if (!Buffer.isBuffer(imageBuffer)) {
    throw new Error("¡El primer parámetro debe ser un Buffer válido!");
  }

  if (typeof filename !== "string" || filename.trim() === "") {
    throw new Error("¡El segundo parámetro debe ser el nombre del archivo!");
  }

  if (imageBuffer.length === 0) {
    throw new Error("¡El buffer de la imagen está vacío!");
  }

  if (!linkerAPIKeyConfigured) {
    throw new Error(messageIfKeyNotConfigured);
  }

  const formData = new FormData();
  formData.append("file", imageBuffer, {
    filename: filename,
    contentType: "image/jpeg",
  });

  const response = await axios.post(`${LINKER_BASE_URL}/upload`, formData, {
    headers: {
      "X-API-Key": LINKER_API_KEY,
      ...formData.getHeaders(),
    },
  });

  const result = response.data;

  if (!result.url) {
    throw new Error(`Error en la API: ${result.error || "Error desconocido"}`);
  }

  return result.url;
}
