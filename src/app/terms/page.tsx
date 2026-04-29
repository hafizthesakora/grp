import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — Golden Roots Properties",
  description: "Terms and conditions governing the use of Golden Roots Properties website and services.",
};

export default function TermsPage() {
  const EFFECTIVE = "1 January 2024";
  const COMPANY = "Golden Roots Properties";
  const EMAIL = "goldenrootssocial@gmail.com";

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Hero */}
        <div className="bg-green-950 pt-36 pb-16 px-6 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-xs tracking-widest uppercase">Legal</span>
            </div>
            <h1 className="text-white font-bold text-4xl mb-3">Terms &amp; Conditions</h1>
            <p className="text-white/40 text-sm">Effective date: {EFFECTIVE}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-0 py-16">
          <div className="bg-gold-50 border-l-4 border-gold-400 px-6 py-4 mb-10 rounded-sm">
            <p className="text-green-950 text-sm leading-relaxed">
              <strong>Important:</strong> Please read these Terms and Conditions carefully before using our
              website or services. By accessing the Site or submitting an enquiry, you agree to be bound by
              these Terms. If you do not agree, you must not use our Site or services.
            </p>
          </div>

          <LegalSection title="1. Definitions">
            <p>In these Terms:</p>
            <ul>
              <li><strong>"Company"</strong> means {COMPANY}, a Ghanaian-registered real estate business.</li>
              <li><strong>"Site"</strong> means the website at goldenrootsproperties.com and all associated pages.</li>
              <li><strong>"Client"</strong> or <strong>"you"</strong> means any individual or entity that uses the Site or engages the Company's services.</li>
              <li><strong>"Services"</strong> means land advisory, land sales facilitation, documentation processing, and related services provided by the Company.</li>
              <li><strong>"Plot" / "Land"</strong> means parcels of land situated in Ghana marketed through the Company.</li>
              <li><strong>"Enquiry"</strong> means any expression of interest submitted through the Site, by email, or by any other means.</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. Use of the Site">
            <p>
              You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul>
              <li>Use the Site in any way that violates any applicable Ghanaian, UK, US, EU, or other local or international law or regulation.</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material.</li>
              <li>Attempt to gain unauthorised access to any portion of the Site or its related systems.</li>
              <li>Use the Site to impersonate any person or entity, or to misrepresent your identity or affiliation.</li>
              <li>Scrape, copy, redistribute, or republish any content from the Site without prior written consent from the Company.</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. No Binding Offer or Contract">
            <p>
              All content published on this Site — including plot descriptions, sizes, prices, images, and
              availability status — is provided for informational purposes only and does not constitute a
              binding offer, representation, or warranty.
            </p>
            <p>
              <strong>Submitting an enquiry or completing our online purchase form does not create a binding
              contract for the sale or purchase of land.</strong> A binding agreement is only formed when
              both parties have signed a formal Purchase Agreement or Indenture, as required under the
              <em> Land Act 2020 (Act 1036) of Ghana</em>, and any agreed deposit has been received and confirmed.
            </p>
            <p>
              The Company reserves the right to withdraw any listing from sale at any time prior to the
              execution of a formal written agreement, without incurring liability.
            </p>
          </LegalSection>

          <LegalSection title="4. Land Purchase Process & Obligations">
            <h4>4.1 Verification</h4>
            <p>
              The Company conducts a multi-checkpoint verification process for all listed plots, including
              a Lands Commission search, family/stool consent verification, physical boundary check, gazetted
              site plan, indenture preparation, and barcode registration. However:
            </p>
            <ul>
              <li>The Company cannot guarantee that Ghana Lands Commission records are free from error or that subsequent disputes will not arise after the date of verification.</li>
              <li>Clients are advised to seek independent legal advice before entering into any land purchase agreement.</li>
            </ul>
            <h4>4.2 Payment</h4>
            <p>
              All payments must be made through officially confirmed bank transfer or approved payment channels
              provided directly by the Company. The Company will never instruct payment to any personal
              account or third-party not formally introduced in writing. If in doubt, contact us at{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a> to confirm payment details before transferring funds.
            </p>
            <p>
              <strong>The Company accepts no liability for funds transferred to fraudulent accounts
              following payment instructions obtained from any source other than direct written confirmation
              from our official email address.</strong>
            </p>
            <h4>4.3 Documentation</h4>
            <p>
              Upon full payment, the Company will facilitate preparation and registration of the Indenture
              and Site Plan. Physical documentation will be delivered via courier (DHL or equivalent).
              Digital copies will be provided where feasible. Timelines for documentation depend on Ghana
              Lands Commission processing times, which are outside the Company's control.
            </p>
            <h4>4.4 Currency & Pricing</h4>
            <p>
              Prices are quoted in United States Dollars (USD) unless otherwise stated. Exchange rates
              fluctuate; the Company does not guarantee the USD equivalent in any other currency. Prices
              are subject to change without notice prior to execution of a formal purchase agreement.
            </p>
          </LegalSection>

          <LegalSection title="5. Disclaimer of Warranties">
            <p>
              The Site and its content are provided on an <strong>"as is" and "as available"</strong> basis.
              To the fullest extent permitted by law, the Company disclaims all warranties, express or implied,
              including but not limited to:
            </p>
            <ul>
              <li>Merchantability or fitness for a particular purpose.</li>
              <li>Accuracy, completeness, or currentness of any content on the Site.</li>
              <li>Uninterrupted, error-free, or secure access to the Site.</li>
              <li>The suitability of any land for any specific use including construction, agriculture, or commercial development.</li>
              <li>Future appreciation or investment returns on any land purchased.</li>
            </ul>
            <p>
              <strong>Land investments carry inherent risks.</strong> Property values can decrease as well as
              increase. The Company makes no representation regarding future market conditions, land values,
              rental yields, or development potential. Past transactions do not guarantee future outcomes.
            </p>
          </LegalSection>

          <LegalSection title="6. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, the Company, its directors, officers,
              employees, agents, and representatives shall not be liable for:
            </p>
            <ul>
              <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
              <li>Loss of profits, revenue, data, or goodwill.</li>
              <li>Damages arising from any third-party land dispute, chieftaincy dispute, or government acquisition that occurs after the date of the Lands Commission search.</li>
              <li>Delays in processing documentation caused by government bodies, including the Ghana Lands Commission.</li>
              <li>Any loss arising from your reliance on information provided on the Site without independent verification.</li>
            </ul>
            <p>
              Where the Company's liability cannot be excluded by law, our total aggregate liability to you
              shall not exceed the amount actually paid by you to the Company for the specific transaction
              giving rise to the claim.
            </p>
          </LegalSection>

          <LegalSection title="7. Intellectual Property">
            <p>
              All content on the Site — including text, images, videos, graphics, logos, and software —
              is the property of {COMPANY} or its licensors and is protected by Ghanaian and international
              copyright law. You may not reproduce, distribute, modify, or create derivative works without
              the Company's express written permission.
            </p>
          </LegalSection>

          <LegalSection title="8. Anti-Fraud Notice">
            <p>
              Land fraud is a serious risk in Ghana. The Company is committed to transparency and takes the
              following steps to protect clients:
            </p>
            <ul>
              <li>All communications from the Company originate from <strong>{EMAIL}</strong>. Be wary of any emails from similar-looking addresses.</li>
              <li>The Company will never ask you to pay a "registration fee", "release fee", or any undisclosed charge not set out in your formal purchase agreement.</li>
              <li>If you suspect you have been contacted by someone misrepresenting themselves as Golden Roots Properties, please contact us immediately.</li>
            </ul>
          </LegalSection>

          <LegalSection title="9. Third-Party Services">
            <p>
              The Site may link to or integrate with third-party services including Calendly (appointment
              scheduling) and WhatsApp (messaging). These services are governed by their own terms of service
              and privacy policies. The Company is not responsible for the content, availability, or practices
              of third-party services.
            </p>
          </LegalSection>

          <LegalSection title="10. Governing Law & Dispute Resolution">
            <p>
              These Terms are governed by and construed in accordance with the laws of the <strong>Republic
              of Ghana</strong>. Any dispute arising out of or in connection with these Terms or the Company's
              services shall be subject to the exclusive jurisdiction of the courts of Ghana.
            </p>
            <p>
              Before initiating formal legal proceedings, both parties agree to make a good-faith effort to
              resolve any dispute through direct negotiation. If unresolved within 30 days, either party may
              pursue available legal remedies.
            </p>
          </LegalSection>

          <LegalSection title="11. Amendments">
            <p>
              The Company reserves the right to amend these Terms at any time. Updated Terms will be posted
              on this page with a revised effective date. Continued use of the Site after changes constitutes
              acceptance of the updated Terms. We recommend checking this page periodically.
            </p>
          </LegalSection>

          <LegalSection title="12. Contact">
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <address className="not-italic text-gray-600 text-[15px]">
              <strong>{COMPANY}</strong><br />
              Central Region, Ghana<br />
              Email: <a href={`mailto:${EMAIL}`} className="text-green-700 hover:text-green-900">{EMAIL}</a><br />
              WhatsApp: +1 248-210-8333<br />
              Ghana: +233 54-083-9298
            </address>
          </LegalSection>

          <div className="mt-12 pt-6 border-t border-gray-100">
            <div className="mt-4 flex gap-4">
              <Link href="/privacy-policy" className="text-green-700 text-sm font-semibold hover:text-green-900 underline underline-offset-2">
                Privacy Policy →
              </Link>
              <Link href="/contact" className="text-green-700 text-sm font-semibold hover:text-green-900 underline underline-offset-2">
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-green-950 font-bold text-xl mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3 text-[15px] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_h4]:text-green-950 [&_h4]:font-semibold [&_h4]:text-base [&_h4]:mt-4 [&_h4]:mb-2 [&_a]:text-green-700 [&_a]:hover:text-green-900 [&_strong]:text-green-950">{children}</div>
    </div>
  );
}
