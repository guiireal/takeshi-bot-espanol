/**
 * Menú del bot
 *
 * @author Dev Gui
 */
const { BOT_NAME, PREFIX } = require("./config");
const packageInfo = require("../package.json");
const { readMore } = require("./utils");

exports.menuMessage = () => {
  const date = new Date();

  return `╭━━⪩ ¡BIENVENIDO! ⪨━━${readMore()}
▢
▢ • ${BOT_NAME}
▢ • Fecha: ${date.toLocaleDateString("es-es")}
▢ • Hora: ${date.toLocaleTimeString("es-es")}
▢ • Prefijo: ${PREFIX}
▢ • Versión: ${packageInfo.version}
▢
╰━━─「🪐」─━━

╭━━⪩ DUEÑO ⪨━━
▢
▢ • ${PREFIX}exec
▢ • ${PREFIX}get-id
▢ • ${PREFIX}off
▢ • ${PREFIX}on
▢ • ${PREFIX}set-menu-image
▢
╰━━─「🌌」─━━

╭━━⪩ ADMINS ⪨━━
▢
▢ • ${PREFIX}anti-audio (1/0)
▢ • ${PREFIX}anti-document (1/0)
▢ • ${PREFIX}anti-event (1/0)
▢ • ${PREFIX}anti-image (1/0)
▢ • ${PREFIX}anti-link (1/0)
▢ • ${PREFIX}anti-product (1/0)
▢ • ${PREFIX}anti-sticker (1/0)
▢ • ${PREFIX}anti-video (1/0)
▢ • ${PREFIX}auto-responder (1/0)
▢ • ${PREFIX}ban
▢ • ${PREFIX}clear
▢ • ${PREFIX}close
▢ • ${PREFIX}delete
▢ • ${PREFIX}demote
▢ • ${PREFIX}exit (1/0)
▢ • ${PREFIX}hidetag
▢ • ${PREFIX}link-group
▢ • ${PREFIX}mute
▢ • ${PREFIX}only-admin (1/0)
▢ • ${PREFIX}open
▢ • ${PREFIX}promote
▢ • ${PREFIX}reveal
▢ • ${PREFIX}schedule-message
▢ • ${PREFIX}unmute
▢ • ${PREFIX}welcome (1/0)
▢
╰━━─「⭐」─━━

╭━━⪩ PRINCIPAL ⪨━━
▢
▢ • ${PREFIX}attp
▢ • ${PREFIX}fake-chat
▢ • ${PREFIX}generate-link
▢ • ${PREFIX}get-lid
▢ • ${PREFIX}google-search
▢ • ${PREFIX}perfil
▢ • ${PREFIX}profile
▢ • ${PREFIX}raw-message
▢ • ${PREFIX}rename
▢ • ${PREFIX}samples-of-messages
▢ • ${PREFIX}sticker
▢ • ${PREFIX}to-image
▢ • ${PREFIX}ttp
▢ • ${PREFIX}yt-search
▢
╰━━─「🚀」─━━

╭━━⪩ DESCARGAS ⪨━━
▢
▢ • ${PREFIX}play-audio
▢ • ${PREFIX}play-video
▢ • ${PREFIX}tik-tok
▢ • ${PREFIX}yt-mp3
▢ • ${PREFIX}yt-mp4
▢
╰━━─「🎶」─━━

╭━━⪩ JUEGOS ⪨━━
▢
▢ • ${PREFIX}abrazar
▢ • ${PREFIX}besar
▢ • ${PREFIX}bofetada
▢ • ${PREFIX}cenar
▢ • ${PREFIX}dado
▢ • ${PREFIX}golpear
▢ • ${PREFIX}luchar
▢ • ${PREFIX}matar
▢
╰━━─「🎡」─━━

╭━━⪩ IA ⪨━━
▢
▢ • ${PREFIX}gemini
▢ • ${PREFIX}ia-sticker
▢ • ${PREFIX}pixart
▢ • ${PREFIX}stable-diffusion-turbo
▢
╰━━─「🚀」─━━

╭━━⪩ LIENZO ⪨━━
▢
▢ • ${PREFIX}blur
▢ • ${PREFIX}contrast
▢ • ${PREFIX}gray
▢ • ${PREFIX}invert
▢ • ${PREFIX}jail
▢ • ${PREFIX}mirror
▢ • ${PREFIX}pixel
▢ • ${PREFIX}rip
▢
╰━━─「❇」─━━`;
};
