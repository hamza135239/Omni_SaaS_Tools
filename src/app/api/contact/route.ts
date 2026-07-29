import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(254),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

const contactRateLimit = new Map<string, { count: number; reset: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const entry = contactRateLimit.get(ip);
  if (entry && now < entry.reset && entry.count >= 3) {
    return NextResponse.json({ error: "Too many submissions. Please wait 10 minutes." }, { status: 429 });
  }
  if (!entry || now > entry.reset) {
    contactRateLimit.set(ip, { count: 1, reset: now + 600000 });
  } else {
    entry.count++;
  }

  try {
    const body = await req.json();
    const parse = ContactSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: parse.error.errors[0]?.message ?? "Invalid input" }, { status: 400 });
    }

    const { name, email, subject, message } = parse.data;
    const supabase: any = await createClient();

    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      subject: subject ?? null,
      message,
      ip_address: ip,
    });

    if (error) throw error;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
