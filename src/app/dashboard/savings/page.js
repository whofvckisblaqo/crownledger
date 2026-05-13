"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SavingsPage() {
  const { data: session } = useSession();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showRouting, setShowRouting] = useState(false);

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
      const savings = accData.accounts?.find((a) => a.type === "savings");
      setAccount(savings || null);
      setTransactions(txData.transactions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDescription = (tx) => {
    try {
      const parsed = JSON.parse(tx.description);
      return parsed.note || parsed.recipientName || tx.type;
    } catch {
      return tx.description || tx.type;
    }
  };

  const savingsTx = transactions.filter(
    (tx) =>
      tx.type === "deposit" ||
      tx.receiverAccount === account?.accountNumber ||
      tx.senderAccount === account?.accountNumber
  );

  const moneyIn = savingsTx
    .filter((tx) => tx.type === "deposit" || tx.receiverAccount === account?.accountNumber)
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);

  const moneyOut = savingsTx
    .filter((tx) => tx.senderAccount === account?.accountNumber && tx.type !== "deposit")
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard/accounts" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Savings Account
          </h1>
          <p className="text-xs text-gray-400">Your high-yield savings account</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Balance card */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
              <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-2">Available Balance</p>
                  <p className="text-5xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    ${(account?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      5.00% APY
                    </span>
                    <span className="text-green-100 text-xs">High-Yield Savings</span>
                  </div>
                </div>
                <Link
                  href="/dashboard/transfer"
                  className="bg-white text-green-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-50 transition text-center flex-shrink-0"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Transfer Funds
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Account info */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Account Information
                </h3>
                {[
                  {
                    label: "Account Holder",
                    value: `${session?.user?.firstName} ${session?.user?.lastName}`,
                  },
                  { label: "Account Type", value: "Savings" },
                  {
                    label: "Account Number",
                    value: showAccountNumber
                      ? account?.accountNumber
                      : `****${account?.accountNumber?.slice(-4)}`,
                    toggle: true,
                    toggleKey: "account",
                  },
                  {
                    label: "Routing Number",
                    value: showRouting
                      ? (account?.routingNumber || "031176110")
                      : `****${(account?.routingNumber || "031176110").slice(-4)}`,
                    toggle: true,
                    toggleKey: "routing",
                  },
                  { label: "Interest Rate", value: "5.00% APY", green: true },
                  { label: "Currency", value: "USD" },
                  { label: "Bank", value: "Crownledger Private Banking" },
                  { label: "Status", value: account?.status || "Active", green: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold capitalize ${item.green ? "text-green-500" : "text-gray-700"}`}>
                        {item.value}
                      </span>
                      {item.toggle && (
                        <button
                          onClick={() => {
                            if (item.toggleKey === "account") setShowAccountNumber(!showAccountNumber);
                            if (item.toggleKey === "routing") setShowRouting(!showRouting);
                          }}
                          className="text-green-600 hover:text-green-700 flex-shrink-0"
                        >
                          {(item.toggleKey === "account" ? showAccountNumber : showRouting) ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick stats + wire info */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Money In", value: `$${moneyIn.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "text-green-500" },
                    { label: "Money Out", value: `$${moneyOut.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "text-red-500" },
                    { label: "Transactions", value: savingsTx.length.toString(), color: "text-green-600" },
                    { label: "Balance", value: `$${(account?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "text-gray-900" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                      <p className="text-xs text-gray-400 font-medium mb-2 leading-tight">{stat.label}</p>
                      <p className={`text-xl font-bold ${stat.color}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Wire transfer info */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-green-900 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Wire Transfer Details
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "Bank Name", value: "Crownledger Private Banking" },
                      { label: "Account Number", value: account?.accountNumber || "—" },
                      { label: "Routing Number", value: account?.routingNumber || "031176110" },
                      { label: "Account Type", value: "Savings" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-xs text-green-600 font-medium">{item.label}</span>
                        <span className="text-xs font-bold text-green-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* APY info */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Earning 5.00% APY
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        10x the national average. Interest compounds daily.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent transactions */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-50">
                <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Recent Transactions
                </h3>
                <Link href="/dashboard/transactions" className="text-xs text-blue-600 font-medium hover:underline">
                  View all
                </Link>
              </div>
              {savingsTx.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-400">No transactions yet</p>
                  <Link href="/dashboard/transfer" className="text-xs text-blue-600 font-medium mt-2 inline-block hover:underline">
                    Make your first transfer →
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {savingsTx.slice(0, 8).map((tx, i) => {
                    const isCredit =
                      tx.type === "deposit" ||
                      tx.receiverAccount === account?.accountNumber;
                    return (
                      <Link
                        key={i}
                        href={`/dashboard/transactions/${tx._id}`}
                        className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-gray-50 transition group"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                          ${isCredit ? "bg-green-50 text-green-500" : "bg-red-50 text-red-400"}`}>
                          {tx.type?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate capitalize">
                            {getDescription(tx)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-bold flex-shrink-0 ${isCredit ? "text-green-500" : "text-red-500"}`}>
                            {isCredit ? "+" : "-"}${tx.amount?.toFixed(2)}
                          </p>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-blue-500 transition">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}