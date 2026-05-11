"use client";

import { useState } from "react";
import Link from "next/link";

export default function TransferPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    fromAccount: "checking",
    toAccount: "",
    routingNumber: "",
    accountNumber: "",
    recipientName: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleStepOne = (e) => {
    e.preventDefault();
    if (!form.recipientName || !form.accountNumber || !form.routingNumber) {
      setError("Please fill in all recipient details.");
      return;
    }
    setStep(2);
  };

  const handleStepTwo = (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (Number(form.amount) > 12430) {
      setError("Insufficient funds in your checking account.");
      return;
    }
    setStep(3);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const accounts = [
    { value: "checking", label: "Checking Account", balance: "$12,430.00" },
    { value: "savings", label: "Savings Account", balance: "$71,820.00" },
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Transfer Successful!
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            You have successfully sent
          </p>
          <p className="text-4xl font-bold text-blue-600 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            ${Number(form.amount).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            to <span className="font-semibold text-gray-900">{form.recipientName}</span>
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 text-left mb-8 space-y-3">
            {[
              { label: "From", value: accounts.find(a => a.value === form.fromAccount)?.label },
              { label: "To Account", value: `****${form.accountNumber.slice(-4)}` },
              { label: "Routing Number", value: form.routingNumber },
              { label: "Description", value: form.description || "No description" },
              { label: "Date", value: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
              { label: "Status", value: "Completed" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                <span className={`text-xs font-semibold ${item.label === "Status" ? "text-green-500" : "text-gray-700"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setSuccess(false); setStep(1); setForm({ fromAccount: "checking", toAccount: "", routingNumber: "", accountNumber: "", recipientName: "", amount: "", description: "" }); }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              New Transfer
            </button>
            <Link
              href="/dashboard"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition text-center"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Send Money
          </h1>
          <p className="text-xs text-gray-400">Transfer funds to any US bank account</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["Recipient", "Amount", "Confirm"].map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0
                ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {step > i + 1 ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step >= i + 1 ? "text-blue-600" : "text-gray-400"}`}>
                {label}
              </span>
              {i < 2 && <div className={`flex-1 h-px ${step > i + 1 ? "bg-blue-300" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

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

          {/* Step 1 — Recipient */}
          {step === 1 && (
            <form onSubmit={handleStepOne} className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Recipient Details
                </h2>
                <p className="text-sm text-gray-500">Enter the details of who you're sending money to.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  From Account
                </label>
                <select
                  name="fromAccount"
                  value={form.fromAccount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                >
                  {accounts.map((acc) => (
                    <option key={acc.value} value={acc.value}>
                      {acc.label} — {acc.balance}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Routing Number
                </label>
                <input
                  type="text"
                  name="routingNumber"
                  value={form.routingNumber}
                  onChange={handleChange}
                  placeholder="9 digit routing number"
                  maxLength={9}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  placeholder="Recipient account number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
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
          )}

          {/* Step 2 — Amount */}
          {step === 2 && (
            <form onSubmit={handleStepTwo} className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Enter Amount
                </h2>
                <p className="text-sm text-gray-500">
                  Sending to <span className="font-semibold text-gray-700">{form.recipientName}</span>
                </p>
              </div>

              {/* Big amount input */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">Amount</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-bold text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>$</span>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="text-5xl font-bold text-gray-900 bg-transparent border-none outline-none text-center w-48 placeholder-gray-300"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Available: <span className="font-semibold text-gray-600">
                    {accounts.find(a => a.value === form.fromAccount)?.balance}
                  </span>
                </p>
              </div>

              {/* Quick amounts */}
              <div className="grid grid-cols-4 gap-2">
                {["50", "100", "250", "500"].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setForm({ ...form, amount: amt })}
                    className={`py-2 rounded-xl text-sm font-semibold border transition
                      ${form.amount === amt
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                      }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="What's this transfer for?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                />
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
                  Review Transfer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* Step 3 — Confirm */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Confirm Transfer
                </h2>
                <p className="text-sm text-gray-500">Please review the details before confirming.</p>
              </div>

              {/* Summary */}
              <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
                <p className="text-sm opacity-75 mb-2">You are sending</p>
                <p className="text-5xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  ${Number(form.amount).toFixed(2)}
                </p>
                <p className="text-sm opacity-75">to <span className="font-semibold opacity-100">{form.recipientName}</span></p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                {[
                  { label: "From", value: accounts.find(a => a.value === form.fromAccount)?.label },
                  { label: "Recipient", value: form.recipientName },
                  { label: "Account Number", value: `****${form.accountNumber.slice(-4)}` },
                  { label: "Routing Number", value: form.routingNumber },
                  { label: "Description", value: form.description || "No description" },
                  { label: "Transfer Fee", value: "Free" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    <span className={`text-xs font-semibold ${item.label === "Transfer Fee" ? "text-green-500" : "text-gray-700"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700">Total</span>
                  <span className="text-sm font-bold text-gray-900">${Number(form.amount).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className="text-xs text-yellow-700 leading-relaxed">
                  Please verify all details carefully. Transfers cannot be reversed once confirmed.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Transfer
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}