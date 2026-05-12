"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function KYCPage() {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    documentType: "",
    documentNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "",
  });

  const [files, setFiles] = useState({
    documentFront: null,
    documentBack: null,
    selfie: null,
  });

  const [previews, setPreviews] = useState({
    documentFront: null,
    documentBack: null,
    selfie: null,
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchKYC();
  }, []);

  const fetchKYC = async () => {
    try {
      const res = await fetch("/api/user/kyc");
      const data = await res.json();
      setKyc(data.kyc || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB.");
      return;
    }

    setFiles({ ...files, [field]: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews({ ...previews, [field]: reader.result });
    };
    reader.readAsDataURL(file);
    setError("");
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "crownledger_kyc");
    formData.append("cloud_name", "dp6reb4rt");

   const res = await fetch(
  "https://api.cloudinary.com/v1_1/dpaqiub5f/image/upload",
  { method: "POST", body: formData }
);
    const data = await res.json();
    return data.secure_url;
  };

  const handleStepOne = (e) => {
    e.preventDefault();
    if (!form.documentType || !form.documentNumber || !form.dateOfBirth) {
      setError("Please fill in all document details.");
      return;
    }
    setStep(2);
    setError("");
  };

  const handleStepTwo = (e) => {
    e.preventDefault();
    if (!form.address || !form.city || !form.country) {
      setError("Please fill in all address details.");
      return;
    }
    setStep(3);
    setError("");
  };

  const handleStepThree = (e) => {
    e.preventDefault();
    if (!files.documentFront) {
      setError("Please upload the front of your document.");
      return;
    }
    setStep(4);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);
    setUploading(true);

    try {
      // Upload files to Cloudinary
      let documentFrontUrl = "";
      let documentBackUrl = "";
      let selfieUrl = "";

      if (files.documentFront) {
        documentFrontUrl = await uploadToCloudinary(files.documentFront);
      }
      if (files.documentBack) {
        documentBackUrl = await uploadToCloudinary(files.documentBack);
      }
      if (files.selfie) {
        selfieUrl = await uploadToCloudinary(files.selfie);
      }

      setUploading(false);

      const res = await fetch("/api/user/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          documentFront: documentFrontUrl,
          documentBack: documentBackUrl,
          selfie: selfieUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess(true);
      fetchKYC();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const documentTypes = [
    { value: "passport", label: "Passport", icon: "🛂" },
    { value: "drivers_license", label: "Driver's License", icon: "🪪" },
    { value: "national_id", label: "National ID Card", icon: "🪪" },
    { value: "residence_permit", label: "Residence Permit", icon: "📄" },
  ];

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany",
    "France", "Nigeria", "Ghana", "South Africa", "Kenya", "India",
    "China", "Japan", "Brazil", "Mexico", "UAE", "Saudi Arabia",
    "Singapore", "Netherlands", "Sweden", "Norway", "Denmark",
    "Switzerland", "Italy", "Spain", "Portugal", "Poland", "Other"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Already submitted — show status
  if (kyc) {
    const statusConfig = {
      pending: {
        title: "Verification Under Review",
        desc: "Your documents have been submitted and are being reviewed by our team. This usually takes 1-2 business days.",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-100",
        icon: (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
        ),
      },
      approved: {
        title: "Identity Verified ✅",
        desc: "Your identity has been successfully verified. Your account now has full access to all Crownledger features.",
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-100",
        icon: (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ),
      },
      rejected: {
        title: "Verification Rejected ❌",
        desc: `Your KYC was rejected. ${kyc.rejectionReason ? `Reason: ${kyc.rejectionReason}.` : ""} Please resubmit with valid documents.`,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-100",
        icon: (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        ),
      },
    };

    const s = statusConfig[kyc.status];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Identity Verification
            </h1>
            <p className="text-xs text-gray-400">KYC Status</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
          <div className={`${s.bg} border ${s.border} rounded-3xl p-8 text-center`}>
            <div className="flex justify-center mb-4">{s.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {s.title}
            </h2>
            <p className={`text-sm leading-relaxed ${s.color}`}>{s.desc}</p>
          </div>

          {/* Submission details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Submission Details
            </h3>
            {[
              { label: "Document Type", value: kyc.documentType?.replace("_", " ") },
              { label: "Document Number", value: `****${kyc.documentNumber?.slice(-4)}` },
              { label: "Date of Birth", value: kyc.dateOfBirth },
              { label: "Country", value: kyc.country },
              { label: "Submitted", value: new Date(kyc.submittedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
              { label: "Status", value: kyc.status, colored: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                <span className={`text-xs font-semibold capitalize
                  ${item.colored
                    ? kyc.status === "approved" ? "text-green-600"
                      : kyc.status === "pending" ? "text-yellow-600"
                      : "text-red-500"
                    : "text-gray-700"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Document images */}
          {(kyc.documentFront || kyc.selfie) && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Submitted Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {kyc.documentFront && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium">Front</p>
                    <img src={kyc.documentFront} alt="Document Front" className="w-full h-32 object-cover rounded-xl border border-gray-100" />
                  </div>
                )}
                {kyc.documentBack && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium">Back</p>
                    <img src={kyc.documentBack} alt="Document Back" className="w-full h-32 object-cover rounded-xl border border-gray-100" />
                  </div>
                )}
                {kyc.selfie && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium">Selfie</p>
                    <img src={kyc.selfie} alt="Selfie" className="w-full h-32 object-cover rounded-xl border border-gray-100" />
                  </div>
                )}
              </div>
            </div>
          )}

          {kyc.status === "rejected" && (
            <button
              onClick={() => setKyc(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Resubmit Documents
            </button>
          )}

          <Link href="/dashboard" className="block w-full text-center bg-white border border-gray-200 hover:border-blue-300 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Identity Verification
          </h1>
          <p className="text-xs text-gray-400">KYC — Know Your Customer</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {success ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Documents Submitted!
            </h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Your identity documents have been submitted successfully. Our team will review them within 1-2 business days and notify you by email.
            </p>
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition"
              style={{ fontFamily: "'Outfit', sans-serif" }}>
              Back to Dashboard
            </Link>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                {["Document Info", "Address", "Upload Docs", "Review"].map((label, i) => (
                  <div key={i} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all
                      ${step > i + 1 ? "bg-green-500 text-white"
                        : step === i + 1 ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-400"}`}>
                      {step > i + 1 ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : i + 1}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${step >= i + 1 ? "text-blue-600" : "text-gray-400"}`}>
                      {label}
                    </span>
                    {i < 3 && <div className={`flex-1 h-px ${step > i + 1 ? "bg-blue-300" : "bg-gray-200"}`} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Info banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Why we need this
                </p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  To comply with banking regulations and protect your account, we are required to verify your identity. Your data is encrypted and handled securely.
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* Step 1 — Document Info */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Document Information
                </h2>
                <p className="text-sm text-gray-500 mb-6">Select your ID type and enter the details.</p>

                <form onSubmit={handleStepOne} className="space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Document Type <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {documentTypes.map((doc) => (
                        <button
                          key={doc.value}
                          type="button"
                          onClick={() => setForm({ ...form, documentType: doc.value })}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition text-left
                            ${form.documentType === doc.value
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                            }`}
                        >
                          <span className="text-xl">{doc.icon}</span>
                          <span className="text-xs">{doc.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Document Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="documentNumber"
                      value={form.documentNumber}
                      onChange={handleChange}
                      placeholder="e.g. A12345678"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Date of Birth <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {/* Step 2 — Address */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Address Information
                </h2>
                <p className="text-sm text-gray-500 mb-6">Enter your current residential address.</p>

                <form onSubmit={handleStepTwo} className="space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Street Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        City <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Country <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                      >
                        <option value="">Select</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3 — Upload Documents */}
            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Upload Documents
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Upload clear photos of your documents. Max 5MB per file.
                </p>

                <form onSubmit={handleStepThree} className="space-y-5">
                  {/* Document front */}
                  {[
                    { field: "documentFront", label: "Document Front", required: true, desc: "Front side of your ID document" },
                    { field: "documentBack", label: "Document Back (Optional)", required: false, desc: "Back side of your ID (if applicable)" },
                    { field: "selfie", label: "Selfie with Document (Optional)", required: false, desc: "Hold your document next to your face" },
                  ].map((item) => (
                    <div key={item.field} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        {item.label} {item.required && <span className="text-red-400">*</span>}
                      </label>
                      <p className="text-xs text-gray-400">{item.desc}</p>

                      {previews[item.field] ? (
                        <div className="relative">
                          <img
                            src={previews[item.field]}
                            alt={item.label}
                            className="w-full h-40 object-cover rounded-xl border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFiles({ ...files, [item.field]: null });
                              setPreviews({ ...previews, [item.field]: null });
                            }}
                            className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 transition"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-xl p-8 cursor-pointer transition hover:bg-blue-50/30">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-blue-600">Click to upload</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 5MB</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, item.field)}
                          />
                        </label>
                      )}
                    </div>
                  ))}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4 — Review & Submit */}
            {step === 4 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Review & Submit
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Review your information before submitting.
                </p>

                <div className="space-y-4">
                  {/* Document info review */}
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Document Info</h3>
                    {[
                      { label: "Document Type", value: form.documentType?.replace("_", " ") },
                      { label: "Document Number", value: `****${form.documentNumber?.slice(-4)}` },
                      { label: "Date of Birth", value: form.dateOfBirth },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                        <span className="text-xs text-gray-400">{item.label}</span>
                        <span className="text-xs font-semibold text-gray-700 capitalize">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Address review */}
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Address</h3>
                    {[
                      { label: "Street", value: form.address },
                      { label: "City", value: form.city },
                      { label: "Country", value: form.country },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                        <span className="text-xs text-gray-400">{item.label}</span>
                        <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Document previews */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Documents</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {previews.documentFront && (
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Front</p>
                          <img src={previews.documentFront} alt="Front" className="w-full h-24 object-cover rounded-xl" />
                        </div>
                      )}
                      {previews.documentBack && (
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Back</p>
                          <img src={previews.documentBack} alt="Back" className="w-full h-24 object-cover rounded-xl" />
                        </div>
                      )}
                      {previews.selfie && (
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Selfie</p>
                          <img src={previews.selfie} alt="Selfie" className="w-full h-24 object-cover rounded-xl" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-xs text-blue-700 leading-relaxed">
                      By submitting, you confirm that all information provided is accurate and that the documents belong to you. False information may result in account suspension.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          {uploading ? "Uploading..." : "Submitting..."}
                        </>
                      ) : (
                        <>
                          Submit for Verification
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}