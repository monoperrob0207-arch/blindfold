#!/bin/bash

# Blindfold Deployment Script
# Usage: ./deploy.sh

echo "🚀 Blindfold - Deploy to Vercel"
echo "================================"

# Colors
RED='\033[0;31m'
BLUE='\033[0;34m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Building Blindfold...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${BLUE}✅ Build successful!${NC}"
    echo ""
    echo -e "${WHITE}🎯 Ready to deploy to Vercel${NC}"
    echo ""
    echo "Options:"
    echo "1. Automatic deploy (requires Vercel CLI login)"
    echo "2. GitHub integration (recommended)"
    echo ""
    echo "To deploy automatically:"
    echo "  npx vercel --prod"
    echo ""
    echo "To connect GitHub:"
    echo "  1. Go to https://vercel.com"
    echo "  2. Import your repository"
    echo "  3. Vercel will auto-detect Next.js"
    echo ""
    echo "Your Blindfold project is ready at:"
    echo "  /home/ubuntu/.openclaw/workspace/blindfold"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
