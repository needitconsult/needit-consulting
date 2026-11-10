// Content for the Digital Move-Out (De-Google Migration) page and its Services category.

export type Package = {
  name: string;
  blurb: string;
  price: string;
  priceNote?: string;
  features: string[];
  popular?: boolean;
};

export type Extra = {
  name: string;
  price: string;
  priceNote?: string;
  blurb: string;
};

export const steps = [
  { title: "Walk-through", body: "We list everything tied to your Google account, including the logins you forgot about." },
  { title: "Pack", body: "We export your mail, contacts, calendars, files, and photos with all the dates and details kept." },
  { title: "Move", body: "We set up private services on your computer and phone and bring everything into them." },
  { title: "Settle in", body: "We show you how everything works, forward old mail, and answer your questions during your follow-up period." },
];

export const moves = [
  { from: "From Gmail", title: "Email", to: "Proton Mail, Tuta, or Fastmail", body: "All your old mail moved over, forwarding set up, and your own domain connected if you have one." },
  { from: "From Contacts & Calendar", title: "Contacts & Calendar", to: "Synced with your new email", body: "Every contact and event moved, plus shared family or team calendars set back up." },
  { from: "From Drive & Docs", title: "Files & Documents", to: "Proton Drive or Nextcloud", body: "Google Docs turned into Word and Excel files, with formatting preserved as closely as possible, and shared folders shared again." },
  { from: "From Google Photos", title: "Photos & Videos", to: "Ente, Proton Drive, or Immich", body: "Your whole library moved with the original dates, locations, and albums." },
  { from: "From Chrome", title: "Passwords & Browser", to: "Bitwarden or Proton Pass + Firefox/Brave", body: "Saved passwords and bookmarks moved, private search set as default, and autofill working on your phone." },
  { from: "The part people miss", title: "“Sign in with Google”", to: "Your own login + 2FA", body: "We find every app and site that uses your Google login and switch it over so you don't get locked out later.", feature: true },
  { from: "From Google Authenticator", title: "2FA Codes", to: "Ente Auth, Aegis, or your password manager", body: "Every code moved, with backup codes saved somewhere safe." },
  { from: "From Google Voice", title: "Phone Number", to: "Ported to a carrier or private VoIP", body: "Keep your number. Phone systems are what we know best." },
  { from: "From Android", title: "Your Phone", to: "GrapheneOS, iPhone, or a cleaned-up Android", body: "Private keyboard, app store, and maps, checked to make sure your banking apps still work." },
];

export const packages: Package[] = [
  {
    name: "Privacy Reset",
    blurb: "The essentials, for one person.",
    price: "$399",
    features: [
      "Email moved to a private provider",
      "Contacts & calendar moved",
      "Passwords moved to a password manager",
      "Private browser & search set up",
      "1 computer + 1 phone",
      "30-day follow-up period",
    ],
  },
  {
    name: "Full Move-Out",
    blurb: "Everything, for one person.",
    price: "$749",
    popular: true,
    features: [
      "Everything in Privacy Reset",
      "Drive, Docs & Photos moved",
      "“Sign in with Google” accounts switched",
      "2FA codes moved & backed up",
      "Google Voice number ported",
      "Google account cleanup plan",
    ],
  },
  {
    name: "Household Move-Out",
    blurb: "The whole family, up to 4 people.",
    price: "$1,399",
    features: [
      "Full Move-Out for each person",
      "Shared family calendar & photo library",
      "Shared password vault",
      "Settings checked on kids' devices",
      "One-on-one walkthrough for each person",
      "60-day follow-up period",
    ],
  },
];

export const extras: Extra[] = [
  { name: "Privacy Checkup", price: "$129", blurb: "A one-hour review of everything tied to your Google account, plus a written plan. Fully credited toward any package." },
  { name: "Phone Swap", price: "+$199", priceNote: "/ device", blurb: "GrapheneOS installed on a Pixel, or a new phone set up from scratch with no Google apps." },
  { name: "Business Move-Out", price: "$500", priceNote: "+ $200/user", blurb: "Google Workspace exit, domain email, shared drives, and replacements for Forms, Analytics & more." },
];

// Digital Move-Out services. Business name and employee count are optional when only these are requested.
export const moveOutServices = ["Privacy Checkup", "Privacy Reset", "Full Move-Out", "Household Move-Out", "Phone Swap", "Business Move-Out"];

export const isMoveOutOnly = (services: string[]) =>
  services.length > 0 && services.every((s) => moveOutServices.includes(s));

export const reasons = [
  { title: "Security+ certified, cybersecurity degree", body: "Your data is handled by someone trained to protect it." },
  { title: "7+ years in phone systems", body: "Moving your Google Voice number is routine for us, not a risk." },
  { title: "Local & remote", body: "In person around Fredericksburg, Spotsylvania & Stafford, or remote anywhere." },
  { title: "Straight answers", body: "We'll tell you what to keep, like your Google Business Profile, when leaving would cost you." },
];

export const faqs = [
  { q: "Will I lose any emails or photos?", a: "No. We export everything before moving it, check that it arrived, and leave your Google account in place until you've confirmed everything is there." },
  { q: "Do I have to delete my Google account?", a: "No. Most clients keep it empty for 6–12 months so old contacts and account recovery emails still reach them. You decide when to close it, and we'll help when you're ready." },
  { q: "What about YouTube?", a: "Most people keep watching YouTube. We can set up private ways to watch without being tracked, but that part is up to you." },
  { q: "Will my banking and work apps still work?", a: "We check the apps you depend on before changing your phone. If something needs Google to run, we'll tell you up front and plan around it." },
  { q: "How long does it take?", a: "A Privacy Reset usually takes one session. A Full Move-Out takes 1–2 weeks, mostly waiting for Google to finish exporting large photo libraries." },
  { q: "What happens after my follow-up period ends?", a: "Your move is complete and everything is in your name. If you need help later, we can quote additional work separately." },
  { q: "I'm on an iPhone. Is this still for me?", a: "Yes. Gmail, Photos, Drive, Chrome, and Google logins work the same way on iPhone, and we move them all." },
  { q: "Can you do this for my business?", a: "Yes. The Business Move-Out handles Google Workspace, your domain email, shared drives, and tools like Forms and Analytics, scheduled so your team doesn't lose a day of work." },
];
