#!/bin/bash

# Script de actualización automática del bot
# Autor: Dev Gui
# Versión: 0.9.0-BETA

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_header() {
    echo
    print_color $CYAN "=================================="
    print_color $CYAN "$1"
    print_color $CYAN "=================================="
    echo
}

ask_yes_no() {
    local question=$1
    while true; do
        read -p "$(echo -e "${YELLOW}${question} (s/n): ${NC}")" yn
        case $yn in
            [SsYy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Por favor, responde s (sí) o n (no).";;
        esac
    done
}

check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_color $RED "❌ Error: ¡Este directorio no es un repositorio Git!"
        print_color $YELLOW "💡 Consejo: Ejecuta este script en la carpeta raíz de tu proyecto."
        exit 1
    fi
}

check_package_json() {
    if [ ! -f "package.json" ]; then
        print_color $RED "❌ Error: ¡package.json no encontrado!"
        print_color $YELLOW "💡 Consejo: Ejecuta este script en la carpeta raíz del proyecto donde está el package.json."
        exit 1
    fi
}

get_version() {
    local file=$1
    if [ -f "$file" ]; then
        node -pe "JSON.parse(require('fs').readFileSync('$file', 'utf8')).version" 2>/dev/null || echo "no encontrada"
    else
        echo "no encontrada"
    fi
}

check_remote() {
    if ! git remote get-url origin > /dev/null 2>&1; then
        print_color $RED "❌ Error: ¡El remote 'origin' no está configurado!"
        print_color $YELLOW "💡 Configura el remote con: git remote add origin <URL_DEL_REPOSITORIO>"
        exit 1
    fi
}

create_backup() {
    local backup_dir="backup_$(date +%Y%m%d_%H%M%S)"
    print_color $BLUE "📦 Creando copia de seguridad de los cambios locales en: $backup_dir"
    
    mkdir -p "$backup_dir"
    
    git status --porcelain | while read status file; do
        if [[ "$status" == " M" ]] || [[ "$status" == "M " ]] || [[ "$status" == "MM" ]]; then
            mkdir -p "$backup_dir/$(dirname "$file")" 2>/dev/null || true
            cp "$file" "$backup_dir/$file" 2>/dev/null || true
            print_color $GREEN "   ✅ Copia de seguridad creada para: $file"
        fi
    done
    
    echo "backup_dir=$backup_dir" > .update_backup_info
    print_color $GREEN "✅ ¡Copia de seguridad completa!"
}

show_file_differences() {
    print_color $BLUE "🔍 Verificando diferencias entre tu bot y el oficial..."
    
    git fetch origin
    
    local current_branch=$(git branch --show-current)
    local remote_branch="origin/$current_branch"
    
    if ! git show-ref --verify --quiet refs/remotes/$remote_branch; then
        print_color $YELLOW "⚠️  Rama remota '$remote_branch' no encontrada. Usando origin/main o origin/master..."
        if git show-ref --verify --quiet refs/remotes/origin/main; then
            remote_branch="origin/main"
        elif git show-ref --verify --quiet refs/remotes/origin/master; then
            remote_branch="origin/master"
        else
            print_color $RED "❌ ¡No se pudo encontrar una rama remota válida!"
            exit 1
        fi
    fi
    
    echo "remote_branch=$remote_branch" >> .update_backup_info
    
    local new_files=$(git diff --name-only HEAD..$remote_branch --diff-filter=A)
    if [ ! -z "$new_files" ]; then
        print_color $GREEN "📁 Archivos NUEVOS que se descargarán:"
        echo "$new_files" | while read file; do
            print_color $GREEN "   + $file"
        done
        echo
    fi
    
    local deleted_files=$(git diff --name-only HEAD..$remote_branch --diff-filter=D)
    if [ ! -z "$deleted_files" ]; then
        print_color $RED "🗑️ Archivos que fueron ELIMINADOS en el bot oficial:"
        echo "$deleted_files" | while read file; do
            print_color $RED "   - $file"
        done
        echo
        if ask_yes_no "⚠️  ¿Quieres ELIMINAR estos archivos localmente también?"; then
            echo "delete_files=yes" >> .update_backup_info
        else
            echo "delete_files=no" >> .update_backup_info
        fi
        echo
    fi
    
    local modified_files=$(git diff --name-only HEAD..$remote_branch --diff-filter=M)
    if [ ! -z "$modified_files" ]; then
        print_color $YELLOW "✏️ Archivos MODIFICADOS que se actualizarán:"
        echo "$modified_files" | while read file; do
            print_color $YELLOW "   ~ $file"
        done
        echo
    fi
    
    local conflicted_files=""
    if [ ! -z "$modified_files" ]; then
        echo "$modified_files" | while read file; do
            if git diff --quiet HEAD "$file" 2>/dev/null; then
                continue
            else
                echo "$file" >> .potential_conflicts
            fi
        done
        
        if [ -f .potential_conflicts ]; then
            conflicted_files=$(cat .potential_conflicts)
            rm .potential_conflicts
        fi
    fi
    
    if [ ! -z "$conflicted_files" ]; then
        print_color $PURPLE "⚠️  ATENCIÓN: Los siguientes archivos fueron modificados TANTO localmente COMO remotamente:"
        echo "$conflicted_files" | while read file; do
            print_color $PURPLE "   ⚠️  $file"
        done
        print_color $YELLOW "🔧 Se usará la estrategia de merge 'ort' para intentar fusionar automáticamente."
        echo
    fi
}

apply_updates() {
    source .update_backup_info
    
    print_color $BLUE "🔄 Aplicando actualizaciones..."
    
    git config merge.ours.driver true
    git config pull.rebase false
    
    print_color $YELLOW "🔧 Usando estrategia de merge 'ort' para fusionar los cambios..."
    
    if git merge -X ort $remote_branch --no-commit --no-ff 2>/dev/null; then
        print_color $GREEN "✅ ¡Merge automático realizado con éxito!"
        
        if [[ "${delete_files:-no}" == "yes" ]]; then
            git diff --name-only HEAD..$remote_branch --diff-filter=D | while read file; do
                if [ -f "$file" ]; then
                    rm "$file"
                    git add "$file"
                    print_color $GREEN "   🗑️ Archivo eliminado: $file"
                fi
            done
        fi
        
        git commit -m "🤖 Actualización automática vía script update.sh" 2>/dev/null || {
            print_color $YELLOW "ℹ️ No hay cambios para hacer commit (ya estaba actualizado)"
        }
        
    else
        print_color $RED "❌ ¡No fue posible hacer el merge automático!"
        
        git merge --abort 2>/dev/null || true
        
        print_color $YELLOW "🔍 Verificando archivos con conflicto..."
        
        local conflicted=$(git diff --name-only HEAD $remote_branch)
        
        print_color $RED "⚠️  Los siguientes archivos tienen conflictos que deben resolverse manualmente:"
        echo "$conflicted" | while read file; do
            print_color $RED "   ⚠️  $file"
        done
        
        echo
        print_color $YELLOW "💡 Qué hacer ahora:"
        print_color $YELLOW "   1. Aceptar TODOS los cambios del repositorio oficial del bot (sobrescribir local)"
        print_color $YELLOW "   2. Mantener TODOS los cambios locales (ignorar repositorio oficial del bot)" 
        print_color $YELLOW "   3. Resolver conflictos manualmente después"
        echo
        
        echo "Elige una opción:"
        echo "1) Aceptar todo del bot oficial (CUIDADO: ¡sobrescribirá tus cambios!)"
        echo "2) Mantener todo local (no se actualizará)"
        echo "3) Cancelar y resolver manualmente"
        
        read -p "Opción (1-3): " choice
        
        case $choice in
            1)
                print_color $YELLOW "⚠️  ATENCIÓN: ¡Tus cambios locales se PERDERÁN!"
                if ask_yes_no "¿Estás SEGURO de que quieres continuar?"; then
                    git reset --hard $remote_branch
                    print_color $GREEN "✅ ¡Repositorio actualizado con la versión remota!"
                else
                    print_color $BLUE "ℹ️ Operación cancelada."
                    return 1
                fi
                ;;
            2)
                print_color $BLUE "ℹ️ Manteniendo cambios locales. El repositorio no fue actualizado."
                return 1
                ;;
            3)
                print_color $BLUE "ℹ️ Operación cancelada. Resuelve los conflictos manualmente."
                print_color $YELLOW "💡 Usa: git merge $remote_branch"
                return 1
                ;;
            *)
                print_color $RED "❌ ¡Opción inválida!"
                return 1
                ;;
        esac
    fi
}

cleanup() {
    rm -f .update_backup_info .potential_conflicts
}

main() {
    print_header "🤖 SCRIPT DE ACTUALIZACIÓN TAKESHI BOT"
    
    print_color $BLUE "🔍 Verificando el entorno..."
    
    check_git_repo
    check_package_json
    check_remote
    
    print_color $CYAN "📊 INFORMACIÓN DE VERSIÓN:"
    local local_version=$(get_version "package.json")
    
    git fetch origin 2>/dev/null || {
        print_color $RED "❌ ¡Error al conectar con el repositorio oficial del bot!"
        print_color $YELLOW "💡 Revisa tu conexión a internet y los permisos del repositorio."
        exit 1
    }
    
    local current_branch=$(git branch --show-current)
    local remote_branch="origin/$current_branch"
    
    if ! git show-ref --verify --quiet refs/remotes/$remote_branch; then
        if git show-ref --verify --quiet refs/remotes/origin/main; then
            remote_branch="origin/main"
        elif git show-ref --verify --quiet refs/remotes/origin/master; then
            remote_branch="origin/master"
        fi
    fi
    
    local remote_version="no encontrada"
    if git show $remote_branch:package.json > /tmp/remote_package.json 2>/dev/null; then
        remote_version=$(get_version "/tmp/remote_package.json")
        rm -f /tmp/remote_package.json
    fi
    
    print_color $([ "$local_version" = "$remote_version" ] && echo $GREEN || echo $RED) "   📦 Tu versión:       $local_version"
    print_color $GREEN "   🌐 Versión oficial:  $remote_version"
    echo
    
    if ! git diff-index --quiet HEAD --; then
        print_color $YELLOW "⚠️   ¡Tienes cambios locales no guardados!"
        if ask_yes_no "¿Quieres crear una copia de seguridad de tus cambios antes de continuar?"; then
            create_backup
        fi
        echo
    fi
    
    if git diff --quiet HEAD $remote_branch 2>/dev/null; then
        print_color $GREEN "✅ ¡Tu bot ya está ACTUALIZADO!"
        print_color $BLUE "ℹ️  No hay nada que descargar."
        cleanup
        exit 0
    fi
    
    show_file_differences
    
    if ask_yes_no "🚀 ¿Quieres APLICAR todas estas actualizaciones?"; then
        apply_updates
        
        if [ $? -eq 0 ]; then
            print_color $GREEN "✅ ¡ACTUALIZACIÓN COMPLETADA CON ÉXITO!"
            
            local new_version=$(get_version "package.json")
            if [ "$new_version" != "$local_version" ]; then
                print_color $CYAN "🎉 Versión actualizada: $local_version → $new_version"
            fi
            
            print_color $YELLOW "💡 PRÓXIMOS PASOS:"
            print_color $YELLOW "   1. Revisa si todo funciona correctamente"
            print_color $YELLOW "   2. Ejecuta 'npm install' si hay nuevas dependencias"
            print_color $YELLOW "   3. Reinicia el bot si es necesario"
            
            if [ -f .update_backup_info ]; then
                source .update_backup_info
                if [ ! -z "${backup_dir:-}" ] && [ -d "$backup_dir" ]; then
                    print_color $BLUE "📦 Copia de seguridad de tus cambios guardada en: $backup_dir"
                fi
            fi
        else
            print_color $RED "❌ La actualización no se completó."
            print_color $YELLOW "💡 Revisa los errores anteriores e inténtalo de nuevo."
        fi
    else
        print_color $BLUE "ℹ️  Actualización cancelada por el usuario."
    fi
    
    cleanup
    print_color $CYAN "🏁 ¡Script finalizado!"
}

trap cleanup EXIT INT TERM

main "$@"