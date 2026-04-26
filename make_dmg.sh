#!/bin/bash

# MDRN Corp DMG Packaging Script
# Project: Ghost Proxy

echo "🏗️ Building Ghost Proxy for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting."
    exit 1
fi

echo "📦 Creating DMG container..."

# Check for app name
APP_NAME="Ghost Proxy"
DMG_NAME="Ghost-Proxy-v1.0.0.dmg"

# Clean up old DMG if exists
rm -f "$DMG_NAME"

# Create a temporary directory for the DMG structure
mkdir -p dist_dmg

# Copy build artifacts to the temp dir
cp -r dist/* dist_dmg/

# Create DMG (macOS only utility)
if command -v hdiutil &> /dev/null; then
    hdiutil create -volname "$APP_NAME" -srcfolder dist_dmg -ov -format UDZO "$DMG_NAME"
    echo "✅ DMG created: $DMG_NAME"
else
    echo "⚠️ 'hdiutil' not found. This script must be run on macOS to generate a DMG."
    echo "📦 Build artifacts are ready in 'dist/'"
fi

# Cleanup
rm -rf dist_dmg

echo "🚀 Release process complete."
