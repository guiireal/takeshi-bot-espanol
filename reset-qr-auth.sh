#!/bin/bash

# Script para reset de la autenticación del Takeshi Bot
# Autor: Dev Gui
# Versión: 0.9.0-BETA

echo "🤖 Takeshi Bot - Reset de la Autenticación"
echo "====================================="
echo ""

if [ ! -d "assets" ]; then
    echo "❌ Error: Debes ejecutar este script en el directorio raíz del Takeshi Bot"
    echo "   Asegúrate de estar en la carpeta donde están las carpetas 'assets' y 'src'"
    exit 1
fi

if [ ! -d "assets/auth/baileys" ]; then
    echo "⚠️  La carpeta de autenticación no existe o ya fue eliminada"
    echo "   Ruta: ./assets/auth/baileys"
    exit 0
fi

echo "⚠️  ATENCIÓN: Esta acción eliminará todos los archivos de autenticación del bot!"
echo "   Después de ejecutar este script, necesitarás:"
echo "   1. Eliminar el dispositivo antiguo en \"dispositivos conectados\" en la configuración de WhatsApp"
echo "   2. Iniciar el bot nuevamente aquí (npm start)"
echo "   3. Colocar el número de teléfono del bot nuevamente"
echo ""
read -p "¿Deseas continuar? (s/N): " confirm

case $confirm in
    [sS]|[sS][iI][mM])
        echo ""
        echo "🔄 Eliminando archivos de autenticación..."
        
        rm -rf ./assets/auth/baileys
        
        if [ $? -eq 0 ]; then
            echo "✅ Archivos de autenticación eliminados exitosamente!"
            echo ""
            echo "📝 Próximos pasos:"
            echo "   1. Ejecuta 'npm start' para iniciar el bot"
            echo "   2. Ingresa tu número de teléfono cuando se solicite"
            echo "   3. Usa el código de emparejamiento en WhatsApp"
        else
            echo "❌ Error al eliminar los archivos de autenticación"
            exit 1
        fi
        ;;
    *)
        echo "❌ Operación cancelada por el usuario"
        exit 0
        ;;
esac

echo ""
echo "🚀 Script ejecutado exitosamente!"
