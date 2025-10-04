/**
 * Menú del bot
 *
 * @author Dev Gui
 */
const { BOT_NAME } = require("./config");
const packageInfo = require("../package.json");
const { readMore } = require("./utils");
const { getPrefix } = require("./utils/database");

exports.menuMessage = (groupJid) => {
  const date = new Date();

  const prefix = getPrefix(groupJid);

  return `╭━━⪩ ¡BIENVENIDO! ⪨━━${readMore()}
▢
▢ • ${BOT_NAME}
▢ • Fecha: ${date.toLocaleDateString("es-es")}
▢ • Hora: ${date.toLocaleTimeString("es-es")}
▢ • Prefijo: ${prefix}
▢ • Versión: ${packageInfo.version}
▢
╰━━─「🪐」─━━

╭━━⪩ DUEÑO ⪨━━
▢
▢ • ${prefix}exec
▢ • ${prefix}get-id
▢ • ${prefix}off
▢ • ${prefix}on
▢ • ${prefix}set-menu-image
▢ • ${prefix}set-prefix
▢
╰━━─「🌌」─━━

╭━━⪩ ADMINS ⪨━━
▢
▢ • ${prefix}add-auto-responder
▢ • ${prefix}anti-audio (1/0)
▢ • ${prefix}anti-document (1/0)
▢ • ${prefix}anti-event (1/0)
▢ • ${prefix}anti-image (1/0)
▢ • ${prefix}anti-link (1/0)
▢ • ${prefix}anti-product (1/0)
▢ • ${prefix}anti-sticker (1/0)
▢ • ${prefix}anti-video (1/0)
▢ • ${prefix}auto-responder (1/0)
▢ • ${prefix}balance
▢ • ${prefix}ban
▢ • ${prefix}clear
▢ • ${prefix}close
▢ • ${prefix}delete
▢ • ${prefix}delete-auto-responder
▢ • ${prefix}demote
▢ • ${prefix}exit (1/0)
▢ • ${prefix}hidetag
▢ • ${prefix}link-group
▢ • ${prefix}list-auto-responder
▢ • ${prefix}mute
▢ • ${prefix}only-admin (1/0)
▢ • ${prefix}open
▢ • ${prefix}promote
▢ • ${prefix}reveal
▢ • ${prefix}schedule-message
▢ • ${prefix}unmute
▢ • ${prefix}welcome (1/0)
▢
╰━━─「⭐」─━━

╭━━⪩ PRINCIPAL ⪨━━
▢
▢ • ${prefix}attp
▢ • ${prefix}fake-chat
▢ • ${prefix}generate-link
▢ • ${prefix}get-lid
▢ • ${prefix}google-search
▢ • ${prefix}perfil
▢ • ${prefix}profile
▢ • ${prefix}raw-message
▢ • ${prefix}refresh
▢ • ${prefix}rename
▢ • ${prefix}samples-of-messages
▢ • ${prefix}sticker
▢ • ${prefix}to-image
▢ • ${prefix}ttp
▢ • ${prefix}yt-search
▢
╰━━─「🚀」─━━

╭━━⪩ DESCARGAS ⪨━━
▢
▢ • ${prefix}play-audio
▢ • ${prefix}play-video
▢ • ${prefix}tik-tok
▢ • ${prefix}yt-mp3
▢ • ${prefix}yt-mp4
▢
╰━━─「🎶」─━━

╭━━⪩ JUEGOS ⪨━━
▢
▢ • ${prefix}abrazar
▢ • ${prefix}besar
▢ • ${prefix}bofetada
▢ • ${prefix}cenar
▢ • ${prefix}dado
▢ • ${prefix}golpear
▢ • ${prefix}luchar
▢ • ${prefix}matar
▢
╰━━─「🎡」─━━

╭━━⪩ IA ⪨━━
▢
▢ • ${prefix}flux
▢ • ${prefix}gemini
▢ • ${prefix}ia-sticker
▢
╰━━─「🚀」─━━

╭━━⪩ LIENZO ⪨━━
▢
▢ • ${prefix}blur
▢ • ${prefix}contrast
▢ • ${prefix}gray
▢ • ${prefix}invert
▢ • ${prefix}jail
▢ • ${prefix}mirror
▢ • ${prefix}pixel
▢ • ${prefix}rip
▢
╰━━─「❇」─━━`;
};
