"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProductItem = {
  role: string;
  name: string;
  why: string;
  price: string;
  image?: string;
  links: { label: string; href: string; placeholder?: boolean }[];
};

type CableItem = {
  cat: string;
  role: string;
  name: string;
  why: string;
  price: string;
  links: { label: string; href: string; placeholder?: boolean }[];
};

type KitData = {
  key: string;
  title: string;
  tagline: string;
  hw_cost: string;
  description: string;
  use_cases: string[];
  platform: { name: string; why: string; price: string };
  phones: ProductItem[];
  headsets: ProductItem[];
  cables: CableItem[];
  budget_tip?: string;
  cta: { title: string; body: string; link: string };
};

// ─── Kit data (v2) ────────────────────────────────────────────────────────────

const KITS: KitData[] = [
  {
    key: "solo",
    title: "Solo operator starter kit",
    tagline: "One person. One great phone. Zero hassle.",
    hw_cost: "$130–$200 complete",
    description: "Perfect for solo consultants, home-based businesses, realtors, or anyone replacing a personal cell with a professional business line.",
    use_cases: ["Home office", "Solo consultant", "Real estate", "Freelancer"],
    platform: { name: "Ooma Office", why: "Lowest monthly cost for 1–2 users, includes a local business number, works with any Yealink phone.", price: "from $19.95/mo" },
    phones: [
      {
        role: "Primary desk phone",
        name: "Yealink T33G",
        why: "Best entry-level Yealink. Color screen, 4 lines, PoE powered, works with every major hosted VoIP platform out of the box.",
        price: "~$65–$80",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B08DKQF84N/" },
        ],
      },
    ],
    headsets: [
      {
        role: "Wired headset — best value",
        name: "Yealink YHS36",
        why: "RJ9 plug goes directly into T33G, no adapter. Noise canceling mic. Best pick for 2+ hours of calls per day.",
        price: "~$30–$45",
        image: "https://m.media-amazon.com/images/I/51Vpgu77WML._AC_SX679_.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B01LZFC6CC/" },
        ],
      },
    ],
    cables: [
      {
        cat: "CAT CABLE",
        role: "Desk phone to router/switch",
        name: "Cable Matters Cat6 Snagless — 10 ft",
        why: "The go-to for short desk runs. Pure copper, snagless boot, 10 Gbps rated. One per phone. Buy a 2-pack to have a spare.",
        price: "~$8–$12",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=Cable+Matters+Cat6+snagless+10ft" },
        ],
      },
      {
        cat: "USB-C ADAPTER",
        role: "Laptop without ethernet port",
        name: "TP-Link UE300C USB-C to Gigabit",
        why: "Plug-and-play, no drivers, foldable design. Works on MacBook, Dell XPS, Surface. Needed if your laptop has no RJ45 port for softphone use.",
        price: "~$15–$20",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=TP-Link+UE300C+USB-C+ethernet" },
        ],
      },
      {
        cat: "USB-A ADAPTER",
        role: "Older laptop / desktop",
        name: "UGREEN USB 3.0 to Gigabit Ethernet",
        why: "Driver-free, 1 Gbps, aluminum shell. Compatible with Windows, Mac, Linux, ChromeOS. The reliable budget pick for USB-A ports.",
        price: "~$12–$18",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=UGREEN+USB+3.0+gigabit+ethernet+adapter" },
        ],
      },
    ],
    cta: {
      title: "Want this configured and ready to go?",
      body: "NeedIT handles remote provisioning — SIP credentials, ringtone setup, and call routing. Typical turnaround: same business day.",
      link: "Get setup help from NeedIT →",
    },
  },

  {
    key: "small",
    title: "Small office kit (3–5 users)",
    tagline: "A real phone system — without the PBX price tag.",
    hw_cost: "$500–$800 complete for 5 users",
    description: "The most common setup NeedIT deploys. Reliable desk phones for each employee, a conference room phone, and all cabling covered.",
    use_cases: ["Medical office", "Law firm", "Accounting", "Retail back office"],
    platform: { name: "Nextiva or RingCentral", why: "Both support multi-user admin, auto-attendant, call routing, and voicemail-to-email. Nextiva for SMB support; RingCentral for deeper integrations.", price: "from $25–$35/user/mo" },
    phones: [
      {
        role: "Standard employee phone (per seat)",
        name: "Yealink T33G",
        why: "Best value in the lineup. PoE means one cable per desk. Buy one per employee. Supports Yealink bulk device management.",
        price: "~$65–$80 per unit",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B08DKQF84N/" },
        ],
      },
      {
        role: "Manager / receptionist phone",
        name: "Yealink T46U",
        why: "16 line keys, USB for wired headsets, larger color display. Perfect for anyone who transfers calls or monitors multiple extensions.",
        price: "~$100–$130",
        image: "https://images-na.ssl-images-amazon.com/images/P/B08FF4XD5L.01.LZZZZZZZ.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B08GCJTTWK/" },
        ],
      },
      {
        role: "Conference room",
        name: "Yealink CP925",
        why: "7-mic array, 20-ft pickup, Wi-Fi + Bluetooth, stain-resistant fabric. Best conference phone under $300.",
        price: "~$220–$280",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B09KVJJ6S7/" },
        ],
      },
    ],
    headsets: [
      {
        role: "Wired — standard employee",
        name: "Yealink YHS36",
        why: "Plug straight into any T33G or T46U via RJ9. No adapter needed. Cost-effective for outfitting a full team.",
        price: "~$30–$45 per unit",
        image: "https://m.media-amazon.com/images/I/51Vpgu77WML._AC_SX679_.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B01LZFC6CC/" },
        ],
      },
      {
        role: "Wireless — manager / power user",
        name: "Yealink WH62 DECT",
        why: "525-ft range, 13-hr talk time, dual noise-canceling mics. Connects to desk phone AND laptop simultaneously. Teams certified.",
        price: "~$130–$160",
        image: "/headset.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B0BFF1Z9DN/" },
        ],
      },
    ],
    cables: [
      {
        cat: "CAT CABLE — PATCH",
        role: "Desk phone to wall jack or switch (per desk)",
        name: "Cable Matters Cat6 Snagless — 10 ft (5-pack)",
        why: "Buy a 5-pack to cover every desk in one order. Pure copper, snagless, color-code by department if desired. One per phone + one spare.",
        price: "~$20–$28 for 5-pack",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=Cable+Matters+Cat6+snagless+10ft+5+pack" },
        ],
      },
      {
        cat: "CAT CABLE — LONG RUN",
        role: "Router/switch to remote desk or conference room",
        name: "Amazon Basics Cat6 — 25 ft or 50 ft",
        why: "For longer runs between rooms. Pure copper, snagless RJ45. Reliable and budget-friendly for in-office infrastructure.",
        price: "~$12–$20",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=Amazon+Basics+Cat6+ethernet+cable+25ft" },
        ],
      },
      {
        cat: "USB-C ADAPTER",
        role: "Modern laptops without ethernet port",
        name: "TP-Link UE300C USB-C to Gigabit",
        why: "Plug-and-play, no drivers, foldable design. Works on MacBook, Dell XPS, Surface. Buy one per laptop user who needs a wired softphone connection.",
        price: "~$15–$20",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=TP-Link+UE300C+USB-C+ethernet" },
        ],
      },
      {
        cat: "USB-A ADAPTER",
        role: "Older laptops / desktops",
        name: "UGREEN USB 3.0 to Gigabit Ethernet",
        why: "Driver-free, 1 Gbps, aluminum shell. Compatible with Windows, Mac, Linux. Solid pick for staff on older machines.",
        price: "~$12–$18",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=UGREEN+USB+3.0+gigabit+ethernet+adapter" },
        ],
      },
    ],
    cta: {
      title: "NeedIT sets up the whole office.",
      body: "We provision all phones, configure your auto-attendant, set up voicemail-to-email, and test every extension. Remote setup available.",
      link: "Get a setup quote from NeedIT →",
    },
  },

  {
    key: "remote",
    title: "Remote worker kit",
    tagline: "Work-from-anywhere calling that actually works.",
    hw_cost: "$220–$310 complete",
    description: "Built for employees working from home or a satellite office. Wi-Fi phone plus wireless headset for freedom of movement. Fully remote provisioning.",
    use_cases: ["Work from home", "Remote employee", "Satellite office"],
    platform: { name: "RingCentral or Grasshopper", why: "RingCentral for teams needing full UC features. Grasshopper for solo remote workers who just want a business number.", price: "from $15–$30/mo" },
    phones: [
      {
        role: "Wi-Fi desk phone",
        name: "Yealink T34W",
        why: "Dual-band 2.4G/5G Wi-Fi — no Ethernet cable needed. TLS 1.3 + WPA3 security. Perfect for home offices without a network drop at the desk.",
        price: "~$80–$100",
        image: "/t34w.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B0CPKBWGHR/" },
        ],
      },
    ],
    headsets: [
      {
        role: "Wireless — primary recommendation",
        name: "Yealink WH62 DECT",
        why: "525-ft DECT range, 13-hr talk time. Connects to desk phone AND PC simultaneously — one headset handles everything. No Bluetooth dropouts.",
        price: "~$130–$160",
        image: "/headset.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B0BFF1Z9DN/" },
        ],
      },
      {
        role: "Budget wired option",
        name: "Yealink YHS36",
        why: "If wireless isn't needed, the YHS36 is the no-fuss wired option. Plugs directly into T34W USB port or RJ9 jack. Noise canceling mic.",
        price: "~$30–$45",
        image: "https://m.media-amazon.com/images/I/51Vpgu77WML._AC_SX679_.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B01LZFC6CC/" },
        ],
      },
    ],
    cables: [
      {
        cat: "CAT CABLE — OPTIONAL",
        role: "If wired connection preferred over Wi-Fi",
        name: "Cable Matters Cat6 — 15 ft or 25 ft",
        why: "Even with a Wi-Fi phone, a wired connection is always more reliable. If the home office has a nearby ethernet port, use it. Cat6 for VoIP is overkill-proof.",
        price: "~$10–$15",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=Cable+Matters+Cat6+ethernet+15ft" },
        ],
      },
      {
        cat: "USB-C ADAPTER",
        role: "Laptop softphone — wired connection",
        name: "TP-Link UE300C USB-C to Gigabit",
        why: "For remote workers using a laptop as their softphone. Plug-and-play, no drivers needed. Foldable and travel-friendly. A wired connection beats Wi-Fi every time for calls.",
        price: "~$15–$20",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=TP-Link+UE300C+USB-C+ethernet" },
        ],
      },
      {
        cat: "USB-A ADAPTER",
        role: "Older home office laptop",
        name: "UGREEN USB 3.0 to Gigabit Ethernet",
        why: "Driver-free, works on Windows/Mac/Linux. For remote workers whose laptop predates USB-C. Gigabit speeds, aluminum build.",
        price: "~$12–$18",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=UGREEN+USB+3.0+gigabit+ethernet+adapter" },
        ],
      },
    ],
    cta: {
      title: "Remote setup — no IT visit required.",
      body: "NeedIT provisions remote phones 100% remotely. We coordinate with your provider, push the config, and test it live. Most setups under an hour.",
      link: "Schedule a remote setup →",
    },
  },

  {
    key: "reception",
    title: "Front desk / receptionist kit",
    tagline: "Handle every call like a pro — even on your busiest day.",
    hw_cost: "$310–$430 complete",
    description: "Designed for the first voice clients hear. High line-count phone, wireless headset for mobility, and full cabling to keep the desk clean.",
    use_cases: ["Medical front desk", "Law office", "Salon / spa", "Property mgmt"],
    platform: { name: "Nextiva", why: "Auto-attendant, call queuing, and hold music best-in-class for a busy front desk. SMB-focused support means faster help.", price: "from $25/user/mo" },
    phones: [
      {
        role: "Primary receptionist phone",
        name: "Yealink T54W",
        why: "16 programmable line keys — monitor every extension at a glance. Wi-Fi + Bluetooth built in. 4.3-inch color screen easy to read while multitasking.",
        price: "~$145–$185",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B07ND62JJM/" },
        ],
      },
    ],
    headsets: [
      {
        role: "Wireless — primary recommendation",
        name: "Yealink WH62 DECT",
        why: "525-ft range lets the receptionist move freely while staying on the call. Check on a patient, grab a document — without putting anyone on hold.",
        price: "~$130–$160",
        image: "/headset.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B0BFF1Z9DN/" },
        ],
      },
      {
        role: "Wired backup / budget option",
        name: "Yealink YHS36",
        why: "Reliable wired fallback. Plugs directly into the T54W RJ9 jack. Good to keep a spare at the front desk.",
        price: "~$30–$45",
        image: "https://m.media-amazon.com/images/I/51Vpgu77WML._AC_SX679_.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B01LZFC6CC/" },
        ],
      },
    ],
    cables: [
      {
        cat: "CAT CABLE — DESK RUN",
        role: "Phone to wall jack (keep desk clean)",
        name: "Cable Matters Cat6 Flat — 10 ft",
        why: "Flat cables hug the baseboard or run under desk mats cleanly — ideal for a tidy front desk appearance. Color choices available to match décor.",
        price: "~$8–$12",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=Cable+Matters+flat+cat6+10ft" },
        ],
      },
      {
        cat: "CAT CABLE — LONG RUN",
        role: "Back office to front desk run",
        name: "Amazon Basics Cat6 — 50 ft",
        why: "For front desks that need a long run from the networking closet. Pure copper, snagless, highly rated. Route along baseboards or ceiling.",
        price: "~$15–$20",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=Amazon+Basics+Cat6+50ft+ethernet" },
        ],
      },
      {
        cat: "USB-C ADAPTER",
        role: "Front desk computer / check-in tablet",
        name: "Amazon Basics USB-C to RJ45 Gigabit",
        why: "Compact, plug-and-play, aluminum build. For front desk computers or tablets that need a wired ethernet connection for reliable softphone or PMS access.",
        price: "~$12–$18",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B08989MYQ2/" },
        ],
      },
    ],
    cta: {
      title: "Get your call routing set up right the first time.",
      body: "NeedIT configures auto-attendant, hold music, call queues, and the extension directory. We train your receptionist on the features that save the most time.",
      link: "Book a receptionist setup with NeedIT →",
    },
  },

  {
    key: "conf",
    title: "Conference room upgrade kit",
    tagline: "No more huddling around a tin-can speakerphone.",
    hw_cost: "$250–$480 depending on room size",
    description: "A standalone conference room audio upgrade that works with any existing VoIP system. Optional expansion mics for larger rooms.",
    use_cases: ["Conference room", "Huddle room", "Board room", "Training room"],
    platform: { name: "Works with any existing VoIP platform", why: "CP925 is SIP-based — compatible with RingCentral, Nextiva, Ooma, 8x8, Vonage, and most hosted PBX systems.", price: "No added service cost if already on VoIP" },
    phones: [
      {
        role: "Conference room speakerphone",
        name: "Yealink CP925",
        why: "7-mic array, 20-ft pickup, Wi-Fi + Bluetooth, stain-resistant fabric. Everyone at the table is heard. Best value conference phone under $300.",
        price: "~$220–$280",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B09KVJJ6S7/" },
        ],
      },
    ],
    headsets: [
      {
        role: "Individual participant headset option",
        name: "Yealink YHS36 Wired",
        why: "For hybrid meetings where one in-room participant wants private audio. Plugs directly into the CP925 or a softphone laptop via adapter.",
        price: "~$30–$45",
        image: "https://m.media-amazon.com/images/I/51Vpgu77WML._AC_SX679_.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B01LZFC6CC/" },
        ],
      },
    ],
    cables: [
      {
        cat: "CAT CABLE — TABLE RUN",
        role: "Conference phone to wall jack",
        name: "Cable Matters Cat6 — 15 ft or 25 ft",
        why: "Route from the conference table center to the nearest wall jack. If CP925 uses Wi-Fi, skip this — but wired always gives better call stability.",
        price: "~$10–$15",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=Cable+Matters+Cat6+25ft+snagless" },
        ],
      },
      {
        cat: "USB-C ADAPTER",
        role: "Laptop brought into meeting room",
        name: "TP-Link UE300C USB-C to Gigabit",
        why: "Keep one in the conference room for visiting laptops. Plug in, no drivers, instant wired connection. Prevents reliance on spotty conference room Wi-Fi during calls.",
        price: "~$15–$20",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=TP-Link+UE300C+USB-C+ethernet" },
        ],
      },
    ],
    cta: {
      title: "Conference room setup — done right.",
      body: "NeedIT handles SIP registration, codec config, and acoustic testing. We make sure your room extension is in the company directory and dial plan.",
      link: "Get your conference room set up →",
    },
  },

  {
    key: "budget",
    title: "Budget-conscious starter kit",
    tagline: "Professional VoIP at the lowest possible entry cost.",
    hw_cost: "$90–$130 complete",
    description: "For businesses getting off cell phones and looking professional — without spending a lot. One desk phone, softphone apps on existing devices, and a budget VoIP plan.",
    use_cases: ["Startup", "Side business", "Sole proprietor", "New storefront"],
    platform: { name: "Ooma Office or Grasshopper", why: "Ooma for most affordable full features at 1–3 users. Grasshopper if you just need a business number on your cell.", price: "from $19.95–$29/mo" },
    phones: [
      {
        role: "One desk phone — apps everywhere else",
        name: "Yealink T33G",
        why: "Buy one for the main desk. Everyone else uses the VoIP provider's free mobile/desktop app. Keeps hardware cost to a single phone.",
        price: "~$65–$80",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B08DKQF84N/" },
        ],
      },
    ],
    headsets: [
      {
        role: "Budget wired headset",
        name: "Yealink YHS36",
        why: "The lowest-cost hands-free option that works reliably. Plugs directly into the T33G RJ9 jack. Recommended if you're on calls more than an hour a day.",
        price: "~$30–$45",
        image: "https://m.media-amazon.com/images/I/51Vpgu77WML._AC_SX679_.jpg",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/dp/B01LZFC6CC/" },
        ],
      },
    ],
    cables: [
      {
        cat: "CAT CABLE",
        role: "Phone to router or wall jack",
        name: "Amazon Basics Cat6 — 10 ft or 15 ft",
        why: "One cable, one phone. Amazon Basics Cat6 is reliable, cheap, and gets the job done. Buy 2 so you have a spare.",
        price: "~$7–$10",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=Amazon+Basics+Cat6+ethernet+10ft" },
        ],
      },
      {
        cat: "USB-C ADAPTER",
        role: "Laptop softphone — wired connection",
        name: "TP-Link UE300C USB-C to Gigabit",
        why: "If you're using a modern laptop as your primary softphone, a wired ethernet connection dramatically improves call quality vs. Wi-Fi. Plug-and-play.",
        price: "~$15–$20",
        links: [
          { label: "Amazon", href: "https://www.amazon.com/s?k=TP-Link+UE300C+USB-C+ethernet" },
        ],
      },
    ],
    budget_tip: "Skip buying a phone for every employee. Most hosted VoIP platforms include free mobile and desktop apps. Start with one desk phone at reception and apps everywhere else — upgrade to desk phones as the business grows.",
    cta: {
      title: "Get started fast — NeedIT sets you up remotely.",
      body: "NeedIT gets your business line active and phone provisioned in one session. We help pick the right platform and walk through app setup for your mobile team.",
      link: "Start with a free 15-min consultation →",
    },
  },
];

// ─── Node config ──────────────────────────────────────────────────────────────

const NODE_CONFIG = [
  {
    key: "budget",
    label: "Budget starter",
    sub: "Lowest cost · get started",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M10 3v2M10 15v2M5 10H3M17 10h-2" />
        <circle cx="10" cy="10" r="4" />
        <line x1="10" y1="8" x2="10" y2="10" /><line x1="10" y1="10" x2="12" y2="10" />
      </svg>
    ),
  },
  {
    key: "solo",
    label: "Solo operator",
    sub: "1 user · home office",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="3" y="5" width="14" height="10" rx="2" />
        <line x1="7" y1="15" x2="7" y2="17" /><line x1="13" y1="15" x2="13" y2="17" />
        <line x1="5" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
  {
    key: "small",
    label: "Small office",
    sub: "3–5 users · full team",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="7" width="6" height="8" rx="1.5" />
        <rect x="7" y="4" width="6" height="11" rx="1.5" />
        <rect x="12" y="7" width="6" height="8" rx="1.5" />
      </svg>
    ),
  },
  {
    key: "remote",
    label: "Remote worker",
    sub: "Wi-Fi · work from anywhere",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="10" cy="10" r="7" />
        <path d="M10 3c-2 2-3 4-3 7s1 5 3 7" /><path d="M10 3c2 2 3 4 3 7s-1 5-3 7" />
        <line x1="3" y1="10" x2="17" y2="10" />
      </svg>
    ),
  },
  {
    key: "reception",
    label: "Front desk",
    sub: "Receptionist · high volume",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="3" y="5" width="14" height="10" rx="2" />
        <line x1="10" y1="5" x2="10" y2="15" />
        <circle cx="6.5" cy="10" r="1" /><circle cx="13.5" cy="10" r="1" />
      </svg>
    ),
  },
  {
    key: "conf",
    label: "Conference room",
    sub: "360° audio · any size",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="10" cy="10" r="6" /><circle cx="10" cy="10" r="2" />
        <line x1="10" y1="4" x2="10" y2="2" /><line x1="10" y1="16" x2="10" y2="18" />
        <line x1="4" y1="10" x2="2" y2="10" /><line x1="16" y1="10" x2="18" y2="10" />
      </svg>
    ),
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-green-800 text-xs font-semibold uppercase tracking-widest mt-4 mb-2 first:mt-0">
      {children}
    </p>
  );
}

function ProductCard({ item }: { item: ProductItem }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#f0f2f5] p-3">
      <p className="text-green-800 text-xs font-medium mb-0.5">{item.role}</p>
      <div className="flex items-center gap-2 mb-1">
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-lg border border-gray-200 bg-white flex-shrink-0" />
        )}
        <p className="text-gray-900 text-base font-semibold">{item.name}</p>
      </div>
      <p className="text-gray-800 text-sm mt-1 leading-relaxed">{item.why}</p>
      <p className="text-gray-700 text-sm mt-1.5 font-mono">{item.price}</p>
      <div className="flex gap-1.5 mt-2 flex-wrap">
        {item.links.map((l) =>
          l.placeholder ? (
            <span key={l.label} className="px-2.5 py-1 rounded-full border border-dashed border-gray-200 text-green-900/70 text-xs">
              {l.label}
            </span>
          ) : (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full border border-gray-200 text-green-800 text-xs hover:border-green-500/50 hover:text-green-700 transition-colors"
            >
              {l.label}
            </a>
          )
        )}
      </div>
    </div>
  );
}

function CableCard({ item }: { item: CableItem }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#f0f2f5] p-3">
      <p className="text-green-800 text-xs tracking-widest mb-0.5">{item.cat}</p>
      <p className="text-green-800 text-xs font-medium mb-0.5">{item.role}</p>
      <p className="text-gray-900 text-base font-semibold">{item.name}</p>
      <p className="text-gray-800 text-sm mt-1 leading-relaxed">{item.why}</p>
      <p className="text-gray-700 text-sm mt-1.5 font-mono">{item.price}</p>
      <div className="flex gap-1.5 mt-2 flex-wrap">
        {item.links.map((l) =>
          l.placeholder ? (
            <span key={l.label} className="px-2.5 py-1 rounded-full border border-dashed border-gray-200 text-green-900/70 text-xs">
              {l.label}
            </span>
          ) : (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full border border-gray-200 text-green-800 text-xs hover:border-green-500/50 hover:text-green-700 transition-colors"
            >
              {l.label}
            </a>
          )
        )}
      </div>
    </div>
  );
}

function DetailPanel({ kit }: { kit: KitData }) {
  return (
    <div data-kit-detail className="rounded-2xl border border-gray-200 bg-white overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 bg-green-50">
        <p className="text-gray-900 font-semibold text-lg leading-snug">{kit.title}</p>
        <p className="text-green-800 text-base italic mt-0.5">{kit.tagline}</p>
      </div>

      <div className="p-5 flex flex-col overflow-y-auto flex-1" style={{ maxHeight: "600px" }}>
        {/* Cost badge + description */}
        <span className="self-start px-3 py-1 rounded-full bg-green-50 border border-gray-200 text-green-800 text-xs font-mono mb-3">
          Hardware: {kit.hw_cost}
        </span>
        <p className="text-gray-800 text-sm leading-relaxed mb-1">{kit.description}</p>

        {/* Best for */}
        <SectionLabel>Best for</SectionLabel>
        <div className="flex flex-wrap gap-1.5 mb-1">
          {kit.use_cases.map((uc) => (
            <span key={uc} className="px-2 py-0.5 rounded-md bg-green-50 border border-gray-200 text-gray-700 text-xs">
              {uc}
            </span>
          ))}
        </div>

        {/* Platform */}
        <SectionLabel>Recommended platform</SectionLabel>
        <div className="rounded-xl border border-gray-200 bg-green-50 p-3 mb-1">
          <p className="text-green-800 text-sm font-semibold">{kit.platform.name}</p>
          <p className="text-gray-800 text-xs mt-1 leading-relaxed">{kit.platform.why}</p>
          <p className="text-green-800 text-xs mt-1.5 font-mono">{kit.platform.price}</p>
        </div>

        {/* Phones */}
        <SectionLabel>Phones</SectionLabel>
        <div className="flex flex-col gap-2">
          {kit.phones.map((p) => <ProductCard key={p.name} item={p} />)}
        </div>

        {/* Headsets */}
        <SectionLabel>Headsets</SectionLabel>
        <div className="flex flex-col gap-2">
          {kit.headsets.map((h) => <ProductCard key={h.name} item={h} />)}
        </div>

        {/* Budget tip */}
        {kit.budget_tip && (
          <>
            <SectionLabel>Pro tip from NeedIT</SectionLabel>
            <div className="rounded-xl bg-yellow-900/10 border border-yellow-900/30 p-3">
              <p className="text-yellow-900 text-sm leading-relaxed">{kit.budget_tip}</p>
            </div>
          </>
        )}


      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function VoIPKitCircuit({ onKitSelect }: { onKitSelect?: (key: string | null) => void }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const activeKit = KITS.find((k) => k.key === activeKey) ?? null;

  const handleNodeClick = (key: string) => {
    const next = activeKey === key ? null : key;
    setActiveKey(next);
    onKitSelect?.(next);
  };

  return (
    <div className="w-full">
      <p className="text-center text-green-800 text-sm uppercase tracking-widest mb-6">
        select a kit node to trace the signal
      </p>

      {/* Nodes row — 3 × 2 grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {NODE_CONFIG.map((node) => (
          <button
            key={node.key}
            data-kit-node={node.key}
            onClick={() => handleNodeClick(node.key)}
            className={`flex flex-col items-center rounded-xl border-2 px-4 py-3 transition-all duration-150 ${
              activeKey === node.key
                ? "border-green-400 bg-green-50"
                : "border-gray-200 bg-white hover:border-green-600/60 hover:bg-green-50"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-2 transition-colors ${
                activeKey === node.key
                  ? "border-green-400 text-green-700 bg-green-50"
                  : "border-gray-200 text-green-600"
              }`}
            >
              {node.icon}
            </div>
            <p className={`text-sm font-semibold text-center leading-snug transition-colors ${
              activeKey === node.key ? "text-green-800" : "text-gray-800"
            }`}>
              {node.label}
            </p>
            <p className="text-xs text-green-800 text-center mt-0.5 leading-tight">{node.sub}</p>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {activeKit ? (
        <DetailPanel kit={activeKit} />
      ) : (
        <div className="flex items-center min-h-40 rounded-2xl border-2 border-dashed border-gray-200 flex-col gap-3 justify-center">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#4ade80" strokeWidth="1.5" className="opacity-50">
              <path d="M4 10h12M10 4l6 6-6 6" />
            </svg>
          </div>
          <p className="text-green-800 text-base text-center leading-relaxed">
            select a kit<br />to trace the signal
          </p>
        </div>
      )}
    </div>
  );
}
