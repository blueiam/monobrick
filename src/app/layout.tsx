import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MONOBRICK Gallery",
  description:
    "A contemporary art space exploring kinetic sculpture, experimental fabrication, and future craft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} bg-stone-950 text-white`}>
        <SiteHeader transparent />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
