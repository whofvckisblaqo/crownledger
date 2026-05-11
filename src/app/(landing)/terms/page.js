import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — Crownledger",
  description: "Read Crownledger's terms of service and user agreement.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By opening a Crownledger account or using any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.

These Terms constitute a legally binding agreement between you and Crownledger Inc. We reserve the right to modify these Terms at any time. Continued use of our services after any changes constitutes your acceptance of the new Terms.`,
    },
    {
      title: "2. Eligibility",
      content: `To use Crownledger services, you must:

- Be at least 18 years of age
- Be a legal resident of the United States
- Have a valid Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN)
- Not be prohibited from using financial services under applicable law
- Provide accurate and complete information during registration

We reserve the right to refuse service to anyone for any reason at any time.`,
    },
    {
      title: "3. Account Registration and Security",
      content: `When creating an account, you agree to:

- Provide accurate, current, and complete information
- Maintain and update your information to keep it accurate
- Keep your password and account credentials confidential
- Notify us immediately of any unauthorized use of your account
- Accept responsibility for all activities that occur under your account

You are responsible for maintaining the security of your account. Crownledger will not be liable for any loss resulting from unauthorized use of your account.`,
    },
    {
      title: "4. Banking Services",
      content: `Crownledger provides the following banking services:

- Checking accounts with unlimited transactions
- High-yield savings accounts with up to 5.00% APY
- Debit card issuance and management
- Domestic wire and ACH transfers
- Bill payment services

All banking services are subject to applicable federal and state banking regulations. We reserve the right to modify, suspend, or discontinue any service at any time.`,
    },
    {
      title: "5. Fees and Pricing",
      content: `Our current pricing plans are as follows:

- Free Plan: $0/month — includes basic checking, savings, and 10 transfers/month
- Premium Plan: $9/month — includes unlimited transfers, physical card, and premium features
- Business Plan: $29/month — includes team accounts, bulk payments, and dedicated support

We reserve the right to change our fee structure with 30 days advance notice. Continued use after such notice constitutes acceptance of new fees.`,
    },
    {
      title: "6. Prohibited Activities",
      content: `You agree not to use Crownledger services for:

- Money laundering or financing of illegal activities
- Fraud, identity theft, or impersonation
- Unauthorized access to other accounts or systems
- Violation of any applicable laws or regulations
- Harassment, abuse, or harm to other users
- Any activity that disrupts or interferes with our services

Violation of these prohibitions may result in immediate account suspension and reporting to relevant authorities.`,
    },
    {
      title: "7. Dispute Resolution",
      content: `If you have a dispute with Crownledger, you agree to first contact us at support@crownledgerapp.com to resolve the issue informally.

If the dispute cannot be resolved informally within 30 days, you agree to resolve it through binding arbitration under the American Arbitration Association rules. You waive your right to participate in class action lawsuits.

Nothing in this section prevents either party from seeking injunctive or other equitable relief for urgent matters.`,
    },
    {
      title: "8. Limitation of Liability",
      content: `To the maximum extent permitted by law, Crownledger shall not be liable for:

- Any indirect, incidental, or consequential damages
- Loss of profits, data, or business opportunities
- Service interruptions or technical failures
- Unauthorized access to your account despite reasonable security measures
- Actions of third-party service providers

Our total liability to you for any claim shall not exceed the amount you paid us in the 12 months preceding the claim.`,
    },
    {
      title: "9. Termination",
      content: `Either party may terminate this agreement at any time:

- You may close your account by contacting support
- We may suspend or close your account if you violate these Terms
- We may close your account with 30 days notice for any reason

Upon termination, you must withdraw all funds from your account. Unclaimed funds will be handled in accordance with applicable unclaimed property laws.`,
    },
    {
      title: "10. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.

Any legal action arising from these Terms must be filed in the state or federal courts located in New York County, New York, and you consent to personal jurisdiction in such courts.`,
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Legal</p>
            <h1
              className="text-5xl font-bold text-gray-900 mb-5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Terms of Service
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Please read these terms carefully before using Crownledger services.
              By using our services you agree to these terms.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last updated: May 11, 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-5 sticky top-24">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Contents</p>
                  <ul className="space-y-2">
                    {sections.map((s, i) => (
                      <li key={i}>
                        <a href={`#term-${i}`} className="text-xs text-gray-500 hover:text-blue-600 transition leading-relaxed block">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Main content */}
              <div className="lg:col-span-3 space-y-10">
                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    <strong>Important:</strong> These Terms of Service constitute a legally binding agreement. By using Crownledger, you agree to be bound by these terms. Please read them carefully.
                  </p>
                </div>

                {sections.map((section, i) => (
                  <div key={i} id={`term-${i}`} className="scroll-mt-24">
                    <h2
                      className="text-xl font-bold text-gray-900 mb-4"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {section.title}
                    </h2>
                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-100 pt-8">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Questions about our Terms of Service?{" "}
                    <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                      Contact our legal team
                    </Link>
                    {" "}or email{" "}
                    <a href="mailto:legal@crownledgerapp.com" className="text-blue-600 hover:underline font-medium">
                      legal@crownledgerapp.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}