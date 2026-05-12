"use client";

import { useState, useEffect, useRef } from "react";
import { use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ReceiptPage({ params }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [transaction, setTransaction] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [txRes, accRes] = await Promise.all([
        fetch("/api/user/transactions"),
        fetch("/api/user/accounts"),
      ]);
      const txData = await txRes.json();
      const accData = await accRes.json();
      const tx = txData.transactions?.find((t) => t._id === id);
      setTransaction(tx || null);
      setAccounts(accData.accounts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isCredit = (tx) =>
    tx?.type === "deposit" ||
    accounts.some((a) => a.accountNumber === tx?.receiverAccount);

  const getDescription = (tx) => {
    try {
      const parsed = JSON.parse(tx.description);
      return {
        note: parsed.note || "",
        recipientName: parsed.recipientName || "",
        recipientBank: parsed.recipientBank || "",
        routingNumber: parsed.routingNumber || "",
        accountNumber: parsed.accountNumber || "",
      };
    } catch {
      return {
        note: tx?.description || "",
        recipientName: "",
        recipientBank: "",
        routingNumber: "",
        accountNumber: tx?.receiverAccount || "",
      };
    }
  };

  const handleDownload = () => {
    setDownloading(true);

    const style = document.createElement("style");
    style.id = "print-style";
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #receipt-print, #receipt-print * { visibility: visible; }
        #receipt-print {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          background: white;
          padding: 20px;
        }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    const receipt = receiptRef.current;
    if (receipt) receipt.id = "receipt-print";

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const s = document.getElementById("print-style");
        if (s) s.remove();
        if (receipt) receipt.removeAttribute("id");
        setDownloading(false);
      }, 1000);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-gray-700 font-semibold mb-2">Transaction not found</p>
          <Link href="/dashboard/transactions" className="text-blue-600 text-sm hover:underline">
            Back to transactions
          </Link>
        </div>
      </div>
    );
  }

  const credit = isCredit(transaction);
  const details = getDescription(transaction);

  const statusConfig = {
    completed: { label: "Completed", color: "text-green-600", bg: "bg-green-50", border: "border-green-100", dot: "bg-green-500" },
    pending: { label: "Pending", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100", dot: "bg-yellow-500 animate-pulse" },
    failed: { label: "Declined", color: "text-red-500", bg: "bg-red-50", border: "border-red-100", dot: "bg-red-500" },
  };
  const statusStyle = statusConfig[transaction.status] || statusConfig.completed;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/transactions" className="text-gray-400 hover:text-gray-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Transaction Receipt
            </h1>
            <p className="text-xs text-gray-400">{transaction.reference}</p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {downloading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Preparing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Receipt */}
        <div ref={receiptRef} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">

          {/* Receipt header */}
          <div
            className="px-8 py-8 text-white text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a56db, #0f3a8a)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

            <div className="relative">
              {/* Logo */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20h20M6 20V10l6-7 6 7v10" />
                    <path d="M10 20v-5h4v5" />
                  </svg>
                </div>
                <span className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Crownledger
                </span>
              </div>

              {/* Status icon */}
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                {transaction.status === "completed" ? (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : transaction.status === "pending" ? (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                )}
              </div>

              <p className="text-blue-200 text-sm font-medium mb-1">
                {transaction.status === "completed"
                  ? "Transfer Completed"
                  : transaction.status === "pending"
                  ? "Transfer Pending"
                  : "Transfer Declined"}
              </p>
              <p className="text-5xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ${transaction.amount?.toFixed(2)}
              </p>
              <p className="text-blue-200 text-sm">USD</p>
            </div>
          </div>

          {/* Dotted divider */}
          <div className="relative py-4 bg-gray-50">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full -translate-x-1/2 border border-gray-200" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full translate-x-1/2 border border-gray-200" />
            <div className="border-t-2 border-dashed border-gray-200 mx-6" />
          </div>

          {/* Receipt body */}
          <div className="px-8 py-6 space-y-4">

            {/* Status badge */}
            <div className="flex justify-center mb-2">
              <span className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border ${statusStyle.bg} ${statusStyle.color} ${statusStyle.border}`}>
                <div className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                {statusStyle.label}
              </span>
            </div>

            {/* Transaction details */}
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Transaction Details
              </h3>
              {[
                { label: "Reference Number", value: transaction.reference || "—", mono: true },
                { label: "Transaction Type", value: transaction.type?.charAt(0).toUpperCase() + transaction.type?.slice(1) || "—" },
                { label: "Date & Time", value: new Date(transaction.createdAt).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) },
                { label: "Amount", value: `$${transaction.amount?.toFixed(2)} USD` },
                { label: "Transfer Fee", value: "Free", green: true },
                { label: "Total Charged", value: `$${transaction.amount?.toFixed(2)} USD` },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                  <span className={`text-xs font-semibold
                    ${item.green ? "text-green-500"
                      : item.mono ? "text-blue-600 font-mono"
                      : "text-gray-700"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Sender details */}
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Sender
              </h3>
              {[
                { label: "Name", value: `${session?.user?.firstName} ${session?.user?.lastName}` },
                { label: "Account", value: accounts.find(a => a.type === "checking")?.accountNumber ? `****${accounts.find(a => a.type === "checking")?.accountNumber?.slice(-4)}` : "—" },
                { label: "Bank", value: "Crownledger Private Banking" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                  <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Recipient details */}
            {(details.recipientName || details.recipientBank || details.accountNumber) && (
              <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Recipient
                </h3>
                {[
                  details.recipientName && { label: "Name", value: details.recipientName },
                  details.recipientBank && { label: "Bank", value: details.recipientBank },
                  details.accountNumber && { label: "Account", value: `****${details.accountNumber.slice(-4)}` },
                  details.routingNumber && { label: "Routing Number", value: details.routingNumber },
                  details.note && { label: "Note", value: details.note },
                ].filter(Boolean).map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Notices */}
            {transaction.status === "pending" && (
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="text-xs text-yellow-700 leading-relaxed">
                  This transfer is awaiting approval. You will receive an email once it is processed.
                </p>
              </div>
            )}

            {transaction.status === "failed" && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-xs text-red-600 leading-relaxed">
                  This transfer was declined. No funds were deducted from your account.
                </p>
              </div>
            )}
          </div>

          {/* Dotted divider */}
          <div className="relative py-4 bg-gray-50">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full -translate-x-1/2 border border-gray-200" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full translate-x-1/2 border border-gray-200" />
            <div className="border-t-2 border-dashed border-gray-200 mx-6" />
          </div>

          {/* Receipt footer */}
          <div className="px-8 py-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-xs text-green-600 font-semibold">FDIC Insured · 256-bit Encryption</span>
            </div>
            <p className="text-xs text-gray-400">
              This is an official receipt from Crownledger Private Banking.
            </p>
            <p className="text-xs text-gray-400">
              For support contact{" "}
              <span className="text-blue-600">support@crownledgerapp.com</span>
            </p>
            <p className="text-xs text-gray-300 mt-4">
              © 2026 Crownledger Inc. · 123 Wall Street, New York, NY 10005
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6 no-print">
          <Link
            href="/dashboard/transactions"
            className="flex-1 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition text-center"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            All Transactions
          </Link>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {downloading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Preparing PDF...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}