import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EnterScreen } from "@/components/EnterScreen";
import { StarField } from "@/components/StarField";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/NotificationProvider";
import { AudioProvider } from "@/components/AudioProvider";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cinzelDecorative.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg text-text font-body">
        <AuthProvider>
          <AudioProvider>
          <NotificationProvider>
            <StarField />
            <EnterScreen>
              <div className="relative z-10">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </EnterScreen>
          </NotificationProvider>
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
