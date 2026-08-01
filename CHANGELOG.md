# Changelog

Todas as mudanças relevantes do FoxVault serão documentadas neste arquivo.

O projeto segue Versionamento Semântico (SemVer).

---

## v0.5.0

### Added

#### Galleries

- Gallery listing page
- Empty galleries state
- Gallery creation dialog
- Gallery creation with PostgreSQL persistence
- Gallery cards and responsive grid
- Gallery visibility options: private, shared, and public
- Gallery editing
- Gallery deletion with confirmation
- Image count display on gallery cards
- Loading states for gallery mutations

#### Architecture

- Gallery validation schemas with Zod
- Gallery Server Actions
- Gallery service layer
- Gallery repository layer
- Typed action states
- Owner-based authorization for gallery updates and deletions

### Changed

- Sidebar now remains visible while scrolling
- Gallery forms reset when cancelled or closed
- Gallery action menus close when clicking outside
- Improved dialog backdrop interaction
- Improved gallery empty-state layout

### Fixed

- Gallery creation dialog not closing after consecutive submissions
- Gallery action menu being clipped by card overflow
- Edit dialog closing while selecting text
- Unsaved gallery edits remaining after cancellation

## v0.4.0

### Added

#### Authentication

- Google OAuth authentication
- Persistent database sessions with Auth.js
- Protected dashboard routes
- Protected authentication routes
- User dropdown menu
- Logout
- User avatar
- User information in the header

#### Layout

- Dashboard Header
- Search bar (UI)
- Settings placeholder page
- Favorites placeholder page
- Trash placeholder page

#### Architecture

- Authentication Route Group
- Dashboard Route Group
- Centralized authentication configuration
- Prisma authentication models
- Authentication API route

---

## v0.3.0

### Added

- Dark application theme
- Sidebar navigation
- Application footer
- FoxVault logo
- Home page
- Favorites page
- Trash page

---

## v0.2.0

### Added

- Project layout
- Responsive application shell
- Navigation structure
- Component organization

---

## v0.1.0

### Added

- Next.js project initialization
- Docker environment
- PostgreSQL
- Prisma ORM
- Initial database schema