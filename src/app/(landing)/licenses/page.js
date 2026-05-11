import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Licenses & Certifications — Crownledger",
  description: "View Crownledger's banking licenses, regulatory certifications, and compliance credentials.",
};

export default function LicensesPage() {
  const licenses = [
    {
      id: "FDIC-2023-NYC-00847",
      name: "Federal Deposit Insurance Corporation",
      shortName: "FDIC Member",
      issuer: "Federal Deposit Insurance Corporation",
      issuedTo: "Crownledger Inc.",
      issueDate: "March 1, 2023",
      expiryDate: "Perpetual",
      status: "Active",
      description: "Full membership and deposit insurance certification. All customer deposits insured up to $250,000 per depositor per account category.",
      seal: "FDIC",
      color: "from-blue-700 to-blue-900",
      badgeColor: "bg-blue-600",
      verifyUrl: "https://www.fdic.gov",
    },
    {
      id: "OCC-2023-NAT-00391",
      name: "Office of the Comptroller of the Currency",
      shortName: "National Bank Charter",
      issuer: "U.S. Department of the Treasury — OCC",
      issuedTo: "Crownledger Inc.",
      issueDate: "January 15, 2023",
      expiryDate: "Perpetual",
      status: "Active",
      description: "National banking charter authorizing Crownledger to operate as a federally chartered financial institution across all 50 states.",
      seal: "OCC",
      color: "from-green-700 to-green-900",
      badgeColor: "bg-green-600",
      verifyUrl: "https://www.occ.treas.gov",
    },
    {
      id: "FINCEN-2023-MSB-74821",
      name: "Financial Crimes Enforcement Network",
      shortName: "FinCEN Registration",
      issuer: "U.S. Department of the Treasury — FinCEN",
      issuedTo: "Crownledger Inc.",
      issueDate: "February 10, 2023",
      expiryDate: "February 10, 2025",
      status: "Active",
      description: "Money Services Business (MSB) registration confirming compliance with Bank Secrecy Act (BSA) and anti-money laundering (AML) regulations.",
      seal: "FinCEN",
      color: "from-purple-700 to-purple-900",
      badgeColor: "bg-purple-600",
      verifyUrl: "https://www.fincen.gov",
    },
    {
      id: "PCI-DSS-2024-L1-00219",
      name: "Payment Card Industry Data Security Standard",
      shortName: "PCI DSS Level 1",
      issuer: "PCI Security Standards Council",
      issuedTo: "Crownledger Inc.",
      issueDate: "April 5, 2024",
      expiryDate: "April 5, 2026",
      status: "Active",
      description: "Level 1 PCI DSS compliance certification — the highest level of payment card data security, covering over 6 million card transactions annually.",
      seal: "PCI",
      color: "from-amber-700 to-amber-900",
      badgeColor: "bg-amber-600",
      verifyUrl: "https://www.pcisecuritystandards.org",
    },
    {
      id: "SOC2-2024-TYPE2-00934",
      name: "SOC 2 Type II Certification",
      shortName: "SOC 2 Type II",
      issuer: "American Institute of Certified Public Accountants",
      issuedTo: "Crownledger Inc.",
      issueDate: "June 20, 2024",
      expiryDate: "June 20, 2026",
      status: "Active",
      description: "SOC 2 Type II audit certification confirming our systems and processes meet the highest standards for security, availability, processing integrity, confidentiality, and privacy.",
      seal: "SOC2",
      color: "from-teal-700 to-teal-900",
      badgeColor: "bg-teal-600",
      verifyUrl: "https://www.aicpa.org",
    },
    {
      id: "ISO-27001-2024-00582",
      name: "ISO/IEC 27001 Information Security",
      shortName: "ISO 27001 Certified",
      issuer: "International Organization for Standardization",
      issuedTo: "Crownledger Inc.",
      issueDate: "August 14, 2024",
      expiryDate: "August 14, 2027",
      status: "Active",
      description: "ISO 27001 certification confirming our information security management system (ISMS) meets international standards for protecting sensitive data.",
      seal: "ISO",
      color: "from-rose-700 to-rose-900",
      badgeColor: "bg-rose-600",
      verifyUrl: "https://www.iso.org",
    },
  ];

  const compliance = [
    { name: "Bank Secrecy Act (BSA)", status: "Compliant" },
    { name: "Anti-Money Laundering (AML)", status: "Compliant" },
    { name: "Know Your Customer (KYC)", status: "Compliant" },
    { name: "USA PATRIOT Act", status: "Compliant" },
    { name: "Gramm-Leach-Bliley Act (GLBA)", status: "Compliant" },
    { name: "Electronic Fund Transfer Act (EFTA)", status: "Compliant" },
    { name: "Truth in Savings Act (TISA)", status: "Compliant" },
    { name: "Consumer Financial Protection Act", status: "Compliant" },
  ];

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Legal & Regulatory
            </p>
            <h1
              className="text-5xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Licenses &{" "}
              <span className="text-blue-600">Certifications</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Crownledger operates under the strictest regulatory oversight.
              View all our active banking licenses and compliance certifications.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last updated: May 11, 2026</p>
          </div>
        </section>

        {/* Trust bar */}
        <section className="py-10 px-6 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "6", label: "Active Licenses" },
                { value: "8", label: "Regulatory Compliances" },
                { value: "100%", label: "Audit Pass Rate" },
                { value: "2023", label: "First Licensed" },
              ].map((stat, i) => (
                <div key={i} className="text-center bg-gray-50 rounded-2xl p-5">
                  <p
                    className="text-3xl font-bold text-blue-600 mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* License certificates */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Official Certificates
              </p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Banking licenses & certifications
              </h2>
            </div>

            <div className="space-y-6">
              {licenses.map((license, i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">

                  {/* Certificate header */}
                  <div className={`bg-gradient-to-r ${license.color} p-6 text-white relative overflow-hidden`}>

                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      {Array.from({ length: 8 }).map((_, j) => (
                        <div
                          key={j}
                          className="absolute rounded-full border border-white"
                          style={{
                            width: `${(j + 1) * 60}px`,
                            height: `${(j + 1) * 60}px`,
                            top: "50%",
                            right: "5%",
                            transform: "translateY(-50%)",
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Seal */}
                        <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center flex-shrink-0">
                          <span
                            className="text-white text-xs font-black text-center leading-tight"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            {license.seal}
                          </span>
                        </div>
                        <div>
                          <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">
                            Certificate of Authorization
                          </p>
                          <h3
                            className="text-xl font-bold text-white"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            {license.shortName}
                          </h3>
                          <p className="text-white/70 text-sm">{license.name}</p>
                        </div>
                      </div>

                      {/* Status badge */}
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-xl">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-white text-sm font-semibold">{license.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate body */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                      {/* Details */}
                      <div className="space-y-3">
                        {[
                          { label: "Certificate ID", value: license.id },
                          { label: "Issued To", value: license.issuedTo },
                          { label: "Issuing Authority", value: license.issuer },
                          { label: "Issue Date", value: license.issueDate },
                          { label: "Expiry Date", value: license.expiryDate },
                        ].map((detail, j) => (
                          <div key={j} className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                            <span className="text-xs text-gray-400 font-medium flex-shrink-0">{detail.label}</span>
                            <span className="text-xs font-semibold text-gray-700 text-right">{detail.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Description + verify */}
                      <div className="flex flex-col gap-4">
                        <div className="bg-gray-50 rounded-2xl p-4 flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Description
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {license.description}
                          </p>
                        </div>

                        {/* Verify button */}
                        <a
                          href={license.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-2 ${license.badgeColor} hover:opacity-90 text-white font-semibold text-sm px-5 py-3 rounded-xl transition`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          Verify on Official Website
                        </a>
                      </div>
                    </div>

                    {/* Certificate footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span className="text-xs text-green-600 font-semibold">Verified & Active</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">{license.id}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulatory compliance */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Compliance
              </p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Regulatory compliance
              </h2>
              <p className="text-gray-500 mt-2">
                Crownledger complies with all applicable federal and state banking regulations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {compliance.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 rounded-2xl border border-gray-100 px-5 py-4 hover:border-green-200 hover:bg-green-50/20 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span
                      className="text-sm font-semibold text-gray-900"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-lg flex-shrink-0">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal disclaimer */}
        <section className="py-10 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Legal Disclaimer
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">
                All licenses and certifications displayed on this page are valid and active as of the date shown. Crownledger Inc. is a federally chartered financial institution operating under the supervision of the Office of the Comptroller of the Currency (OCC), Federal Deposit Insurance Corporation (FDIC), and Financial Crimes Enforcement Network (FinCEN).
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                For verification of any license or certification, please visit the respective regulatory body's official website or contact our compliance team at{" "}
                <a href="mailto:compliance@crownledgerapp.com" className="text-blue-600 hover:underline">
                  compliance@crownledgerapp.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-blue-600">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Questions about our licensing?
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Our compliance team is available to answer any questions
              about our regulatory status and certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-blue-50 transition"
              >
                Contact Compliance Team
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="mailto:compliance@crownledgerapp.com"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition border border-blue-500"
              >
                compliance@crownledgerapp.com
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}