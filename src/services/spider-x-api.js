/**
 * Funciones de comunicación
 * con la API de Spider X.
 *
 * @author Dev Gui
 */
import axios from "axios";

import * as config from "../config.js";
import { getSpiderApiToken } from "../utils/database.js";

const { SPIDER_API_BASE_URL } = config;

/**
 * No configure el token de la API de Spider X aquí, hágalo en: src/config.js
 */
function isSpiderApiTokenConfigured(token) {
  return token && token.trim() !== "" && token !== "seu_token_aqui";
}

const messageIfTokenNotConfigured = `¡Token de la API de Spider X no configurado!
      
Para configurar, acceda a la carpeta: \`src\` 
y edite el archivo \`config.js\`:

Busque:

\`export const SPIDER_API_TOKEN = "seu_token_aqui";\`

ou

Use el comando:

${config.PREFIX}set-spider-api-token seu_token_aqui

¡No olvide verificar si ${config.PREFIX} es su prefijo!

Para obtener su token, 
cree una cuenta en: https://api.spiderx.com.br
¡y contrate un plan!`;

export let spiderAPITokenConfigured =
  isSpiderApiTokenConfigured(getSpiderApiToken());

function requireSpiderApiToken() {
  const token = getSpiderApiToken();
  spiderAPITokenConfigured = isSpiderApiTokenConfigured(token);

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  return token;
}

export async function play(type, search) {
  if (!search) {
    throw new Error("¡Debe informar lo que desea buscar!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/play-${type}?search=${encodeURIComponent(
      search,
    )}&api_key=${spiderApiToken}`,
  );

  return data;
}

export async function download(type, url) {
  if (!url) {
    throw new Error("¡Debe informar una URL para descargar!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/${type}?url=${encodeURIComponent(
      url,
    )}&api_key=${spiderApiToken}`,
  );

  return data;
}

export async function facebook(url) {
  return download("facebook", url);
}

export async function xTwitter(url) {
  return download("x-twitter", url);
}

export async function gemini(text) {
  if (!text) {
    throw new Error("¡Debe informar el parámetro de texto!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/gemini?api_key=${spiderApiToken}`,
    {
      text,
    },
  );

  return data.response;
}

export async function gpt5Mini(text) {
  if (!text) {
    throw new Error("Você precisa informar o parâmetro de texto!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/gpt-5-mini?api_key=${spiderApiToken}`,
    {
      text,
    },
  );

  return data.response;
}

export async function deepseekV4Flash(text) {
  if (!text) {
    throw new Error("Você precisa informar o parâmetro de texto!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/deepseek-v4-flash?api_key=${spiderApiToken}`,
    {
      text,
    },
  );

  return data.response;
}

export async function transcribe(audioBuffer, mimeType, fileName) {
  if (!audioBuffer) {
    throw new Error("¡Debe informar el buffer de audio!");
  }

  const spiderApiToken = requireSpiderApiToken();
  const formData = new FormData();
  const blob = new Blob([audioBuffer], { type: mimeType || "audio/ogg" });

  formData.append("audio", blob, fileName || "audio.ogg");

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/whisper-v3-turbo?api_key=${spiderApiToken}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!data?.success || !data.transcription) {
    throw new Error(data?.message || "No fue posible transcribir el audio.");
  }

  return data.transcription;
}

const TTS_ALLOWED_VOICES = ["joao", "joão", "ana", "pedro"];
const TTS_MIN_TEXT_LENGTH = 5;
const TTS_MAX_TEXT_LENGTH = 2048;

export async function tts(text, voice = "joao") {
  if (!text) {
    throw new Error("¡Debe informar el texto para convertirlo en audio!");
  }

  const normalizedText = String(text).trim();

  if (normalizedText.length < TTS_MIN_TEXT_LENGTH) {
    throw new Error(
      `El texto debe tener como mínimo ${TTS_MIN_TEXT_LENGTH} caracteres.`,
    );
  }

  if (normalizedText.length > TTS_MAX_TEXT_LENGTH) {
    throw new Error(
      `El texto debe tener como máximo ${TTS_MAX_TEXT_LENGTH} caracteres.`,
    );
  }

  const normalizedVoice = String(voice || "joao").trim().toLowerCase();

  if (!TTS_ALLOWED_VOICES.includes(normalizedVoice)) {
    throw new Error("¡Voz inválida! Use: joao, ana o pedro.");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/tts?api_key=${spiderApiToken}`,
    {
      text: normalizedText,
      voice: normalizedVoice,
    },
  );

  if (!data?.success || !data.url) {
    throw new Error(data?.message || "No fue posible generar el audio.");
  }

  return data.url;
}

export async function attp(text) {
  if (!text) {
    throw new Error("Você precisa informar o parâmetro de texto!");
  }

  const spiderApiToken = requireSpiderApiToken();

  return `${SPIDER_API_BASE_URL}/stickers/attp?text=${encodeURIComponent(
    text,
  )}&api_key=${spiderApiToken}`;
}

export async function ttp(text) {
  if (!text) {
    throw new Error("Você precisa informar o parâmetro de texto!");
  }

  const spiderApiToken = requireSpiderApiToken();

  return `${SPIDER_API_BASE_URL}/stickers/ttp?text=${encodeURIComponent(
    text,
  )}&api_key=${spiderApiToken}`;
}

export async function brat(text) {
  if (!text) {
    throw new Error("Você precisa informar o parâmetro de texto!");
  }

  const spiderApiToken = requireSpiderApiToken();

  return `${SPIDER_API_BASE_URL}/stickers/brat?text=${encodeURIComponent(
    text,
  )}&api_key=${spiderApiToken}`;
}

export async function abrat(text) {
  if (!text) {
    throw new Error("Você precisa informar o parâmetro de texto!");
  }

  const spiderApiToken = requireSpiderApiToken();

  return `${SPIDER_API_BASE_URL}/stickers/abrat?text=${encodeURIComponent(
    text,
  )}&api_key=${spiderApiToken}`;
}

export async function pinterest(search) {
  if (!search) {
    throw new Error("¡Debe informar el parámetro de búsqueda!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/pinterest?search=${encodeURIComponent(
      search,
    )}&api_key=${spiderApiToken}`,
  );

  return data;
}

export async function search(type, search) {
  if (!search) {
    throw new Error("Você precisa informar o parâmetro de pesquisa!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/search/${type}?search=${encodeURIComponent(
      search,
    )}&api_key=${spiderApiToken}`,
  );

  return data;
}

export function welcome(title, description, imageURL) {
  if (!title || !description || !imageURL) {
    throw new Error(
      "¡Debe informar el título, la descripción y la URL de la imagen!",
    );
  }

  const spiderApiToken = requireSpiderApiToken();

  return `${SPIDER_API_BASE_URL}/canvas/welcome?title=${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(
    description,
  )}&image_url=${encodeURIComponent(imageURL)}&api_key=${spiderApiToken}`;
}

export function exit(title, description, imageURL) {
  if (!title || !description || !imageURL) {
    throw new Error(
      "Você precisa informar o título, descrição e URL da imagem!",
    );
  }

  const spiderApiToken = requireSpiderApiToken();

  return `${SPIDER_API_BASE_URL}/canvas/goodbye?title=${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(
    description,
  )}&image_url=${encodeURIComponent(imageURL)}&api_key=${spiderApiToken}`;
}

export async function imageAI(description) {
  if (!description) {
    throw new Error("¡Debe informar la descripción de la imagen!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/ai/flux?text=${encodeURIComponent(
      description,
    )}&api_key=${spiderApiToken}`,
  );

  return data;
}

export function canvas(type, imageURL) {
  if (!imageURL) {
    throw new Error("¡Debe informar la URL de la imagen!");
  }

  const spiderApiToken = requireSpiderApiToken();

  return `${SPIDER_API_BASE_URL}/canvas/${type}?image_url=${encodeURIComponent(
    imageURL,
  )}&api_key=${spiderApiToken}`;
}

export async function setProxy(name) {
  try {
    if (!name) {
      throw new Error("¡Debe informar el nombre del nuevo proxy!");
    }

    const spiderApiToken = requireSpiderApiToken();

    const { data } = await axios.post(
      `${SPIDER_API_BASE_URL}/internal/set-node-js-proxy-active?api_key=${spiderApiToken}`,
      { name },
    );

    return data.success;
  } catch (error) {
    console.error("Error al establecer el proxy:", error);
    throw new Error(
      "¡No fue posible establecer el proxy! Verifique el nombre e inténtelo de nuevo!",
    );
  }
}

export async function updatePlanUser(email, plan) {
  const spiderApiToken = requireSpiderApiToken();

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/internal/update-plan-user?api_key=${spiderApiToken}`,
    {
      email,
      plan,
    },
  );

  return data;
}

export async function toGif(buffer) {
  if (!buffer) {
    throw new Error("¡Debe informar el buffer del archivo!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const formData = new FormData();
  const blob = new Blob([buffer], { type: "image/webp" });
  formData.append("file", blob, "sticker.webp");

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/utilities/to-gif?api_key=${spiderApiToken}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data.url;
}

export async function removeBg(
  buffer,
  mimeType = "image/png",
  fileName = "image.png",
) {
  if (!buffer) {
    throw new Error("¡Debe informar el buffer de la imagen!");
  }

  const spiderApiToken = requireSpiderApiToken();

  const formData = new FormData();
  const blob = new Blob([buffer], { type: mimeType });
  formData.append("image", blob, fileName);

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/removebg?api_key=${spiderApiToken}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    },
  );

  return Buffer.from(data);
}
