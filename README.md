# HealthNexus

A modern B2B Healthcare Management Platform built with React + TypeScript. Designed for clinical teams to manage patient records, monitor analytics, and streamline daily operations — with a polished, responsive UI supporting light and dark modes.

---

## Quick Start (Demo)

No Firebase setup needed. Just use the demo account:

**Email:** `demo@healthnexus.com`  
**Password:** `demo@123`

Or click the **"Continue with Demo Credentials"** button on the login screen — it logs you in instantly without any network or Firebase configuration.

---

## Features

- **Firebase Authentication** — email/password login with remember me
- **Dashboard** — KPI cards, recent activity feed, quick actions
- **Analytics** — interactive charts (admissions, revenue, demographics, departments) via Recharts
- **Patient Details** — 30+ mock patients with Grid View / List View toggle, search, filter by status/department, and a detail side panel
- **Service Worker** — asset caching and push notification support (PWA-ready)
- **Dark / Light mode** — system-aware with manual toggle
- **Animations** — page transitions, hover effects, animated charts via Framer Motion
- **Responsive** — mobile-first layout with collapsible sidebar

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand |
| Routing | React Router v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Auth | Firebase Authentication |
| PWA | vite-plugin-pwa + Workbox |

---

## Getting Started

### 1. Install dependencies

> **Note:** Use `pnpm` — the project has a local pnpm store. `npm`/`yarn` may fail due to network/peer-dep issues.

```bash
pnpm install
```

### 2. Configure environment (optional — skip for demo login)

```bash
cp .env.example .env
```

Fill in your Firebase project values in `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key
```

> If you skip this step, Firebase calls will fail but the **demo login still works** — it bypasses Firebase entirely.

### 3. Run dev server

```bash
pnpm dev
```

App runs at **http://localhost:5173**

> **Wayland users:** The system may have a conflicting `/usr/bin/vite` binary. The scripts are pre-configured to use `./node_modules/.bin/vite` directly to avoid this. Use `pnpm dev` (not `npm run dev`) for best results.

---

## Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Production build → dist/
pnpm preview    # Preview production build locally
pnpm lint       # Run ESLint
```

---

## Firebase Setup (optional)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication → Sign-in method → Email/Password**
4. Go to **Project Settings → Your apps → Web** and copy the config
5. Paste values into your `.env` file
6. (Optional) For push notifications, generate a VAPID key under **Cloud Messaging** and add it as `VITE_FIREBASE_VAPID_KEY`

---

## Project Structure

```
src/
├── components/        # Shared UI components (Navbar, Sidebar, etc.)
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Analytics.tsx
│   └── Patients.tsx
├── store/             # Zustand stores (auth, theme, patients, notifications)
├── services/          # Firebase config
├── hooks/             # Custom React hooks
├── types/             # TypeScript interfaces
└── utils/             # Helpers
```

---

## Demo Credentials

| Field | Value |
|---|---|
| Email | `demo@healthnexus.com` |
| Password | `demo@123` |
| Display Name | Dr. Demo User |

The demo account is a fully local bypass — no network or Firebase required. Click **"Continue with Demo Credentials"** on the login page to use it in one click.

---

## License

MIT
