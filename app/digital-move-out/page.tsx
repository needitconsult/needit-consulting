import type { Metadata } from "next";
import DigitalMoveOut from "./DigitalMoveOut";

export const metadata: Metadata = {
  title: "Digital Move-Out | De-Google Migration | NeedIT Consulting",
  description:
    "Digital Move-Out by NeedIT Consulting: we move your email, photos, files, passwords and phone off Google to private alternatives. Serving Fredericksburg, Spotsylvania, Stafford and remote clients.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Move-Out (De-Google Migration)",
  serviceType: "De-Google migration and privacy setup",
  provider: {
    "@type": "LocalBusiness",
    name: "NeedIT Consulting LLC",
    telephone: "+1-540-693-0033",
    url: "https://needitconsulting.com",
    areaServed: ["Fredericksburg, VA", "Spotsylvania, VA", "Stafford, VA"],
  },
  offers: [
    { "@type": "Offer", name: "Privacy Checkup", price: "129", priceCurrency: "USD" },
    { "@type": "Offer", name: "Privacy Reset", price: "399", priceCurrency: "USD" },
    { "@type": "Offer", name: "Full Move-Out", price: "749", priceCurrency: "USD" },
    { "@type": "Offer", name: "Household Move-Out", price: "1399", priceCurrency: "USD" },
  ],
};

export default function DigitalMoveOutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <DigitalMoveOut />
    </>
  );
}
