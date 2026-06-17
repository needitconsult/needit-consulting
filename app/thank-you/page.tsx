import Link from "next/link";
import { CheckCircle2, FileText } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "radial-gradient(ellipse 160% 60% at 50% 0%, #ffffff 0%, #f0fdf4 40%, #e8f4f0 100%)" }}>
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">You&apos;re on the list!</h1>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Thanks for signing up. Your free VoIP setup checklists are ready below — save them as PDFs to keep on hand for your next setup.
          </p>

          <div className="flex flex-col gap-3 mb-10">
            <a
              href="/pdf/network-checklist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border-2 border-green-200 hover:border-green-400 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <FileText className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">VoIP Pre-Flight Checklist</p>
                <p className="text-gray-500 text-xs mt-0.5">Everything to verify before touching a cable</p>
              </div>
              <span className="ml-auto text-green-600 font-bold text-sm">Open →</span>
            </a>

            <a
              href="/pdf/call-quality"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border-2 border-green-200 hover:border-green-400 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <FileText className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Call Quality Testing Checklist</p>
                <p className="text-xs text-gray-500 mt-0.5">Run through every test before signing off</p>
              </div>
              <span className="ml-auto text-green-600 font-bold text-sm">Open →</span>
            </a>
          </div>

          <div className="rounded-xl bg-green-50 border border-green-200 p-5 text-left mb-6">
            <p className="text-green-800 font-bold text-sm mb-1">Need help with your VoIP setup?</p>
            <p className="text-green-700 text-sm leading-relaxed">
              NeedIT handles everything remotely — from phone provisioning to SIP credentials. Most setups completed same business day.
            </p>
          </div>

          <Link
            href="/"
            className="text-gray-500 text-sm hover:text-gray-700 transition-colors underline underline-offset-2"
          >
            ← Back to NeedIT Consulting
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
