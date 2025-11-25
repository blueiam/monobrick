## MONOBRICK Gallery

Next.js (App Router) site used to present MONOBRICK’s artwork catalog, news feed, and studio information. The UI ships with an artwork filter, Supabase-powered newsroom, and static About page that highlights contact + residency details.

### Stack

- **Next.js 15 + React** with the App Router and server components  
- **Supabase** for news posts (gracefully falls back to demo data when env vars are missing)  
- **Tailwind** through the new `@import "tailwindcss"` pipeline  
- **Vercel** for hosting/build/preview, backed by **GitHub** source control

### Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Environment variables

Create a `.env.local` file and set the Supabase credentials that expose the `posts` table:

```bash
SUPABASE_URL="https://xyzcompany.supabase.co"
SUPABASE_ANON_KEY="public-anon-key"
```

The News page (`/news`) queries `id, title, content, category, created_at, image_url, file_url` from the `posts` table and sorts by `created_at` descending. When the variables are missing or the query fails, the fallback editorial entries in `src/data/news.ts` are used so the UI never breaks.

### GitHub → Vercel workflow

1. Create a new GitHub repo and push this folder (`main` branch).  
2. In Vercel, click **Import Project → GitHub → monobrick**.  
3. Add the Supabase env vars under *Settings → Environment Variables* (Production + Preview).  
4. Trigger the initial build; Vercel will automatically provision preview URLs for every pull request.  
5. Protect `main` on GitHub so changes flow through PR review before deployment.

### Connecting Supabase

1. In Supabase, create a new project and add a `posts` table with columns:
   - `id` (bigint, auto increment)
   - `created_at` (timestamp with time zone, default `now()`)
   - `title` (text)
   - `content` (text)
   - `category` (text)
   - `image_url` (text, optional)
   - `file_url` (text, optional for downloads/press kits)
2. Insert initial rows via the Table Editor or SQL insert statements.
3. Copy the **Project URL** and **anon public key** into `.env.local` (and Vercel).  
4. Deploy — the News route will now render live data within ~60 seconds because of ISR (`revalidate = 60`).

### Project structure

- `src/app/page.tsx` – Hero + artwork gallery with filter UI  
- `src/app/news/page.tsx` – Server component that calls Supabase (`src/lib/news.ts`)  
- `src/app/about/page.tsx` – Static gallery overview, visit info  
- `src/components` – Header, footer, gallery, feature modules  
- `src/data` – Artwork seeds + fallback news entries

### Useful scripts

```bash
npm run dev      # local development
npm run build    # production build check
npm run lint     # lint using eslint config
```

### Deployment checklist

- [ ] Supabase table + env vars configured  
- [ ] GitHub repo connected to Vercel  
- [ ] `npm run lint` + `npm run build` succeed locally  
- [ ] Optional: add `SUPABASE_SERVICE_ROLE_KEY` as a Vercel Secret for server-only admin tasks

