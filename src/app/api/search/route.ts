import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const rateLimitMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string, limit = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + windowMs });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }
  if (q.length > 100) {
    return NextResponse.json({ error: "Query too long" }, { status: 400 });
  }

  const supabase: any = await createClient();
  const { data, error } = await supabase.rpc("search_posts", { search_term: q });

  if (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] });
  }

  const results = ((data as any[]) ?? []).slice(0, 20);
  return NextResponse.json(
    { results },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
