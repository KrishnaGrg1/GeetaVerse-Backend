# 🚀 GeetaVerse Backend - Quick Setup Guide

## ✅ Prerequisites Checklist

Before you begin, ensure you have:

- ✅ Node.js >= 18.x installed
- ✅ PostgreSQL >= 14.x running
- ✅ pnpm or npm package manager
- ✅ Git for version control

## 📋 Step-by-Step Setup

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

This will install:

- NestJS framework & modules
- Prisma ORM
- JWT & Passport for auth
- Bcrypt for password hashing
- Zod for validation
- Swagger for API docs
- All type definitions

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Then edit `.env` with your configuration:

**REQUIRED:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/geetaverse"
JWT_SECRET="your-secret-min-32-chars-CHANGE-THIS"
JWT_REFRESH_SECRET="your-refresh-secret-min-32-chars-CHANGE-THIS"
```

**OPTIONAL:**

```env
STRIPE_SECRET_KEY="sk_test_..."  # For payment features
OPENAI_API_KEY="sk-..."           # For AI insights
```

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Seed with test data
npx prisma db seed
```

Or use the combined command:

```bash
pnpm run db:setup
```

### 4. Start Development Server

```bash
pnpm run start:dev
```

Server will start at:

- **API**: http://localhost:3000/api
- **Docs**: http://localhost:3000/docs

## 🔑 Test Accounts

After seeding, login with:

```
Admin:   admin@geetaverse.com / Admin@123456
Premium: premium@geetaverse.com / Premium@123
User:    user@geetaverse.com / User@123
```

## 🧪 Testing the API

### 1. Open Swagger Docs

Navigate to: http://localhost:3000/docs

### 2. Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123456"
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456"
  }'
```

Save the `accessToken` from the response.

### 4. Get All Chapters (Public)

```bash
curl http://localhost:3000/api/geeta/chapters
```

### 5. Create a Note (Authenticated)

```bash
curl -X POST http://localhost:3000/api/user/notes \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Note",
    "content": "This verse is very inspiring",
    "verseRef": "BG2.47"
  }'
```

## 📊 Database Management

### View Data with Prisma Studio

```bash
npx prisma studio
```

Opens visual database editor at http://localhost:5555

### Reset Database

```bash
npx prisma migrate reset
```

### Create New Migration

```bash
npx prisma migrate dev --name your_migration_name
```

## 🐛 Troubleshooting

### Issue: "Cannot find module '@prisma/client'"

**Solution:**

```bash
npx prisma generate
```

### Issue: Database connection error

**Solution:**

1. Ensure PostgreSQL is running
2. Check DATABASE_URL in `.env`
3. Create database: `createdb geetaverse`

### Issue: JWT validation errors

**Solution:**
Ensure JWT_SECRET and JWT_REFRESH_SECRET are at least 32 characters long

### Issue: TypeScript compilation errors

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
npx prisma generate
```

## 📚 Available Scripts

```bash
pnpm run start:dev      # Development with watch mode
pnpm run start:prod     # Production mode
pnpm run build          # Build for production
pnpm run lint           # Lint code
pnpm run format         # Format code
pnpm run test           # Run tests
pnpm run prisma:studio  # Open Prisma Studio
pnpm run db:setup       # Complete DB setup
```

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment
3. ✅ Setup database
4. ✅ Start server
5. ✅ Test API via Swagger
6. ✅ Build your frontend!

## 📖 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Swagger/OpenAPI Spec](http://localhost:3000/docs)

## ⚠️ Production Checklist

Before deploying to production:

- [ ] Change all secrets in `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins
- [ ] Setup SSL/TLS certificates
- [ ] Configure database backup strategy
- [ ] Setup monitoring & logging
- [ ] Enable rate limiting (already configured)
- [ ] Review security headers
- [ ] Setup CI/CD pipeline
- [ ] Configure Stripe webhooks (if using payments)

---

**Happy Coding! 🚀**

For issues or questions, check the main README.md or create an issue in the repository.
