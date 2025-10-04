/**
 * Desarrollado por: Mkg
 * Refactorizado por: Dev Gui
 * Protecciones de seguridad implementadas
 *
 * @author Dev Gui
 */
const { exec } = require("child_process");
const { isBotOwner } = require(`${BASE_DIR}/middlewares`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors`);

const DANGEROUS_COMMANDS = [
  ":()",
  "attrib",
  "cacls",
  "chmod 777",
  "chown",
  "cp /etc",
  "dd",
  "del /f",
  "del",
  "fdisk",
  "firewall-cmd",
  "fork()",
  "format",
  "halt",
  "init",
  "iptables",
  "kill",
  "killall",
  "ln -sf",
  "mkfs",
  "mv /etc",
  "parted",
  "passwd",
  "pkill",
  "poweroff",
  "rd /s",
  "reboot",
  "rm",
  "rmdir",
  "shutdown",
  "su",
  "sudo",
  "ufw",
  "unlink",
  "yes",
];

const DANGEROUS_PATTERNS = [
  /;\s*(rm|mv|cp)\s/,
  /\/dev\/sd[a-z]/,
  /\|\s*sh/,
  /\$\(.*\)/,
  /&&\s*(rm|mv|cp)\s/,
  /`.*`/,
  />\s*\/dev\/(null|zero|random)/,
  /chmod\s+[0-7]*77/,
  /curl.*\|\s*sh/,
  /dd\s+.*of=/,
  /del\s+\/[fqs]/,
  /format\s+[a-z]:/,
  /mkfs\./,
  /rd\s+\/s/,
  /rm\s+.*\*.*\*/,
  /rm\s+(-[rf]+\s+)?\//,
  /wget.*\|\s*sh/,
];

const SAFE_COMMANDS = [
  "alias",
  "awk",
  "cat",
  "cut",
  "date",
  "df",
  "dig",
  "dir",
  "du",
  "echo",
  "env",
  "file",
  "find",
  "free",
  "git branch",
  "git config",
  "git diff",
  "git log",
  "git remote",
  "git show",
  "git status",
  "grep",
  "groups",
  "head",
  "history",
  "host",
  "htop",
  "id",
  "ipconfig",
  "jobs",
  "la",
  "less",
  "ll",
  "locate",
  "ls",
  "lsblk",
  "lsof",
  "more",
  "mount",
  "netsh interface show",
  "netstat",
  "node --version",
  "npm --version",
  "npm audit",
  "npm list",
  "npm outdated",
  "nslookup",
  "ping -c",
  "printf",
  "ps",
  "pwd",
  "sed",
  "set",
  "sort",
  "ss",
  "systeminfo",
  "tail",
  "tasklist",
  "time",
  "top",
  "tree",
  "type",
  "uname",
  "uniq",
  "uptime",
  "ver",
  "wc",
  "whereis",
  "which",
  "whoami",
];

function isSafeCommand(command) {
  const trimmedCommand = command.trim().toLowerCase();

  for (const dangerous of DANGEROUS_COMMANDS) {
    if (trimmedCommand.includes(dangerous.toLowerCase())) {
      return {
        safe: false,
        reason: `Comando prohibido detectado: ${dangerous}`,
      };
    }
  }

  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(trimmedCommand)) {
      return {
        safe: false,
        reason: `Patrón peligroso detectado: ${pattern.toString()}`,
      };
    }
  }

  if (trimmedCommand.includes("..")) {
    return {
      safe: false,
      reason: "Navegación de directorio sospechosa (..)",
    };
  }

  const sensitivePaths = [
    "/etc",
    "/proc",
    "/sys",
    "/dev",
    "c:\\windows",
    "c:\\system32",
  ];

  for (const path of sensitivePaths) {
    if (trimmedCommand.includes(path.toLowerCase())) {
      return {
        safe: false,
        reason: "Acceso a directorios del sistema prohibido",
      };
    }
  }

  const firstWord = trimmedCommand.split(" ")[0];
  const isExplicitlySafe = SAFE_COMMANDS.some((safeCmd) => {
    const safeCmdLower = safeCmd.toLowerCase();
    return (
      safeCmdLower.startsWith(firstWord) ||
      trimmedCommand.startsWith(safeCmdLower)
    );
  });

  if (!isExplicitlySafe) {
    return {
      safe: false,
      reason: `Comando no está en la lista de comandos seguros: ${firstWord}`,
    };
  }

  return { safe: true };
}

module.exports = {
  name: "exec",
  description:
    "Ejecuta comandos seguros de la terminal directamente desde el bot.",
  commands: ["exec"],
  usage: `${PREFIX}exec comando
  
Solo se permiten comandos seguros de lectura.

Ejemplos: ls, pwd, ps, df, git status, npm list`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendSuccessReply, sendErrorReply, userJid }) => {
    if (!isBotOwner({ userJid })) {
      throw new DangerError("¡Solo el dueño del bot puede usar este comando!");
    }

    if (!fullArgs) {
      throw new DangerError(
        `Uso correcto: ${PREFIX}exec comando

Comandos seguros incluyen: ls, pwd, ps, df, git status, npm list, etc.`
      );
    }

    const safetyCheck = isSafeCommand(fullArgs);
    if (!safetyCheck.safe) {
      throw new DangerError(
        `¡Comando bloqueado por seguridad!
Motivo: ${safetyCheck.reason}

Para tu seguridad, solo se permiten comandos de lectura.
Comandos seguros incluyen: ls, pwd, cat, ps, df, git status, etc.`
      );
    }

    console.log(`[EXEC_AUDIT] ${userJid} ejecutó comando seguro: ${fullArgs}`);

    const timeoutMs = 15000;
    const maxBuffer = 1024 * 1024;

    exec(
      fullArgs,
      {
        timeout: timeoutMs,
        maxBuffer: maxBuffer,
      },
      (error, stdout, stderr) => {
        if (error) {
          if (error.code === "ETIMEDOUT") {
            return sendErrorReply("⏱️ Comando cancelado por timeout (15s)");
          }
          if (error.message.includes("maxBuffer")) {
            return sendErrorReply(
              "📊 Salida demasiado grande, comando cancelado"
            );
          }
          return sendErrorReply(error.message);
        }

        let output = stdout || stderr || "Comando ejecutado sin salida.";

        const maxOutputLength = 3500;

        if (output.length > maxOutputLength) {
          output =
            output.substring(0, maxOutputLength) + "\n\n... (salida truncada)";
        }

        output = output.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

        return sendSuccessReply(
          `Resultado del comando: \`${fullArgs}\`\n\n` +
            `\`\`\`\n${output.trim()}\n\`\`\``
        );
      }
    );
  },
};
