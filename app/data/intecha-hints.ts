export const hints: string[] = [
  // VoIP — general
  "A single VoIP call only needs about 100 Kbps of bandwidth — less than streaming a YouTube video.",
  "Modern hosted VoIP targets 99.999% uptime. If your internet drops, calls automatically reroute to your mobile.",
  "You don't need to buy new phones for VoIP. Softphone apps on your laptop or smartphone work just fine.",
  "QoS settings on your router give voice traffic priority over file downloads — no choppy calls during busy hours.",

  // VoIP — setup
  "You can keep your existing business phone numbers when switching to VoIP. It's called number porting.",
  "Cloud VoIP can be up and running in 1–3 business days. A traditional PBX could take months.",
  "SIP ALG is a router feature designed to help VoIP — but it almost always breaks it. Disable it first.",
  "SIP trunking lets you add VoIP capabilities to your existing phone system without a full rip-and-replace.",

  // VoIP — troubleshooting
  "Choppy, robotic calls are usually caused by jitter above 30ms — not your internet speed.",
  "One-way audio on a VoIP call almost always means your firewall is blocking RTP media ports (10,000–30,000 UDP).",
  "Echo on calls is usually a speaker-near-microphone issue. A headset fixes it instantly.",
  "Calls dropping repeatedly? Disabling SIP ALG and setting your UDP timeout to 300 seconds solves it most of the time.",

  // VoIP — costs
  "Most businesses cut their phone bills by 50–70% after switching to VoIP.",
  "Hidden VoIP fees — E911, porting, and regulatory charges — can add 20–25% to your quoted price. Always ask for the full breakdown.",
  "Per-user flat-rate VoIP typically runs $20–$35/month per user, including unlimited domestic calling.",

  // VoIP — security
  "Unencrypted VoIP calls can be intercepted. Secure systems use TLS for signaling and SRTP to encrypt the audio.",
  "Business phone systems installed after Feb 2020 must support direct 911 dialing under Kari's Law — no prefix required.",
  "Toll fraud is real — attackers dial international numbers on your account. Whitelisting IPs and blocking international calling prevents it.",

  // IT — vendor management
  "Most small businesses are unknowingly paying for 20–30% in unused or duplicate SaaS subscriptions.",
  "When an employee leaves, their vendor portal access, API keys, and OAuth tokens should be revoked on day one.",

  // IT — file management
  "Permission drift is one of the most overlooked security risks. Former employees may still have access to your shared drives.",
  "The best shared drive structure is flat — 3 levels deep max. Deeper than that and nobody can find anything.",
  "Files saved to the desktop usually aren't included in backup routines. They can vanish in a hard drive failure.",

  // IT — cloud
  "Cloud sync (OneDrive, Google Drive, Dropbox) is NOT a backup. Ransomware that encrypts your files syncs the damage everywhere.",
  "OneDrive is for personal files. SharePoint is for team files. Teams actually stores its files in SharePoint behind the scenes.",
  "A Windows.old folder left after a system update can quietly consume 20–30 GB of storage.",

  // IT — software & performance
  "A properly tuned 3-year-old machine can outperform a brand-new one that's been left to accumulate software bloat.",
  "A second monitor improves productivity by 20–40% for knowledge workers — and a quality 24\" display costs as little as $100.",
  "Every desktop icon is re-rendered when you minimize a window. A cluttered desktop noticeably slows older Windows PCs.",
  "Slow boot times are almost always caused by too many apps launching at startup — Teams, Zoom, Slack, Adobe updaters, and more pile up.",

  // IT — other
  "For businesses under 50 employees, a fractional IT consultant is almost always more cost-effective than a full-time hire.",
  "Most businesses back up their data — but never test whether the restore actually works. Don't find out during a crisis.",
  "Phishing is the #1 entry point for business cyberattacks. When in doubt about an email — don't click. Forward it to IT first.",
];
