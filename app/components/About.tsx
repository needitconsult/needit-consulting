"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const credentials = [
  "8+ years VoIP & telecom support",
  "CompTIA Security+",
  "B.S. Cyber Security — Colorado Technical University",
  "Mitel / ShoreTel systems",
  "SIP · SBC · VoIP infrastructure",
  "WireShark · PCAP analysis",
  "IPSec VPN · multi-platform",
];

const stats = [
  { num: "8+",  label: "Years in voice & telecom support" },
  { num: "SME", label: "Subject Matter Expert — not a generalist, not a help desk" },
  { num: "SMB", label: "Focused — small business is who I built NeedIT for" },
  { num: "1",   label: "Point of contact — you talk to me, not a ticket queue" },
];

const expertise = [
  { title: "SIP & VoIP infrastructure",    body: "Session Initiation Protocol, SIP trunking, SBCs, registration troubleshooting" },
  { title: "Mitel / ShoreTel systems",     body: "Administration, configuration, and support across both platforms" },
  { title: "Call quality diagnostics",     body: "Jitter, latency, packet loss — WireShark PCAP analysis to find the real cause" },
  { title: "Network configuration",        body: "QoS, VLANs, firewall rules, SIP ALG, NAT — the stuff that makes or breaks VoIP" },
  { title: "IPSec VPN",                    body: "Multi-platform VPN configuration and remote worker connectivity" },
  { title: "Hosted VoIP platforms",        body: "RingCentral, Nextiva, Ooma, 8x8 — setup, porting, and administration" },
  { title: "Microsoft 365",               body: "Tenant setup, migration, Exchange, Teams — including full M365 tenant migrations" },
  { title: "Cybersecurity fundamentals",   body: "CompTIA Security+ — applied to real SMB environments, not just theory" },
  { title: "Virtual assistant services",   body: "File management, vendor audits, software cleanup, cloud storage optimization" },
  { title: "Hardware recommendations",     body: "Yealink, Poly, Cisco — matched to your actual use case and budget" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">

        {/* ── Hero card ── */}
        <motion.div
          {...fadeUp(0)}
          className="rounded-2xl bg-[#3a3d3a] p-10 mb-8 overflow-hidden relative"
        >
          <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-green-500/10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-green-500/7 pointer-events-none" />
          <p className="text-[10px] tracking-[0.2em] text-green-400 uppercase font-mono mb-4">About NeedIT Consulting LLC</p>
          <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-3">
            Your business runs on<br />
            <strong className="font-medium text-green-400">connections.</strong><br />
            <span className="text-2xl md:text-3xl text-white/70 font-light">We make them work.</span>
          </h2>
          <p className="text-white/50 text-sm mb-6">Founder · IT Consultant · VoIP Specialist · Fredericksburg, VA</p>
          <p className="text-white/85 text-base md:text-lg font-light leading-relaxed border-l-4 border-green-500 pl-5">
            I didn&apos;t learn VoIP from a textbook. I spent over eight years on the front lines — troubleshooting live call quality issues, configuring SIP trunks, diagnosing packet loss at 2am, and rebuilding phone systems that vendors said couldn&apos;t be fixed.
          </p>
        </motion.div>

        {/* ── Credential pills ── */}
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2.5 mb-8">
          {credentials.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-medium text-gray-800">
              <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0" />
              {c}
            </span>
          ))}
        </motion.div>

        {/* ── Stats ── */}
        <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stats.map((s) => (
            <div key={s.num} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-3xl font-medium text-green-600 leading-none">{s.num}</p>
              <p className="text-xs text-gray-500 mt-1.5 leading-snug">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Bio ── */}
        <motion.div {...fadeUp(0.2)} className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <p className="text-[10px] tracking-[0.18em] text-green-600 uppercase font-mono mb-2">The background</p>
          <h3 className="text-xl font-medium text-gray-900 mb-5 leading-snug">I learned this by doing it. Every single part of it.</h3>
          <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
            <p>I started out as someone who solved problems with their hands — diagnosing cars, figuring out why things weren&apos;t working, fixing them. That instinct carried me into IT. While earning my <strong className="font-medium text-gray-800">Bachelor of Science in Cyber Security at Colorado Technical University</strong>, I worked in the college&apos;s own IT department for two years — handling everything from a projector that wouldn&apos;t cooperate mid-lecture to laptops that needed to be completely wiped, reimaged, and rebuilt from scratch. Real problems, real users, real pressure. That&apos;s when I learned IT is problem solving — approaching it from every angle, until the resolution is found.</p>
            <p>When I graduated in 2017, I landed my first VoIP job at a local provider. I&apos;ll be straight with you: I Googled &ldquo;what is VoIP&rdquo; before the interview. I got the job anyway — and spent the first six months not just learning the field, but <strong className="font-medium text-gray-800">building the training program from the ground up</strong>. I was creating the SOPs and video content that would teach every future employee, while simultaneously figuring it all out myself. That experience burned the fundamentals in deep.</p>
            <p>I stayed with that company until 2025 — eight years. I went from tier 1 help desk to overseeing all client accounts as a manager. Along the way I worked through every layer of VoIP infrastructure: SIP trunking, SBCs, call quality diagnostics, WireShark packet analysis, IPSec VPNs, Mitel and ShoreTel systems. Every escalation that came across my desk made me better.</p>
            <p>I also hold a <strong className="font-medium text-gray-800">CompTIA Security+</strong> — because in this field, knowing how systems work and knowing how they fail are the same conversation. NeedIT was built on everything those eight years taught me, built specifically for the small businesses I watched get underserved the entire time.</p>
          </div>
        </motion.div>

        {/* ── Quote ── */}
        <motion.div {...fadeUp(0.22)} className="bg-[#3a3d3a] rounded-2xl border-l-4 border-green-500 p-8 mb-6">
          <p className="text-white/88 text-base md:text-lg font-light italic leading-relaxed">
            &ldquo;Most small businesses are overpaying for phone systems they don&apos;t understand, set up by vendors who moved on the moment the invoice was paid. My job is to change that — give you a system that actually fits your business, explain it so you own it, and be there when something goes wrong.&rdquo;
          </p>
        </motion.div>

        {/* ── Why NeedIT ── */}
        <motion.div {...fadeUp(0.24)} className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <p className="text-[10px] tracking-[0.18em] text-green-600 uppercase font-mono mb-2">Why NeedIT exists</p>
          <h3 className="text-xl font-medium text-gray-900 mb-5 leading-snug">Small businesses deserve subject matter expertise.</h3>
          <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
            <p>I started NeedIT Consulting because I kept seeing the same thing: small and mid-size businesses stuck with phone systems that half-worked, IT problems that nobody would take ownership of, and vendor relationships that only went one direction. The big providers didn&apos;t have time for a 10-person office. The local generalist didn&apos;t have the depth to solve the hard problems.</p>
            <p>NeedIT fills that gap. Based in <strong className="font-medium text-gray-800">Fredericksburg, VA</strong> and serving businesses across the country, I bring SME-level technical knowledge to businesses that don&apos;t have an enterprise IT budget. Whether you need a VoIP system built from scratch, an existing phone system that actually starts working right, or an IT partner who handles the day-to-day so you can run your business — that&apos;s what I do.</p>
            <p>You work with me directly. Not a helpdesk. Not a rotating cast of technicians who have to re-learn your setup every time. One consultant who knows your environment, tracks your vendors, and gives you a straight answer.</p>
          </div>
        </motion.div>

        {/* ── Expertise grid ── */}
        <motion.div {...fadeUp(0.26)} className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <p className="text-[10px] tracking-[0.18em] text-green-600 uppercase font-mono mb-2">What I actually know</p>
          <h3 className="text-xl font-medium text-gray-900 mb-5 leading-snug">The technical depth behind the service.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {expertise.map((e) => (
              <div key={e.title} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0 mt-1.5" />
                <p className="text-xs text-gray-500 leading-snug">
                  <strong className="font-medium text-gray-800 block mb-0.5">{e.title}</strong>
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Diagnose ── */}
        <motion.div {...fadeUp(0.28)} className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <p className="text-[10px] tracking-[0.18em] text-green-600 uppercase font-mono mb-2">What makes this different</p>
          <h3 className="text-xl font-medium text-gray-900 mb-5 leading-snug">I don&apos;t guess. I diagnose.</h3>
          <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
            <p>When something goes wrong with your phone system, most IT generalists start with a Google search. I start with the packet capture. I&apos;ve spent years reading SIP traces, identifying the exact point of failure in a call flow, and knowing when the problem is yours versus your carrier&apos;s — and being able to prove it to both sides.</p>
            <p>That diagnostic mindset applies to everything NeedIT does. Before I recommend a product, I understand the use case. Before I configure a system, I audit the network. Before I close a ticket, I verify the fix held. This isn&apos;t a help desk — it&apos;s a consulting practice built on the idea that understanding the problem completely is 80% of solving it.</p>
            <p>If you&apos;ve been told &ldquo;it&apos;s your internet&rdquo; one too many times without anyone proving it, or you&apos;ve had a VoIP system installed that never quite worked right, or you just want someone who will pick up the phone and actually know what they&apos;re talking about — that&apos;s what NeedIT is here for.</p>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div {...fadeUp(0.3)} className="bg-green-600 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-medium text-white mb-2">Ready to work with someone who actually knows this stuff?</h3>
          <p className="text-white/75 text-sm mb-6 leading-relaxed">Free 15-minute consultation. No sales pitch — just a straight conversation about what you need and whether NeedIT is the right fit.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-green-700 text-sm font-medium px-7 py-2.5 rounded-full hover:bg-green-50 transition-colors"
            >
              Book a free consultation
            </button>
            <Link
              href="/#services"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-transparent text-white text-sm px-7 py-2.5 rounded-full border border-white/50 hover:bg-white/10 transition-colors"
            >
              See all services →
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
