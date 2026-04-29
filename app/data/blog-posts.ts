import dailyBrewRaw from "./daily-brew-posts.json";

export type ContentBlock =
  | { type: "p";       text: string }
  | { type: "h2";      text: string }
  | { type: "h3";      text: string }
  | { type: "list";    items: string[] }
  | { type: "callout"; text: string }
  | { type: "tip";     label: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: ContentBlock[];
};

const manualPosts: BlogPost[] = [
  {
    slug: "your-business-phone-system-is-embarrassing-you",
    title: "Your Business Phone System Is Embarrassing You",
    excerpt: "If your office phone sounds like it was purchased during the Clinton administration, we need to talk. And I'm not going to be gentle about it.",
    category: "VoIP",
    date: "April 8, 2026",
    readTime: "4 min read",
    content: [
      {
        type: "p",
        text: "Let me paint you a picture. A potential client calls your office. The hold music sounds like it's coming through a tin can. The auto-attendant cuts out mid-sentence. The call drops. They call back. It drops again. They don't call a third time — they call your competitor instead. That just happened. I watched it happen. It was painful.",
      },
      {
        type: "p",
        text: "I'm Intecha, NeedIT's virtual consultant, and I am here to tell you the uncomfortable truth: your phone system is costing you business, and you probably don't even know it.",
      },
      {
        type: "h2",
        text: "The Legacy Phone Problem Nobody Talks About",
      },
      {
        type: "p",
        text: "Most small business owners inherited their phone system or bought it years ago without thinking too hard about it. It works — sort of. Calls go through. People can leave voicemails. Good enough, right?",
      },
      {
        type: "p",
        text: "Wrong. Here's what 'good enough' is actually costing you:",
      },
      {
        type: "list",
        items: [
          "Higher monthly bills — legacy PRI and POTS lines are significantly more expensive per seat than modern VoIP",
          "No mobility — your staff can't take business calls on their laptops or phones when they leave the building",
          "No integrations — your phone and your CRM live in completely separate worlds",
          "Maintenance costs — aging hardware breaks, and finding someone who still services it gets harder every year",
          "First impressions — bad call quality tells clients you're behind the times before you say a word",
        ],
      },
      {
        type: "h2",
        text: "What VoIP Actually Gives You",
      },
      {
        type: "p",
        text: "Modern hosted VoIP isn't just 'phone calls over the internet.' It's a complete communications platform that most businesses are massively underusing.",
      },
      {
        type: "list",
        items: [
          "Auto-attendant and call routing that actually works — professionally",
          "Voicemail-to-email transcription so nothing gets missed",
          "Mobile apps so your team's business number goes wherever they go",
          "Call recording and analytics so you can actually manage your team",
          "CRM integration so your sales calls are logged automatically",
          "Video conferencing built right in",
        ],
      },
      {
        type: "callout",
        text: "Most businesses cut their monthly phone bill by 50–70% within the first year of switching to VoIP. That's not a typo.",
      },
      {
        type: "h2",
        text: "The Migration Is Easier Than You Think",
      },
      {
        type: "p",
        text: "I hear it constantly: 'We'd love to switch but the migration sounds like a nightmare.' I understand the hesitation. Change is scary — especially when it involves the thing your entire business communicates through.",
      },
      {
        type: "p",
        text: "But here's what a properly managed VoIP migration actually looks like: you keep your existing numbers (yes, all of them). Cloud VoIP is provisioned within 1–3 business days. Your team gets softphone apps on their laptops and phones. Number porting takes 5–10 days and happens in the background while your old system stays live. By the time the switch flips, your staff barely notices — except everything works better.",
      },
      {
        type: "tip",
        label: "Intecha's Take",
        text: "Don't cancel your old phone service until the port is 100% confirmed complete. I've seen businesses go dark for a day because someone got eager. Don't be that business.",
      },
      {
        type: "h2",
        text: "Ready to Stop Embarrassing Yourself?",
      },
      {
        type: "p",
        text: "NeedIT offers a free initial IT assessment — no strings, no pressure, no awkward sales pitch. We look at what you have, what you actually need, and tell you exactly what the right move is. Sometimes that's a full VoIP migration. Sometimes it's just a few configuration changes to what you already have.",
      },
      {
        type: "p",
        text: "Either way, you'll know where you stand. And your phone will stop embarrassing you. You're welcome.",
      },
    ],
  },

  {
    slug: "sip-alg-destroying-your-voip-calls",
    title: "SIP ALG Is Probably Breaking Your VoIP Calls Right Now",
    excerpt: "There's a setting hiding in your router that was designed to help VoIP — and it almost always does the exact opposite. Let's talk about SIP ALG.",
    category: "VoIP Troubleshooting",
    date: "April 5, 2026",
    readTime: "5 min read",
    content: [
      {
        type: "p",
        text: "You've got VoIP. You followed the setup instructions. Everything looked fine during testing. But now calls are dropping, audio is one-way, and phones keep losing registration for no apparent reason. You've called your VoIP provider three times. They ran tests. 'Everything looks fine on our end,' they said, which is exactly what you didn't want to hear.",
      },
      {
        type: "p",
        text: "I'm going to save you the fourth call. The culprit is almost certainly a three-letter setting sitting quietly in your router: SIP ALG. And it's been sabotaging you this whole time.",
      },
      {
        type: "h2",
        text: "What Is SIP ALG, Exactly?",
      },
      {
        type: "p",
        text: "SIP ALG stands for Session Initiation Protocol Application Layer Gateway. It's a feature built into most consumer and small-business routers — including many from Netgear, Linksys, ASUS, and others — that was designed to help VoIP traffic navigate NAT (Network Address Translation).",
      },
      {
        type: "p",
        text: "The idea was noble: SIP packets contain IP address information inside the packet payload, not just the header. When NAT changes your internal IP to your public IP, it changes the header — but SIP ALG was supposed to also update the payload so everything matched up. Great concept. Terrible execution.",
      },
      {
        type: "h2",
        text: "Why It Almost Always Breaks Things",
      },
      {
        type: "p",
        text: "The problem is that modern hosted VoIP platforms already handle NAT traversal themselves — using techniques like STUN, TURN, and ICE. They don't need SIP ALG's help. And when SIP ALG jumps in anyway and starts rewriting SIP packet payloads, it usually does it incorrectly, creating mismatches that confuse the VoIP server.",
      },
      {
        type: "p",
        text: "The results look like this:",
      },
      {
        type: "list",
        items: [
          "Phones register successfully but then randomly drop off",
          "Calls connect but audio only works in one direction",
          "Calls drop after exactly 30 seconds (a classic SIP ALG symptom)",
          "Incoming calls ring but the caller hears nothing when you answer",
          "Random registration failures with no clear pattern",
        ],
      },
      {
        type: "callout",
        text: "Calls dropping at exactly 30 or 60 seconds is a near-certain SIP ALG signature. If that's happening to you — that's your answer.",
      },
      {
        type: "h2",
        text: "How to Disable It",
      },
      {
        type: "p",
        text: "The fix is straightforward: turn it off. The exact steps depend on your router, but here's the general path for the most common brands:",
      },
      {
        type: "list",
        items: [
          "Netgear: Advanced → WAN Setup → uncheck 'Disable SIP ALG'",
          "ASUS: WAN → NAT Passthrough → set SIP Passthrough to 'Disabled'",
          "TP-Link: Advanced → NAT Forwarding → ALG → disable SIP",
          "Ubiquiti/UniFi: No SIP ALG by default — you're already good",
          "SonicWall: VoIP → Settings → uncheck 'Enable SIP Transformations'",
        ],
      },
      {
        type: "p",
        text: "After disabling it, reboot your router and re-register your phones. In most cases, the symptoms clear up within minutes.",
      },
      {
        type: "tip",
        label: "Intecha's Take",
        text: "While you're in your router, also increase the UDP session timeout to at least 300 seconds. Some routers close UDP sessions too quickly and drop SIP registrations in the background — this is the other most common cause of random re-registration failures.",
      },
      {
        type: "h2",
        text: "What If Disabling It Doesn't Fix Everything?",
      },
      {
        type: "p",
        text: "SIP ALG is the most common culprit, but it's not the only one. If you disable it and still have issues, the next things to check are firewall rules for RTP ports (UDP 10,000–30,000), whether your phones are on a dedicated voice VLAN, and whether QoS is configured to prioritize voice traffic.",
      },
      {
        type: "p",
        text: "If all of that sounds like a lot — that's what NeedIT is here for. A VoIP Network Assessment covers all of it, and you'll walk away knowing exactly why your calls have been behaving the way they have. No more guessing.",
      },
    ],
  },

  {
    slug: "cloud-sync-is-not-a-backup",
    title: "Cloud Sync Is Not a Backup. I'll Wait.",
    excerpt: "OneDrive, Google Drive, Dropbox — they're incredibly useful. They are also absolutely not backups. This misconception is costing businesses their data.",
    category: "IT Security",
    date: "April 1, 2026",
    readTime: "4 min read",
    content: [
      {
        type: "p",
        text: "I know what you're going to say. 'My files are in OneDrive. They're safe.' I hear this at least twice a week. And every single time, I have to take a breath, fix my glasses, and explain — as patiently as I can — that what you just described is not a backup. It is a sync. There is a difference. A very, very important difference.",
      },
      {
        type: "p",
        text: "Let's get into it.",
      },
      {
        type: "h2",
        text: "What Sync Actually Does",
      },
      {
        type: "p",
        text: "Cloud sync tools — OneDrive, Google Drive, Dropbox, iCloud — are designed to make your files accessible everywhere. You create a file on your laptop, and within seconds it appears on your phone, your tablet, your work PC. It's genuinely useful. I use it. You should use it.",
      },
      {
        type: "p",
        text: "But here's the part people miss: sync is a mirror. Whatever happens to the original, happens everywhere. If you delete a file, it deletes everywhere. If ransomware encrypts your local files, those encrypted files sync to the cloud — and then to every other device connected to your account. Within minutes.",
      },
      {
        type: "callout",
        text: "Ransomware doesn't care that you use OneDrive. It encrypts your files. OneDrive syncs the encrypted versions. Your 'cloud backup' is now also encrypted.",
      },
      {
        type: "h2",
        text: "The Scenario That Changes Minds",
      },
      {
        type: "p",
        text: "A small accounting firm. Eight employees. Everything in Google Drive — client files, contracts, tax documents, years of work. One employee clicks a phishing link on a Tuesday morning. Ransomware starts encrypting files. Google Drive syncs every encrypted file in real time. By the time IT is called, 11,000 files are gone.",
      },
      {
        type: "p",
        text: "Google Drive does have version history — in this case it was limited to 30 days and the attack overwrote most versions before anyone noticed. They recovered about 60% of their files. The rest were gone.",
      },
      {
        type: "p",
        text: "I'm not telling you this to scare you. I'm telling you because it was preventable.",
      },
      {
        type: "h2",
        text: "What an Actual Backup Looks Like",
      },
      {
        type: "p",
        text: "A real backup follows the 3-2-1 rule:",
      },
      {
        type: "list",
        items: [
          "3 copies of your data",
          "2 different storage media types (e.g., local NAS + cloud backup)",
          "1 copy offsite or air-gapped",
        ],
      },
      {
        type: "p",
        text: "The critical difference between a backup and a sync is that a backup is independent. It doesn't automatically mirror changes in real time. It takes scheduled snapshots that can be restored to a known-good state, regardless of what happened to your primary data.",
      },
      {
        type: "list",
        items: [
          "Cloud-to-cloud backup services (Backupify, Spanning) that separately back up your Google/M365 data",
          "Dedicated backup solutions like Veeam, Acronis, or Datto for local and cloud environments",
          "Immutable backups — backup sets that can't be modified or deleted, even by ransomware",
        ],
      },
      {
        type: "tip",
        label: "Intecha's Take",
        text: "Version history in Google Drive and OneDrive is better than nothing — but it's not a backup strategy. Set retention windows, test your restores quarterly, and treat sync and backup as two separate tools that do two different jobs.",
      },
      {
        type: "h2",
        text: "The Test You Should Run Right Now",
      },
      {
        type: "p",
        text: "Ask yourself this: if ransomware hit your business today and encrypted every file you own, could you restore your data to yesterday's state without paying the ransom? If you can't answer yes with confidence — you don't have a backup strategy. You have a sync.",
      },
      {
        type: "p",
        text: "NeedIT audits your current backup state as part of our free IT assessment. We'll tell you exactly what you have, what you're missing, and what it would take to actually protect your data. No pressure, no jargon — just the facts.",
      },
    ],
  },

  {
    slug: "saas-subscription-audit",
    title: "You're Bleeding Money on Software Nobody Uses",
    excerpt: "The average small business wastes 20–30% of its software spend on unused or duplicate subscriptions. A proper audit takes an afternoon. The savings last for years.",
    category: "IT Management",
    date: "March 28, 2026",
    readTime: "5 min read",
    content: [
      {
        type: "p",
        text: "Let me ask you something. Do you know, off the top of your head, every SaaS subscription your business is currently paying for? Every single one — the obvious ones and the ones that auto-renewed three times without anyone noticing?",
      },
      {
        type: "p",
        text: "No? That's fine. Most business owners can't. What's not fine is that silence is costing you real money every single month.",
      },
      {
        type: "h2",
        text: "How SaaS Sprawl Happens",
      },
      {
        type: "p",
        text: "It starts innocently. Someone signs up for a project management tool for a specific client. Someone else tries a different one because they prefer the interface. A third person uses spreadsheets anyway and ignores both. Three subscriptions. One workflow. Zero consolidation.",
      },
      {
        type: "p",
        text: "Now multiply that across every department, every 'let's just try this for a month' decision, every tool that got purchased for an employee who left two years ago and whose account still auto-renews on a card nobody checks.",
      },
      {
        type: "callout",
        text: "Research consistently shows that 20–30% of small business software spend is wasted on unused or duplicate subscriptions. For a business spending $3,000/month on software, that's $600–$900 going nowhere.",
      },
      {
        type: "h2",
        text: "The Offboarding Problem",
      },
      {
        type: "p",
        text: "Here's the one that really gets me: employee offboarding. Someone leaves the company. HR processes the departure. IT (if you have IT) revokes their email and computer access. And then... nothing. Their Slack seat keeps billing. Their project management login stays active. Their Zoom license renews annually. Their vendor portal access — to systems that touch your client data — is never revoked.",
      },
      {
        type: "p",
        text: "This is not just a budget issue. It's a security issue. Former employees retaining access to business systems is one of the most common and most avoidable data exposure risks I see.",
      },
      {
        type: "h2",
        text: "How to Run a Subscription Audit",
      },
      {
        type: "list",
        items: [
          "Pull your last 3 months of business credit card and bank statements — highlight every recurring charge",
          "Cross-reference against your actual active users for each tool",
          "Flag anything where you're paying for more seats than you have active users",
          "Flag anything where the primary account owner has left the company",
          "Identify duplicate tools that serve the same function",
          "Set calendar reminders 60 and 30 days before every annual renewal",
        ],
      },
      {
        type: "p",
        text: "That list sounds simple — and it is, conceptually. The annoying part is actually doing it, because subscription charges are spread across multiple cards, multiple accounts, and sometimes multiple people who each think someone else is managing it.",
      },
      {
        type: "tip",
        label: "Intecha's Take",
        text: "Designate a single business credit card exclusively for software subscriptions. One card, one place to look. This alone makes future audits dramatically easier — and makes it much harder for subscriptions to hide.",
      },
      {
        type: "h2",
        text: "What NeedIT Does Differently",
      },
      {
        type: "p",
        text: "We build a living vendor register — a single document that maps every subscription to its cost, renewal date, account owner, and active user count. We review it with you quarterly and flag anything that needs attention before it auto-renews.",
      },
      {
        type: "p",
        text: "Most clients find enough savings in the first audit to more than cover the cost of working with us. Some find significantly more. Either way, you'll know exactly what your business is paying for — and whether it's actually earning its place.",
      },
    ],
  },

  {
    slug: "5-signs-your-network-isnt-ready-for-voip",
    title: "5 Signs Your Network Isn't Ready for VoIP",
    excerpt: "Thinking about switching to VoIP? Smart move. But before you commit, your network needs to pass a few tests — or your beautiful new phone system will sound terrible.",
    category: "VoIP",
    date: "March 22, 2026",
    readTime: "6 min read",
    content: [
      {
        type: "p",
        text: "VoIP is the right call for most small businesses — lower cost, more features, more flexibility. I recommend it constantly. But I also see what happens when people deploy it on a network that isn't ready, and it is not pretty. Choppy calls. Dropped connections. Angry clients. Frustrated staff. A VoIP system that gets blamed for problems that are actually the network's fault.",
      },
      {
        type: "p",
        text: "Before you make the switch, your network needs a readiness check. Here are five signs it's not ready yet — and what to do about each one.",
      },
      {
        type: "h2",
        text: "Sign 1: You Have No QoS Configuration",
      },
      {
        type: "p",
        text: "QoS — Quality of Service — is how your router prioritizes different types of traffic. Without it, a large file download or a video upload can steal bandwidth from your voice calls and cause choppy audio. Your router has no idea that a phone call is more time-sensitive than a software update running in the background.",
      },
      {
        type: "p",
        text: "The fix: Log into your router and enable QoS. Set voice traffic (DSCP EF, or UDP traffic on common VoIP ports) to the highest priority queue. This alone resolves the majority of call quality complaints in environments where the internet connection itself is adequate.",
      },
      {
        type: "h2",
        text: "Sign 2: Your Phones Are on the Same Network as Everything Else",
      },
      {
        type: "p",
        text: "When voice traffic and data traffic share the same network segment, they compete for resources and interfere with each other. A dedicated voice VLAN separates your phone traffic so it can be managed, prioritized, and secured independently.",
      },
      {
        type: "p",
        text: "This also matters for security — voice traffic sitting on the same VLAN as your general workstations creates unnecessary exposure. A properly configured voice VLAN keeps things clean.",
      },
      {
        type: "h2",
        text: "Sign 3: SIP ALG Is Enabled on Your Router",
      },
      {
        type: "p",
        text: "I've written a whole post about this — go read it if you haven't — but the short version is: SIP ALG is a router feature that was designed to help VoIP and almost always breaks it instead. If it's enabled, disable it. This is non-negotiable.",
      },
      {
        type: "callout",
        text: "Calls dropping at exactly 30 or 60 seconds? That's SIP ALG. Disable it, reboot your router, and see if the world makes sense again.",
      },
      {
        type: "h2",
        text: "Sign 4: Your Jitter or Latency Numbers Are Too High",
      },
      {
        type: "p",
        text: "VoIP is extremely sensitive to two things that your regular internet usage mostly ignores: jitter and latency.",
      },
      {
        type: "list",
        items: [
          "Latency (ping): should be under 150ms for VoIP — ideally under 20ms on your LAN",
          "Jitter: should be under 30ms — jitter above this causes the robotic, choppy audio quality",
          "Packet loss: should be under 1% — even 2% packet loss causes audible gaps in speech",
        ],
      },
      {
        type: "p",
        text: "Run a VoIP readiness test using a tool like the Nextiva Speed Test, PingPlotter, or simply a sustained ping test to your VoIP provider's server. If your numbers are out of range, the issue is usually your ISP connection, your router, or network congestion — all of which are addressable.",
      },
      {
        type: "h2",
        text: "Sign 5: You're Using a Consumer-Grade Router",
      },
      {
        type: "p",
        text: "That $80 router from the big-box store is fine for home use. For a business running VoIP, it's often the weakest link in the chain. Consumer routers frequently have: inadequate QoS controls, SIP ALG that can't be properly disabled, insufficient NAT table capacity for multiple concurrent calls, and no VLAN support.",
      },
      {
        type: "p",
        text: "A business-grade router — from Fortinet, SonicWall, Ubiquiti, or Cisco — gives you proper QoS, VLAN support, and the controls you need to make VoIP work reliably. It's not as glamorous as the phone system itself, but it's the foundation everything else sits on.",
      },
      {
        type: "tip",
        label: "Intecha's Take",
        text: "Don't wait until after you deploy VoIP to discover your network isn't ready. A pre-deployment network assessment takes a few hours and prevents weeks of troubleshooting. NeedIT offers VoIP Network Assessment & Optimization as a standalone service — it's exactly this, done right.",
      },
      {
        type: "h2",
        text: "The Bottom Line",
      },
      {
        type: "p",
        text: "A great VoIP system on a bad network is just a bad phone system with a higher expectation attached to it. Get the foundation right first, and the system will perform the way it's supposed to. Your staff will thank you. Your clients will thank you. And you won't have to call your VoIP provider to hear 'everything looks fine on our end' for the fourth time.",
      },
    ],
  },
];

// Daily Brew auto-posts prepend so they appear first (most recent)
export const posts: BlogPost[] = [
  ...(dailyBrewRaw as unknown as BlogPost[]),
  ...manualPosts,
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
