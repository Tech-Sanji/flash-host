# DropZone — Midnight Product Drop

> ACM MPSTME Hackathon — Full Stack Problem 2
> Stack: Next.js 14 · Prisma ORM · Supabase (PostgreSQL) · Claude AI API

---

## Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
copy .env.example .env.local

# 3. Add your Supabase URLs to .env.local

# 4. Push schema to Supabase + seed data
npm run db:setup

# 5. Start dev server
npm run dev
```

Open **http://localhost:3000**

---

## Getting Supabase URLs

1. Go to https://supabase.com → create free project
2. Dashboard → Settings → Database
3. Scroll to "Connection String"
4. Copy **Transaction** string (port 6543) → paste as DATABASE_URL
5. Copy **Session** string (port 5432) → paste as DIRECT_URL
6. Replace [YOUR-PASSWORD] with your database password

---

## Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| demo@dropzone.io | drop2024 | User |
| admin@dropzone.io | admin2024 | Admin |
| judge@hackathon.io | judge2024 | Judge |

---

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Supabase-authenticated login |
| `/` | Flash sale — live countdown + buy button |
| `/orders` | All successful orders with search |
| `/admin` | System dashboard + stock reset |
| `/test` | Stress test — fire 5-200 concurrent buyers |

---

## Database Commands

```bash
npm run db:setup     # Push schema + seed data
npm run db:studio    # Open Prisma Studio (localhost:5555)
npm run db:reset     # Wipe and re-seed
npm run db:push      # Push schema changes only
```

---

## Deploying to Vercel

1. Push to GitHub
2. Import repo on vercel.com
3. Add environment variables:
   - DATABASE_URL
   - DIRECT_URL
   - ANTHROPIC_API_KEY
4. Set build command: prisma generate && next build
5. Deploy!
