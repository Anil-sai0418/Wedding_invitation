import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  Cormorant,
  Crimson_Pro,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const greatVibes = Great_Vibes({ variable: "--font-great-vibes", subsets: ["latin"], weight: "400" });
const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Priya & Arjun | Moonlit Jasmine Wedding",
  description: "A premium South Indian wedding invitation experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${greatVibes.variable} ${crimson.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-marble text-inkstone font-body">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
