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
   - `id` (bigint, auto increment, primary key)
   - `created_at` (timestamp with time zone, default `now()`)
   - `title` (text)
   - `content` (text)
   - `category` (text)
   - `image_url` (text, optional)
   - `file_url` (text, optional for downloads/press kits)

2. **Enable Row Level Security (RLS) and set policies** (Supabase SQL Editor):
   ```sql
   -- Enable RLS on posts table
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

   -- Drop existing policies if they exist (to avoid conflicts)
   DROP POLICY IF EXISTS "Allow public reads" ON posts;
   DROP POLICY IF EXISTS "Allow authenticated insert" ON posts;
   DROP POLICY IF EXISTS "Allow authenticated update" ON posts;
   DROP POLICY IF EXISTS "Allow authenticated delete" ON posts;

   -- Allow public read access
   CREATE POLICY "Allow public reads" ON posts
   FOR SELECT
   TO public
   USING (true);

   -- Allow authenticated users to insert
   CREATE POLICY "Allow authenticated insert" ON posts
   FOR INSERT
   TO authenticated
   WITH CHECK (true);

   -- Allow authenticated users to update
   CREATE POLICY "Allow authenticated update" ON posts
   FOR UPDATE
   TO authenticated
   USING (true)
   WITH CHECK (true);

   -- Allow authenticated users to delete
   CREATE POLICY "Allow authenticated delete" ON posts
   FOR DELETE
   TO authenticated
   USING (true);
   ```

3. Insert initial rows via the Table Editor or SQL insert statements.
4. Copy the **Project URL** and **anon public key** into `.env.local` (and Vercel).  
5. Deploy — the News route will now render live data within ~60 seconds because of ISR (`revalidate = 60`).

### Admin Panel

The site includes a full admin panel for managing news posts:

1. **Login**: Navigate to `/admin/login` and sign in with your Supabase Auth credentials
2. **News Management**: Access `/admin/news` to create, edit, and delete posts
3. **File Uploads**: Upload images and PDF files directly through the admin interface

**Setting up Supabase Storage for file uploads:**

1. In Supabase Dashboard, go to **Storage**
2. Create two buckets:
   - `news_images` (public, for news post images)
   - `news_files` (public, for PDF attachments)
3. Set bucket policies to allow authenticated users to upload (Supabase SQL Editor):
   ```sql
   -- Drop existing storage policies if they exist
   DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
   DROP POLICY IF EXISTS "Allow authenticated uploads images" ON storage.objects;
   DROP POLICY IF EXISTS "Allow authenticated uploads files" ON storage.objects;
   DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
   DROP POLICY IF EXISTS "Allow public reads images" ON storage.objects;
   DROP POLICY IF EXISTS "Allow public reads files" ON storage.objects;
   
   -- Allow authenticated users to upload to news_images
   CREATE POLICY "Allow authenticated uploads images" ON storage.objects
   FOR INSERT TO authenticated
   WITH CHECK (bucket_id = 'news_images');
   
   -- Allow authenticated users to upload to news_files
   CREATE POLICY "Allow authenticated uploads files" ON storage.objects
   FOR INSERT TO authenticated
   WITH CHECK (bucket_id = 'news_files');
   
   -- Allow public read access to news_images
   CREATE POLICY "Allow public reads images" ON storage.objects
   FOR SELECT TO public
   USING (bucket_id = 'news_images');
   
   -- Allow public read access to news_files
   CREATE POLICY "Allow public reads files" ON storage.objects
   FOR SELECT TO public
   USING (bucket_id = 'news_files');
   
   -- Allow authenticated users to update/delete their own files
   CREATE POLICY "Allow authenticated update storage" ON storage.objects
   FOR UPDATE TO authenticated
   USING (bucket_id = 'news_images' OR bucket_id = 'news_files');
   
   CREATE POLICY "Allow authenticated delete storage" ON storage.objects
   FOR DELETE TO authenticated
   USING (bucket_id = 'news_images' OR bucket_id = 'news_files');
   ```

**Important: Verify your RLS policies are active:**
- Go to Supabase Dashboard → **Authentication** → **Policies**
- Or run this SQL to check existing policies:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'posts';
   ```

### Project structure

- `src/app/page.tsx` – Hero + artwork gallery with filter UI  
- `src/app/news/page.tsx` – Server component that calls Supabase (`src/lib/news.ts`)  
- `src/app/about/page.tsx` – Static gallery overview, visit info  
- `src/app/admin/` – Admin panel (login, news management)  
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

