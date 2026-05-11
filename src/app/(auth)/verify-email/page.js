"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Verification failed.");
        return;
      }

      setSuccess("Email verified successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setResending(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to resend code.");
        return;
      }

      setSuccess("A new code has been sent to your email.");
      setCountdown(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8 w-fit mx-auto">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h20M6 20V10l6-7 6 7v10" />
              <path d="M10 20v-5h4v5" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[18px] font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Crownledger
            </span>
            <span className="text-[9px] font-medium text-gray-400 tracking-[2px] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Private Banking
            </span>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

          {/* Icon */}
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Check your email
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              We sent a 6-digit verification code to
            </p>
            <p className="text-sm font-semibold text-blue-600 mt-1">
              {email || "your email address"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {success}
            </div>
          )}

          {/* OTP inputs */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 
                    text-gray-900 focus:outline-none transition-all duration-200
                    ${digit
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.join("").length < 6}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  Verify Email
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Resend */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 mb-2">Didn't receive a code?</p>
            <button
              onClick={handleResend}
              disabled={countdown > 0 || resending}
              className="text-sm font-semibold text-blue-600 hover:underline disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
            >
              {resending
                ? "Resending..."
                : countdown > 0
                ? `Resend code in ${countdown}s`
                : "Resend code"}
            </button>
          </div>

          {/* Back to signup */}
          <div className="text-center mt-4">
            <Link href="/signup" className="text-sm text-gray-400 hover:text-gray-600 transition">
              ← Back to sign up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}