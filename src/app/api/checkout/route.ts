import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { SERVICE_TIERS } from "@/lib/constants";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(`checkout:${ip}`, {
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
    const { tierId } = await req.json();
    const tier = SERVICE_TIERS.find((t) => t.id === tierId);

    if (!tier) {
      return NextResponse.json(
        { error: "Invalid service tier." },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || "";

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tier.name,
              description: tier.description,
            },
            unit_amount: tier.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        tierId: tier.id,
        tierName: tier.name,
      },
      success_url: `${origin}/book?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/services`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
