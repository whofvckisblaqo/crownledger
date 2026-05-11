"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CardPage() {
  const { data: session } = useSession();
  const [flipped, setFlipped] = useState(false);
  const [cardLocked, setCardLocked] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const checking = accData.accounts?.find((a) => a.type === "checking");
      setAccount(checking || null);
      setTransactions(txData.transactions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cardNumber = account?.accountNumber
    ? `${account.accountNumber.slice(0, 4)} ${account.accountNumber.slice(4, 8)} ${account.accountNumber.slice(8, 12)} ${account.accountNumber.slice(12, 16)}`
    : "•••• •••• •••• ••••";

  const maskedNumber = account?.accountNumber
    ? `•••• •••• •••• ${account.accountNumber.slice(-4)}`
    : "•••• •••• •••• ••••";

  const debitTransactions = transactions.filter(
    (tx) => tx.senderAccount === account?.accountNumber || tx.type === "payment"
  );

  const totalSpent = debitTransactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

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
            My Debit Card
          </h1>
          <p className="text-xs text-gray-400">Manage your Crownledger card</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left — Card + controls */}
            <div className="flex flex-col gap-5">

              {/* Flip card */}
              <div
                className="cursor-pointer w-full"
                style={{ perspective: "1000px" }}
                onClick={() => setFlipped(!flipped)}
              >
                <div
                  className="relative w-full transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    height: "200px",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      background: cardLocked
                        ? "linear-gradient(135deg, #6b7280, #374151)"
                        : "linear-gradient(135deg, #1a56db, #0f3a8a)",
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-white font-bold text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Crownledger
                      </span>
                      <div className="flex items-center gap-2">
                        {cardLocked && (
                          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                            Locked
                          </span>
                        )}
                        <div className="w-8 h-6 bg-yellow-400 rounded-sm opacity-90" />
                      </div>
                    </div>

                    {/* Chip */}
                    <div className="w-10 h-8 bg-yellow-400/80 rounded-md" />

                    <div>
                      <p className="text-white/70 text-sm tracking-[3px] mb-2 font-mono">
                        {showNumber ? cardNumber : maskedNumber}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/50 text-[10px] uppercase tracking-wide mb-0.5">Card Holder</p>
                          <p className="text-white font-semibold text-sm">
                            {session?.user?.firstName} {session?.user?.lastName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/50 text-[10px] uppercase tracking-wide mb-0.5">Expires</p>
                          <p className="text-white font-semibold text-sm">05 / 29</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-2xl flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: cardLocked
                        ? "linear-gradient(135deg, #6b7280, #374151)"
                        : "linear-gradient(135deg, #1a56db, #0f3a8a)",
                    }}
                  >
                    <div className="w-full h-12 bg-black/60 mt-6" />
                    <div className="px-6 pb-6 space-y-3">
                      <div className="bg-white/90 rounded px-3 py-2 flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="w-3 h-4 bg-gray-200 rounded-sm" />
                          ))}
                        </div>
                        <p className="text-gray-800 font-bold text-sm font-mono">729</p>
                      </div>
                      <p className="text-white/50 text-xs text-center">
                        CVV — Never share this code
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-white/60 text-xs">Crownledger Private Banking</p>
                        <div className="flex">
                          <div className="w-6 h-6 rounded-full bg-red-500 opacity-90" />
                          <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-90 -ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flip hint */}
              <p className="text-center text-xs text-gray-400 -mt-2">
                {flipped ? "Tap card to flip back" : "Tap card to see CVV"}
              </p>

              {/* Card controls */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowNumber(!showNumber)}
                  className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm font-medium py-3 rounded-xl transition"
                >
                  {showNumber ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                      Hide Number
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Show Number
                    </>
                  )}
                </button>

                <button
                  onClick={() => setCardLocked(!cardLocked)}
                  className={`flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-xl transition border
                    ${cardLocked
                      ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                      : "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                    }`}
                >
                  {cardLocked ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Unlock Card
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" />
                      </svg>
                      Lock Card
                    </>
                  )}
                </button>
              </div>

              {/* Card details */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Card Details
                </h3>
                {[
                  { label: "Card Type", value: "Visa Debit" },
                  { label: "Card Number", value: showNumber ? cardNumber : maskedNumber },
                  { label: "Expiry Date", value: "05 / 29" },
                  { label: "Linked Account", value: `Checking ****${account?.accountNumber?.slice(-4) || "----"}` },
                  { label: "Card Status", value: cardLocked ? "Locked" : "Active", colored: true, locked: cardLocked },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    <span className={`text-xs font-semibold
                      ${item.colored
                        ? item.locked ? "text-red-500" : "text-green-500"
                        : "text-gray-700"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-5">

              {/* Account balance */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Linked Account Balance
                </h3>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Checking Balance</p>
                    <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      ${(account?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">Total Spent</p>
                    <p className="text-xl font-bold text-red-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      ${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Transactions", value: transactions.length.toString(), color: "text-blue-600" },
                  { label: "Total Spent", value: `$${totalSpent.toFixed(2)}`, color: "text-red-500" },
                  { label: "Account Status", value: account?.status || "Active", color: "text-green-500" },
                  { label: "Card Status", value: cardLocked ? "Locked" : "Active", color: cardLocked ? "text-red-500" : "text-green-500" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-400 font-medium mb-2">{stat.label}</p>
                    <p className={`text-xl font-bold capitalize ${stat.color}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent transactions */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Recent Transactions
                  </h3>
                  <Link href="/dashboard/transactions" className="text-xs text-blue-600 font-medium hover:underline">
                    View all
                  </Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {transactions.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-gray-400">No transactions yet</p>
                    </div>
                  ) : (
                    transactions.slice(0, 5).map((tx, i) => {
                      const isCredit = tx.type === "deposit" || tx.receiverAccount === account?.accountNumber;
                      return (
                        <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                            ${isCredit ? "bg-green-50" : "bg-red-50"}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isCredit ? "#16a34a" : "#f87171"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate capitalize">
                              {tx.description || tx.type}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                          <p className={`text-sm font-semibold flex-shrink-0 ${isCredit ? "text-green-500" : "text-red-500"}`}>
                            {isCredit ? "+" : "-"}${tx.amount?.toFixed(2)}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Pay bill CTA */}
              <Link
                href="/dashboard/transfer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-4 rounded-2xl transition flex items-center justify-center gap-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send Money
              </Link>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}