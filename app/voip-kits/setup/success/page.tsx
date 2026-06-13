"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function SetupSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "radial-gradient(ellipse 160% 60% at 50% 0%, #ffffff 0%, #f0fdf4 40%, #e8f4f0 100%)" }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center rounded-3xl p-10"
          style={{ background: "#ffffff", border: "2px solid #bbf7d0", boxShadow: "0 8px 40px rgba(22,163,74,0.12)" }}
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">You&apos;re all set!</h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Payment confirmed. Check your email — your receipt and next steps are on the way from NeedIT Consulting.
          </p>
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 mb-6 flex items-start gap-3 text-left">
            <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 text-sm leading-relaxed">
              <strong>Setup service customers:</strong> expect a scheduling email within one business day. We&apos;ll coordinate directly with you to complete your setup.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/voip-kits"
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-colors text-center"
            >
              Back to VoIP Kits
            </Link>
            <Link
              href="/#contact"
              className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors text-center"
            >
              Contact NeedIT
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
