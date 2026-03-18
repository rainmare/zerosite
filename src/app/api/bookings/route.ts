import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { sendBookingConfirmation } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { SERVICE_TIERS } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(`booking:${ip}`, {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000,
  });

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const {
      sessionId,
      clientName,
      clientEmail,
      date,
      time,
      platform,
      notes,
      honeypot,
    } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!sessionId || !clientName || !clientEmail || !date || !time || !platform) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Verify the Stripe session is paid
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not verified." },
        { status: 403 }
      );
    }

    const tierId = session.metadata?.tierId || "basic";
    const tier = SERVICE_TIERS.find((t) => t.id === tierId);

    // Check slot availability
    const { data: existing } = await getSupabase()
      .from("bookings")
      .select("id")
      .eq("date", date)
      .eq("time", time)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "This time slot is no longer available." },
        { status: 409 }
      );
    }

    const { data: blocked } = await getSupabase()
      .from("blocked_slots")
      .select("id")
      .eq("date", date)
      .eq("time", time)
      .single();

    if (blocked) {
      return NextResponse.json(
        { error: "This time slot is not available." },
        { status: 409 }
      );
    }

    // Create booking
    const { error: insertError } = await getSupabase().from("bookings").insert({
      client_name: clientName,
      client_email: clientEmail,
      service_tier: tierId,
      date,
      time,
      platform,
      notes: notes || null,
      stripe_session_id: sessionId,
    });

    if (insertError) {
      console.error("Booking insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create booking." },
        { status: 500 }
      );
    }

    // Send confirmation emails
    try {
      await sendBookingConfirmation({
        clientName,
        clientEmail,
        serviceTier: tier?.name || "Reading",
        date,
        time,
        platform,
        notes,
      });
    } catch (emailErr) {
      console.error("Email send error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter required." },
      { status: 400 }
    );
  }

  const { data: bookings } = await getSupabase()
    .from("bookings")
    .select("time")
    .eq("date", date);

  const { data: blocked } = await getSupabase()
    .from("blocked_slots")
    .select("time")
    .eq("date", date);

  const bookedTimes = [
    ...(bookings || []).map((b) => b.time),
    ...(blocked || []).map((b) => b.time),
  ];

  return NextResponse.json({ bookedTimes });
}
