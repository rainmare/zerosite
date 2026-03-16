import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { READER_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about your astrology reader and the journey behind Celestial Pathways.",
};

export default function AboutPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-3">
            The Reader
          </p>
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Meet {READER_NAME}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
            <div className="absolute -inset-2 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent rounded-xl blur-xl" />
            <Image
              src="/wizard.png"
              alt={`${READER_NAME} — Cosmic Astrology Reader`}
              fill
              className="object-cover relative z-10 rounded-xl"
              priority
            />
          </div>

          <div className="space-y-6">
            <p className="text-text-muted leading-relaxed">
              With a deep passion for numerology and astrology, {READER_NAME}{" "}
              has spent years studying the cosmic patterns that shape our lives.
              Through the ancient wisdom of life path numbers, {READER_NAME}{" "}
              helps individuals understand their true purpose and navigate
              life&apos;s challenges with clarity.
            </p>
            <p className="text-text-muted leading-relaxed">
              Every reading is a personal journey — a chance to look beyond the
              surface and discover the deeper forces guiding your path. Whether
              you&apos;re seeking answers about your career, relationships, or
              personal growth, {READER_NAME} provides compassionate, insightful
              guidance rooted in the stars.
            </p>
            <p className="text-text-muted leading-relaxed">
              Sessions are conducted via Google Meet, Zoom, or Discord — whatever
              feels most comfortable for you. Every session is a safe, judgment-free
              space to explore your cosmic blueprint.
            </p>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-block bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 text-sm tracking-wide uppercase"
              >
                Book a Reading
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
