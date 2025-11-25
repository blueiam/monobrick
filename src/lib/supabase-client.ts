import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getSupabaseCredentials() {
  // Client-side code must use NEXT_PUBLIC_ prefix
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
    );
  }

  return { url, key };
}

// Singleton pattern to avoid multiple client instances
let supabaseClient: SupabaseClient | null = null;

export function createSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const { url, key } = getSupabaseCredentials();
  supabaseClient = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'sb-auth-token',
    },
  });
  
  return supabaseClient;
}

