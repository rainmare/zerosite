export const SITE_NAME = "irido.space";
export const SITE_DESCRIPTION =
  "Personalized numerology readings to help you understand your life path, strengths, and direction.";
export const READER_NAME = "Zero";

export type ServiceTier = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  stripePriceId: string;
};

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "basic",
    name: "Basic Reading",
    price: 33,
    description:
      "A live one-on-one session where Zero breaks down your life path number and gives you a detailed, personalized reading.",
    features: [
      "Live video call with Zero",
      "Life path number calculation & explanation",
      "Personality and strengths breakdown",
      "Honest, straightforward guidance",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC || "",
  },
  {
    id: "full",
    name: "Full Reading",
    price: 66,
    description:
      "A longer session covering your full numerology chart — life path, expression, soul urge, and how they connect to your real life.",
    features: [
      "Everything in Basic Reading",
      "Full numerology chart breakdown",
      "Life cycles & turning points",
      "Career & relationship insights",
      "30-minute live session",
    ],
    popular: true,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL || "",
  },
  {
    id: "bundle",
    name: "Knowledge Bundle",
    price: 111,
    description:
      "The full package — an in-depth reading, a written report you keep, and ongoing support to help you actually apply what you learn.",
    features: [
      "Everything in Full Reading",
      "Detailed written report (10+ pages)",
      "Practical advice & action steps",
      "Yearly forecast breakdown",
      "60-minute live session",
      "30 days of follow-up support",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUNDLE || "",
  },
];

export const PLATFORMS = [
  { id: "google-meet", name: "Google Meet", icon: "video" },
  { id: "zoom", name: "Zoom", icon: "video" },
  { id: "discord", name: "Discord", icon: "headphones" },
] as const;

export type Platform = (typeof PLATFORMS)[number]["id"];
