# LearnFlow – Student Dashboard

🔗 **Live Demo**: [learning-dashboard-supabase-task-wzta-h34rdmnry-manoj16.vercel.app](https://learning-dashboard-supabase-task-wzta-h34rdmnry-manoj16.vercel.app/dashboard)

A futuristic, animated student dashboard built with Next.js 14 App Router, Supabase, Tailwind CSS, and Framer Motion.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS (dark mode, custom tokens)
- **Animations**: Framer Motion (spring physics, stagger, layoutId)
- **Icons**: Lucide React

---

## Architecture Decisions

### Server / Client Component Split

| Layer | Type | Reason |
|---|---|---|
| `app/dashboard/page.tsx` | Server Component | Fetches Supabase data at request time via `getCourses()` |
| `lib/actions/getCourses.ts` | Server-only | Uses `@supabase/ssr` server client with `next/headers` |
| `components/dashboard/BentoGrid.tsx` | Client Component | Drives Framer Motion stagger animations |
| `components/dashboard/CourseCard.tsx` | Client Component | Animated progress bar, hover spring effects |
| `components/layout/Sidebar.tsx` | Client Component | Collapse state, `usePathname`, `layoutId` transitions |
| `components/layout/MobileNav.tsx` | Client Component | `usePathname` for active state |

Data flows server → client: the RSC page fetches courses and passes them as props to the client `BentoGrid`, keeping secrets on the server.

### Animation Strategy (Zero Layout Shift)

- All hover and entrance animations use **transform and opacity only** — no width/height/margin changes that would trigger reflow.
- Spring physics (`type: "spring", stiffness: 300, damping: 20`) used throughout for natural feel.
- Sidebar active highlight uses `layoutId="sidebar-active"` for smooth layout-animated transitions.

### Loading States

- `app/dashboard/loading.tsx` is Next.js's built-in streaming skeleton, automatically shown via React Suspense while the server component resolves.
- Skeleton cards use a CSS shimmer animation (`background-position` keyframe — GPU composited).

---

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run this SQL in the Supabase SQL editor:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null default 'BookOpen',
  created_at timestamptz default now()
);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('TypeScript Deep Dive', 40, 'FileCode'),
  ('System Design Fundamentals', 90, 'Network'),
  ('CSS Architecture & Design', 20, 'Palette');
```

3. Copy your project URL and anon key from Project Settings → API
4. Create `.env.local` and fill in the values from `.env.example`

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`.

---

## Deployment (Vercel)

1. Push to a public GitHub repo
2. Import on [vercel.com](https://vercel.com)
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Never commit `.env.local`. It's in `.gitignore`.
