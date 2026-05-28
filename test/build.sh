#!/bin/bash
# Build script for Vercel
echo "🏗️  Building project for Vercel..."

# Install dependencies
npm ci

# Build the project
npm run build

# Copy necessary files
mkdir -p .vercel/output/functions/api
mkdir -p .vercel/output/static

# Copy dist files
if [ -d "dist/client" ]; then
  cp -r dist/client/* .vercel/output/static/ 2>/dev/null || true
fi

if [ -d "dist/server" ]; then
  cp -r dist/server/* .vercel/output/functions/api/ 2>/dev/null || true
fi

echo "✅ Build complete!"
