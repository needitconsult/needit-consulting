import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/ui/page-loader";
import EmailCapture from "@/app/components/EmailCapture";

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
      <body className="min-h-full flex flex-col">
        <PageLoader />
        <EmailCapture />
        {children}
      </body>
    </html>
  );
}
