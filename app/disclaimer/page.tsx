import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#f0f2f5] flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto px-6 pt-32 pb-20 w-full">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-green-700 text-sm font-semibold mb-10">Last updated: April 2026</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Affiliate disclosure</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            NeedIT Consulting LLC participates in affiliate marketing programs, including the Amazon Associates Program and other third-party affiliate programs. This means we may earn a commission when you click on certain links on this website and make a qualifying purchase — at no additional cost to you.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            We only recommend products and services that we have researched, personally vetted, or actively use with clients. Our editorial opinions are our own and are not influenced by affiliate compensation. The presence of an affiliate link does not constitute an endorsement beyond what is stated on this page.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            As of 2025, the FTC updated its Endorsement Guides to require disclosure when AI tools are used to create or enhance product recommendations — some content on this site is developed with AI assistance. All product recommendations and technical assessments reflect NeedIT Consulting&apos;s professional judgment.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Third-party products and services</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            NeedIT Consulting LLC recommends third-party products, software, and services — including but not limited to Yealink, Poly, RingCentral, Nextiva, Ooma, Grasshopper, 8x8, Vonage, Amazon, and eBay — as a convenience to our visitors. These recommendations are based on our professional experience and research.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            NeedIT Consulting LLC is not affiliated with, employed by, or an authorized agent of any third-party manufacturer or service provider unless explicitly stated. We make no representations or warranties regarding:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2 mb-3">
            <li>The accuracy, completeness, or timeliness of product specifications, pricing, or availability listed on this site</li>
            <li>The continued availability of any product, service, or pricing tier mentioned</li>
            <li>Any promises, guarantees, warranties, or representations made by third-party manufacturers or service providers on their own websites or in their own marketing materials</li>
            <li>The performance, reliability, or fitness for a particular purpose of any third-party product or service</li>
          </ul>
          <p className="text-gray-600 text-sm leading-relaxed">
            Product specifications, pricing, and availability are subject to change without notice. Always verify current pricing and specifications directly with the manufacturer or retailer before making a purchasing decision.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">No warranty</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            The information on this website is provided &quot;as is&quot; and without warranties of any kind, either express or implied. NeedIT Consulting LLC disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">NeedIT Consulting LLC does not warrant that:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-2">
            <li>This website will be available at all times or be free of errors</li>
            <li>Information on this website is accurate, complete, or current</li>
            <li>Any product or service recommended on this site will meet your specific business requirements</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of liability</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            To the fullest extent permitted by applicable law, NeedIT Consulting LLC shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from your use of this website or your reliance on any information, product recommendation, or external link contained herein — including damages arising from your purchase of a third-party product or service recommended on this site.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your use of this website and any third-party products or services is at your sole discretion and risk.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">External links</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This website contains links to external websites operated by third parties. These links are provided for informational purposes and convenience only. NeedIT Consulting LLC does not control, endorse, or assume responsibility for the content, privacy practices, or terms of service of any external website. Clicking an external link means you are leaving the NeedIT Consulting website and are subject to the terms and policies of the destination site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Pricing accuracy</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Product prices displayed on this site are estimates based on publicly available information at the time of writing and are updated periodically. Actual prices may differ. Amazon prices in particular change frequently and the price you see when you click through may differ from what is displayed here. NeedIT Consulting LLC is not responsible for price discrepancies between what is displayed on this site and what is charged at point of sale.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional advice disclaimer</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Content on this website is for general informational purposes only and does not constitute professional legal, financial, technical, or regulatory advice. For compliance questions — including FCC regulations, E911 requirements, Kari&apos;s Law, HIPAA telephony obligations, or any other regulatory matter — consult a qualified professional with expertise in your industry and jurisdiction.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-1">
            Questions about this disclaimer or NeedIT Consulting&apos;s affiliate relationships can be directed to:
          </p>
          <p className="text-gray-700 text-sm font-semibold">NeedIT Consulting LLC</p>
          <p className="text-gray-600 text-sm">Fredericksburg, VA</p>
          <p className="text-gray-600 text-sm">ashleyfetterolf42@gmail.com</p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
