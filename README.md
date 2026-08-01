# 🦊 FoxVault

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql)
![Auth.js](https://img.shields.io/badge/Auth.js-v5-000000)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

> A collaborative image vault built for organizing, managing, searching and sharing images.

FoxVault is a modern image-hosting platform focused on gallery organization, collaborative access, searchable metadata and direct image links.

Developed by **Yago "Zhao" Amorim**.

---

# ✨ Features

## ✅ Implemented

- Google OAuth authentication
- Persistent database sessions
- Protected routes
- Responsive dashboard
- Gallery creation
- Gallery listing
- Gallery editing
- Gallery deletion
- Gallery visibility
- Owner authorization
- Favorites page
- Trash page
- Settings page

---

## 🚧 Planned

- Discord Authentication
- Gallery Details
- Image Upload
- Multiple Upload
- Cloudflare R2
- Direct Image Links
- Search by Comment
- Search by Tags
- Shared Galleries
- Gallery Permissions
- Favorites System
- Trash Recovery

---

# 📸 Screenshots

> Screenshots will be added as development progresses.

Desktop

Coming Soon...

Mobile

Coming Soon...

---

# 🏗 Architecture

FoxVault follows a feature-based architecture with clear separation of responsibilities.

```text
src/
├── app/
│   ├── (authentication)/
│   ├── (dashboard)/
│   └── api/
│
├── components/
│   └── layout/
│
├── features/
│   ├── authentication/
│   ├── galleries/
│   │   ├── actions/
│   │   ├── components/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── images/
│   ├── search/
│   ├── sharing/
│   └── upload/
│
├── generated/
├── lib/
└── types/
```

---

# 🔄 Request Flow

Every gallery mutation follows the same architecture.

```text
React Component
        │
        ▼
Server Action
        │
        ▼
Zod Schema
        │
        ▼
Service
        │
        ▼
Repository
        │
        ▼
Prisma
        │
        ▼
PostgreSQL
```

---

# 📚 Layer Responsibilities

| Layer | Responsibility |
|--------|----------------|
| Components | User Interface |
| Server Actions | Authentication, orchestration and cache revalidation |
| Schemas | Validation and normalization |
| Services | Business Rules |
| Repositories | Database Access |
| Prisma | ORM |
| PostgreSQL | Data Persistence |

---

# 🖼 Gallery Management

Current gallery capabilities:

- Create
- Edit
- Delete
- Optional Description
- Image Counter
- Visibility

### Visibility Levels

| Visibility | Description |
|------------|-------------|
| PRIVATE | Only the owner can access |
| SHARED | Invited users can access |
| PUBLIC | Anyone with the link can view |

---

# 🚀 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## Backend

- Auth.js
- Prisma ORM
- PostgreSQL
- Zod

## Infrastructure

- Docker
- Docker Compose
- Vercel *(Deployment Planned)*
- Cloudflare R2 *(Storage Planned)*

---

# ⚙ Environment Variables

Create a local `.env` based on `.env.example`.

```env
DATABASE_URL=""
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

Never commit your real `.env`.

---

# 💻 Running Locally

Install dependencies

```bash
npm install
```

Start PostgreSQL

```bash
docker compose up -d
```

Run migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Start the application

```bash
npm run dev
```

Open

```text
http://localhost:3000
```

---

# 🗄 Prisma Studio

```bash
npx prisma studio
```

---

# ✅ Validation

Before every commit

```bash
npm run lint
npx tsc --noEmit
```

Useful Git commands

```bash
git diff --stat
git status
git diff --staged
```

---

# 🔐 Authentication

FoxVault currently supports Google OAuth.

Local Callback

```text
http://localhost:3000/api/auth/callback/google
```

Authorized JavaScript Origin

```text
http://localhost:3000
```

Authorized Redirect URI

```text
http://localhost:3000/api/auth/callback/google
```

---

# ☁ Planned Upload Flow

```text
Browser
      │
      ▼
Request Upload URLs
      │
      ▼
Cloudflare R2
      │
      ▼
Confirm Upload
      │
      ▼
Store Metadata
      │
      ▼
PostgreSQL
```

Initial upload goals

- Up to 20 images
- 4 simultaneous uploads
- Progress per image
- Retry failed uploads
- Individual comments

---

# 🛣 Roadmap

- [x] Project foundation
- [x] Docker
- [x] PostgreSQL
- [x] Prisma
- [x] Dashboard
- [x] Authentication
- [x] Gallery CRUD
- [ ] First Production Deployment
- [ ] Gallery Details
- [ ] Cloudflare R2
- [ ] Image Upload
- [ ] Multiple Upload
- [ ] Image Comments
- [ ] Image Search
- [ ] Shared Galleries
- [ ] Discord Authentication

---

# 📦 Versioning

FoxVault follows Semantic Versioning.

Current releases

- v0.1.0 — Project Foundation
- v0.2.0 — Base Layout
- v0.3.0 — Visual Identity
- v0.4.0 — Authentication
- v0.5.0 — Gallery Management

See **CHANGELOG.md** for the complete release history.

---

# 🌎 Future Live Demo

Coming in a future release after production deployment.

---

# 👨‍💻 Author

**Yago "Zhao" Amorim**

GitHub

https://github.com/AmorimYago