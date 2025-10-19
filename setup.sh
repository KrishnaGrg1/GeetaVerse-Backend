#!/bin/bash

echo "🕉️  GeetaVerse Backend - Automated Setup"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js >= 18.x${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check pnpm/npm
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm"
    echo -e "${GREEN}✅ pnpm found: $(pnpm --version)${NC}"
elif command -v npm &> /dev/null; then
    PKG_MANAGER="npm"
    echo -e "${YELLOW}⚠️  Using npm (pnpm is recommended)${NC}"
else
    echo -e "${RED}❌ No package manager found${NC}"
    exit 1
fi

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL CLI not found. Make sure PostgreSQL is installed and running.${NC}"
else
    echo -e "${GREEN}✅ PostgreSQL found${NC}"
fi

echo ""
echo -e "${BLUE}Step 1: Installing dependencies...${NC}"
$PKG_MANAGER install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Dependency installation failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"

echo ""
echo -e "${BLUE}Step 2: Setting up environment...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env file with your configuration before continuing${NC}"
    echo ""
    read -p "Press Enter after configuring .env file..."
else
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
fi

echo ""
echo -e "${BLUE}Step 3: Generating Prisma Client...${NC}"
npx prisma generate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Prisma generate failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Prisma Client generated${NC}"

echo ""
echo -e "${BLUE}Step 4: Running database migrations...${NC}"
echo -e "${YELLOW}⚠️  Make sure your DATABASE_URL in .env is correct${NC}"
read -p "Continue with migration? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma migrate dev --name init
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Migration failed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Database migrated${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping migration${NC}"
fi

echo ""
echo -e "${BLUE}Step 5: Seeding database...${NC}"
read -p "Seed database with test accounts? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma db seed
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Seeding failed${NC}"
    else
        echo -e "${GREEN}✅ Database seeded${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping seeding${NC}"
fi

echo ""
echo "========================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "========================================"
echo ""
echo "Test Accounts (after seeding):"
echo "  Admin:   admin@geetaverse.com / Admin@123456"
echo "  Premium: premium@geetaverse.com / Premium@123"
echo "  User:    user@geetaverse.com / User@123"
echo ""
echo "To start the development server:"
echo -e "  ${BLUE}$PKG_MANAGER run start:dev${NC}"
echo ""
echo "API will be available at:"
echo "  - http://localhost:3000/api"
echo "  - http://localhost:3000/docs (Swagger)"
echo ""
echo -e "${GREEN}Happy Coding! 🚀${NC}"
