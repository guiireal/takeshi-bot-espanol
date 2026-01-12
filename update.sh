#!/bin/bash

# Script de actualización automática del bot
# Autor: Dev Gui
# Versión: 1.0.0
# Compatible con: VPS, WSL2 y Termux

set -e 

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

detect_environment() {
    if [ -d "/data/data/com.termux" ]; then
        echo "termux"
    elif grep -qi microsoft /proc/version 2>/dev/null; then
        echo "wsl"
    else
        echo "vps"
    fi
}

ENV_TYPE=$(detect_environment)

if [ "$ENV_TYPE" = "termux" ]; then
    TEMP_DIR="$HOME/.cache/takeshi-bot-update"
    mkdir -p "$TEMP_DIR"
else
    TEMP_DIR="/tmp"
fi

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
            [NnNn]* ) return 1;;
            * ) echo "Por favor, responda s (sí) o n (no).";;
        esac
    done
}

check_dependencies() {
    local missing_deps=()
    
    if ! command -v git &> /dev/null; then
        missing_deps+=("git")
    fi
    
    if ! command -v node &> /dev/null && ! command -v nodejs &> /dev/null; then
        missing_deps+=("nodejs")
    fi
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        print_color $RED "❌ Dependencias faltantes: ${missing_deps[*]}"
        
        if [ "$ENV_TYPE" = "termux" ]; then
            print_color $YELLOW "💡 Instale con: pkg install ${missing_deps[*]}"
        else
            print_color $YELLOW "💡 Instale las dependencias necesarias primero."
        fi
        exit 1
    fi
}

check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_color $RED "❌ Error: Este directorio no es un repositorio Git!"
        print_color $YELLOW "💡 Dica: Ejecute este script en la carpeta raíz de su proyecto."
        exit 1
    fi
}

check_package_json() {
    if [ ! -f "package.json" ]; then
        print_color $RED "❌ Error: package.json no encontrado!"
        print_color $YELLOW "💡 Dica: Ejecute este script en la carpeta raíz del proyecto donde está el package.json."
        exit 1
    fi
}

get_version() {
    local file=$1
    if [ -f "$file" ]; then
        local node_cmd="node"
        if ! command -v node &> /dev/null && command -v nodejs &> /dev/null; then
            node_cmd="nodejs"
        fi
        
        $node_cmd -pe "JSON.parse(require('fs').readFileSync('$file', 'utf8')).version" 2>/dev/null || echo "no encontrada"
    else
        echo "não encontrada"
    fi
}

check_remote() {
    if ! git remote get-url origin > /dev/null 2>&1; then
        print_color $RED "❌ Error: Remote 'origin' no configurado!"
        print_color $YELLOW "💡 Configure el remote con: git remote add origin <URL_DEL_REPOSITORIO>"
        exit 1
    fi
}

create_backup() {
    local backup_dir="backup_$(date +%Y%m%d_%H%M%S)"
    print_color $BLUE "📦 Creando backup de las alteraciones locales en: $backup_dir"
    
    mkdir -p "$backup_dir"
    
    git status --porcelain | while read status file; do
        if [[ "$status" == " M" ]] || [[ "$status" == "M " ]] || [[ "$status" == "MM" ]]; then
            mkdir -p "$backup_dir/$(dirname "$file")" 2>/dev/null || true
            cp "$file" "$backup_dir/$file" 2>/dev/null || true
            print_color $GREEN "  ✅ Backup creado para: $file"
        fi
    done
    
    echo "backup_dir=$backup_dir" > .update_backup_info
    print_color $GREEN "✅ Backup completo!"
}

show_file_differences() {
    print_color $BLUE "🔍 Verificando diferencias entre su bot y el oficial..."
    
    git fetch origin
    
    local current_branch=$(git branch --show-current)
    local remote_branch="origin/$current_branch"
    
    if ! git show-ref --verify --quiet refs/remotes/$remote_branch; then
        print_color $YELLOW "⚠️  Branch remota '$remote_branch' no encontrada. Usando origin/main o origin/master..."
        if git show-ref --verify --quiet refs/remotes/origin/main; then
            remote_branch="origin/main"
        elif git show-ref --verify --quiet refs/remotes/origin/master; then
            remote_branch="origin/master"
        else
            print_color $RED "❌ No fue posible encontrar una branch remota válida!"
            exit 1
        fi
    fi
    
    echo "remote_branch=$remote_branch" >> .update_backup_info
    
    local new_files=$(git diff --name-only HEAD..$remote_branch --diff-filter=A)
    if [ ! -z "$new_files" ]; then
        print_color $GREEN "📁 Archivos NUEVOS que serán descargados:"
        echo "$new_files" | while read file; do
            print_color $GREEN "  + $file"
        done
        echo
    fi
    
    local deleted_files=$(git diff --name-only HEAD..$remote_branch --diff-filter=D)
    if [ ! -z "$deleted_files" ]; then
        print_color $RED "🗑️ Archivos que fueron ELIMINADOS en el bot oficial:"
        echo "$deleted_files" | while read file; do
            print_color $RED "  - $file"
        done
        echo
        if ask_yes_no "⚠️  ¿Desea ELIMINAR estos archivos localmente también?"; then
            echo "delete_files=yes" >> .update_backup_info
        else
            echo "delete_files=no" >> .update_backup_info
        fi
        echo
    fi
    
    local modified_files=$(git diff --name-only HEAD..$remote_branch --diff-filter=M)
    if [ ! -z "$modified_files" ]; then
        print_color $YELLOW "✏️ Archivos MODIFICADOS que serán actualizados:"
        echo "$modified_files" | while read file; do
            print_color $YELLOW "  ~ $file"
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
            print_color $PURPLE "  ⚠️  $file"
        done
        print_color $YELLOW "🔧 Será usado el merge strategy para intentar mezclar automáticamente."
        echo
    fi
}

apply_updates() {
    source .update_backup_info
    
    print_color $BLUE "🔄 Aplicando actualizaciones..."
    
    git config pull.rebase false 2>/dev/null || true
    
    local merge_strategy="ort"
    if ! git merge -s ort --help &> /dev/null; then
        merge_strategy="recursive"
        print_color $YELLOW "ℹ️  Usando estrategia 'recursive' (versión antigua del Git)"
    fi
    
    print_color $YELLOW "🔧 Usando estrategia de merge '$merge_strategy' para mezclar alteraciones..."
    
    if git merge -X $merge_strategy $remote_branch --no-commit --no-ff 2>/dev/null; then
        print_color $GREEN "✅ Merge automático realizado con éxito!"
        
        if [[ "${delete_files:-no}" == "yes" ]]; then
            git diff --name-only HEAD..$remote_branch --diff-filter=D | while read file; do
                if [ -f "$file" ]; then
                    rm "$file"
                    git add "$file"
                    print_color $GREEN "  🗑️ Archivo eliminado: $file"
                fi
            done
        fi
        
        git commit -m "🤖 Actualización automática via script update.sh" 2>/dev/null || {
            print_color $YELLOW "ℹ️ No hay alteración para commit (ya estaba actualizado)"
        }
        
    else
        print_color $RED "❌ No fue posible hacer merge automático!"
        
        git merge --abort 2>/dev/null || true
        
        print_color $YELLOW "🔍 Verificando archivos con conflicto..."
        
        local conflicted=$(git diff --name-only HEAD $remote_branch)
        
        print_color $RED "⚠️  Los siguientes archivos tienen conflictos que necesitan ser resueltos manualmente:"
        echo "$conflicted" | while read file; do
            print_color $RED "  ⚠️  $file"
        done
        
        echo
        print_color $YELLOW "💡 Qué hacer ahora:"
        print_color $YELLOW "  1. Aceptar TODAS las alteraciones del repositorio oficial (sobrescribir local)"
        print_color $YELLOW "  2. Mantener TODAS las alteraciones locales (ignorar repositorio oficial)" 
        print_color $YELLOW "  3. Resolver conflictos manualmente después"
        echo
        
        echo "Elige una opción:"
        echo "1) Aceptar todo del bot oficial (CUIDADO: va a sobrescribir tus alteraciones!)"
        echo "2) Mantener todo local (no va a actualizar)"
        echo "3) Cancelar y resolver manualmente"
        
        read -p "Opción (1-3): " choice
        
        case $choice in
            1)
                print_color $YELLOW "⚠️  ATENCIÓN: Tus alteraciones locales serán PERDIDAS!"
                if ask_yes_no "¿Tienes CERTEZA que quieres continuar?"; then
                    git reset --hard $remote_branch
                    print_color $GREEN "✅ Repositorio actualizado con versión remota!"
                else
                    print_color $BLUE "ℹ️ Operación cancelada."
                    return 1
                fi
                ;;
            2)
                print_color $BLUE "ℹ️ Manteniendo alteraciones locales. Repositorio no fue actualizado."
                return 1
                ;;
            3)
                print_color $BLUE "ℹ️ Operación cancelada. Resuelve los conflictos manualmente."
                print_color $YELLOW "💡 Usa: git merge $remote_branch"
                return 1
                ;;
            *)
                print_color $RED "❌ Opción inválida!"
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
    
    case $ENV_TYPE in
        termux)
            print_color $CYAN "📱 Ambiente: Termux (Android)"
            ;;
        wsl)
            print_color $CYAN "🐧 Ambiente: WSL2 (Windows Subsystem for Linux)"
            ;;
        vps)
            print_color $CYAN "🖥️  Ambiente: VPS/Linux"
            ;;
    esac
    echo
    
    print_color $BLUE "🔍 Verificando dependencias..."
    check_dependencies
    
    print_color $BLUE "🔍 Verificando ambiente..."
    check_git_repo
    check_package_json
    check_remote
    
    print_color $CYAN "📊 INFORMACIONES DE VERSIÓN:"
    local local_version=$(get_version "package.json")
    
    git fetch origin 2>/dev/null || {
        print_color $RED "❌ Error al conectar con el repositorio oficial!"
        print_color $YELLOW "💡 Verifique su conexión de internet y los permisos del repositorio."
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
    local remote_package="$TEMP_DIR/remote_package_$$.json"
    if git show $remote_branch:package.json > "$remote_package" 2>/dev/null; then
        remote_version=$(get_version "$remote_package")
        rm -f "$remote_package"
    fi
    
    print_color $([ "$local_version" = "$remote_version" ] && echo $GREEN || echo $RED) "  📦 Su versión:     $local_version"
    print_color $GREEN "  🌐 Versión oficial: $remote_version"
    echo
    
    if ! git diff-index --quiet HEAD --; then
        print_color $YELLOW "⚠️   Tiene alteraciones locales no guardadas!"
        if ask_yes_no "¿Desea crear un backup de sus alteraciones antes de continuar?"; then
            create_backup
        fi
        echo
    fi
    
    if git diff --quiet HEAD $remote_branch 2>/dev/null; then
        print_color $GREEN "✅ Su bot ya está ACTUALIZADO!"
        print_color $BLUE "ℹ️  No hay nada para descargar."
        cleanup
        exit 0
    fi
    
    show_file_differences
    
    if ask_yes_no "🚀 ¿Desea APLICAR todas estas actualizaciones?"; then
        apply_updates
        
        if [ $? -eq 0 ]; then
            print_color $GREEN "✅ ACTUALIZACIÓN CONCLUÍDA CON ÉXITO!"
            
            local new_version=$(get_version "package.json")
            if [ "$new_version" != "$local_version" ]; then
                print_color $CYAN "🎉 Versión actualizada: $local_version → $new_version"
            fi
            
            print_color $YELLOW "💡 PRÓXIMOS PASOS:"
            print_color $YELLOW "  1. Verifique que todo esté funcionando correctamente"
            if [ "$ENV_TYPE" = "termux" ]; then
                print_color $YELLOW "  2. Ejecute 'npm install' si hay nuevas dependencias"
            else
                print_color $YELLOW "  2. Ejecute 'npm install' si hay nuevas dependencias"
            fi
            print_color $YELLOW "  3. Reinicie el bot si es necesario"
            
            if [ -f .update_backup_info ]; then
                source .update_backup_info
                if [ ! -z "${backup_dir:-}" ] && [ -d "$backup_dir" ]; then
                    print_color $BLUE "📦 Backup de sus alteraciones guardado en: $backup_dir"
                fi
            fi
        else
            print_color $RED "❌ Actualización no fue completada."
            print_color $YELLOW "💡 Verifique los errores arriba y intente nuevamente."
        fi
    else
        print_color $BLUE "ℹ️  Actualización cancelada por el usuario."
    fi
    
    cleanup
    print_color $CYAN "🏁 Script finalizado!"
}

trap cleanup EXIT INT TERM

main "$@"