# FineMe

A behavioral-science-backed fitness app that uses financial loss aversion to drive daily workout consistency.

**See [ARCHITECTURE.md](./ARCHITECTURE.md)** for the full project structure, conventions, and AI agent rules.

## Repository Structure

```
FineMe/
├── ARCHITECTURE.md    # Project structure & rules (read first)
├── README.md
├── web/              # Web landing page (Vite + React)
│   ├── api/          # Vercel serverless (e.g. waitlist)
│   └── public/
├── FineMeMobile/     # iOS mobile app (React Native)
│   ├── src/          # components, services, contexts, types, etc.
│   ├── supabase/     # Edge functions and DB migrations
│   └── docs/         # PRD and setup guides
└── docs/             # Global documentation
```

## Web Landing Page

Built with Vite + React. Lives in `web/`. Deployed on Vercel.

**Vercel:** In your Vercel project settings, set **Root Directory** to `web` so builds and serverless functions run from there.

```bash
cd web
npm install
npm run dev      # localhost:3000
npm run build
```

For local env vars (e.g. waitlist API), add `web/.env.local` (see Vercel/Resend docs).

## Mobile App (iOS)

Built with React Native (bare workflow). Requires Xcode.

```bash
cd FineMeMobile
npm install
npx pod-install ios
npx react-native run-ios
```

See `FineMeMobile/docs/` for the full PRD, setup guides, and launch checklist.
