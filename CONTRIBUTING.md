# Guía de Contribución - Takeshi Bot 🤖

Takeshi es un bot open source (código abierto), lo que significa que puedes contribuir con mejoras, correcciones de bugs y adición de nuevas funcionalidades.

## 🚀 Cómo contribuir

### Antes de abrir un pull request
1. **Fork** el repositorio
2. **Clona** tu fork localmente
3. **Crea una branch** con nombre descriptivo: `feature/nuevo-comando-ban` o `fix/corrige-download`
4. **Implementa** tus cambios siguiendo los estándares del proyecto
5. **Prueba** tus cambios en Node.js versión 22
6. **Documenta** con capturas del comando funcionando

## 📋 Template Obligatorio para pull requests

Tu PR debe seguir este patrón:

### Título
Descripción clara de lo que se está haciendo

### Tipo de cambio
- [ ] 🐛 **Bug fix** (corrección que resuelve un problema)
- [ ] ✨ **Nueva funcionalidad** (añade funcionalidad)
- [ ] 💥 **Breaking change** (cambio que rompe funcionalidad existente)
- [ ] ♻️ **Refactorización** (mejora de código sin añadir funcionalidad)
- [ ] 📚 **Documentación** (cambios solo en la documentación)

### Descripción detallada
Explica:
- Lo que fue implementado/corregido
- Por qué el cambio es necesario
- Cómo funciona la solución

### Checklist obligatorio
- [ ] Fue probado en la versión 22 de Node.js
- [ ] Incluye capturas/screenshots del comando en funcionamiento
- [ ] Usa funciones existentes de la carpeta `utils` (no reinventa la rueda)
- [ ] Importa `CommandHandleProps` correctamente
- [ ] Usa `BASE_DIR` para imports en los comandos
- [ ] Código comentado adecuadamente

## 🔧 Creando nuevos comandos

### Template obligatorio
Usa el archivo `🤖-como-crear-comandos.js` como base. **SIEMPRE** copia este template:

```javascript
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "comando",
  description: "Descripción del comando",
  commands: ["comando1", "comando2"],
  usage: `${PREFIX}comando`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({}) => {
    // código del comando
  },
};
```

### Estructura de carpetas para comandos
- **`src/commands/owner/`** - Comandos exclusivos del dueño del bot
- **`src/commands/admin/`** - Comandos para administradores del grupo
- **`src/commands/member/`** - Comandos para cualquier miembro

## ✅ Checklist completo para PRs

### Código
- [ ] Sigue el template de comandos
- [ ] Usa `BASE_DIR` en los imports
- [ ] Importa `CommandHandleProps` correctamente
- [ ] Utiliza funciones existentes de la carpeta `utils`
- [ ] Código bien comentado en español
- [ ] Variables y funciones con nombres descriptivos

### Pruebas
- [ ] Probado en Node.js versión 22
- [ ] Comando funciona correctamente en grupos
- [ ] Comando funciona correctamente en chat privado (si aplica)
- [ ] Probado con diferentes tipos de entrada

### Performance
- [ ] No traba el bot
- [ ] Usa delays apropiados (`randomDelay()` o `delay()`)
- [ ] Limpia archivos temporales si se crean
- [ ] No consume memoria excesiva

## 📸 Screenshots obligatorios

Todo PR con nuevos comandos debe incluir:
1. **Captura del comando siendo ejecutado con éxito**
2. **Captura de la respuesta del bot**
3. **Captura de error (si el comando maneja errores)**

## 🚫 Lo que NO hacer

- ❌ No reinventes funciones que ya existen
- ❌ No uses `require()` absolutos, siempre usa `BASE_DIR` si lo que estés abriendo sea un comando nuevo
- ❌ No ignores el template de comandos
- ❌ No olvides probar en Node.js 22
- ❌ No hagas commits sin capturas del funcionamiento
- ❌ No mezcles múltiples funcionalidades en un PR

## 🎯 Consejos para un buen PR

1. **Mantén pequeño**: PRs menores son más fáciles de revisar
2. **Una responsabilidad**: Un PR debe resolver solo un problema
3. **Prueba bien**: Asegúrate que funciona en diferentes escenarios
4. **Sé claro**: Título y descripción deben explicar el qué y por qué
5. **Usa ejemplos**: Incluye ejemplos de uso del comando

## 📞 Soporte

¿Dudas sobre contribución?
- Abre un issue
- Verifica issues existentes antes de crear uno nuevo
- Sé específico sobre el problema o duda

---

**Recuerda:** ¡Las contribuciones de calidad ayudan a toda la comunidad!