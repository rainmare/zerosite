import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { BookingForm } from "@/components/BookingForm";
import { SERVICE_TIERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Your Session",
  description: "Schedule your astrology reading session.",
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function BookPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    redirect("/services");
  }

  let tierName = "Reading";

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      redirect("/services");
    }

    const tierId = session.metadata?.tierId;
    const tier = SERVICE_TIERS.find((t) => t.id === tierId);
    if (tier) {
      tierName = tier.name;
    }
  } catch {
    redirect("/services");
  }

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-3">
            Schedule Your Session
          </p>
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Book Your Reading
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Choose a date, time, and platform that works best for you.
          </p>
        </div>

        <BookingForm sessionId={sessionId} tierName={tierName} />
      </div>
    </section>
  );
}
