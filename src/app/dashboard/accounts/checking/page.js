"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CheckingPage() {
  const { data: session } = useSession();
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  const transactions = [
    { name: "Direct Deposit", description: "Salary Payment", date: "May 11, 2026", amount: 5200.00, type: "credit", icon: "D" },
    { name: "Netflix", description: "Monthly Subscription", date: "May 11, 2026", amount: 14.99, type: "debit", icon: "N" },
    { name: "Transfer to Savings", description: "Monthly Savings", date: "May 10, 2026", amount: 2000.00, type: "debit", icon: "T" },
    { name: "Amazon", description: "Online Purchase", date: "May 7, 2026", amount: 89.99, type: "debit", icon: "A" },
    { name: "Starbucks", description: "Coffee", date: "May 5, 2026", amount: 7.50, type: "debit", icon: "S" },
    { name: "Uber", description: "Ride Service", date: "May 4, 2026", amount: 24.30, type: "debit", icon: "U" },
    { name: "Zelle Transfer", description: "From Mike Johnson", date: "May 2, 2026", amount: 350.00, type: "credit", icon: "Z" },
    { name: "Whole Foods", description: "Groceries", date: "May 1, 2026", amount: 123.45, type: "debit", icon: "W" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard/accounts" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Checking Account
          </h1>
          <p className="text-xs text-gray-400">Your everyday spending account</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Balance card */}
        <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-2">Available Balance</p>
              <p className="text-5xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                $12,430.00
              </p>
              <p className="text-blue-200 text-sm">Current balance: $12,430.00</p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard/transfer"
                className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-center"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Send Money
              </Link>
              <button className="bg-white/10 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/20 transition">
                Add Funds
              </button>
            </div>
          </div>
        </div>

        {/* Account details + Quick stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Account info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Account Information
            </h3>
            {[
              { label: "Account Holder", value: `${session?.user?.firstName} ${session?.user?.lastName}` },
              { label: "Account Type", value: "Checking" },
              {
                label: "Account Number",
                value: showAccountNumber ? "4821 3947 5621" : "•••• •••• 5621",
                toggle: true,
              },
              { label: "Routing Number", value: "021000021" },
              { label: "Bank", value: "Crownledger Private Banking" },
              { label: "Status", value: "Active", green: true },
              { label: "Opened", value: "January 15, 2024" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${item.green ? "text-green-500" : "text-gray-700"}`}>
                    {item.value}
                  </span>
                  {item.toggle && (
                    <button
                      onClick={() => setShowAccountNumber(!showAccountNumber)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {showAccountNumber ? (
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

          {/* Quick stats */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Money In This Month", value: "$5,550.00", color: "text-green-500" },
                { label: "Money Out This Month", value: "$3,240.00", color: "text-red-500" },
                { label: "Transactions This Month", value: "24", color: "text-blue-600" },
                { label: "Average Daily Balance", value: "$11,230.00", color: "text-gray-900" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 font-medium mb-2 leading-tight">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Spending breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex-1">
              <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Spending Breakdown
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Housing", amount: "$2,000", percent: 62, color: "bg-blue-500" },
                  { label: "Food & Dining", amount: "$650", percent: 20, color: "bg-purple-500" },
                  { label: "Transport", amount: "$320", percent: 10, color: "bg-green-500" },
                  { label: "Other", amount: "$270", percent: 8, color: "bg-gray-400" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-600">{item.label}</span>
                        <span className="text-xs font-semibold text-gray-900">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
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
          <div className="divide-y divide-gray-50">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-gray-50 transition">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                  ${tx.type === "debit" ? "bg-red-50 text-red-400" : "bg-green-50 text-green-500"}`}>
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{tx.name}</p>
                  <p className="text-xs text-gray-400">{tx.description} · {tx.date}</p>
                </div>
                <p className={`text-sm font-bold flex-shrink-0 ${tx.type === "debit" ? "text-red-500" : "text-green-500"}`}>
                  {tx.type === "debit" ? "-" : "+"}${tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}