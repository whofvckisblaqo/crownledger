"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TransferPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [transferType, setTransferType] = useState("external");
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResults, setLookupResults] = useState([]);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [selectedInternalUser, setSelectedInternalUser] = useState(null);

  const [form, setForm] = useState({
    fromAccount: "checking",
    recipientName: "",
    recipientBank: "",
    routingNumber: "",
    accountNumber: "",
    amount: "",
    description: "",
  });

  const banks = [
    "Bank of America", "Chase Bank", "Wells Fargo", "Citibank",
    "U.S. Bank", "Capital One", "TD Bank", "PNC Bank",
    "Goldman Sachs", "Morgan Stanley", "Truist Bank", "Fifth Third Bank",
    "Ally Bank", "Discover Bank", "Navy Federal Credit Union", "USAA",
    "Regions Bank", "KeyBank", "Huntington Bank", "Santander Bank",
    "Citizens Bank", "First Republic Bank", "Other",
  ];

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/user/accounts");
      const data = await res.json();
      setAccounts(data.accounts || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getAccountBalance = (type) => {
    const acc = accounts.find((a) => a.type === type);
    return acc?.balance || 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLookup = async (query) => {
    setLookupQuery(query);
    if (query.length < 3) {
      setLookupResults([]);
      return;
    }
    setLookupLoading(true);
    try {
      const res = await fetch(`/api/user/lookup?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setLookupResults(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLookupLoading(false);
    }
  };

  const selectInternalUser = (user) => {
    setSelectedInternalUser(user);
    setForm({
      ...form,
      recipientName: `${user.firstName} ${user.lastName}`,
      accountNumber: user.accountNumber,
      routingNumber: user.routingNumber,
      recipientBank: "Crownledger Private Banking",
    });
    setLookupQuery(`${user.firstName} ${user.lastName}`);
    setLookupResults([]);
  };

  const handleStepOne = (e) => {
    e.preventDefault();

    if (transferType === "own") {
      const toAccount = accounts.find(
        (a) => a.type === (form.fromAccount === "checking" ? "savings" : "checking")
      );
      if (!toAccount) {
        setError("Destination account not found.");
        return;
      }
      setForm({
        ...form,
        accountNumber: toAccount.accountNumber,
        recipientName: `My ${form.fromAccount === "checking" ? "Savings" : "Checking"} Account`,
        recipientBank: "Crownledger Private Banking",
        routingNumber: "031176110",
      });
      setStep(2);
      setError("");
      return;
    }

    if (transferType === "internal" && !selectedInternalUser) {
      setError("Please select a Crownledger user.");
      return;
    }

    if (transferType === "external") {
      if (!form.recipientName || !form.recipientBank || !form.routingNumber || !form.accountNumber) {
        setError("Please fill in all recipient details.");
        return;
      }
      if (form.routingNumber.length !== 9) {
        setError("Routing number must be exactly 9 digits.");
        return;
      }
    }

    setStep(2);
    setError("");
  };

  const handleStepTwo = (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    const balance = getAccountBalance(form.fromAccount);
    if (Number(form.amount) > balance) {
      setError(`Insufficient funds. Available: $${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
      return;
    }
    setStep(3);
    setError("");
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/user/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          transferType,
          recipientUserId: selectedInternalUser?.id || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Transfer failed. Please try again.");
        return;
      }
      setReference(data.reference);
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const accountOptions = [
    {
      value: "checking",
      label: "Checking Account",
      balance: `$${getAccountBalance("checking").toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    },
    {
      value: "savings",
      label: "Savings Account",
      balance: `$${getAccountBalance("savings").toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    },
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Transfer Submitted!
          </h2>
          <p className="text-gray-500 text-sm mb-2">Your transfer is currently</p>
          <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 font-semibold text-sm px-4 py-2 rounded-full border border-yellow-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            Pending Approval
          </span>

          <p className="text-4xl font-bold text-blue-600 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            ${Number(form.amount).toFixed(2)}
          </p>

          <p className="text-sm text-gray-500 mb-8">
            to <span className="font-semibold text-gray-900">{form.recipientName}</span>
            {transferType === "internal" && (
              <span className="ml-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Crownledger User
              </span>
            )}
            {transferType === "own" && (
              <span className="ml-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                Own Account
              </span>
            )}
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 text-left mb-6 space-y-3">
            {[
              { label: "Reference", value: reference },
              { label: "From", value: accountOptions.find((a) => a.value === form.fromAccount)?.label },
              { label: "To Account", value: `****${form.accountNumber.slice(-4)}` },
              { label: "Transfer Type", value: transferType === "own" ? "Own Account" : transferType === "internal" ? "Crownledger Internal" : "External Bank" },
              { label: "Note", value: form.description || "No note" },
              { label: "Status", value: "Pending Approval" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                <span className={`text-xs font-semibold ${item.label === "Status" ? "text-yellow-600" : "text-gray-700"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <p className="text-xs text-blue-700 leading-relaxed">
              📧 A confirmation email has been sent to your inbox. You will receive another email once your transfer is approved or declined.
              {transferType === "internal" && " The recipient will also be notified upon approval."}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setSuccess(false);
                setStep(1);
                setTransferType("external");
                setSelectedInternalUser(null);
                setLookupQuery("");
                setForm({ fromAccount: "checking", recipientName: "", recipientBank: "", routingNumber: "", accountNumber: "", amount: "", description: "" });
              }}
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
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Send Money
          </h1>
          <p className="text-xs text-gray-400">Transfer funds to any account</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["Recipient", "Amount", "Confirm"].map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all
                ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}>
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

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
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
                <p className="text-sm text-gray-500">Choose where to send your money.</p>
              </div>

              {/* Transfer type toggle */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Transfer Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTransferType("own");
                      setSelectedInternalUser(null);
                      setLookupQuery("");
                      setForm({ ...form, recipientName: "My Savings Account", recipientBank: "Crownledger Private Banking", routingNumber: "031176110", accountNumber: "" });
                      setError("");
                    }}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold border transition
                      ${transferType === "own" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" />
                    </svg>
                    Own Account
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTransferType("internal");
                      setSelectedInternalUser(null);
                      setLookupQuery("");
                      setForm({ ...form, recipientName: "", recipientBank: "", routingNumber: "", accountNumber: "" });
                      setError("");
                    }}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold border transition
                      ${transferType === "internal" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 20h20M6 20V10l6-7 6 7v10" /><path d="M10 20v-5h4v5" />
                    </svg>
                    Crownledger User
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTransferType("external");
                      setSelectedInternalUser(null);
                      setLookupQuery("");
                      setForm({ ...form, recipientName: "", recipientBank: "", routingNumber: "", accountNumber: "" });
                      setError("");
                    }}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold border transition
                      ${transferType === "external" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
                    </svg>
                    Other Bank
                  </button>
                </div>
              </div>

              {/* From account */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">From Account</label>
                <select
                  name="fromAccount"
                  value={form.fromAccount}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm({
                      ...form,
                      fromAccount: val,
                      accountNumber: transferType === "own"
                        ? accounts.find((a) => a.type === (val === "checking" ? "savings" : "checking"))?.accountNumber || ""
                        : form.accountNumber,
                      recipientName: transferType === "own"
                        ? `My ${val === "checking" ? "Savings" : "Checking"} Account`
                        : form.recipientName,
                    });
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                >
                  {accountOptions.map((acc) => (
                    <option key={acc.value} value={acc.value}>
                      {acc.label} — {acc.balance}
                    </option>
                  ))}
                </select>
              </div>

              {/* Own account transfer */}
              {transferType === "own" && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-3">
                    Transferring To
                  </p>
                  <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-blue-100">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">
                        My {form.fromAccount === "checking" ? "Savings" : "Checking"} Account
                      </p>
                      <p className="text-xs text-gray-400">
                        ****{accounts.find((a) => a.type === (form.fromAccount === "checking" ? "savings" : "checking"))?.accountNumber?.slice(-4) || "—"}
                        {" · "}Balance: ${(accounts.find((a) => a.type === (form.fromAccount === "checking" ? "savings" : "checking"))?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="text-xs text-blue-600 mt-3 text-center">
                    Funds will be transferred instantly between your accounts upon approval.
                  </p>
                </div>
              )}

              {/* Internal transfer — search Crownledger users */}
              {transferType === "internal" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Search Crownledger User
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      value={lookupQuery}
                      onChange={(e) => {
                        handleLookup(e.target.value);
                        if (!e.target.value) setSelectedInternalUser(null);
                      }}
                      placeholder="Search by email or account number..."
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  {lookupLoading && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-gray-400">Searching...</span>
                    </div>
                  )}

                  {!lookupLoading && lookupResults.length > 0 && (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {lookupResults.map((u, i) => (
                        <div
                          key={i}
                          onClick={() => selectInternalUser(u)}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50 transition bg-white"
                        >
                          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{u.firstName?.[0]}{u.lastName?.[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900">{u.firstName} {u.lastName}</p>
                            <p className="text-xs text-gray-400">{u.email}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-mono text-blue-600">****{u.accountNumber?.slice(-4)}</p>
                            <p className="text-xs text-gray-400">Crownledger</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!lookupLoading && lookupQuery.length >= 3 && lookupResults.length === 0 && (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-xs text-gray-400 text-center">
                      No Crownledger user found with that email or account number
                    </div>
                  )}

                  {selectedInternalUser && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {selectedInternalUser.firstName?.[0]}{selectedInternalUser.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-blue-900">{selectedInternalUser.firstName} {selectedInternalUser.lastName}</p>
                          <p className="text-xs text-blue-600">****{selectedInternalUser.accountNumber?.slice(-4)} · Crownledger</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedInternalUser(null);
                          setLookupQuery("");
                          setForm({ ...form, recipientName: "", accountNumber: "", routingNumber: "" });
                        }}
                        className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* External transfer fields */}
              {transferType === "external" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Recipient Full Name</label>
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
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Recipient Bank</label>
                    <select
                      name="recipientBank"
                      value={form.recipientBank}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                    >
                      <option value="">Select a bank</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Routing Number</label>
                    <input
                      type="text"
                      name="routingNumber"
                      value={form.routingNumber}
                      onChange={handleChange}
                      placeholder="9-digit routing number"
                      maxLength={9}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                    {form.routingNumber && form.routingNumber.length !== 9 && (
                      <p className="text-xs text-red-400">Routing number must be 9 digits ({form.routingNumber.length}/9)</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Account Number</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={form.accountNumber}
                      onChange={handleChange}
                      placeholder="Recipient account number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>
                </>
              )}

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
                  {transferType === "internal" && (
                    <span className="ml-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      Crownledger User
                    </span>
                  )}
                  {transferType === "own" && (
                    <span className="ml-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      Own Account
                    </span>
                  )}
                </p>
              </div>

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
                    ${getAccountBalance(form.fromAccount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {["50", "100", "250", "500"].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setForm({ ...form, amount: amt })}
                    className={`py-2 rounded-xl text-sm font-semibold border transition
                      ${form.amount === amt ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Note (Optional)</label>
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
                <p className="text-sm text-gray-500">Review carefully before confirming.</p>
              </div>

              <div className="bg-blue-600 rounded-2xl p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
                <div className="relative">
                  <p className="text-sm opacity-75 mb-2">You are sending</p>
                  <p className="text-5xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    ${Number(form.amount).toFixed(2)}
                  </p>
                  <p className="text-sm opacity-75">
                    to <span className="font-semibold opacity-100">{form.recipientName}</span>
                  </p>
                  {transferType === "own" && (
                    <span className="inline-block mt-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Own Account Transfer
                    </span>
                  )}
                  {transferType === "internal" && (
                    <span className="inline-block mt-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Crownledger Internal Transfer
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                {[
                  { label: "From", value: accountOptions.find((a) => a.value === form.fromAccount)?.label },
                  { label: "Recipient", value: form.recipientName },
                  { label: "Bank", value: transferType === "own" || transferType === "internal" ? "Crownledger Private Banking" : form.recipientBank },
                  { label: "Account Number", value: `****${form.accountNumber.slice(-4)}` },
                  { label: "Routing Number", value: transferType === "external" ? form.routingNumber : "031176110" },
                  { label: "Transfer Type", value: transferType === "own" ? "Own Account" : transferType === "internal" ? "Crownledger Internal" : "External Bank" },
                  { label: "Note", value: form.description || "No note" },
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
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="text-xs text-yellow-700 leading-relaxed">
                  {transferType === "own"
                    ? "This transfer between your own accounts will be reviewed and processed upon approval."
                    : transferType === "internal"
                    ? "This transfer will be reviewed by our team. Once approved, the funds will be instantly credited to the recipient's Crownledger account."
                    : "Your transfer will be submitted as pending and must be approved by our team before funds are sent."
                  } You will receive an email notification once processed.
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Transfer
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