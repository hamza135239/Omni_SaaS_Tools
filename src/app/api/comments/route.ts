import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const CommentSchema = z.object({
  post_id: z.number().int().positive(),
  author_name: z.string().min(2).max(100),
  author_email: z.string().email().max(254),
  author_url: z.string().url().max(500).optional().or(z.literal("")),
  content: z.string().min(5).max(2000),
});

const commentRateLimit = new Map<string, { count: number; reset: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const entry = commentRateLimit.get(ip);
  if (entry && now < entry.reset && entry.count >= 5) {
    return NextResponse.json({ error: "Too many comments. Please wait before submitting again." }, { status: 429 });
  }
  if (!entry || now > entry.reset) commentRateLimit.set(ip, { count: 1, reset: now + 600000 });
  else entry.count++;

  try {
    const body = await req.json();
    const parse = CommentSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: parse.error.errors[0]?.message ?? "Invalid input" }, { status: 400 });
    }

    const { post_id, author_name, author_email, content, author_url } = parse.data;

    const supabase: any = await createClient();
    const { data: post } = await supabase.from("posts").select("id").eq("id", post_id).eq("status", "published").single();
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const { error } = await supabase.from("comments").insert({
      post_id,
      author_name,
      author_email,
      author_url: author_url || null,
      content,
      status: "pending",
      ip_address: ip,
    });
    if (error) throw error;

    return NextResponse.json({ success: true, message: "Comment submitted for review." }, { status: 201 });
  } catch (err) {
    console.error("Comment error:", err);
    return NextResponse.json({ error: "Failed to submit comment." }, { status: 500 });
  }
}
