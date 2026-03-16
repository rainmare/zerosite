import { SERVICE_TIERS } from "@/lib/constants";
import { ServicesContent } from "@/components/ServicesContent";

export const metadata = {
  title: "Services",
  description:
    "Choose from our astrology reading packages — Basic, Full, or the complete Knowledge Bundle.",
};

export default function ServicesPage() {
  return <ServicesContent tiers={SERVICE_TIERS} />;
}
