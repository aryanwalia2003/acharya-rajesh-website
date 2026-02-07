# Technical Specifications

## 1. The Stack
- **Framework:** Next.js (App Router)
- **Deployment:** Vercel
- **Database:** PostgreSQL (via Prisma ORM)
- **Caching/Queue:** Redis (for AI task management and rate limiting)
- **Authentication:** Auth.js (formerly NextAuth) with Google OAuth 2.0
- **Styling:** Tailwind CSS (Dark/Light mode support)

## 2. Local Development (Docker)
The development environment is containerized to ensure parity between developers.
- **Service A:** `postgres:latest` (Persistent storage)
- **Service B:** `redis:alpine` (Session management and AI caching)
- **Service C:** Next.js App (Local node environment)

## 3. Deployment Strategy
- **Platform:** Vercel.
- **CI/CD:** Automatic deployments from `main` and `preview` branches.
- **Environment Variables:**
  - `DATABASE_URL`: Postgres connection string.
  - `REDIS_URL`: Redis connection string.
  - `GOOGLE_CLIENT_ID/SECRET`: For Admin OAuth.
  - `OPENAI_API_KEY`: For translation and date extraction.

## 4. Anti-Copy Architecture
To satisfy the "Content Protection" requirement:
- **CSS Layer:** `user-select: none` on article bodies for anonymous users.
- **JS Layer:** Disable right-click context menu on blog pages.
- **Obfuscation:** Content fetching via Server Components to prevent simple "View Source" scraping of raw text.

## 5. AI Integration Strategy
- **Translation:** On-demand (User clicks "Translate"). Cached in Redis.
- **Summarization:** On-demand (User clicks "Summary"). Cached in Redis.
- **Date Extraction:** Pre-computed at publish time (Background Job) and stored in DB for fast loading.


## 6. DB QUERY
I want to use raw sql queries to interact with the database. No extensive use of prisma