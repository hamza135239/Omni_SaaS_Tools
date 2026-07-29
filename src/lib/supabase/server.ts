import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

/**
 * Supabase client for Server Components & Route Handlers with cookie access
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Safe to ignore from Server Components
          }
        },
      },
    }
  );
}

/**
 * Supabase client for static site generation (generateStaticParams, sitemap, etc.)
 * Does NOT access cookies() — safe to call at build time!
 */
export function createStaticClient() {
  return createSupabaseClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}

/**
 * Supabase admin client using service role key
 * Server-only
 */
export async function createAdminClient() {
  return createSupabaseClient<Database>(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}
