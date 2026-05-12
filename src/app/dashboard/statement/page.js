"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function StatementPage() {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [period, setPeriod] = useState("30");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const statementRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [accRes, txRes] = await Promise.all([
        fetch("/api/user/accounts"),
        fetch("/api/user/transactions"),
      ]);
      const accData = await accRes.json();
      const txData = await txRes.json();
      setAccounts(accData.accounts || []);
      setTransactions(txData.transactions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const accountNumbers = accounts.map((a) => a.accountNumber);

  const isCredit = (tx) =>
    tx.type === "deposit" ||
    accountNumbers.includes(tx.receiverAccount);

  const getDescription = (tx) => {
    try {
      const parsed = JSON.parse(tx.description);
      return parsed.note || parsed.recipientName || tx.type;
    } catch {
      return tx.description || tx.type;
    }
  };

  const getDateRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - Number(period));
    return { start, end };
  };

  const { start, end } = getDateRange();

  const filteredTx = transactions.filter((tx) => {
    const txDate = new Date(tx.createdAt);
    const inPeriod = txDate >= start && txDate <= end;

    if (selectedAccount === "all") return inPeriod;

    const acc = accounts.find((a) => a.type === selectedAccount);
    return inPeriod && (
      tx.senderAccount === acc?.accountNumber ||
      tx.receiverAccount === acc?.accountNumber ||
      tx.type === "deposit"
    );
  });

  const totalIn = filteredTx.filter(isCredit).reduce((s, tx) => s + (tx.amount || 0), 0);
  const totalOut = filteredTx.filter(tx => !isCredit(tx)).reduce((s, tx) => s + (tx.amount || 0), 0);
  const netChange = totalIn - totalOut;

  const checking = accounts.find((a) => a.type === "checking");
  const savings = accounts.find((a) => a.type === "savings");
  const totalBalance = (checking?.balance || 0) + (savings?.balance || 0);

  const handleDownload = () => {
    setDownloading(true);

    const style = document.createElement("style");
    style.id = "statement-print-style";
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #statement-print, #statement-print * { visibility: visible; }
        #statement-print {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          background: white;
          padding: 24px;
        }
        .no-print { display: none !important; }
        @page { margin: 0.5cm; }
      }
    `;
    document.head.appendChild(style);

    const el = statementRef.current;
    if (el) el.id = "statement-print";

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const s = document.getElementById("statement-print-style");
        if (s) s.remove();
        if (el) el.removeAttribute("id");
        setDownloading(false);
      }, 1000);
    }, 300);
  };

  const periodLabel = {
    "30": "Last 30 Days",
    "60": "Last 60 Days",
    "90": "Last 90 Days",
  }[period];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Account Statement
            </h1>
            <p className="text-xs text-gray-400">Download your transaction history</p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading || loading}
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

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 no-print">
          <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Statement Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Time Period
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["30", "60", "90"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition
                      ${period === p
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                      }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {p} Days
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Account
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["all", "checking", "savings"].map((acc) => (
                  <button
                    key={acc}
                    onClick={() => setSelectedAccount(acc)}
                    className={`py-2.5 rounded-xl text-xs font-semibold border capitalize transition
                      ${selectedAccount === acc
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                      }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {acc === "all" ? "All" : acc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          /* Statement document */
          <div ref={statementRef} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">

            {/* Statement header */}
            <div
              className="px-8 py-8 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a56db, #0f3a8a)" }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

              <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div>
                  {/* Logo */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20h20M6 20V10l6-7 6 7v10" />
                        <path d="M10 20v-5h4v5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Crownledger
                      </p>
                      <p className="text-blue-200 text-xs">Private Banking</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Account Statement
                  </h2>
                  <p className="text-blue-200 text-sm">{periodLabel}</p>
                  <p className="text-blue-200 text-xs mt-1">
                    {start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} —{" "}
                    {end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
                    <p className="text-blue-200 text-xs mb-1">Account Holder</p>
                    <p className="text-white font-bold text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {session?.user?.firstName} {session?.user?.lastName}
                    </p>
                    <p className="text-blue-200 text-xs mt-1">{session?.user?.email}</p>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-center">
                    <p className="text-blue-200 text-xs mb-1">Statement Generated</p>
                    <p className="text-white font-semibold text-sm">
                      {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account summary */}
            <div className="px-8 py-6 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Account Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Total Balance", value: `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "text-gray-900" },
                  { label: "Money In", value: `+$${totalIn.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "text-green-500" },
                  { label: "Money Out", value: `-$${totalOut.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "text-red-500" },
                  { label: "Net Change", value: `${netChange >= 0 ? "+" : ""}$${netChange.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: netChange >= 0 ? "text-green-500" : "text-red-500" },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-2">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Account details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {accounts.map((acc, i) => (
                  <div key={i} className={`rounded-2xl p-4 border ${acc.type === "checking" ? "bg-blue-50 border-blue-100" : "bg-green-50 border-green-100"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-xs font-semibold capitalize mb-1 ${acc.type === "checking" ? "text-blue-600" : "text-green-600"}`}>
                          {acc.type} Account
                        </p>
                        <p className="text-xs text-gray-500">
                          Account: ****{acc.accountNumber?.slice(-4)}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        ${acc.balance?.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction history */}
            <div className="px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Transaction History
                </h3>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {filteredTx.length} transactions
                </span>
              </div>

              {filteredTx.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">
                    No transactions in this period
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-100">
                        <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                        <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Description</th>
                        <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Reference</th>
                        <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Type</th>
                        <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                        <th className="text-right py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredTx.map((tx, i) => {
                        const credit = isCredit(tx);
                        return (
                          <tr key={i} className="hover:bg-gray-50 transition">
                            <td className="py-3.5">
                              <p className="text-xs text-gray-600 whitespace-nowrap">
                                {new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(tx.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </td>
                            <td className="py-3.5 pr-4">
                              <p className="text-sm font-semibold text-gray-900 capitalize truncate max-w-[160px]">
                                {getDescription(tx)}
                              </p>
                            </td>
                            <td className="py-3.5">
                              <p className="text-xs font-mono text-blue-600 whitespace-nowrap">
                                {tx.reference?.slice(0, 16) || "—"}
                              </p>
                            </td>
                            <td className="py-3.5">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize whitespace-nowrap
                                ${tx.type === "deposit" ? "bg-green-50 text-green-600"
                                  : tx.type === "transfer" ? "bg-blue-50 text-blue-600"
                                  : "bg-gray-50 text-gray-500"}`}>
                                {tx.type}
                              </span>
                            </td>
                            <td className="py-3.5">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize whitespace-nowrap
                                ${tx.status === "completed" ? "bg-green-50 text-green-600"
                                  : tx.status === "pending" ? "bg-yellow-50 text-yellow-600"
                                  : "bg-red-50 text-red-500"}`}>
                                {tx.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              <p className={`text-sm font-bold whitespace-nowrap ${credit ? "text-green-500" : "text-red-500"}`}>
                                {credit ? "+" : "-"}${tx.amount?.toFixed(2)}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                    {/* Totals row */}
                    <tfoot>
                      <tr className="border-t-2 border-gray-200">
                        <td colSpan={5} className="py-4">
                          <p className="text-sm font-bold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Period Total ({filteredTx.length} transactions)
                          </p>
                        </td>
                        <td className="py-4 text-right">
                          <p className={`text-sm font-bold ${netChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {netChange >= 0 ? "+" : ""}${netChange.toFixed(2)}
                          </p>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* Statement footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This statement is generated automatically by Crownledger Private Banking.
                    For questions contact support@crownledgerapp.com
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    © 2026 Crownledger Inc. · 123 Wall Street, New York, NY 10005
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="text-xs text-green-600 font-semibold">FDIC Insured</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Download button bottom */}
        <div className="flex gap-3 pb-6 no-print">
          <Link
            href="/dashboard"
            className="flex-1 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition text-center"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Back to Dashboard
          </Link>
          <button
            onClick={handleDownload}
            disabled={downloading || loading}
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
                Download PDF Statement
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}