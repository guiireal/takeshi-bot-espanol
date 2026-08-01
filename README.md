# 🤖 Takeshi Bot

![Takeshi Bot](./assets/images/takeshi-bot.png)

[![Version](https://img.shields.io/badge/Versión-8.11.0-blue)](https://github.com/guiireal/takeshi-bot-espanol)
[![Tests](https://github.com/guiireal/takeshi-bot-espanol/actions/workflows/test.yml/badge.svg)](https://github.com/guiireal/takeshi-bot-espanol/actions/workflows/test.yml)

> Base para bots de WhatsApp multifuncional con diversos comandos listos.

[![Node.js](https://img.shields.io/badge/Node.js-24-green?logo=node.js)](https://nodejs.org/en)
[![Axios](https://img.shields.io/badge/Axios-1.13-blue?logo=axios)](https://axios-http.com/ptbr/docs/intro)
[![Baileys](https://img.shields.io/badge/Baileys-7.0.0--rc.14-purple?logo=whatsapp)](https://github.com/WhiskeySockets/Baileys)
[![FFMPEG](https://img.shields.io/badge/FFMPEG-Latest-orange?logo=ffmpeg)](https://ffmpeg.org/)
[![Spider X API](https://img.shields.io/badge/Spider_X-API-green?logo=api)](https://api.spiderx.com.br)

## Desarrollado desde cero, en el vídeo

[CREANDO UN BOT DE WHATSAPP DESDE CERO (GUÍA DEFINITIVA) - BASE COMPLETA + 6 COMANDOS - JAVASCRIPT](https://youtu.be/6zr2NYIYIyc)

![Logger](./assets/images/logger.png)

## 📋 Sumario

1. [🌐 Idiomas Disponibles](#-accede-al-takeshi-bot-en-otros-idiomas)
2. [⚠️ Atención](#-atención)
3. [📖 Sobre el Proyecto](#sobre-este-proyecto)
4. [🚀 Instalación](#instalación-en-termux)
    - [En Termux](#instalación-en-termux)
    - [En las principales hosts de Brasil](#instalación-en-las-principales-hosts-de-brasil)
    - [En Windows](#instalación-en-windows)
    - [En VPS (Debian/Ubuntu)](#instalación-en-vps-debianubuntu)
5. [📊 Diagrama de conexión](#diagrama-de-conexión)
6. [⚙️ Algunos comandos necesitan API](#algunos-comandos-necesitan-api)
7. [🛠️ Funcionalidades](#funcionalidades-generales)
    - [Funcionalidades generales](#funcionalidades-generales)
    - [Funcionalidades de envío (Ejemplos)](#funcionalidades-de-envío-ejemplos)
8. [🤖 Auto responder](#auto-responder)
    - [Menú del bot](#dónde-está-el-menú-del-bot)
    - [Mensajes de bienvenidas](#dónde-modifico-el-mensaje-de-bienvenidas-y-cuando-alguien-sale-del-grupo)
9. [📊 Diagrama de cómo funcionan los comandos](#diagrama-de-cómo-funcionan-los-comandos)
10. [📊 Diagrama de cómo funcionan los middlewares](#diagrama-de-cómo-funcionan-los-middlewares-interceptores-de-recepción-y-salida)
11. [💻 Custom Middleware - Personaliza el bot sin modificar archivos principales](#custom-middleware---personaliza-el-bot-sin-modificar-archivos-principales)
12. [🛠️ Implementación técnica de los ejemplos](#implementación-técnica-de-los-ejemplos)
13. [📁 Estructura de carpetas](#estructura-de-carpetas)
14. [🔄 Actualizar el bot](#actualizar-el-bot)
15. [🧪 Tests](#tests)
16. [❓ Errores comunes](#errores-comunes)
17. [📺 Suscríbete al canal](#suscribete-al-canal)
18. [🤝 Contribuyendo con el proyecto](#contribuyendo-con-el-proyecto)
19. [⚖️ Licencia y Disclaimer](#licencia)

## 🌐 Accede al Takeshi Bot en otros idiomas

- 🇧🇷 [**Portuguese version**](https://github.com/guiireal/takeshi-bot)

## ⚠️ Atención

No prestamos soporte gratuito si adquiriste esta base con terceros y pagaste por ella.
Este bot siempre ha sido y siempre será **gratuito**.
Si pagaste para utilizar este bot, del modo que está hoy, sabe que **fuiste engañado**.
No tenemos vínculo ninguno con terceros y no nos responsabilizamos por eso, tampoco prestamos soporte en esas condiciones.
Los únicos recursos pagos de este bot pertenecen a [https://api.spiderx.com.br](https://api.spiderx.com.br), nuestra API oficial.

## Sobre este proyecto

Este proyecto no posee ningún vínculo oficial con WhatsApp. Fue desarrollado de forma independiente para interacciones automatizadas por medio de la plataforma.

No nos responsabilizamos por ningún uso indebido de este bot. Es de responsabilidad exclusiva del usuario garantizar que su utilización esté en conformidad con los términos de uso de WhatsApp y la legislación vigente.

## Instalación en Termux (nuevo vídeo tutorial: [https://youtu.be/-yjn1Xe3ltg](https://youtu.be/-yjn1Xe3ltg))

1 - Abre Termux y ejecuta los comandos abajo.
_No tienes Termux? [Haz clic aquí y descarga la última versión](https://www.mediafire.com/file/wxpygdb9bcb5npb/Termux_0.118.3_Dev_Gui.apk) o [haz clic aquí y descarga versión de Play Store](https://play.google.com/store/apps/details?id=com.termux) si la versión de MediaFire anterior no funciona._

```sh
pkg upgrade -y && pkg update -y && pkg install git -y && pkg install nodejs-lts -y && pkg install ffmpeg -y
```

2 - Habilita el acceso a la carpeta storage en termux.

```sh
termux-setup-storage
```

3 - Elige una carpeta de tu preferencia para colocar los archivos del bot.

Carpetas más utilizadas:

- /sdcard
- /storage/emulated/0
- /storage/emulated/0/Download (muy común cuando descargas el bot por .zip)

En nuestro ejemplo, vamos a `/sdcard`

```sh
cd /sdcard
```

4 - Clona el repositorio.

```sh
    git clone https://github.com/guiireal/takeshi-bot-espanol.git
```

5 - Entra en la carpeta que fue clonada.

```sh
cd takeshi-bot-espanol
```

6 - Habilita permisos de lectura y escritura (haz solo 1x este paso).

```sh
chmod -R 755 ./*
```

7 - Ejecuta el bot.

```sh
npm start
```

8 - Inserta el número de teléfono y presiona `enter`.

9 - Informa el código que aparece en termux en tu WhatsApp, [mira aquí si no encuentras esa opción](https://youtu.be/6zr2NYIYIyc?t=5395).

10 - Espera 10 segundos, después digita `CTRL + C` para parar el bot.

Después, configura el archivo `config.js` que está dentro de la carpeta `src`.

```js
// Prefijo predeterminado de los comandos.
export const PREFIX = "/";

// Emoji del bot (cambia si prefieres).
export const BOT_EMOJI = "🤖";

// Nombre del bot (cambia si prefieres).
export const BOT_NAME = "Takeshi Bot";

// LID del bot.
// Para obtener el LID del bot, usa el comando <prefijo>lid respondiendo encima de un mensaje del número del bot
// Cambia el <prefijo> por el prefijo del bot (ej: /lid).
export const BOT_LID = "12345678901234567890@lid";

// LID del dueño del bot.
// Para obtener el LID del dueño del bot, usa el comando <prefijo>meu-lid
// Cambia el <prefijo> por el prefijo del bot (ej: /meu-lid).
export const OWNER_LID = "12345678901234567890@lid";
```

11 - Inicia el bot nuevamente.

```sh
npm start
```

## Instalación en las principales hosts de Brasil

Las principales hosts ya ofrecen Takeshi como **bot predeterminado**, no siendo necesario ninguna instalación manual!

**Hosts soportadas**:

| Bronxys | Nexfuture | Speed Cloud |
|---------|-----------|-------------|
| [Grupo oficial](https://chat.whatsapp.com/J5OewHvweK1Kf7RGXAwIYM) | [Grupo oficial](https://chat.whatsapp.com/Fl5FzZQC00J5CZp07AZVwQ?mode=r_c) | [Grupo oficial](https://chat.whatsapp.com/HsZDn6DJrx34z5lbNbNB2M) |
| [![Bronxys](./assets/images/bronxys.png)](https://bronxyshost.com/) | [![Nexfuture](./assets/images/nexfuture.png)](https://nexfuture.com.br/) | [![Speed Cloud](./assets/images/speed-cloud.png)](https://speedhosting.cloud/) |

| TED Host | Cebolinha Host | Lumina Cloud |
|----------|----------------|--------------|
| [![TED Host](./assets/images/ted-host.png)](https://loja.tedhost.com.br/) | [![Cebolinha Host](./assets/images/cebolinha-host.jpeg)](https://dash.cebolinhahost.com) | [![Lumina Cloud](./assets/images/lumina-logo.png)](https://loja.luminacloud.space/) |

| Raikken Host | LordeHost | Jexa for Developers |
|--------------|----------|-------------------|
| [![Raikken](./assets/images/raikken-host.png)](https://painel.raikken.com.br) | [![LordeHost](./assets/images/lordehost.jpeg)](https://lordehost.com.br) | [![Jexa for Developers](./assets/images/jexa-for-developers.png)](https://devs.jexa.lat/) |

## Instalación en Windows

1 - Abre PowerShell como administrador.

Haz clic con el botón derecho en el menú Inicio y elige `Terminal (Administrador)` o `Windows PowerShell (Administrador)`.

2 - Instala Git, Node.js 24.x.x o superior y FFmpeg.

Si utilizas Windows 10 o Windows 11 con `winget`, ejecuta:

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS -e
winget install --id Gyan.FFmpeg -e
```

Si algún comando no funciona, instala manualmente:

- Git: [https://git-scm.com/downloads/win](https://git-scm.com/downloads/win)
- Node.js 24.x.x o superior: [https://nodejs.org/en](https://nodejs.org/en)
- FFmpeg: [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

3 - Cierra y abre PowerShell nuevamente para actualizar el `PATH`.

4 - Verifica las instalaciones:

```powershell
node -v
npm -v
git --version
ffmpeg -version
```

El comando `node -v` debe mostrar una versión `v24.x.x`.

5 - Elige una carpeta para colocar los archivos del bot. En este ejemplo usaremos el Escritorio:

```powershell
cd $env:USERPROFILE\Desktop
```

6 - Clona el repositorio:

```powershell
git clone https://github.com/guiireal/takeshi-bot-espanol.git
```

7 - Entra en la carpeta clonada:

```powershell
cd takeshi-bot-espanol
```

8 - Instala las dependencias:

```powershell
npm install
```

9 - Ejecuta el bot:

```powershell
npm start
```

10 - El bot solicitará tu número de teléfono. Escríbelo exactamente como aparece en WhatsApp y utiliza solo números.

11 - Informa el código de vinculación en WhatsApp desde `dispositivos conectados`.

12 - Espera la conexión y presiona `CTRL + C` en PowerShell para detener el bot.

Después, configura el archivo `config.js` dentro de la carpeta `src` y vuelve a iniciar el bot con `npm start`.

## Instalación en VPS (Debian/Ubuntu)

1 - Abre un nuevo terminal y ejecuta los siguientes comandos.

```sh
sudo apt update && sudo apt upgrade && sudo apt-get update && sudo apt-get upgrade && sudo apt install ffmpeg
```

2 - Instala `curl` si no lo tienes.

```sh
sudo apt install curl
```

3 - Instala `git` si no lo tienes.

```sh
sudo apt install git
```

4 - Instala NVM.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

5 - Actualiza el source de tu entorno.

```sh
source ~/.bashrc
```

6 - Instala la versión 24 más reciente de Node.js.

```sh
nvm install 24
```

7 - Verifica si la versión fue instalada y está activa.

```sh
node -v # Debe mostrar la versión 24
```

8 - Verifica si npm fue instalado junto.

```sh
npm -v # Deberá mostrar la versión de npm
```

9 - Instala PM2 (recomendado).

```sh
npm install pm2 -g
```

10 - Clona el repositorio del bot donde desees.

```sh
git clone https://github.com/guiireal/takeshi-bot-espanol.git
```

11 - Entra en la carpeta clonada.

```sh
cd takeshi-bot-espanol
```

12 - Digita el siguiente comando.

```sh
npm start
```

13 - El bot va a solicitar que digites tu número de teléfono.
Digita **exactamente** como está en WhatsApp y solo números.

No agregues el 9º dígito en números que no sean de SP o RJ.

![tutorial-vps-1](./assets/images/tutorial-vps-1.png)

14 - Conecta el bot en PM2.

```sh
pm2 start npm --name "takeshi-bot" -- start
```

15 - El bot exhibirá un **código de emparejamiento** que debe ser colocado en `dispositivos conectados` en tu WhatsApp.

![tutorial-vps-2](./assets/images/tutorial-vps-2.png)

16 - Ve a `dispositivos conectados` en tu WhatsApp.

![tutorial-vps-3](./assets/images/tutorial-vps-3.png)

17 - Haz clic en `conectar dispositivo`.

![tutorial-vps-4](./assets/images/tutorial-vps-4.png)

18 - En la esquina inferior, haz clic en `Conectar con número de teléfono`.

![tutorial-vps-5](./assets/images/tutorial-vps-5.png)

19 - Coloca el **código de emparejamiento** que recibiste en el terminal, que fue hecho en el paso `15`.

![tutorial-vps-6](./assets/images/tutorial-vps-6.png)

20 - Después de eso, en el terminal que quedó parado, debe exhibir que **fue conectado con éxito**.

![tutorial-vps-7](./assets/images/tutorial-vps-7.png)

21 - Digita `CTRL + C` para parar el bot.

22 - Ahora inícialo por `PM2`, ejecutando el siguiente código abajo.

```sh
pm2 start npm --name "takeshi-bot" -- start
```

![tutorial-vps-8](./assets/images/tutorial-vps-8.png)

23 - Espera 10 segundos, después digita `CTRL + C` para parar el bot.

Después, configura el archivo `config.js` que está dentro de la carpeta `src`.

```js
// Prefijo predeterminado de los comandos.
export const PREFIX = "/";

// Emoji del bot (cambia si prefieres).
export const BOT_EMOJI = "🤖";

// Nombre del bot (cambia si prefieres).
export const BOT_NAME = "Takeshi Bot";

// LID del bot (en el caso, el que ejecutarás el bot).
// Para obtener el LID del bot, usa el comando <prefijo>lid respondiendo encima de un mensaje del número del bot
// Cambia el <prefijo> por el prefijo del bot (ej: /lid).
export const BOT_LID = "12345678901234567890@lid";

// LID del dueño del bot (en el caso, el tuyo!).
// Para obtener el LID del dueño del bot, usa el comando <prefijo>meu-lid
// Cambia el <prefijo> por el prefijo del bot (ej: /meu-lid).
export const OWNER_LID = "12345678901234567890@lid";
```

Recuerda cambiar los números arriba por los tuyos, obviamente y también ver si tu prefijo es la barra /.

24 - ¡Por fin, prueba el bot!

![tutorial-vps-9](./assets/images/tutorial-vps-9.png)

## Diagrama de conexão

[![diagram](https://mermaid.ink/img/pako:eNqdVc1u1DAQfpWpJSSQtqX7k_2JoChse-hh26qtWlTtxZtMs4bEXhxnVVpV4gDcOLQUDgipQnBAiBs3OO6b8AR9BMbJZvu3BYQPVmx_M558M9_4gPkqQOayBJ-mKH1cFDzUPO5KoMFTo2Qa91Dn6wHXRvhiwKWBRRwCT-Ds9OjLr-evz06Pf8KW8kdfryMfKpMjP7-DTf4Ek76we9eB216OO_4G231uEm8w6MoctqIMghqitveWtj2XYO-fQ1vFCtTEq68k-oaDVBMHDwoPt27B_cmAtfXlztLyugdbSzsX9nOoJiegw97tSnW-BJWanRznTn54UzSv3sKaFjEKzWGI-6BVwGVgo-sV_2rH-ReZzi4sEBEuyEEMiSEmzk9pn04J40KXLYpQ2BtBjn7EqBUEmVd7NNWf45TLrWJMuzv3bgNfwwDBH30PREhu0eYDeYzSqHP0tjdbeF5Ho7TkE4vbuOdCuVKtzTr1RvPO1PjPTk-OoKMSoyd2F2ymhXeJXxe8Hlmep9Sm18cojbi-19N3F7ZGHwFj4sKzwUd9lVBdZIUQqKTLMkw7ElTfOWx8qKHAjzETloufi7OYA3Vz9iyDvz68hPbYggpwV-iYbC4EeYnIMY82hr3RJ5VJTIt9HvCZq-RlwA0eDYk2TWmSvuAi-TNfmY2N6OHqJrRXV5bam97i6kz2f16oiEeMEIZ8opWcQhtFzEmIWeoREowHGvMLUAY3aWj05tFyx9uwIlra-IOMxgrKtPQXGZ28gBVqAgM9-r4nYvoiLWHyv_rJueZaY3iJREgsrck0QYyrA65QMlUNWeqLUpv5x8ysra-ubI5TYlvjY1u-iaFZyUhIzA4QeJhynbcQCiDhIU0XEgJTByuxUIuAuUanWGLUK2Jul-zAWnSZ6WOMXWYbR4C7PI2M7SCHZEYNeEepuLDUKg37zN3lUUKrdBBwUzwNk11NgaBuq1Qa5pZbzUrmhbkHbI_WzfpcrdGq1eabTtNpVSrVEnvG3Mb8XKPpVKpVakx1p1FvHpbYfnZvea5RL9drjfK8UynXW80Sw0CQNjr5-5Q9U4e_ARz-Fnw?type=png)](https://mermaid.live/edit#pako:eNqdVc1u1DAQfpWpJSSQtqX7k_2JoChse-hh26qtWlTtxZtMs4bEXhxnVVpV4gDcOLQUDgipQnBAiBs3OO6b8AR9BMbJZvu3BYQPVmx_M558M9_4gPkqQOayBJ-mKH1cFDzUPO5KoMFTo2Qa91Dn6wHXRvhiwKWBRRwCT-Ds9OjLr-evz06Pf8KW8kdfryMfKpMjP7-DTf4Ek76we9eB216OO_4G231uEm8w6MoctqIMghqitveWtj2XYO-fQ1vFCtTEq68k-oaDVBMHDwoPt27B_cmAtfXlztLyugdbSzsX9nOoJiegw97tSnW-BJWanRznTn54UzSv3sKaFjEKzWGI-6BVwGVgo-sV_2rH-ReZzi4sEBEuyEEMiSEmzk9pn04J40KXLYpQ2BtBjn7EqBUEmVd7NNWf45TLrWJMuzv3bgNfwwDBH30PREhu0eYDeYzSqHP0tjdbeF5Ho7TkE4vbuOdCuVKtzTr1RvPO1PjPTk-OoKMSoyd2F2ymhXeJXxe8Hlmep9Sm18cojbi-19N3F7ZGHwFj4sKzwUd9lVBdZIUQqKTLMkw7ElTfOWx8qKHAjzETloufi7OYA3Vz9iyDvz68hPbYggpwV-iYbC4EeYnIMY82hr3RJ5VJTIt9HvCZq-RlwA0eDYk2TWmSvuAi-TNfmY2N6OHqJrRXV5bam97i6kz2f16oiEeMEIZ8opWcQhtFzEmIWeoREowHGvMLUAY3aWj05tFyx9uwIlra-IOMxgrKtPQXGZ28gBVqAgM9-r4nYvoiLWHyv_rJueZaY3iJREgsrck0QYyrA65QMlUNWeqLUpv5x8ysra-ubI5TYlvjY1u-iaFZyUhIzA4QeJhynbcQCiDhIU0XEgJTByuxUIuAuUanWGLUK2Jul-zAWnSZ6WOMXWYbR4C7PI2M7SCHZEYNeEepuLDUKg37zN3lUUKrdBBwUzwNk11NgaBuq1Qa5pZbzUrmhbkHbI_WzfpcrdGq1eabTtNpVSrVEnvG3Mb8XKPpVKpVakx1p1FvHpbYfnZvea5RL9drjfK8UynXW80Sw0CQNjr5-5Q9U4e_ARz-Fnw)

## Algunos comandos necesitan API

Edita el archivo `config.js` que está dentro de la carpeta `src` y pega tu api key de la plataforma Spider X API, conforme el código abajo.
Para obtener tu token, accede: [https://api.spiderx.com.br](https://api.spiderx.com.br) y crea tu cuenta gratuitamente!

```js
export const SPIDER_API_TOKEN = "tu_token_aqui";
```

Para comandos de **canvas** y **generar-link**, es necesario configurar la API del **Linker**:

```js
export const LINKER_BASE_URL = "https://linker.devgui.dev/api";
export const LINKER_API_KEY = "tu_token_aqui";
```

Obtén tu API Key en: [https://linker.devgui.dev](https://linker.devgui.dev)

## Funcionalidades generales

| Función | Contexto | ¿Requiere Spider X API? |
| ------------ | --- | --- |
| Cambiar imagen del bot | Dueño | ❌ |
| Desactivar el bot en el grupo | Dueño | ❌ |
| Ejecutar comandos de infraestructura | Dueño | ❌ |
| Activar el bot en el grupo | Dueño | ❌ |
| Modificar el prefijo por grupo | Dueño | ❌ |
| Obtener el ID del grupo | Dueño | ❌ |
| Abrir grupo | Admin | ❌ |
| Programar mensaje | Admin | ❌ |
| Anti audio | Admin | ❌ |
| Anti documento | Admin | ❌ |
| Anti evento | Admin | ❌ |
| Anti imagen | Admin | ❌ |
| Anti link | Admin | ❌ |
| Anti producto | Admin | ❌ |
| Anti sticker | Admin | ❌ |
| Anti video | Admin | ❌ |
| Banear miembros | Admin | ❌ |
| Eliminar mensajes | Admin | ❌ |
| Cerrar grupo | Admin | ❌ |
| Gestión de mensajes del auto-responder | Admin | ❌ |
| Activar/desactivar auto responder | Admin | ❌ |
| Activar/desactivar bienvenidas | Admin | ❌ |
| Activar/desactivar salida de grupo | Admin | ❌ |
| Limpiar chat | Admin | ❌ |
| Marcar todos | Admin | ❌ |
| Cambiar nombre del grupo | Admin | ❌ |
| Mute/unmute | Admin | ❌ |
| Obtener el link del grupo | Admin | ❌ |
| Revelar | Admin | ❌ |
| Solo admins | Admin | ❌ |
| Ver saldo | Admin | ❌ |
| Borrar imagen | Miembro | ❌ |
| Buscar CEP | Miembro | ❌ |
| Enviar botones | Miembro | ✅ |
| Enviar lista | Miembro | ✅ |
| Enviar carrusel | Miembro | ✅ |
| Canvas Bolsonaro | Miembro | ✅ |
| Canvas cadena | Miembro | ✅ |
| Canvas invertir | Miembro | ✅ |
| Canvas RIP | Miembro | ✅ |
| Comandos de diversión/juegos | Miembro |❌ |
| Espejar imagen | Miembro | ❌ |
| Fake chat | Miembro | ❌ |
| Sticker animado para GIF | Miembro | ✅ |
| Sticker de texto animado | Miembro | ✅ |
| Generación de imágenes con IA | Miembro | ✅ |
| Generar link | Miembro | ❌ |
| Google Gemini | Miembro | ✅ |
| Búsqueda Google | Miembro | ✅ |
| GPT-5 Mini | Miembro | ✅ |
| Imagen con contraste | Miembro | ❌ |
| Imagen IA Flux | Miembro | ✅ |
| Imagen pixelada | Miembro | ❌ |
| Imagen blanco/negro | Miembro | ❌ |
| Descarga Instagram | Miembro | ✅ |
| Ping | Miembro | ❌ |
| Reproducir audio | Miembro | ✅ |
| Reproducir vídeo | Miembro | ✅ |
| Renombrar sticker | Miembro | ❌ |
| Sticker | Miembro | ❌ |
| Sticker IA  | Miembro | ✅ |
| Sticker a imagen | Miembro | ❌ |
| Descarga vídeo TikTok | Miembro | ✅ |
| YT MP3 | Miembro | ✅ |
| YT MP4 | Miembro | ✅ |
| Búsqueda YT | Miembro | ✅ |

## Funcionalidades de envio (Exemplos)

### 🔘 Ejemplos de botones

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-botoes` | Enviar botones | Demuestra botones simples, de respuesta rápida e interactivos | Incluye botones que activan otros ejemplos |

### 📋 Ejemplos de listas

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-lista` | Enviar lista | Demuestra mensajes en formato de lista | Incluye secciones, opciones y acciones interactivas |

### 🎠 Ejemplos de carrusel

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-carrossel` | Enviar carrusel | Demuestra mensajes con tarjetas deslizables | Incluye imágenes y acciones en tarjetas |

### 🎵 Ejemplos de audio

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-audio-de-arquivo` | Enviar audio de archivo | Demuestra envío de archivos de audio del almacenamiento local | Opción de mensaje de voz, respuesta citada |
| `/enviar-audio-de-url` | Enviar audio de URL | Demuestra envío de archivos de audio de URLs externas | Opción de mensaje de voz, respuesta citada |
| `/enviar-audio-de-buffer` | Enviar audio de buffer | Demuestra envío de archivos de audio de buffers de memoria | Opción de mensaje de voz, respuesta citada, buffer de archivo o URL |

### 🖼️ Ejemplos de imagen

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-imagem-de-arquivo` | Enviar imagen de archivo | Demuestra envío de archivos de imagen del almacenamiento local | Soporte a leyenda personalizada, menciones, respuesta citada |
| `/enviar-imagem-de-url` | Enviar imagen de URL | Demuestra envío de archivos de imagen de URLs externas | Envío directo de URL, soporte a menciones, respuesta citada |
| `/enviar-imagem-de-buffer` | Enviar imagen de buffer | Demuestra envío de archivos de imagen de buffers de memoria | Buffer de archivo o URL, leyenda opcional, menciones, respuesta citada |

### 🎬 Ejemplos de vídeo

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-video-de-arquivo` | Enviar vídeo de archivo | Demuestra envío de archivos de vídeo del almacenamiento local | Soporte a leyenda personalizada, menciones, respuesta citada |
| `/enviar-video-de-url` | Enviar vídeo de URL | Demuestra envío de archivos de vídeo de URLs externas | Envío directo de URL, soporte a menciones, respuesta citada |
| `/enviar-video-de-buffer` | Enviar vídeo de buffer | Demuestra envío de archivos de vídeo de buffers de memoria | Buffer de archivo o URL, leyenda opcional, menciones, respuesta citada |

### 🎞️ Ejemplos de GIF

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-gif-de-arquivo` | Enviar GIF de archivo | Demuestra envío de archivos GIF del almacenamiento local | Soporte a leyenda, menciones, respuesta citada |
| `/enviar-gif-de-url` | Enviar GIF de URL | Demuestra envío de archivos GIF de URLs externas | Soporte a leyenda, menciones, respuesta citada |
| `/enviar-gif-de-buffer` | Enviar GIF de buffer | Demuestra envío de archivos GIF de buffers de memoria | Buffer de archivo o URL, leyenda, menciones, respuesta citada |

### 🎭 Ejemplos de sticker

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-sticker-de-arquivo` | Enviar sticker de archivo | Demuestra envío de archivos sticker del almacenamiento local | Formato WebP |
| `/enviar-sticker-de-url` | Enviar sticker de URL | Demuestra envío de archivos sticker de URLs externas | Formato WebP |
| `/enviar-sticker-de-buffer` | Enviar sticker de buffer | Demuestra envío de archivos sticker de buffers de memoria | Buffer de archivo o URL |

### 📊 Ejemplos de encuesta/votación

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-enquete` | Enviar encuesta | Demuestra cómo crear y enviar encuestas/votaciones en grupos | Soporte a elección única o múltiple elección |

### 📍 Ejemplos de localización

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-localizacao` | Enviar localización | Demuestra cómo enviar localizaciones, con latitud y longitud | Soporte a latitud y longitud de cualquier lugar del mundo |

### 📲 Ejemplos de contactos

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-contato` | Enviar contacto | Demuestra cómo enviar contactos | Los contactos pueden ser llamados o agregados a la lista de tus contactos |

### 📄 Ejemplos de documento

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-documento-de-arquivo` | Enviar documento de archivo | Demuestra envío de archivos de documento del almacenamiento local | Especificación de tipo MIME, nombre de archivo personalizado |
| `/enviar-documento-de-url` | Enviar documento de URL | Demuestra envío de archivos de documento de URLs externas | Especificación de tipo MIME, nombre de archivo personalizado |
| `/enviar-documento-de-buffer` | Enviar documento de buffer | Demuestra envío de archivos de documento de buffers de memoria | Buffer de archivo o URL, tipo MIME, nombre de archivo personalizado |

### 💬 Ejemplos de mensaje

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/enviar-texto` | Enviar texto | Demuestra envío de mensajes de texto simples | Soporte a menciones |
| `/enviar-resposta` | Enviar respuesta | Demuestra envío de mensajes de respuesta | Respuestas de éxito/error/aviso |
| `/enviar-reacoes` | Enviar reacciones | Demuestra envío de emojis de reacción | Varias reacciones emoji, reacciones de éxito/error/aviso |
| `/enviar-mensagem-editada` | Enviar mensaje editado | Demuestra envío de mensajes editados | Puede editar mensajes enviados de forma directa o respondiendo a alguien |

### 📊 Exemplos de metadados

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/obter-metadados-mensagem` | Obtener metadados del mensaje | Demuestra extracción avanzada de metadados de mensaje o mensaje citado | Análisis detallado, soporte a respuesta de mensajes, información técnica, menciones automáticas |
| `/obter-dados-grupo` | Obtener datos del grupo | Demuestra extracción de información del grupo | Metadatos del grupo, lista de participantes, información de admin |
| `/funcoes-grupo` | Funciones del grupo | Demuestra uso de funciones utilitarias del grupo | Extracción de nombre, dueño, admins, participantes del grupo |

### 🎯 Central de ejemplos

| Comando | Función | Descripción | Características |
|---------|---------|-------------|-----------------|
| `/exemplos-de-mensagens` | Central de ejemplos | Central con lista de todos los ejemplos disponibles | Menu interactivo, acceso directo a todos los ejemplos |

## Auto responder

El Takeshi Bot posee un auto-responder integrado, edita el archivo en `./database/auto-responder.json`:

```json
[
    {
        "match": "Oi",
        "answer": "Olá, tudo bem?"
    },
    {
        "match": "Tudo bem",
        "answer": "Estou bem, obrigado por perguntar"
    },
    {
        "match": "Qual seu nome",
        "answer": "Meu nome é Takeshi Bot"
    }
]
```

## Auto figurinha / Auto sticker

El Takeshi Bot posee un recurso de auto-figurinha que convierte automáticamente imágenes y vídeos enviados en figurinhas:

| Comando | Función | Descripción |
|---------|---------|-------------|
| `/auto-stick 1` | Activar | Activa la conversión automática en el grupo |
| `/auto-stick 0` | Desactivar | Desactiva la conversión automática en el grupo |

**Nota:** El recurso soporta imágenes y vídeos de hasta 10 segundos.

## ¿Dónde está el menú del bot?

El menú del bot está dentro de la carpeta `src` en el archivo llamado `menu.js`

## ¿Dónde modifico la mensaje de bienvenidas y cuando alguien sale del grupo?

Los mensajes están dentro de la carpeta `src` en el archivo llamado `messages.js`

## Diagrama de cómo funcionan los comandos

[![diagram](https://mermaid.ink/img/pako:eNqNVltrG0cU_isnCwGJqJJ2tZKtpTE4GwUMteVYlinFL6Pd0Xpb7Y48F9eJMeRCX_pSSqEPJRDSBAp9K6HQ9_0n_gPtT-iZ2YscW7KiBzGz831nznduuxdWwEJqeZagp4qmAX0ck4iT5DgF_BElWaqSCeX5fk64jIN4TlIJY0E5EAH_vf35A25U9o7H7DbsEZM56sOvcEi-o-Ik1s9uA_0kzIG_vIJtfqriMwYhA58lJA3RcM7YY5ICO8Or9f0NJHlI-e0FPB1v7z0ewtHQz36EXVxvw3gX_KFeDkv2_fvwsPrBeDTOXh7sDGGwd7Szfe0kB3MaSODRpOZ02g1wXP3X7dbzwyW-oCoP7H__-enq9fsqIEDTs5hAUKoouZrxxdaW4bQSmqplZs2pDiC6QicUCCBSkIgW6aFpuFzZo-Eh7B8M_cFodJeuQpIRV1_pgFNI0o7gw3gaBwQozDkLFCfAbotbrJBTqjwqqQKNQ8TVHIMjZPYOiMRcfwZnzuk0Pi9ZAeOcSga1Vn0pd_-mf3BsmUBbyxy9GXQltMjE-3LCW1tYky9B8KCFlrQp0WLfp5S3VhySMInTVYcJ1e3UWhOsqzc_wCANWCo5Ux4UJO1-81uxNlRnLMj-BEkTmFOexEJk79lniN6vwDAhgpKQQEqwR4UkeRyuXvwOuXJ4CCL7iP2ZmiadMFkBcvUIMAuhj02yK0AhBhGnisxw6nBQ6wq66GMYfD3wx4d31bQp564u7M7Kms7HRqeo68E5DZTUhUIWY2dtTRsT_glJTFN-mpZl1xr8sLqi4JSdLVWo6xvzzRahFhiOAzqfPYOamSIc0WLOMB31TzA7CY6EChPrXbJAEB4JqOG_wjslE9fULUAUEhIL6LYfwFSl2R_Z31Tk_hBxb5kwlFMG4avsY6QLb2HXqPNWRsFugk-weSNSOAsFxbjjNGFX34v5kPRcGqOlYWEQnSb2hp6qBftBDlztpqnuKlJPOEuexDNay-mNnF1fU4EHg9H-cHS49jVh6u-O0tOD3wP32kw1SU1DerPCciROkL8KuXmQVr1_8qFxZFq_el-UBXOvUmc1rIjHoeVJrmgDJyLHzOPWutCQY0ue0IQeWx4uQzolaib1wLxEGr6lv2EsKZk4mKITy5uSmcCdmodElh8P1VOOF1LuM5VKy3PaTs9YsbwL6xz3bq_Z6fW7tuM6G92O7XQb1jPLs-1e0-72-z27t9F3Hdu-bFjPzb120-1vbvZdt9tpu5sbbbRGw1gyvpt_wpgvmcv_AYwQ1RY?type=png)](https://mermaid.live/edit#pako:eNqNVltrG0cU_isnCwGJqJJ2tZKtpTE4GwUMteVYlinFL6Pd0Xpb7Y48F9eJMeRCX_pSSqEPJRDSBAp9K6HQ9_0n_gPtT-iZ2YscW7KiBzGz831nznduuxdWwEJqeZagp4qmAX0ck4iT5DgF_BElWaqSCeX5fk64jIN4TlIJY0E5EAH_vf35A25U9o7H7DbsEZM56sOvcEi-o-Ik1s9uA_0kzIG_vIJtfqriMwYhA58lJA3RcM7YY5ICO8Or9f0NJHlI-e0FPB1v7z0ewtHQz36EXVxvw3gX_KFeDkv2_fvwsPrBeDTOXh7sDGGwd7Szfe0kB3MaSODRpOZ02g1wXP3X7dbzwyW-oCoP7H__-enq9fsqIEDTs5hAUKoouZrxxdaW4bQSmqplZs2pDiC6QicUCCBSkIgW6aFpuFzZo-Eh7B8M_cFodJeuQpIRV1_pgFNI0o7gw3gaBwQozDkLFCfAbotbrJBTqjwqqQKNQ8TVHIMjZPYOiMRcfwZnzuk0Pi9ZAeOcSga1Vn0pd_-mf3BsmUBbyxy9GXQltMjE-3LCW1tYky9B8KCFlrQp0WLfp5S3VhySMInTVYcJ1e3UWhOsqzc_wCANWCo5Ux4UJO1-81uxNlRnLMj-BEkTmFOexEJk79lniN6vwDAhgpKQQEqwR4UkeRyuXvwOuXJ4CCL7iP2ZmiadMFkBcvUIMAuhj02yK0AhBhGnisxw6nBQ6wq66GMYfD3wx4d31bQp564u7M7Kms7HRqeo68E5DZTUhUIWY2dtTRsT_glJTFN-mpZl1xr8sLqi4JSdLVWo6xvzzRahFhiOAzqfPYOamSIc0WLOMB31TzA7CY6EChPrXbJAEB4JqOG_wjslE9fULUAUEhIL6LYfwFSl2R_Z31Tk_hBxb5kwlFMG4avsY6QLb2HXqPNWRsFugk-weSNSOAsFxbjjNGFX34v5kPRcGqOlYWEQnSb2hp6qBftBDlztpqnuKlJPOEuexDNay-mNnF1fU4EHg9H-cHS49jVh6u-O0tOD3wP32kw1SU1DerPCciROkL8KuXmQVr1_8qFxZFq_el-UBXOvUmc1rIjHoeVJrmgDJyLHzOPWutCQY0ue0IQeWx4uQzolaib1wLxEGr6lv2EsKZk4mKITy5uSmcCdmodElh8P1VOOF1LuM5VKy3PaTs9YsbwL6xz3bq_Z6fW7tuM6G92O7XQb1jPLs-1e0-72-z27t9F3Hdu-bFjPzb120-1vbvZdt9tpu5sbbbRGw1gyvpt_wpgvmcv_AYwQ1RY)

## Diagrama de cómo funcionan los middlewares (interceptadores) de recepción y salida

[![diagram](https://mermaid.ink/img/pako:eNqtld9qE0EUxl_lOFBoIW2TzV8WrU2tFKVJa9uAltycZE_TwexMnJ2NtaXghQqiIPXCC1FELIgXeq3XeZO-gD6Cs7NJtmmTBsG9CDsz5zvn7De_yRyxpvSIuSygRyGJJq1ybCn06wLMg6GWIvQbpOJxB5XmTd5BoaHs-VwABvDn08mPeHQ5aEXqOOT0HezgQwr2eTR3ObAWkOonO4Wq7EqokN9Qst5PWpWaQHZNkK2UiuJdE_3-KdyrlaurG1BeX6v1XlbgdnVnqwwbNdgu3wEzv7ZV29wYpJmZgRvD54IkWYhjFTU1qFZj1smmU-Dkop98fi5enNzT2YfnUG63wt43H0hohSAktFTYkYkyebPK-aUlY4prBsYOKRCW78reFwl4SWjCBsGrpE2DCGbbAM_Vk-G4OueEKxKD-S4XnrGbAt37DKh5Fz28eb2hFpdmm9JH4UkXFh9T2wzMN4q5cTmxrUeS9dMkARcKb1ILwScRYIt88AgaiXhUlDhrhdthI9Bch9y1HR4J09QxnL14C9aneNI6Fc9Wo6a9S-Yl7QzoOXkFdbZCvm1CwqjrcP_B7rU6m9RZstsWV9_iGkFDDRp-ZSKmdkAjbnkUjDXswrefPfv1--cbqEad7eEhiBEBCS8e2JerGI9Ow2TC-3BbzKcT_vH1kPAA-RinJ_C9Rb5JBssVVBzHyKbQbWpNY7tyjq4Ae989nII4HXB9Fd9jEv4z5manO-TxKRs9GXJr179Dbq0fUh57Hlk4FEWAT-a7L48AX7PRfbSF1HyPN7H31SB5ge8xbv1fzCdu_Dr3O6YYejI6WecsmzVtUdtigF2zL6E2mVNAujk3PDnAUqyluMdcrUJKMZ-Uj9GQHUUxdab3yac6c82rR3sYtnXk27GRmctrV0p_oDT_vq195u6hcSPFwo6HenCjDmeVqUjqlgyFZq6TLuVsFuYesQPmZorFhYKTzWSK6Wwpn8s4ZvUJc-cLhYVizsmWSvlC2kk72exxih3awpmFfM4pFLJ5s54pFfMpZljTUlXie91e78d_AUVrgqU?type=png)](https://mermaid.live/edit#pako:eNqtld9qE0EUxl_lOFBoIW2TzV8WrU2tFKVJa9uAltycZE_TwexMnJ2NtaXghQqiIPXCC1FELIgXeq3XeZO-gD6Cs7NJtmmTBsG9CDsz5zvn7De_yRyxpvSIuSygRyGJJq1ybCn06wLMg6GWIvQbpOJxB5XmTd5BoaHs-VwABvDn08mPeHQ5aEXqOOT0HezgQwr2eTR3ObAWkOonO4Wq7EqokN9Qst5PWpWaQHZNkK2UiuJdE_3-KdyrlaurG1BeX6v1XlbgdnVnqwwbNdgu3wEzv7ZV29wYpJmZgRvD54IkWYhjFTU1qFZj1smmU-Dkop98fi5enNzT2YfnUG63wt43H0hohSAktFTYkYkyebPK-aUlY4prBsYOKRCW78reFwl4SWjCBsGrpE2DCGbbAM_Vk-G4OueEKxKD-S4XnrGbAt37DKh5Fz28eb2hFpdmm9JH4UkXFh9T2wzMN4q5cTmxrUeS9dMkARcKb1ILwScRYIt88AgaiXhUlDhrhdthI9Bch9y1HR4J09QxnL14C9aneNI6Fc9Wo6a9S-Yl7QzoOXkFdbZCvm1CwqjrcP_B7rU6m9RZstsWV9_iGkFDDRp-ZSKmdkAjbnkUjDXswrefPfv1--cbqEad7eEhiBEBCS8e2JerGI9Ow2TC-3BbzKcT_vH1kPAA-RinJ_C9Rb5JBssVVBzHyKbQbWpNY7tyjq4Ae989nII4HXB9Fd9jEv4z5manO-TxKRs9GXJr179Dbq0fUh57Hlk4FEWAT-a7L48AX7PRfbSF1HyPN7H31SB5ge8xbv1fzCdu_Dr3O6YYejI6WecsmzVtUdtigF2zL6E2mVNAujk3PDnAUqyluMdcrUJKMZ-Uj9GQHUUxdab3yac6c82rR3sYtnXk27GRmctrV0p_oDT_vq195u6hcSPFwo6HenCjDmeVqUjqlgyFZq6TLuVsFuYesQPmZorFhYKTzWSK6Wwpn8s4ZvUJc-cLhYVizsmWSvlC2kk72exxih3awpmFfM4pFLJ5s54pFfMpZljTUlXie91e78d_AUVrgqU)

## Custom Middleware - Personaliza el bot sin modificar archivos principales

El archivo `src/middlewares/customMiddleware.js` permite agregar lógica personalizada sin tocar los archivos core del bot.

### ¿Cuándo usar?

- ✅ Agregar comportamientos personalizados
- ✅ Crear logs customizados
- ✅ Implementar lógica específica por grupo
- ✅ Reaccionar a eventos automáticos

### Ejemplos prácticos

#### Ejemplo 1: Reaccionar automáticamente a mensajes

```javascript
export async function customMiddleware({ socket, webMessage, type, commonFunctions }) {
  if (type === "message" && commonFunctions) {
    const { userMessageText } = commonFunctions;
    if (userMessageText?.toLowerCase() === "oi") {
      await socket.sendMessage(webMessage.key.remoteJid, {
        react: { text: "👋", key: webMessage.key }
      });
    }
  }
}
```

#### Ejemplo 2: Log cuando alguien entra en el grupo

```javascript
export async function customMiddleware({ webMessage, type, action }) {
  if (type === "participant" && action === "add") {
    console.log("Nuevo miembro:", webMessage.messageStubParameters[0]);
  }
}
```

#### Ejemplo 3: Mensaje personalizado en grupo específico

```javascript
export async function customMiddleware({ type, action, commonFunctions }) {
  const grupoVIP = "120363123456789012@g.us";
  
  if (type === "participant" && action === "add" && commonFunctions?.remoteJid === grupoVIP) {
    const { sendReply } = commonFunctions;
    await sendReply("🎉 ¡Bienvenido al grupo VIP!");
  }
}
```

#### Ejemplo 4: Usar funciones avanzadas del bot

```javascript
export async function customMiddleware({ type, commonFunctions }) {
  if (type === "message" && commonFunctions) {
    const {
      sendReply,
      sendSuccessReply,
      args,
      userMessageText,
      isImage,
      downloadImage,
    } = commonFunctions;
    
    // Tu lógica personalizada aquí
  }
}
```

### Parámetros disponibles

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `socket` | Object | Socket del Baileys para enviar mensajes |
| `webMessage` | Object | Mensaje completo del WhatsApp |
| `type` | String | "message" o "participant" |
| `commonFunctions` | Object/null | Todas las funciones del bot (null para eventos de participantes) |
| `action` | String | "add" o "remove" (solo en eventos de participantes) |
| `data` | String | Datos del participante (solo en eventos de participantes) |

## Implementación técnica de los ejemplos

### 📁 Localización de los comandos de ejemplo

Todos los comandos de ejemplo están localizados en: `src/commands/member/samples/`

### 🛠️ Funciones disponibles

Todos los comandos de ejemplo utilizan funciones de `src/utils/loadCommonFunctions.js`:

#### Funciones de audio

- `sendAudioFromFile(filePath, asVoice, quoted)`
- `sendAudioFromURL(url, asVoice, quoted)`
- `sendAudioFromBuffer(buffer, asVoice, quoted)`

#### Funciones de imagen

- `sendImageFromFile(filePath, caption, mentions, quoted)`
- `sendImageFromURL(url, caption, mentions, quoted)`
- `sendImageFromBuffer(buffer, caption, mentions, quoted)`

#### Funciones de Vídeo

- `sendVideoFromFile(filePath, caption, mentions, quoted)`
- `sendVideoFromURL(url, caption, mentions, quoted)`
- `sendVideoFromBuffer(buffer, caption, mentions, quoted)`

#### Funciones de GIF

- `sendGifFromFile(file, caption, mentions, quoted)`
- `sendGifFromURL(url, caption, mentions, quoted)`
- `sendGifFromBuffer(buffer, caption, mentions, quoted)`

#### Funciones de sticker

- `sendStickerFromFile(filePath, quoted)`
- `sendStickerFromURL(url, quoted)`
- `sendStickerFromBuffer(buffer, quoted)`

#### Funciones de documento

- `sendDocumentFromFile(filePath, mimetype, fileName, quoted)`
- `sendDocumentFromURL(url, mimetype, fileName, quoted)`
- `sendDocumentFromBuffer(buffer, mimetype, fileName, quoted)`

#### Funciones de mensaje

- `sendText(text, mentions)`
- `sendReply(text, mentions)`
- `sendReact(emoji)`
- `sendSuccessReply(text, mentions)`, `sendErrorReply(text, mentions)`, `sendWarningReply(text, mentions)`, `sendWaitReply(text, mentions)`
- `sendSuccessReact()`, `sendErrorReact()`, `sendWarningReact()`, `sendWaitReact()`

#### Funciones utilitarias de grupo

- `getGroupMetadata()` - Obtener metadatos completos del grupo
- `getGroupName()` - Obtener solo el nombre del grupo
- `getGroupOwner()` - Obtener información del dueño del grupo
- `getGroupParticipants()` - Obtener todos los participantes del grupo
- `getGroupAdmins()` - Obtener administradores del grupo

### 🎯 Ejemplos de uso con menciones

#### Enviar imagen con menciones

```javascript
await sendImageFromFile("./assets/image.jpg", "Olá @5511999999999!", ["5511999999999@s.whatsapp.net"]);

await sendImageFromURL(
  "https://exemplo.com/imagem.png", 
  "Olá @5511999999999 e @5511888888888!", 
  ["5511999999999@s.whatsapp.net", "5511888888888@s.whatsapp.net"]
);
```

#### Enviar vídeo con menciones

```javascript
await sendVideoFromFile("./assets/video.mp4", "Confira este vídeo @5511999999999!", ["5511999999999@s.whatsapp.net"]);

const buffer = fs.readFileSync("./video.mp4");
await sendVideoFromBuffer(
  buffer, 
  "Vídeo especial para @5511999999999 e @5511888888888!", 
  ["5511999999999@s.whatsapp.net", "5511888888888@s.whatsapp.net"]
);
```

#### Enviar GIF con menciones

```javascript
await sendGifFromFile(
  "./assets/gif.mp4", 
  "Tá ai @5511999999999!", 
  ["5511999999999@s.whatsapp.net"]
);
```

### 🎯 Soporte TypeScript

Definiciones completas del TypeScript están disponibles en `src/@types/index.d.ts` con:

- Firmas de función detalladas
- Descripciones de parámetros
- Ejemplos de uso
- Especificaciones de tipo de retorno

### 📁 Archivos de ejemplo

Todos los archivos de ejemplo son almacenados en `assets/samples/`:

- `sample-audio.mp3` - Archivo de audio para prueba
- `sample-document.pdf` - Documento PDF para prueba
- `sample-document.txt` - Documento de texto para prueba
- `sample-image.jpg` - Archivo de imagen para prueba
- `sample-sticker.webp` - Archivo de sticker para prueba
- `sample-video.mp4` - Archivo de vídeo para prueba

## Estructura de carpetas

- 📁 .github ➔ _workflows de CI/CD y archivo para el agente copilot_
- 📁 assets ➔ _archivos de medios_
  - 📁 auth ➔ _archivos de la conexión del bot_
  - 📁 images ➔ _archivos de imagen_
    - 📁 funny ➔ _gifs de comandos de diversión_
  - 📁 samples ➔ _archivos de ejemplo para pruebas_
  - 📁 temp ➔ _archivos temporales_
- 📁 database ➔ _archivos de datos_
- 📁 diagrams ➔ _diagramas de flujos de datos y ejecución del Bot_
- 📁 node_modules ➔ _módulos del Node.js_
- 📁 src ➔ _código fuente del bot (generalmente trabajarás más aquí)_
  - 📁 @types ➔ _carpeta donde están las definiciones de tipos_
  - 📁 commands ➔ _carpeta donde están los comandos_
    - 📁 admin ➔ _carpeta donde están los comandos administrativos_
    - 📁 member ➔ _carpeta donde están los comandos generales (todos podrán utilizar)_
      - 📁 samples ➔ _carpeta con los comandos de ejemplo_
    - 📁 owner ➔ _carpeta donde están los comandos de dueño (grupo y bot)_
    - 📝🤖-como-criar-comandos.js ➔ _archivo de ejemplo de cómo crear un comando_
  - 📁 errors ➔ _clases de errores usadas en los comandos_
  - 📁 middlewares ➔ _interceptadores de solicitudes_
  - 📁 services ➔ _servicios diversos_
  - 📁 utils ➔ _utilitarios_
  - 📝 config.js ➔ _archivo de configuraciones del bot_
  - 📝 connection.js ➔ _script de conexión del bot con la biblioteca Baileys_
  - 📝 index.js ➔ _script punto de entrada del bot_
  - 📝 loader.js ➔ _script de carga de funciones_
  - 📝 menu.js ➔ _menu del bot_
  - 📝 messages.js ➔ _archivos de mensajes de bienvenidas y salida_
  - 📁 test/ ➔ _suite de pruebas automatizadas_
- 📝 .gitignore ➔ _archivo para no subir ciertas carpetas en GitHub_
- 📝 ⚡-cases-estao-aqui.js ➔ _easter egg_
- 📝 CONTRIBUTING.md ➔ _guía de contribución_
- 📝 LICENSE ➔ _archivo de licencia_
- 📝 package-lock.json ➔ _archivo de cache de las dependencias del bot_
- 📝 package.json ➔ _archivo de definición de las dependencias del bot_
- 📝 README.md ➔ _esta documentación_
- 📝 reset-qr-auth.sh ➔ _archivo para eliminar las credenciales del bot_
- 📝 update.sh ➔ _archivo de actualización del bot_

## Actualizar el bot

Ejecuta `bash update.sh`

## Pruebas

Ejecuta `npm test`

## Errores comunes

### 📁 Operación denegada al extraer la carpeta

El error abajo ocurre cuando se hace el download del archivo ZIP directo en el celular en algunas versiones del apk ZArchiver y también de celulares sin root.

Para resolver, sigue el [tutorial de instalación via git clone](#instalación-en-termux).

![error común 1](./assets/images/erro-comum-1.jpg)

### 🔄 Remoción de los archivos de sesión y conectar nuevamente

Si da algún error en la conexión, digita el siguiente comando:

```sh
bash reset-qr-auth.sh
```

Después, remueve el dispositivo del WhatsApp yendo en las configuraciones del WhatsApp en "dispositivos conectados" y repite
el procedimiento de iniciar el bot con `npm start`.

### 🔐 Permission denied (permiso denegado) al acceder `cd /sdcard`

![error común 2](./assets/images/erro-comum-2.png)

Abre el termux, digita `termux-setup-storage` y después, acepta los permisos

### ⚙️ Configuras el token de la Spider API, prefijo, etc y el bot no reconoce

Verifica si no tienes dos Takeshi's corriendo en tu celular, muchas personas descargan el zip y siguen el tutorial, sin embargo, **el tutorial no explica por el zip, y sí, por el git clone**.

Generalmente las personas que cometen este error, quedan con dos bots:

1. El primero dentro de la `/sdcard`
2. El segundo en la carpeta `/storage/emulated/0/Download`, que en el zip queda como `takeshi-bot-main`

Debes borrar uno de los bots y tanto configurar cuanto ejecutar **solo uno**

## Suscríbete al canal

[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@devgui_?sub_confirmation=1)

## Contribuyendo con el proyecto

El Takeshi Bot es un proyecto **open source** y tu contribución es muy bienvenida!

### 🚀 Cómo contribuir

- 🐛 **Reportar bugs** a través de las [Issues](https://github.com/guiireal/takeshi-bot/issues)
- ✨ **Sugerir nuevas funcionalidades**
- 🔧 **Contribuir con código** (nuevos comandos, correcciones, mejoras)
- ⭐ **Dar una estrella** en el repositorio

### 📖 Antes de contribuir

1. Lee nuestro **[Guía de Contribución](CONTRIBUTING.md)** completo
2. Verifica las [Issues abiertas](https://github.com/guiireal/takeshi-bot/issues)
3. Sigue el template obligatorio para Pull Requests

## Licencia

[GPL-3.0](https://github.com/guiireal/takeshi-bot/blob/main/LICENSE)

Este proyecto está licenciado bajo la Licencia Pública General GNU (GPL-3.0).
Esto significa que:

- Puedes usar este código como quieras, sea para proyectos personales o comerciales.
- Puedes modificar el código para adaptarlo a tus necesidades.
- Puedes compartir o vender el código, incluso modificado, pero necesitas:
  - Mantener los créditos al autor original (Guilherme França - Dev Gui).
  - Hacer el código modificado disponible bajo la misma licencia GPL-3.0.

Lo que no puedes hacer:

- No puedes transformar este código en algo propietario (cerrado) e impedir a otras personas accederlo o usarlo.

Esta licencia garantiza que todos tengan acceso al código-fuente y puedan colaborar libremente, promoviendo el compartir y el mejoramiento del proyecto.

## ⚠ Disclaimer

En este proyecto, necesité hospedar la node_modules, para auxiliar a quienes están corriendo el bot por el celular, ya que muchos de ellos pueden no correr el `npm install` por el termux correctamente.
