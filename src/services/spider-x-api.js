/**
 * Funciones de comunicación
 * con la API de Spider X.
 *
 * @author Dev Gui
 */
import axios from "axios";

import * as config from "../config.js";
import { getSpiderApiToken } from "../utils/database.js";

let { SPIDER_API_TOKEN, SPIDER_API_BASE_URL } = config;

const spiderApiTokenConfig = getSpiderApiToken();

if (spiderApiTokenConfig) {
  SPIDER_API_TOKEN = spiderApiTokenConfig;
}

/**
 * No configure el token de Spider X API aquí, hágalo en: src/config.js
 */
let spiderAPITokenConfigured =
  SPIDER_API_TOKEN &&
  SPIDER_API_TOKEN.trim() !== "" &&
  SPIDER_API_TOKEN !== "seu_token_aqui";

const messageIfTokenNotConfigured = `¡Token de la API de Spider X no configurado!
      
Para configurar, acceda a la carpeta: \`src\` 
y edite el archivo \`config.js\`:

Busque:

\`export const SPIDER_API_TOKEN = "seu_token_aqui";\`

o

Use el comando:

/set-spider-api-token su_token_aqui

¡No olvide verificar si / es su prefijo!

Para obtener su token, 
cree una cuenta en: https://api.spiderx.com.br
¡y contrate un plan!`;

export { spiderAPITokenConfigured };

export async function play(type, search) {
  if (!search) {
    throw new Error("¡Debes informar lo que deseas buscar!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/play-${type}?search=${encodeURIComponent(
      search
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
}

export async function download(type, url) {
  if (!url) {
    throw new Error("¡Debes informar una URL de lo que deseas buscar!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/${type}?url=${encodeURIComponent(
      url
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
}

export async function gemini(text) {
  if (!text) {
    throw new Error("¡Debes informar el parámetro de texto!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/gemini?api_key=${SPIDER_API_TOKEN}`,
    {
      text,
    }
  );

  return data.response;
}

export async function gpt5Mini(text) {
  if (!text) {
    throw new Error("¡Debes informar el parámetro de texto!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/gpt-5-mini?api_key=${SPIDER_API_TOKEN}`,
    {
      text,
    }
  );

  return data.response;
}

export async function attp(text) {
  if (!text) {
    throw new Error("¡Debes informar el parámetro de texto!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  return `${SPIDER_API_BASE_URL}/stickers/attp?text=${encodeURIComponent(
    text
  )}&api_key=${SPIDER_API_TOKEN}`;
}

export async function ttp(text) {
  if (!text) {
    throw new Error("¡Debes informar el parámetro de texto!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  return `${SPIDER_API_BASE_URL}/stickers/ttp?text=${encodeURIComponent(
    text
  )}&api_key=${SPIDER_API_TOKEN}`;
}

export async function search(type, search) {
  if (!search) {
    throw new Error("¡Debes informar el parámetro de búsqueda!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/search/${type}?search=${encodeURIComponent(
      search
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
}

export function welcome(title, description, imageURL) {
  if (!title || !description || !imageURL) {
    throw new Error(
      "¡Debes informar el título, la descripción y la URL de la imagen!"
    );
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  return `${SPIDER_API_BASE_URL}/canvas/welcome?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(
    description
  )}&image_url=${encodeURIComponent(imageURL)}&api_key=${SPIDER_API_TOKEN}`;
}

export function exit(title, description, imageURL) {
  if (!title || !description || !imageURL) {
    throw new Error(
      "¡Debes informar el título, la descripción y la URL de la imagen!"
    );
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  return `${SPIDER_API_BASE_URL}/canvas/goodbye?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(
    description
  )}&image_url=${encodeURIComponent(imageURL)}&api_key=${SPIDER_API_TOKEN}`;
}

export async function imageAI(description) {
  if (!description) {
    throw new Error("¡Debes informar la descripción de la imagen!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/ai/flux?text=${encodeURIComponent(
      description
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
}

export function canvas(type, imageURL) {
  if (!imageURL) {
    throw new Error("¡Debes informar la URL de la imagen!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  return `${SPIDER_API_BASE_URL}/canvas/${type}?image_url=${encodeURIComponent(
    imageURL
  )}&api_key=${SPIDER_API_TOKEN}`;
}

export async function setProxy(name) {
  try {
    if (!name) {
      throw new Error("¡Debes informar el nombre de la nueva proxy!");
    }

    if (!spiderAPITokenConfigured) {
      throw new Error(messageIfTokenNotConfigured);
    }

    const { data } = await axios.post(
      `${SPIDER_API_BASE_URL}/internal/set-node-js-proxy-active?api_key=${SPIDER_API_TOKEN}`,
      {
        name,
      }
    );

    return data.success;
  } catch (error) {
    console.error("Error al establecer la proxy:", error);
    throw new Error(
      "¡No fue posible establecer la proxy! ¡Verifique si el nombre es correcto e intente de nuevo!"
    );
  }
}

export async function updatePlanUser(email, plan) {
  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/internal/update-plan-user?api_key=${SPIDER_API_TOKEN}`,
    {
      email,
      plan,
    }
  );

  return data;
}

export async function toGif(buffer) {
  if (!buffer) {
    throw new Error("¡Debes informar el buffer del archivo!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error(messageIfTokenNotConfigured);
  }

  const formData = new FormData();
  const blob = new Blob([buffer], { type: "image/webp" });
  formData.append("file", blob, "sticker.webp");

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/utilities/to-gif?api_key=${SPIDER_API_TOKEN}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.url;
}
