#!/bin/bash

# Intentamos cargar desde la raíz o desde el directorio del script
if [ -f ".env.vpn" ]; then
    ENV_FILE=".env.vpn"
elif [ -f "$(dirname "$0")/../.env.vpn" ]; then
    ENV_FILE="$(dirname "$0")/../.env.vpn"
else
    echo "❌ Error: No se encontró el archivo .env.vpn en la raíz del proyecto."
    echo "Asegurate de que el archivo exista en: $(pwd)"
    exit 1
fi

export $(grep -v '^#' "$ENV_FILE" | xargs)

echo "🛡️ Iniciando VPN para $VPN_USER en $VPN_HOST..."

sudo openconnect --protocol=$VPN_PROTOCOL \
    $VPN_HOST \
    --user=$VPN_USER \
    --base-mtu=$VPN_MTU \
    --authgroup=$VPN_AUTHGROUP