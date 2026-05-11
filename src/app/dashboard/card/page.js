"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CardPage() {
  const { data: session } = useSession();
  const [flipped, setFlipped] = useState(false);
  const [cardLocked, setCardLocked] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const transactions = [
    { name: "Netflix", date: "May 11, 2026", amount: "-$14.99", neg: true },
    { name: "Amazon Purchase", date: "May 7, 2026", amount: "-$89.99", neg: true },
    { name: "Starbucks", date: "May 5, 2026", amount: "-$7.50", neg: true },
    { name: "Uber", date: "May 4, 2026", amount: "-$24.30", neg: true },
    { name: "Apple iCloud", date: "May 3, 2026", amount: "-$2.99", neg: true },
  ];

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
            My Credit Card
          </h1>
          <p className="text-xs text-gray-400">Manage your Crownledger card</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

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
                      {showNumber ? "4821 3947 5621 4821" : "•••• •••• •••• 4821"}
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
                  {/* Black stripe */}
                  <div className="w-full h-12 bg-black/60 mt-6" />

                  <div className="px-6 pb-6 space-y-3">
                    {/* Signature strip */}
                    <div className="bg-white/90 rounded px-3 py-2 flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="w-3 h-4 bg-gray-200 rounded-sm" />
                        ))}
                      </div>
                      <p className="text-gray-800 font-bold text-sm font-mono">729</p>
                    </div>
                    <p className="text-white/50 text-xs text-center">
                      CVV — For security purposes, never share this code
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

            {/* Tap to flip hint */}
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
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Unlock Card
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
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
                { label: "Card Type", value: "Visa Credit" },
                { label: "Card Number", value: showNumber ? "4821 3947 5621 4821" : "•••• •••• •••• 4821" },
                { label: "Expiry Date", value: "05 / 29" },
                { label: "Billing Address", value: "123 Main St, New York, NY" },
                { label: "Card Status", value: cardLocked ? "Locked" : "Active", colored: true, locked: cardLocked },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                  <span className={`text-xs font-semibold
                    ${item.colored
                      ? item.locked ? "text-red-500" : "text-green-500"
                      : "text-gray-700"
                    }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Spending + transactions */}
          <div className="flex flex-col gap-5">

            {/* Credit limit */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Credit Usage
              </h3>
              <div className="flex justify-between items-end mb-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Amount Used</p>
                  <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    $2,340
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">Credit Limit</p>
                  <p className="text-xl font-bold text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    $10,000
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: "23.4%" }}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-400">23.4% used</p>
                <p className="text-xs text-green-500 font-medium">$7,660 available</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "This Month Spent", value: "$139.77", color: "text-red-500" },
                { label: "Cashback Earned", value: "$4.19", color: "text-green-500" },
                { label: "Due Date", value: "May 25", color: "text-blue-600" },
                { label: "Minimum Due", value: "$35.00", color: "text-gray-900" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 font-medium mb-2">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent card transactions */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Recent Card Transactions
                </h3>
                <Link href="/dashboard/transactions" className="text-xs text-blue-600 font-medium hover:underline">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{tx.name}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                    <p className="text-sm font-semibold text-red-500 flex-shrink-0">{tx.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pay bill CTA */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-4 rounded-2xl transition flex items-center justify-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Pay Card Bill
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}