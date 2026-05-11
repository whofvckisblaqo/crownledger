"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AccountsPage() {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const checking = accounts.find((a) => a.type === "checking");
  const savings = accounts.find((a) => a.type === "savings");
  const totalBalance = (checking?.balance || 0) + (savings?.balance || 0);

  const accountCards = [
    {
      type: "Checking Account",
      account: checking,
      color: "bg-blue-600",
      href: "/dashboard/accounts/checking",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
        </svg>
      ),
      stats: [
        { label: "Account Number", value: checking ? `****${checking.accountNumber?.slice(-4)}` : "—" },
        { label: "Currency", value: "USD" },
        { label: "Status", value: checking?.status || "—" },
      ],
    },
    {
      type: "Savings Account",
      account: savings,
      color: "bg-green-600",
      href: "/dashboard/savings",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" />
        </svg>
      ),
      stats: [
        { label: "Account Number", value: savings ? `****${savings.accountNumber?.slice(-4)}` : "—" },
        { label: "Interest Rate", value: "5.00% APY" },
        { label: "Status", value: savings?.status || "—" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>My Accounts</h1>
          <p className="text-xs text-gray-400">All your Crownledger accounts</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Total balance */}
            <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white">
              <p className="text-blue-200 text-sm font-medium mb-2">Total Net Worth</p>
              <p className="text-5xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-blue-200 text-sm">Across {accounts.length} accounts</p>
              <div className="flex flex-wrap gap-4 mt-6">
                {[
                  { label: "Checking", value: `$${(checking?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
                  { label: "Savings", value: `$${(savings?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 rounded-xl px-4 py-2">
                    <p className="text-blue-200 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Account cards */}
            <div className="space-y-4">
              {accountCards.map((acc, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6">
                    <div className={`w-12 h-12 rounded-2xl ${acc.color} flex items-center justify-center flex-shrink-0`}>
                      {acc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="text-base font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>{acc.type}</p>
                          <p className="text-xs text-gray-400">Account {acc.account ? `****${acc.account.accountNumber?.slice(-4)}` : "—"}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {acc.account?.status || "Active"}
                          </span>
                          <Link href={acc.href} className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition">
                            Manage →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row border-t border-gray-50">
                    <div className="flex-1 px-5 sm:px-6 py-4 border-b sm:border-b-0 sm:border-r border-gray-50">
                      <p className="text-xs text-gray-400 font-medium mb-1">Current Balance</p>
                      <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        ${(acc.account?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="flex-1 px-5 sm:px-6 py-4">
                      <p className="text-xs text-gray-400 font-medium mb-1">Available Balance</p>
                      <p className="text-2xl font-bold text-green-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        ${(acc.account?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 border-t border-gray-50">
                    {acc.stats.map((stat, j) => (
                      <div key={j} className={`px-4 sm:px-6 py-4 ${j < 2 ? "border-r border-gray-50" : ""}`}>
                        <p className="text-xs text-gray-400 font-medium mb-1 truncate">{stat.label}</p>
                        <p className={`text-sm font-bold capitalize ${stat.label === "Status" ? "text-green-600" : "text-gray-900"}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Open new account */}
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Open a New Account</p>
              <p className="text-xs text-gray-400">Contact support to add another account</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}