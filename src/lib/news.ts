import { createClient } from "@supabase/supabase-js";
import { fallbackNews, type NewsItem } from "@/data/news";

type SupabaseRow = {
  id: string | number;
  title: string;
  content: string;
  category: string | null;
  created_at: string | null;
  image_url?: string | null;
  file_url?: string | null;
};

function getSupabaseCredentials() {
  const url =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_PROJECT_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

export async function fetchNews(): Promise<NewsItem[]> {
  const credentials = getSupabaseCredentials();

  if (!credentials) {
    return fallbackNews;
  }

  try {
    const client = createClient(credentials.url, credentials.key, {
      auth: { persistSession: false },
    });

    const { data, error } = await client
      .from("posts")
      .select("id, title, content, category, created_at, image_url, file_url")
      .order("created_at", { ascending: false })
      .limit(24);

    if (error || !data) {
      console.error("Supabase news fetch error:", error?.message);
      return fallbackNews;
    }

    return data.map(mapRowToNewsItem);
  } catch (error) {
    console.error("Supabase client error:", error);
    return fallbackNews;
  }
}

function mapRowToNewsItem(row: SupabaseRow): NewsItem {
  return {
    id: String(row.id),
    title: row.title,
    content: row.content,
    category: row.category ?? "news",
    created_at: row.created_at ?? new Date().toISOString(),
    image_url: row.image_url,
    file_url: row.file_url,
  };
}


