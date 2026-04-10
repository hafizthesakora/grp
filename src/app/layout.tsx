import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golden Roots Properties | Secure Land in Ghana",
  description:
    "Litigation-free land investment in Ghana's Central Region. Built for the African diaspora. Transparent, verified, and fully supported from enquiry to ownership.",
  keywords:
    "Ghana land, diaspora land, real estate Ghana, litigation-free land, Golden Roots Properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body className="min-h-screen antialiased">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
