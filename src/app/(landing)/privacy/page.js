import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Crownledger",
  description: "Read Crownledger's privacy policy to understand how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us when you create an account, make transactions, or contact support. This includes:
      
- Personal identification information (name, email address, phone number, date of birth)
- Financial information (account numbers, transaction history, balance information)
- Device and usage data (IP address, browser type, operating system, pages visited)
- Communication data (emails, chat messages, support tickets)

We also collect information automatically through cookies and similar tracking technologies when you use our services.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:

- Provide, maintain, and improve our banking services
- Process transactions and send related information
- Send technical notices, updates, and security alerts
- Respond to your comments and questions
- Monitor and analyze usage patterns to improve user experience
- Detect and prevent fraudulent transactions and other illegal activities
- Comply with legal obligations and regulatory requirements
- Verify your identity and prevent unauthorized access`,
    },
    {
      title: "3. How We Share Your Information",
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

- Service providers who assist us in operating our platform (payment processors, cloud hosting)
- Financial partners required for banking operations
- Law enforcement or regulatory bodies when required by law
- Other parties with your explicit consent

All third-party partners are bound by strict confidentiality agreements and data protection standards.`,
    },
    {
      title: "4. Data Security",
      content: `We implement industry-leading security measures to protect your personal information:

- 256-bit AES encryption for all data in transit and at rest
- Multi-factor authentication for account access
- Regular security audits and penetration testing
- Real-time fraud monitoring and detection systems
- Strict employee access controls and training

While we strive to protect your data, no security system is impenetrable. We encourage you to use strong passwords and enable two-factor authentication.`,
    },
    {
      title: "5. Data Retention",
      content: `We retain your personal information for as long as your account is active or as needed to provide services. We may retain certain information for longer periods as required by law, regulation, or for legitimate business purposes such as fraud prevention.

When you close your account, we will delete or anonymize your personal information within 90 days, unless we are required to retain it for legal or regulatory reasons.`,
    },
    {
      title: "6. Your Rights and Choices",
      content: `You have the following rights regarding your personal information:

- Access: Request a copy of the personal data we hold about you
- Correction: Request that we correct inaccurate or incomplete data
- Deletion: Request that we delete your personal data (subject to legal requirements)
- Portability: Request a machine-readable copy of your data
- Opt-out: Opt out of marketing communications at any time

To exercise any of these rights, contact us at support@crownledgerapp.com.`,
    },
    {
      title: "7. Cookies and Tracking",
      content: `We use cookies and similar technologies to:

- Keep you logged in to your account
- Remember your preferences and settings
- Analyze how our services are used
- Detect and prevent fraud

You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our services.`,
    },
    {
      title: "8. Children's Privacy",
      content: `Crownledger services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information.`,
    },
    {
      title: "9. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or through a prominent notice on our platform. Your continued use of our services after the effective date of any changes constitutes your acceptance of the updated policy.`,
    },
    {
      title: "10. Contact Us",
      content: `If you have questions about this Privacy Policy or our data practices, please contact us:

Email: privacy@crownledgerapp.com
Phone: +1 (800) 276-9654
Address: 123 Wall Street, New York, NY 10005, United States`,
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
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Your privacy matters to us. This policy explains how we collect,
              use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: May 11, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-5 sticky top-24">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Contents
                  </p>
                  <ul className="space-y-2">
                    {sections.map((s, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="text-xs text-gray-500 hover:text-blue-600 transition leading-relaxed block"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Main content */}
              <div className="lg:col-span-3 space-y-10">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>Summary:</strong> Crownledger collects only the information necessary to provide banking services. We never sell your data. We protect your information with industry-leading security. You have full control over your data at all times.
                  </p>
                </div>

                {sections.map((section, i) => (
                  <div key={i} id={`section-${i}`} className="scroll-mt-24">
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
                    Have questions about this policy?{" "}
                    <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                      Contact our privacy team
                    </Link>
                    {" "}or email us at{" "}
                    <a href="mailto:privacy@crownledgerapp.com" className="text-blue-600 hover:underline font-medium">
                      privacy@crownledgerapp.com
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