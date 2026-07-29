import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const SubscribeSchema = z.object({
  email: z.string().email("Invalid email address").max(254),
  name: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = SubscribeSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: parse.error.errors[0]?.message ?? "Invalid input" }, { status: 400 });
    }

    const { email, name } = parse.data;
    const supabase: any = await createClient();

    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existing) {
      const sub = existing as { id: number; status: string };
      if (sub.status === "active") {
        return NextResponse.json({ error: "You are already subscribed." }, { status: 409 });
      }
      await supabase
        .from("newsletter_subscribers")
        .update({ status: "active", name: name ?? null, unsubscribed_at: null })
        .eq("id", sub.id);
      return NextResponse.json({ success: true, message: "Welcome back! You have been re-subscribed." });
    }

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      name: name ?? null,
      status: "active",
      confirmed: false,
    });

    if (error) throw error;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
