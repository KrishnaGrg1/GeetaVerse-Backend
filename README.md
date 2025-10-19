<div align="center">

# 🕉️ GeetaVerse Backend

### _AI-Powered Bhagavad Gita Explorer - Production-Ready REST API_

[![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-7C3AED?logo=openai&logoColor=white)](https://openrouter.ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A modern, enterprise-grade backend API for exploring the timeless wisdom of the Bhagavad Gita with AI-powered insights, user management, and premium features.**

[Features](#-features) • [Quick Start](#-quick-start) • [API Docs](#-api-endpoints) • [AI Setup](#-ai-features-setup) • [Deployment](#-deployment)

</div>

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📦 Tech Stack](#-tech-stack)
- [🗄️ Database Schema](#️-database-schema)
- [🔌 API Endpoints](#-api-endpoints)
- [🤖 AI Features Setup](#-ai-features-setup)
- [🔐 Authentication](#-authentication)
- [👤 User Features](#-user-features)
- [👑 Admin Features](#-admin-features)
- [📊 Analytics](#-analytics)
- [💳 Payment Integration](#-payment-integration)
- [🛠️ Available Scripts](#️-available-scripts)
- [🌍 Environment Variables](#-environment-variables)
- [🐛 Troubleshooting](#-troubleshooting)
- [📁 Project Structure](#-project-structure)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

### 🔐 **Authentication & Authorization**

- ✅ JWT-based authentication (access + refresh tokens)
- ✅ Secure password hashing with bcryptjs
- ✅ Role-based access control (ADMIN, USER, PREMIUM)
- ✅ Session management with database storage
- ✅ Protected routes with NestJS guards
- ✅ Automatic token refresh mechanism

### 📚 **Bhagavad Gita Content**

- ✅ All 18 chapters with complete metadata
- ✅ 700+ verses with multiple translations
- ✅ Sanskrit text with transliterations
- ✅ Word-by-word meanings
- ✅ Multiple scholarly commentaries
- ✅ Advanced search functionality
- ✅ Verse of the Day feature
- ✅ Chapter summaries in English & Hindi

### 👤 **User Management**

- ✅ User registration & login
- ✅ Profile management
- ✅ Personal notes on verses (CRUD)
- ✅ Bookmark favorite verses with tags
- ✅ Pagination support for all lists
- ✅ User activity tracking

### 🤖 **AI-Powered Features** (OpenRouter)

- ✅ **Verse Insights** - Deep philosophical explanations
- ✅ **Chapter Summaries** - Modern, accessible chapter overviews
- ✅ **Daily Reflections** - Personalized spiritual wisdom
- ✅ **Q&A System** - Ask questions about the Gita
- ✅ **DeepSeek R1T2 Chimera (Free)** - No API costs!
- ✅ Smart token optimization
- ✅ Graceful error handling

### 💳 **Premium Features**

- ✅ Stripe payment integration
- ✅ Subscription management
- ✅ Premium content access control
- ✅ Admin-granted premium upgrades
- ✅ Expiration tracking

### 👑 **Admin Dashboard**

- ✅ Complete user management (CRUD)
- ✅ Grant/revoke premium access
- ✅ Toggle user active status
- ✅ Platform statistics
- ✅ Popular verses analytics
- ✅ User engagement metrics

### 🛠️ **Developer Experience**

- ✅ Full Swagger/OpenAPI documentation at `/docs`
- ✅ Comprehensive error handling with filters
- ✅ Request/Response logging interceptor
- ✅ Rate limiting (100 requests/minute)
- ✅ Environment validation with Zod
- ✅ CORS configuration
- ✅ TypeScript strict mode
- ✅ Database seeding with test data

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** >= 18.x ([Download](https://nodejs.org/))
- ✅ **PostgreSQL** >= 14.x ([Download](https://www.postgresql.org/download/))
- ✅ **pnpm** (recommended) or npm
  ```bash
  npm install -g pnpm
  ```

### Installation in 5 Steps

```bash
# 1️⃣ Clone the repository
git clone https://github.com/KrishnaGrg1/GeetaVerse-Backend.git
cd GeetaVerse-Backend

# 2️⃣ Install dependencies
pnpm install

# 3️⃣ Setup environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# 4️⃣ Setup database (generates Prisma client, runs migrations, seeds data)
pnpm run db:setup

# 5️⃣ Start development server
pnpm run start:dev
```

### Access Your API

- 🌐 **API Base**: http://localhost:3000/api
- 📚 **Swagger Docs**: http://localhost:3000/docs
- 🗄️ **Prisma Studio**: Run `pnpm run prisma:studio`

### Test with Seed Accounts

| Role       | Email                  | Password     |
| ---------- | ---------------------- | ------------ |
| 👑 Admin   | admin@geetaverse.com   | Admin@123456 |
| ⭐ Premium | premium@geetaverse.com | Premium@123  |
| 👤 User    | user@geetaverse.com    | User@123     |

---

## 📦 Tech Stack

| Category           | Technology            | Version |
| ------------------ | --------------------- | ------- |
| **Framework**      | NestJS                | 11.x    |
| **Language**       | TypeScript            | 5.x     |
| **Database**       | PostgreSQL            | 14+     |
| **ORM**            | Prisma                | 6.x     |
| **Authentication** | JWT + Passport        | Latest  |
| **Validation**     | Zod + class-validator | Latest  |
| **API Docs**       | Swagger/OpenAPI       | 7.x     |
| **Password Hash**  | bcryptjs              | 2.x     |
| **Rate Limiting**  | @nestjs/throttler     | 6.x     |
| **AI**             | OpenRouter + DeepSeek | Free    |
| **Payments**       | Stripe                | Latest  |

---

## 🗄️ Database Schema

```prisma
model User {
  id               String      @id @default(uuid())
  name             String
  email            String      @unique
  password         String      // bcrypt hashed
  role             UserRole    @default(USER)  // ADMIN | USER | PREMIUM
  isPremium        Boolean     @default(false)
  premiumExpiresAt DateTime?
  emailVerified    Boolean     @default(false)
  isActive         Boolean     @default(true)
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt

  notes            Note[]
  bookmarks        Bookmark[]
  sessions         Session[]
}

model Note {
  id        String   @id @default(uuid())
  title     String?
  content   String   @db.Text
  verseRef  String   // e.g., "BG2.47"
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Bookmark {
  id        String   @id @default(uuid())
  verseRef  String   // e.g., "BG2.47"
  tags      String[] // Array of tags for organization
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, verseRef])  // Prevent duplicate bookmarks
}

model Session {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  refreshToken String   @unique
  expiresAt    DateTime
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())
}

enum UserRole {
  ADMIN
  USER
  PREMIUM
}
```

---

## 🔌 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint         | Description          | Auth Required |
| ------ | ---------------- | -------------------- | ------------- |
| POST   | `/auth/register` | Register new user    | ❌            |
| POST   | `/auth/login`    | Login user           | ❌            |
| POST   | `/auth/refresh`  | Refresh access token | ❌            |
| POST   | `/auth/logout`   | Logout user          | ✅            |

**Example - Register:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Example - Login:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

---

### 📚 Bhagavad Gita Content (`/api/geeta`)

| Method | Endpoint                              | Description              | Auth Required |
| ------ | ------------------------------------- | ------------------------ | ------------- |
| GET    | `/geeta/chapters`                     | Get all 18 chapters      | ❌            |
| GET    | `/geeta/chapters/:id`                 | Get chapter details      | ❌            |
| GET    | `/geeta/chapters/:id/verses`          | Get verses in chapter    | ❌            |
| GET    | `/geeta/chapters/:id/verses/:verseId` | Get verse details        | ❌            |
| GET    | `/geeta/search?q=karma`               | Search verses            | ❌            |
| GET    | `/geeta/verse-of-the-day`             | Get daily featured verse | ❌            |

**Example - Get All Chapters:**

```bash
curl http://localhost:3000/api/geeta/chapters
```

**Example - Search Verses:**

```bash
curl "http://localhost:3000/api/geeta/search?q=dharma&chapter=2"
```

---

### 👤 User Features (`/api/user`)

| Method | Endpoint                      | Description          | Auth Required |
| ------ | ----------------------------- | -------------------- | ------------- |
| GET    | `/user/profile`               | Get user profile     | ✅            |
| POST   | `/user/notes`                 | Create note on verse | ✅            |
| GET    | `/user/notes?page=1&limit=10` | Get all notes        | ✅            |
| GET    | `/user/notes/:id`             | Get specific note    | ✅            |
| PUT    | `/user/notes/:id`             | Update note          | ✅            |
| DELETE | `/user/notes/:id`             | Delete note          | ✅            |
| POST   | `/user/bookmarks`             | Add bookmark         | ✅            |
| GET    | `/user/bookmarks`             | Get all bookmarks    | ✅            |
| DELETE | `/user/bookmarks/:id`         | Remove bookmark      | ✅            |

**Example - Create Note:**

```bash
curl -X POST http://localhost:3000/api/user/notes \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inspiring Verse",
    "content": "This verse teaches us about karma yoga",
    "verseRef": "BG2.47"
  }'
```

---

### 🤖 AI Features (`/api/ai`)

| Method | Endpoint                                     | Description              | Auth Required |
| ------ | -------------------------------------------- | ------------------------ | ------------- |
| GET    | `/ai/insight/:verseRef?verseText=...`        | Get AI insight for verse | ✅            |
| GET    | `/ai/summary/:chapterNumber?chapterName=...` | Get AI chapter summary   | ✅            |
| GET    | `/ai/daily-reflection?verseText=...`         | Get daily reflection     | ❌            |
| POST   | `/ai/ask`                                    | Ask AI a question        | ✅            |

**Example - Get Verse Insight:**

```bash
curl -X GET "http://localhost:3000/api/ai/insight/BG2.47?verseText=You%20have%20the%20right%20to%20work" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Example - Ask AI:**

```bash
curl -X POST http://localhost:3000/api/ai/ask \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is dharma according to the Bhagavad Gita?",
    "context": "I want to understand my duty"
  }'
```

---

### 👑 Admin Features (`/api/admin`)

| Method | Endpoint                         | Description          | Auth Required | Role  |
| ------ | -------------------------------- | -------------------- | ------------- | ----- |
| GET    | `/admin/users?page=1&limit=10`   | List all users       | ✅            | ADMIN |
| GET    | `/admin/users/:id`               | Get user details     | ✅            | ADMIN |
| PUT    | `/admin/users/:id/toggle-status` | Enable/disable user  | ✅            | ADMIN |
| PUT    | `/admin/users/:id/grant-premium` | Grant premium access | ✅            | ADMIN |
| DELETE | `/admin/users/:id`               | Delete user          | ✅            | ADMIN |
| GET    | `/admin/stats`                   | Platform statistics  | ✅            | ADMIN |

---

### 💳 Payment (`/api/payment`)

| Method | Endpoint                           | Description            | Auth Required |
| ------ | ---------------------------------- | ---------------------- | ------------- |
| POST   | `/payment/create-checkout-session` | Create Stripe checkout | ✅            |
| POST   | `/payment/verify/:sessionId`       | Verify payment         | ✅            |

---

## 🤖 AI Features Setup

### Why DeepSeek R1T2 Chimera?

We use **DeepSeek R1T2 Chimera (Free)** via OpenRouter because:

- ✅ **100% Free** - No API costs
- ✅ **Powerful reasoning** - Optimized for philosophical texts
- ✅ **High quality** - Excellent for spiritual content
- ✅ **Fast responses** - Low latency
- ✅ **No rate limits** - Generous free tier

### Setup in 3 Steps

#### 1️⃣ Get Your FREE API Key

Visit [OpenRouter.ai](https://openrouter.ai/keys) and:

1. Sign up for a free account
2. Navigate to "Keys" section
3. Create a new API key
4. Copy your key (starts with `sk-or-v1-...`)

#### 2️⃣ Configure Environment

Add to your `.env` file:

```env
# OpenRouter AI Configuration
OPENAI_API_KEY=sk-or-v1-your-api-key-here
OPENAI_MODEL=tngtech/deepseek-r1t2-chimera:free
OPENAI_SITE_URL=https://geetaverse.com
OPENAI_SITE_NAME=GeetaVerse
```

#### 3️⃣ Install OpenAI SDK

```bash
pnpm add openai
```

### AI Endpoints Overview

#### 🔮 Verse Insight

Get deep philosophical explanations for any verse.

```bash
GET /api/ai/insight/BG2.47?verseText=YOUR_VERSE_TEXT
```

**Response:**

```json
{
  "success": true,
  "data": {
    "insight": "This verse teaches the fundamental principle of Karma Yoga..."
  },
  "message": "Insight generated successfully"
}
```

#### 📖 Chapter Summary

Modern, accessible chapter summaries.

```bash
GET /api/ai/summary/2?chapterName=Sankhya%20Yoga&chapterSummary=...
```

#### 🌅 Daily Reflection

Get personalized spiritual wisdom (public endpoint).

```bash
GET /api/ai/daily-reflection?verseText=Perform%20your%20duty
```

#### ❓ Q&A System

Ask questions about the Bhagavad Gita.

```bash
POST /api/ai/ask
{
  "question": "How can I practice detachment in modern life?",
  "context": "I work in a corporate job"
}
```

### Token Optimization

AI endpoints are optimized for cost and performance:

| Feature           | Max Tokens | Use Case                |
| ----------------- | ---------- | ----------------------- |
| Verse Insights    | 500        | Detailed explanations   |
| Chapter Summaries | 800        | Comprehensive overviews |
| Daily Reflections | 200        | Quick wisdom            |
| Q&A               | 600        | Thoughtful answers      |

### Testing AI Features

```bash
# 1. Login to get access token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@geetaverse.com", "password": "User@123"}'

# 2. Test Daily Reflection (no auth needed)
curl "http://localhost:3000/api/ai/daily-reflection?verseText=Test"

# 3. Test Verse Insight (requires auth)
curl -X GET "http://localhost:3000/api/ai/insight/BG2.47?verseText=Test" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔐 Authentication

### How It Works

1. **Register/Login** → Receive access token (15min) + refresh token (7 days)
2. **Access Protected Routes** → Include `Authorization: Bearer {accessToken}`
3. **Token Expires** → Use refresh token to get new access token
4. **Logout** → Invalidate refresh token

### JWT Payload Structure

```typescript
{
  sub: "user-id",           // User ID
  email: "user@example.com", // User email
  role: "USER",             // USER | PREMIUM | ADMIN
  iat: 1234567890,          // Issued at
  exp: 1234568790           // Expires at
}
```

### Protected Routes

Use the `@UseGuards(JwtAuthGuard)` decorator:

```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@CurrentUser() user: User) {
  return user;
}
```

### Role-Based Access

Use `@Roles()` decorator with `RolesGuard`:

```typescript
@Get('admin/stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
async getStats() {
  // Only admins can access
}
```

---

## 👤 User Features

### Personal Notes

Users can create personal notes on any verse:

- **Create**: Add title, content, and verse reference
- **Read**: View all notes with pagination
- **Update**: Edit existing notes
- **Delete**: Remove notes
- **Search**: Filter by verse reference

### Bookmarks with Tags

Save favorite verses for quick access:

- Add/remove bookmarks
- Tag bookmarks for organization (e.g., "favorite", "study", "practice")
- Filter by tags
- Unique constraint (one bookmark per verse per user)

---

## 👑 Admin Features

### User Management

Admins can:

- View all users with pagination
- Filter by role (ADMIN, USER, PREMIUM)
- View detailed user information
- Enable/disable user accounts
- Grant or revoke premium access
- Delete users (soft delete recommended)

### Platform Analytics

Access comprehensive statistics:

```typescript
{
  totalUsers: 1250,
  activeUsers: 980,
  premiumUsers: 120,
  totalNotes: 3500,
  totalBookmarks: 2800,
  popularVerses: [
    { verseRef: "BG2.47", views: 1520 },
    { verseRef: "BG2.14", views: 890 }
  ]
}
```

---

## 📊 Analytics

### Track Verse Views

```typescript
await analyticsService.trackVerseView(verseRef, userId);
```

### Get Popular Verses

```bash
GET /api/admin/analytics/popular-verses?limit=10
```

### User Engagement Stats

```bash
GET /api/admin/analytics/user-engagement/:userId
```

---

## 💳 Payment Integration

### Stripe Setup

1. Get Stripe keys from [dashboard.stripe.com](https://dashboard.stripe.com)
2. Add to `.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PREMIUM_PRICE_ID=price_...
```

### Create Checkout Session

```bash
POST /api/payment/create-checkout-session
{
  "priceId": "price_1234567890",
  "successUrl": "https://geetaverse.com/success",
  "cancelUrl": "https://geetaverse.com/cancel"
}
```

### Verify Payment

```bash
POST /api/payment/verify/cs_test_1234567890
```

---

## 🛠️ Available Scripts

```bash
# Development
pnpm run start          # Start app
pnpm run start:dev      # Start with watch mode
pnpm run start:debug    # Start with debug mode

# Production
pnpm run build          # Build for production
pnpm run start:prod     # Run production build

# Database
pnpm run db:setup       # Complete setup (generate + migrate + seed)
pnpm run prisma:generate # Generate Prisma client
pnpm run prisma:migrate # Run migrations
pnpm run prisma:seed    # Seed database
pnpm run prisma:studio  # Open Prisma Studio (GUI)

# Code Quality
pnpm run lint           # Lint code
pnpm run format         # Format code with Prettier
pnpm run test           # Run unit tests
pnpm run test:watch     # Run tests in watch mode
pnpm run test:cov       # Generate test coverage
pnpm run test:e2e       # Run end-to-end tests
```

---

## 🌍 Environment Variables

### Required Variables

```env
# Database (REQUIRED)
DATABASE_URL="postgresql://user:password@localhost:5432/geetaverse"

# JWT Secrets (REQUIRED - min 32 characters)
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-chars"
JWT_REFRESH_SECRET="your-refresh-secret-change-in-production-min-32-chars"
```

### Optional Variables

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api
CORS_ORIGIN=*

# JWT Configuration
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Rate Limiting
THROTTLE_TTL=60          # Time window in seconds
THROTTLE_LIMIT=100       # Max requests per window

# Stripe Payment (Optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PREMIUM_PRICE_ID=price_...

# OpenRouter AI (Optional - for AI features)
OPENAI_API_KEY=sk-or-v1-...
OPENAI_MODEL=tngtech/deepseek-r1t2-chimera:free
OPENAI_SITE_URL=https://geetaverse.com
OPENAI_SITE_NAME=GeetaVerse
```

### Get Your API Keys

- **Database**: [Neon.tech](https://neon.tech) (Free PostgreSQL)
- **OpenRouter**: [openrouter.ai/keys](https://openrouter.ai/keys) (Free AI)
- **Stripe**: [dashboard.stripe.com](https://dashboard.stripe.com) (Payment)

---

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready

# Check connection string
psql "postgresql://user:password@localhost:5432/geetaverse"

# Create database if missing
createdb geetaverse
```

### Prisma Client Not Found

```bash
npx prisma generate
```

### JWT Validation Errors

- Ensure JWT secrets are **at least 32 characters** long
- Check token expiration times
- Verify Authorization header format: `Bearer {token}`

### TypeScript Compilation Errors

```bash
# Clean reinstall
rm -rf node_modules pnpm-lock.yaml dist
pnpm install
npx prisma generate
pnpm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in .env
PORT=3001
```

### AI Features Not Working

1. Check API key is set in `.env`
2. Verify OpenAI package is installed: `pnpm add openai`
3. Check OpenRouter dashboard for usage/errors
4. Test with a simple curl request

---

## 📁 Project Structure

```
bhagwat-geeta-backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data with test accounts
│
├── src/
│   ├── auth/                  # 🔐 Authentication module
│   │   ├── dto/              # Data transfer objects
│   │   ├── guards/           # JWT & Roles guards
│   │   ├── strategies/       # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── user/                  # 👤 User management
│   │   ├── dto/              # Note & Bookmark DTOs
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   │
│   ├── geeta/                 # 📚 Bhagavad Gita content
│   │   ├── chapter/          # 18 chapter JSON files
│   │   ├── slok/             # 700+ verse JSON files
│   │   ├── geeta.controller.ts
│   │   ├── geeta.service.ts
│   │   └── geeta.module.ts
│   │
│   ├── ai/                    # 🤖 AI features
│   │   ├── prompts/          # AI prompt templates
│   │   ├── ai.controller.ts
│   │   ├── ai.service.ts
│   │   └── ai.module.ts
│   │
│   ├── admin/                 # 👑 Admin operations
│   │   ├── admin.controller.ts
│   │   ├── admin.service.ts
│   │   └── admin.module.ts
│   │
│   ├── payment/               # 💳 Stripe integration
│   │   ├── payment.controller.ts
│   │   ├── payment.service.ts
│   │   └── payment.module.ts
│   │
│   ├── analytics/             # 📊 Analytics service
│   │   ├── analytics.service.ts
│   │   └── analytics.module.ts
│   │
│   ├── common/                # 🔧 Shared utilities
│   │   ├── decorators/       # Custom decorators
│   │   ├── dto/              # Response DTOs
│   │   ├── filters/          # Exception filters
│   │   ├── guards/           # Custom guards
│   │   ├── interceptors/     # Logging interceptor
│   │   └── utils/            # Helper functions
│   │
│   ├── config/                # ⚙️ Configuration
│   │   ├── app.config.ts     # App configuration
│   │   ├── prisma.config.ts  # Prisma configuration
│   │   └── env.validation.ts # Zod validation
│   │
│   ├── prisma/                # 🗄️ Prisma service
│   │   └── prisma.service.ts
│   │
│   ├── app.module.ts          # Root application module
│   └── main.ts                # Bootstrap & Swagger setup
│
├── test/                      # 🧪 Tests
│   ├── app.e2e-spec.ts       # E2E tests
│   └── jest-e2e.json         # Jest config
│
├── .env.example               # Environment template
├── .gitignore                # Git ignore file
├── nest-cli.json             # NestJS CLI config
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── tsconfig.build.json       # Build TypeScript config
└── README.md                  # This file
```

---

## 🚢 Deployment

### Production Checklist

- [ ] Change all secrets in `.env` (JWT, database)
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins (not `*`)
- [ ] Setup SSL/TLS certificates
- [ ] Configure database backups
- [ ] Setup monitoring (Sentry, LogRocket, etc.)
- [ ] Enable production logging
- [ ] Configure Stripe webhooks
- [ ] Review security headers
- [ ] Setup CI/CD pipeline
- [ ] Load test your API
- [ ] Setup CDN for static assets
- [ ] Configure reverse proxy (Nginx)

### Deployment Platforms

#### 🚀 **Railway** (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add

# Deploy
railway up
```

#### 🌐 **Render**

1. Create account at render.com
2. Create new Web Service
3. Connect your GitHub repo
4. Add PostgreSQL database
5. Set environment variables
6. Deploy!

#### 🔷 **Heroku**

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create geetaverse-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main
```

---

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Krishna Bahadur Gurung**

- GitHub: [@KrishnaGrg1](https://github.com/KrishnaGrg1)

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [OpenRouter](https://openrouter.ai/) - Unified AI API access
- [DeepSeek](https://www.deepseek.com/) - Open-source AI model
- Bhagavad Gita translators and scholars

---

## 📞 Support

- 📖 Documentation: Read this README and Swagger docs at `/docs`
- 🐛 Bug Reports: [Create an issue](https://github.com/KrishnaGrg1/GeetaVerse-Backend/issues)
- 💡 Feature Requests: [Open a discussion](https://github.com/KrishnaGrg1/GeetaVerse-Backend/discussions)

---

<div align="center">

### ⭐ If this project helped you, please consider giving it a star!

**Made with ❤️ for spiritual seekers worldwide** 🕉️

_"You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions."_  
**— Bhagavad Gita 2.47**

---

**[⬆ Back to Top](#️-geetaverse-backend)**

</div>
