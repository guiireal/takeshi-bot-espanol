# Contribuyendo con el Takeshi Bot

¡Gracias por querer ayudar! Para mantener el proyecto organizado, sigue esta guía rápida.

## Cómo empezar

1. **Fork & Clone**: Crea tu fork y clónalo localmente.
2. **Branch**: Usa nombres claros (`feature/nombre` o `fix/nombre`).
3. **Ambiente**: Utiliza **Node.js v22**.
4. **Template**: Basea nuevos comandos en el archivo `🤖-como-criar-comandos.js`.

## Estructura de Comandos

Agrega tu archivo en la carpeta correcta en `src/commands/`:

* `owner/`: Solo el dueño.
* `admin/`: Solo administradores.
* `member/`: Público general.

## Patrones de Código

* **No reinventes la rueda**: Usa las funciones en `src/utils`.
* **Tipado**: Siempre importa y usa `CommandHandleProps` en JSDoc.
* **Limpieza**: Si generas archivos temporales, asegúrate de eliminarlos.
* **Delay**: Usa `randomDelay()` para evitar baneos.

## Enviando tu PR

Al abrir el Pull Request, completa el template básico:

1. **Qué cambió?** (Descripción breve).
2. **Tipo**: Bugfix, Feature o Refactor.
3. **Prints**: Adjunta prints del comando funcionando (éxito y error).

---
