import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Golden Roots Properties",
  description: "How Golden Roots Properties collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
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
            <h1 className="text-white font-bold text-4xl mb-3">Privacy Policy</h1>
            <p className="text-white/40 text-sm">Effective date: {EFFECTIVE}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-0 py-16 prose prose-green max-w-none">
          <LegalSection title="1. Who We Are">
            <p>
              {COMPANY} ("we", "our", "us") is a Ghanaian-registered real estate company with its principal
              place of business in the Central Region, Ghana. We facilitate land acquisition for individuals
              in the African diaspora and local Ghanaian buyers. Our official contact address is{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard information you
              provide when you visit <strong>goldenrootsproperties.com</strong> (the "Site") or communicate
              with us by any means, including telephone, WhatsApp, or email.
            </p>
            <p>
              By using the Site or submitting any enquiry, you acknowledge that you have read and understood
              this policy. If you do not agree, please do not use the Site.
            </p>
          </LegalSection>

          <LegalSection title="2. Information We Collect">
            <p>We collect information in the following ways:</p>
            <h4>2.1 Information You Provide Directly</h4>
            <ul>
              <li><strong>Identity Data:</strong> first name, last name, passport or government-issued ID number (where provided voluntarily as supporting documentation).</li>
              <li><strong>Contact Data:</strong> email address, telephone number (including WhatsApp), country of residence, and mailing address.</li>
              <li><strong>Transaction Data:</strong> land type of interest, number of plots, stated budget range, intended purpose of purchase, preferred payment method, and purchase timeline.</li>
              <li><strong>Communications Data:</strong> messages, notes, and correspondence submitted through our contact form or sent directly to our email or WhatsApp.</li>
              <li><strong>Document Data:</strong> images or scans voluntarily uploaded during the purchase enquiry process (e.g. proof of funds, identification documents). These are stored securely and are not made publicly accessible.</li>
            </ul>
            <h4>2.2 Automatically Collected Information</h4>
            <ul>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time and date of visit, and referring URL. This data is collected for analytical and security purposes.</li>
              <li><strong>Cookies:</strong> We use essential cookies necessary for site operation. We do not use advertising or tracking cookies. You may disable cookies in your browser settings, though this may affect site functionality.</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. How We Use Your Information">
            <p>We use personal data only for the following lawful purposes:</p>
            <ul>
              <li>To respond to your enquiry and provide information about available land.</li>
              <li>To process and administer a land purchase transaction where you choose to proceed.</li>
              <li>To send confirmation emails and transactional communications relating to your enquiry or purchase.</li>
              <li>To comply with our legal obligations under Ghanaian law, including the <em>Data Protection Act 2012 (Act 843)</em> and land registration requirements under the <em>Land Act 2020 (Act 1036)</em>.</li>
              <li>To maintain records for accounting, audit, and regulatory compliance purposes.</li>
              <li>To protect the security and integrity of our operations.</li>
            </ul>
            <p>
              <strong>We do not sell, rent, or share your personal data with third parties for marketing purposes.</strong>
            </p>
          </LegalSection>

          <LegalSection title="4. Legal Basis for Processing">
            <p>
              We process your personal data under the Ghana Data Protection Act 2012 (Act 843). Our lawful bases are:
            </p>
            <ul>
              <li><strong>Consent:</strong> where you have expressly agreed (e.g., by ticking the consent checkbox on our contact form).</li>
              <li><strong>Contract:</strong> where processing is necessary to perform a contract with you or to take steps prior to entering a contract at your request.</li>
              <li><strong>Legal obligation:</strong> where processing is necessary to comply with applicable Ghanaian law.</li>
              <li><strong>Legitimate interests:</strong> where necessary for our legitimate business interests, provided these are not overridden by your rights and interests.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Data Retention">
            <p>
              We retain personal data only for as long as is necessary to fulfil the purposes described in this policy:
            </p>
            <ul>
              <li><strong>Enquiry records</strong> (no purchase): up to 12 months, then deleted unless you have asked us to keep you updated.</li>
              <li><strong>Purchase transaction records:</strong> a minimum of 7 years from completion, as required by Ghanaian legal and accounting regulations.</li>
              <li><strong>Communications:</strong> as long as is reasonably necessary to resolve any disputes or comply with legal obligations.</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Disclosure of Your Information">
            <p>We may share your information with the following categories of third parties, strictly as necessary:</p>
            <ul>
              <li><strong>Professional advisers:</strong> solicitors, surveyors, land title agents, and notaries engaged to process your land transaction.</li>
              <li><strong>Government bodies:</strong> the Ghana Lands Commission, Land Title Registry, or any other public authority as required by law or land registration obligations.</li>
              <li><strong>Service providers:</strong> our secure cloud database provider (MongoDB Atlas) and file hosting provider (Cloudinary), both operating under data processing agreements.</li>
              <li><strong>Courier services:</strong> DHL or equivalent, for delivery of physical title documentation to your address.</li>
            </ul>
            <p>
              We do not transfer personal data to countries outside Ghana or your country of residence except as
              strictly necessary for the above purposes, and only where adequate data protection safeguards are in place.
            </p>
          </LegalSection>

          <LegalSection title="7. Data Security">
            <p>
              We implement appropriate technical and organisational measures to protect your personal data
              against accidental loss, unauthorised access, alteration, or disclosure. These include:
            </p>
            <ul>
              <li>SSL/TLS encryption for all data transmitted between your browser and our servers.</li>
              <li>Access controls limiting which team members can view personal data.</li>
              <li>Secure, password-protected database hosting on MongoDB Atlas.</li>
              <li>Regular review of our information security practices.</li>
            </ul>
            <p>
              Notwithstanding these measures, no method of transmission or storage is 100% secure. You transmit
              data at your own risk.
            </p>
          </LegalSection>

          <LegalSection title="8. Your Rights">
            <p>Under the Ghana Data Protection Act 2012 and, where applicable, the EU General Data Protection Regulation (GDPR), you have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal data we hold about you.</li>
              <li><strong>Rectification</strong> of inaccurate or incomplete data.</li>
              <li><strong>Erasure</strong> ("right to be forgotten") of your data, subject to legal retention obligations.</li>
              <li><strong>Restriction</strong> of processing in certain circumstances.</li>
              <li><strong>Portability</strong> of your data in a structured, machine-readable format.</li>
              <li><strong>Object</strong> to processing based on legitimate interests.</li>
              <li><strong>Withdraw consent</strong> at any time where processing is based on consent, without affecting the lawfulness of processing carried out before withdrawal.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We will respond within 30 days.
            </p>
          </LegalSection>

          <LegalSection title="9. Cookies">
            <p>
              Our Site uses essential cookies required for normal operation (e.g., session management).
              We do not use advertising cookies, tracking pixels, or third-party analytics cookies that
              identify you personally. By using the Site, you consent to the placement of essential cookies.
            </p>
          </LegalSection>

          <LegalSection title="10. Third-Party Links">
            <p>
              The Site may contain links to third-party websites including Calendly (for booking consultations)
              and WhatsApp. We are not responsible for the privacy practices of those services and encourage
              you to review their respective privacy policies.
            </p>
          </LegalSection>

          <LegalSection title="11. Children's Privacy">
            <p>
              Our Site and services are not directed to individuals under the age of 18. We do not knowingly
              collect personal data from minors. If you believe we have inadvertently collected such data,
              please contact us immediately so we can delete it.
            </p>
          </LegalSection>

          <LegalSection title="12. Changes to This Policy">
            <p>
              We reserve the right to update this Privacy Policy at any time. Material changes will be
              notified by updating the "Effective date" above and, where appropriate, by email to registered
              clients. Continued use of the Site after changes are posted constitutes acceptance of the
              updated policy.
            </p>
          </LegalSection>

          <LegalSection title="13. Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our
              data practices, please contact our Data Protection point of contact:
            </p>
            <address className="not-italic">
              <strong>{COMPANY}</strong><br />
              Central Region, Ghana<br />
              Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
              WhatsApp: +1 248-210-8333
            </address>
          </LegalSection>

          <div className="mt-12 pt-6 border-t border-gray-100">
            <p className="text-gray-400 text-sm">
              This policy is governed by the laws of the Republic of Ghana. For disputes relating to data
              processing, you may also lodge a complaint with the{" "}
              <strong>Data Protection Commission of Ghana</strong>.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="/terms" className="text-green-700 text-sm font-semibold hover:text-green-900 underline underline-offset-2">
                Terms & Conditions →
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
      <div className="text-gray-600 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </div>
  );
}
