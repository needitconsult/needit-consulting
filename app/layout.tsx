import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeedIT Consulting | Smarter IT for Your Business",
  description:
    "NeedIT Consulting delivers tailored cybersecurity, cloud solutions, managed IT services, and network infrastructure for businesses that can't afford downtime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0f0a]">{children}</body>
    </html>
  );
}
