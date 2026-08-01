# 🦊 FoxVault

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql)
![Auth.js](https://img.shields.io/badge/Auth.js-v5-000000)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel)
![Version](https://img.shields.io/badge/version-v0.6.0-orange)

> A collaborative image vault built for organizing, managing, searching and sharing images.

FoxVault is a modern image-hosting platform focused on gallery organization, collaborative access, searchable metadata and direct image links.

Developed by **Yago "Zhao" Amorim**.

---

# 🌐 Live Demo

FoxVault is currently available at:

**https://foxvault-liart.vercel.app**

> The project is under active development and currently operates as a closed beta.

---

# ✨ Features

## ✅ Implemented

- Google OAuth authentication
- Persistent database sessions
- Production Google OAuth authentication
- Protected routes
- Responsive dashboard
- Gallery creation
- Gallery listing
- Gallery editing
- Gallery deletion
- Private, shared and public gallery visibility
- Owner-based gallery authorization
- Favorites placeholder page
- Trash placeholder page
- Settings placeholder page
- Production deployment on Vercel
- Neon PostgreSQL production database
- Automatic deployments from GitHub
- Separate local and production database environments

---

## 🚧 Planned

- Dashboard home with statistics and recent galleries
- Discord authentication
- Gallery details page
- Shared galleries
- Gallery members and permissions
- Invite members by exact email address
- Image upload
- Multiple image uploads
- Cloudflare R2 integration
- Direct image links
- Individual image comments
- Search by comment
- Search by tags
- Favorites system
- Trash recovery

---

# 📸 Screenshots

> Screenshots will be added as development progresses.

## Desktop

Coming soon.

## Mobile

Coming soon.

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
│   └── database/
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
|---|---|
| Components | User interface and interactions |
| Server Actions | Authentication, orchestration and cache revalidation |
| Schemas | Validation and data normalization |
| Services | Business rules |
| Repositories | Database access |
| Prisma | Object-relational mapping |
| PostgreSQL | Data persistence |

---

# 🖼 Gallery Management

Current gallery capabilities:

- Create galleries
- List galleries
- Edit galleries
- Delete galleries
- Add an optional description
- Display the number of images
- Configure gallery visibility
- Restrict mutations to the gallery owner

## Visibility Levels

| Visibility | Description |
|---|---|
| `PRIVATE` | Only the owner can access the gallery |
| `SHARED` | Invited members can access the gallery |
| `PUBLIC` | Anyone with the link can view the gallery |

> Shared gallery membership and permissions are planned for the next development cycle.

---

# 🚀 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

## Backend

- Auth.js
- Prisma ORM
- PostgreSQL
- Zod
- Server Actions

## Infrastructure

- Docker and Docker Compose for local development
- PostgreSQL running locally through Docker
- Neon PostgreSQL for production
- Vercel for application hosting and automatic deployments
- Cloudflare R2 planned for image storage

---

# 🌍 Environments

FoxVault uses separate environments for local development and production.

## Local Development

```text
Next.js
    │
    ▼
PostgreSQL
    │
    ▼
Docker
```

## Production

```text
Next.js
    │
    ▼
Vercel
    │
    ▼
Neon PostgreSQL
```

Future image storage:

```text
Browser
    │
    ▼
Cloudflare R2
```

---

# ⚙ Environment Variables

Create a local `.env` based on `.env.example`.

```env
DATABASE_URL=""

AUTH_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

Never commit your real `.env` file or expose authentication and database credentials.

## Production

The Neon integration provides the production database variables through Vercel.

Auth.js variables are configured manually in the Vercel project:

```env
AUTH_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

---

# 💻 Running Locally

## 1. Install dependencies

```bash
npm install
```

## 2. Start PostgreSQL

```bash
docker compose up -d
```

## 3. Apply database migrations

```bash
npx prisma migrate dev
```

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Start the application

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🗄 Prisma Studio

Use Prisma Studio to inspect the local database:

```bash
npx prisma studio
```

---

# 🧱 Production Migrations

Production migrations are applied with:

```bash
npx prisma migrate deploy
```

The command must use the direct production database connection and must never accidentally target the local Docker database.

---

# ✅ Validation

Before every commit, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Useful Git review commands:

```bash
git status
git diff --stat
git diff --staged
```

---

# 🔐 Authentication

FoxVault currently supports Google OAuth through Auth.js.

## Local Development

Authorized JavaScript origin:

```text
http://localhost:3000
```

Authorized redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

## Production

Authorized JavaScript origin:

```text
https://foxvault-liart.vercel.app
```

Authorized redirect URI:

```text
https://foxvault-liart.vercel.app/api/auth/callback/google
```

---

# 👥 Planned Sharing Model

Shared gallery members will be added through an exact email address.

FoxVault will not expose a public user search or user directory.

Planned gallery roles:

| Role | Permissions |
|---|---|
| `OWNER` | Manage the gallery, members and all images |
| `EDITOR` | Upload, edit and delete gallery images |
| `VIEWER` | View images and copy direct links |

The backend will validate every permission independently from the interface.

---

# ☁ Planned Upload Flow

```text
Browser
      │
      ▼
Request presigned upload URLs
      │
      ▼
Cloudflare R2
      │
      ▼
Confirm successful uploads
      │
      ▼
Store image metadata
      │
      ▼
PostgreSQL
```

Initial upload goals:

- Up to 20 selected images
- Up to 4 simultaneous uploads
- Progress state per image
- Individual retry support
- Individual comments
- Direct image links
- Upload permission validation

---

# 🛣 Roadmap

- [x] Project foundation
- [x] Docker
- [x] Local PostgreSQL
- [x] Prisma
- [x] Dashboard layout
- [x] Google authentication
- [x] Protected routes
- [x] Gallery CRUD
- [x] First production deployment
- [x] Neon PostgreSQL integration
- [x] Production Google OAuth
- [ ] Dashboard home
- [ ] Gallery details page
- [ ] Shared galleries
- [ ] Gallery members and permissions
- [ ] Member invitations by exact email
- [ ] Cloudflare R2 integration
- [ ] Image upload
- [ ] Multiple image uploads
- [ ] Image comments
- [ ] Direct image links
- [ ] Image search
- [ ] Favorites
- [ ] Trash recovery
- [ ] Discord authentication

---

# 📦 Versioning

FoxVault follows Semantic Versioning.

Current releases:

- `v0.1.0` — Project foundation
- `v0.2.0` — Base application layout
- `v0.3.0` — Visual identity
- `v0.4.0` — Authentication and authenticated dashboard
- `v0.5.0` — Gallery management
- `v0.6.0` — First production deployment

See [CHANGELOG.md](./CHANGELOG.md) for the complete release history.

---

# 👨‍💻 Author

**Yago "Zhao" Amorim**

GitHub: [AmorimYago](https://github.com/AmorimYago)