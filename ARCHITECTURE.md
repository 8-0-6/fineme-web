# ARCHITECTURE.md

> **This document is the single source of truth for the FineMe codebase.**
> All AI coding agents MUST read this file in full before writing any code.
> All humans should treat this as the project's constitution.

---

## AI AGENT RULES

**These rules are non-negotiable. Violating any of them is a bug.**

### Before Writing ANY Code:
1. Read this entire `ARCHITECTURE.md`.
2. Read `FineMeMobile/docs/PRD.md` — the product spec. All features must align with it.
3. Search existing code for similar patterns before creating anything new.

### Hard Rules:
1. **NO RANDOM FILES.** Every file MUST go in its designated directory (see Section 4). Never create files in the repo root, in `FineMeMobile/`, or in `FineMeMobile/src/` directly.
2. **NO NEW DEPENDENCIES** without explaining why. Confirm no existing package already covers the use case.
3. **MATCH EXISTING STYLE.** Read surrounding code and replicate its patterns, naming, and structure exactly.
4. **NO DELETING OR REWRITING** existing features without explicit instruction. Targeted modifications are fine; wholesale rewrites are not.
5. **PRD IS LAW.** New features, UI changes, and behaviors MUST conform to `FineMeMobile/docs/PRD.md`. If something contradicts the PRD, raise it — don't silently override.
6. **TYPESCRIPT ONLY.** All code must be properly typed. No `any`. No `@ts-ignore` unless absolutely unavoidable (must include a comment explaining why).
7. **NO SECRETS IN CODE.** API keys, tokens, and credentials go in `.env` files or `config/env.ts` — never hardcoded in components or services.
8. **NO CROSS-CONTAMINATION.** Web code stays in `web/`. Mobile code stays in `FineMeMobile/`. They share ZERO code.
9. **CONVENTIONAL COMMITS.** All commit messages follow the format: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, etc.

### When Adding a New Feature:
1. Identify which feature area it belongs to (onboarding, dashboard, workout, etc.)
2. Create files in the correct directory per the placement rules (Section 4)
3. Add new types to `src/types/index.ts`
4. Add new constants to `src/constants/index.ts`
5. Use existing services; only create new service files for genuinely new integrations
6. Import colors from `src/styles/colors.ts` — never hardcode hex values
7. Follow the existing component structure and patterns in that directory

### When Modifying Existing Code:
1. Read the full file first to understand context
2. Preserve existing behavior unless explicitly asked to change it
3. Don't refactor unrelated code while making targeted changes
4. Keep changes minimal and focused

---

## 1. Project Overview

FineMe is a behavioral-science-backed fitness app that uses **financial loss aversion** to drive daily workout consistency. Users deposit a stake; if they fail to complete their daily pushup goal by midnight, the stake is donated to charity.

This repository is a **monorepo** with two independent applications:

| Application      | Directory                | Stack                                 | Deploys To     |
|------------------|--------------------------|---------------------------------------|----------------|
| Web Landing Page | `web/`                   | Vite + React 19 + TypeScript          | Vercel         |
| iOS Mobile App   | `FineMeMobile/`          | React Native 0.83 (bare) + TypeScript | App Store      |
| Backend          | `FineMeMobile/supabase/` | Supabase (Postgres + Edge Functions)  | Supabase Cloud |

**These are completely separate codebases.** Separate `package.json`, separate build systems, zero shared code.

---

## 2. Tech Stack

### Web Landing Page (`web/`)
- React 19 + TypeScript, built with Vite 6
- Framer Motion (animation), Lucide React (icons), Vercel Analytics
- Vercel Functions for serverless API (`web/api/`)
- Deploys automatically via Vercel on `git push`

### Mobile App (`FineMeMobile/`)
- React Native 0.83, bare workflow (NOT Expo managed)
- TypeScript (strict)
- Supabase: auth (email/password, Apple, Google), Postgres database, Edge Functions
- Stripe SDK (`@stripe/stripe-react-native`) for payments
- TensorFlow Lite (`react-native-fast-tflite`) for on-device pose detection
- `react-native-vision-camera` for camera access
- OneSignal (`react-native-onesignal`) for push notifications
- React Context for state management (`AuthContext`)
- AsyncStorage for local persistence

### Backend (`FineMeMobile/supabase/`)
- PostgreSQL via Supabase
- Supabase Auth
- Edge Functions (Deno/TypeScript) for server-side Stripe operations and cron jobs

---

## 3. Repository Structure

```
FineMe/                                    ← Monorepo root
├── ARCHITECTURE.md                        ← THIS FILE — read first
├── README.md                              ← Project overview & quickstart
├── .gitignore
├── .env.local                             ← Root env vars (git-ignored)
│
├── web/                                   ← 🌐 WEB LANDING PAGE
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html                         ← HTML entry
│   ├── index.tsx                          ← React DOM mount
│   ├── App.tsx                            ← Root component / router
│   ├── LandingPage.tsx                    ← Main landing page
│   ├── PrivacyPolicy.tsx                  ← Privacy policy
│   ├── TermsOfService.tsx                 ← Terms of service
│   ├── constants.tsx                      ← Web constants
│   ├── types.ts                           ← Web types
│   ├── api/                               ← Vercel serverless functions
│   │   └── waitlist.ts
│   └── public/                            ← Static assets
│
├── FineMeMobile/                          ← 📱 iOS MOBILE APP
│   ├── package.json
│   ├── tsconfig.json
│   ├── app.json
│   ├── App.tsx                            ← App root: auth, onboarding, navigation
│   ├── index.js                           ← RN entry point
│   │
│   ├── src/                               ← ALL mobile source code
│   │   ├── components/                    ← UI components (by feature)
│   │   │   ├── onboarding/                 ← 16-step onboarding flow
│   │   │   ├── dashboard/                 ← Main app (post-onboarding)
│   │   │   ├── workout/                   ← AI workout session
│   │   │   ├── ui/                        ← Reusable UI primitives
│   │   │   └── SplashScreen.tsx
│   │   ├── services/                      ← Business logic & API calls
│   │   ├── contexts/                      ← React Context providers
│   │   ├── types/                         ← TypeScript types
│   │   ├── constants/                     ← App constants
│   │   ├── config/                        ← Configuration
│   │   ├── styles/                        ← Design tokens
│   │   ├── utils/                         ← Pure utility functions
│   │   └── assets/                        ← Static assets
│   │
│   ├── ios/                               ← iOS native (Xcode-managed)
│   ├── supabase/                          ← 🗄️ BACKEND (Edge Functions + migrations)
│   └── docs/                              ← Mobile app documentation
│
└── docs/                                  ← Global documentation
```

---

## 4. File Placement Rules

### Where new files MUST go:

| Creating...                    | Put it in                                       | Name format            |
|--------------------------------|-------------------------------------------------|------------------------|
| Onboarding step                | `FineMeMobile/src/components/onboarding/`       | `StepXxx.tsx`          |
| Dashboard screen/tab           | `FineMeMobile/src/components/dashboard/`       | `XxxTab.tsx`           |
| Workout feature                | `FineMeMobile/src/components/workout/`         | `PascalCase.tsx`       |
| Reusable UI component         | `FineMeMobile/src/components/ui/`              | `PascalCase.tsx`       |
| New feature area               | `FineMeMobile/src/components/<feature>/`       | `PascalCase.tsx`       |
| Service / API integration      | `FineMeMobile/src/services/`                   | `camelCase.ts`         |
| React Context                  | `FineMeMobile/src/contexts/`                    | `XxxContext.tsx`       |
| TypeScript types               | `FineMeMobile/src/types/index.ts`               | Append to existing     |
| Constants                      | `FineMeMobile/src/constants/index.ts`           | Append to existing     |
| Utility function               | `FineMeMobile/src/utils/`                      | `camelCase.ts`         |
| Design tokens                  | `FineMeMobile/src/styles/`                     | `camelCase.ts`         |
| Static asset                   | `FineMeMobile/src/assets/`                     | Appropriate subfolder  |
| Edge Function                  | `FineMeMobile/supabase/functions/<name>/`      | `index.ts` (kebab-case dir) |
| DB migration                  | `FineMeMobile/supabase/migrations/`             | `NNN_description.sql`  |
| Test file                      | Next to the file it tests                      | `<filename>.test.ts`   |
| Web page                       | `web/`                                          | `PascalCase.tsx`       |
| Web API endpoint               | `web/api/`                                      | `camelCase.ts`         |
| Mobile documentation          | `FineMeMobile/docs/`                            | `UPPER_SNAKE.md`       |
| Global documentation          | `docs/`                                         | `UPPER_SNAKE.md`       |

### FORBIDDEN locations — NEVER create files here:
- ❌ Repository root (except `ARCHITECTURE.md`, `README.md`, `.gitignore`, `.env.local`)
- ❌ Directly in `FineMeMobile/` (use `src/` subdirectories)
- ❌ Directly in `FineMeMobile/src/` (use appropriate subdirectory)
- ❌ Directly in `FineMeMobile/src/components/` (use feature subdirectory)

---

## 5. Coding Conventions

### File Naming
| Type | Convention | Example |
|------|------------|---------|
| React component | PascalCase | `StepGoal.tsx`, `HomeTab.tsx`, `Button.tsx` |
| Service / utility | camelCase | `auth.ts`, `midnightReaper.ts`, `haptics.ts` |
| Test file | Same as source + `.test` | `auth.test.ts`, `Button.test.tsx` |
| Edge Function dir | kebab-case | `create-payment-intent/` |
| SQL migration | Numbered | `006_add_social.sql` |

### TypeScript
- ALL code is TypeScript. No `.js` files except `index.js` and `polyfills.js` (RN requirement).
- NEVER use `any`. Use proper types, `unknown`, or generics.
- All shared types in `src/types/index.ts`. If file grows too large, split into `src/types/<domain>.ts` and re-export from `index.ts`.

### Imports
- Relative imports only (`../services/auth`, `./Button`)
- Order: React → third-party → services → components → types → styles

### Components
- Functional components only (no class components)
- One exported component per file
- Props interface in the component file, or in `types/index.ts` if shared across files

### Styling (Mobile)
- `StyleSheet.create()` at the bottom of each component file
- Colors MUST come from `src/styles/colors.ts` — never hardcode hex values

### Styling (Web)
- Inline styles (current pattern)
- Color constants from `web/constants.tsx`

---

## 6. Architecture Patterns

### Data Flow (Mobile)
```
Components (UI) → Services (logic) → Supabase (backend)
     ↕                                      ↕
Contexts (state)                     Edge Functions (server)
```

- **Components** render UI and call services for all data operations
- **Services** encapsulate all Supabase / Stripe / notification calls
- **Contexts** provide global state (currently: auth session only)
- **Edge Functions** handle server-side logic (payments, cron jobs)

### State Management
| What                | Where                          | How                                    |
|---------------------|--------------------------------|----------------------------------------|
| Auth session        | `AuthContext`                  | React Context                          |
| User config         | Component props               | Loaded from Supabase `user_configs`    |
| Daily logs          | Component state               | Fetched from Supabase on demand        |
| Rep count (in-app)  | AsyncStorage                  | Persists across app sessions           |

### Navigation Flow
```
App.tsx
├── SplashScreen (while loading auth)
├── Onboarding (steps 0–15, sequential)
│   Welcome → Login → Name → Goal → Timeline → Referral →
│   Competitors → Differentiation → Mechanism → Science →
│   Charity → Stake → Waive → Effectiveness → Testimonials → Success
└── Dashboard (3 tabs)
    ├── HomeTab ("Today")
    ├── StatsTab ("Stats")
    └── SettingsTab ("Settings") → ProtocolModals
```

---

## 7. Database

### Tables

| Table                  | Purpose                                                   |
|------------------------|-----------------------------------------------------------|
| `user_configs`         | User profile, daily goal, stake, charity, streak, commitment |
| `daily_logs`           | One row per user per day — reps, status (SECURED/FAILED/PENDING) |
| `workout_sessions`     | Individual workout records (time, reps, duration)         |
| `payment_transactions` | Stripe payment history (deposits, refunds)                 |
| `feedback`             | User feedback submissions                                 |
| `device_tokens`        | Push notification device tokens                            |

### Edge Functions

| Function                 | Trigger        | Purpose                              |
|--------------------------|----------------|---------------------------------------|
| `create-payment-intent`  | Client call    | Creates Stripe PaymentIntent          |
| `create-refund`          | Client call    | Processes Stripe refund on stake decrease |
| `midnight-check`         | Cron (midnight)| Marks incomplete days FAILED, forfeits stake |
| `send-10pm-reminder`     | Cron (10 PM)   | Sends push notification warning       |

### Migration Rules
- Migrations are sequential: `NNN_description.sql`
- NEVER modify an existing migration. Always create a new one.
- Next migration number: `006`

---

## 8. Domain Glossary

AI agents MUST understand these terms — they appear throughout the codebase:

| Term                 | Meaning                                                              |
|----------------------|----------------------------------------------------------------------|
| **Stake**            | Money deposited as accountability collateral ($10–$125)              |
| **Midnight Reaper**  | Logic that forfeits stake at midnight if daily goal is unmet        |
| **SECURED**          | Day status: user completed reps, stake is safe                       |
| **FAILED**           | Day status: user missed goal, stake donated to charity               |
| **PENDING**          | Day status: day not yet over                                         |
| **Waive**            | 1 free skip per week, no penalty, reason required                    |
| **The Judge**        | AI pose estimation that counts reps via camera                       |
| **Commitment Period**| How long user committed (Forever / 1 Year / 66 Days / 30 Days)      |
| **Protocol**         | User's settings: daily goal, stake amount, charity, etc.            |

---

## 9. Environment & Secrets

| File                                | Contains                                  | Git-tracked? |
|-------------------------------------|-------------------------------------------|--------------|
| `.env.local` (root or `web/`)       | Web landing page env vars                 | NO           |
| `FineMeMobile/src/config/env.ts`    | Supabase URL, Stripe publishable key, OneSignal ID | YES (publishable keys only) |
| Supabase secrets (CLI)              | Stripe SECRET key, other server secrets  | NO           |

**Rules:**
- NEVER commit secret keys to Git
- Stripe SECRET keys live only in Supabase Edge Function secrets
- Stripe PUBLISHABLE keys are safe on client (designed for it)

---

## 10. Design System (Mobile)

Dark theme. All values from `src/styles/colors.ts`:

```
background:       #000000    surface:          #09090b
surfaceSecondary: #18181b    surfaceTertiary:  #27272a
border:           #27272a    borderSecondary:  #3f3f46
text:             #ffffff    textSecondary:    #a1a1aa
textTertiary:     #71717a    accent:           #bef264
accentHover:      #d9f99d    error:            #ef4444
success:          #22c55e
```

**ALWAYS import from `colors.ts`. NEVER hardcode color values.**

---

## 11. Deployment

| What             | Command / Method                              | Target         |
|------------------|-----------------------------------------------|----------------|
| Web Landing Page | Set Vercel Root Directory to `web`, then `git push` | Vercel         |
| iOS App          | Xcode Archive → App Store Connect             | App Store      |
| Edge Functions   | `supabase functions deploy <name>`            | Supabase Cloud |
| DB Migrations    | `supabase db push` or manual SQL in dashboard  | Supabase Cloud |

**Vercel Root Directory:** Must be set in the dashboard only — **Project → Settings → General → Root Directory** — set to `web`. It cannot be set in `vercel.json` (schema does not allow it).

---

## 12. Testing

### Strategy
Priority order (incremental):
1. **Services first** — `auth.ts`, `database.ts`, `payment.ts`, `midnightReaper.ts`
2. **Utils next** — pure functions in `utils/`
3. **Components later** — complex UI logic (onboarding flow, workout session)

### File Placement
Test files go **next to the file they test**:
```
src/services/auth.ts
src/services/auth.test.ts
```

### Framework
- Jest (already configured in `FineMeMobile/package.json`)
