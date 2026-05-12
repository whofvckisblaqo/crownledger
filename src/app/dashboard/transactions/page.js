"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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
      setTransactions(txData.transactions || []);
      setAccounts(accData.accounts || []);
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

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.description?.toLowerCase().includes(search.toLowerCase()) ||
      tx.type?.toLowerCase().includes(search.toLowerCase()) ||
      tx.reference?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "credit" && isCredit(tx)) ||
      (filter === "debit" && !isCredit(tx));

    return matchesSearch && matchesFilter;
  });

  const totalCredit = filtered.filter(isCredit).reduce((sum, tx) => sum + (tx.amount || 0), 0);
  const totalDebit = filtered.filter(tx => !isCredit(tx)).reduce((sum, tx) => sum + (tx.amount || 0), 0);

  const categoryColors = {
    deposit: "bg-green-50 text-green-600",
    transfer: "bg-blue-50 text-blue-600",
    withdrawal: "bg-red-50 text-red-500",
    payment: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>Transactions</h1>
          <p className="text-xs text-gray-400">Your full transaction history</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>{filtered.length}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Total Money In</p>
                <p className="text-3xl font-bold text-green-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  +${totalCredit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Total Money Out</p>
                <p className="text-3xl font-bold text-red-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  -${totalDebit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                />
              </div>
              <div className="flex gap-2">
                {["all", "credit", "debit"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold capitalize transition
                      ${filter === f ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {f === "all" ? "All" : f === "credit" ? "Money In" : "Money Out"}
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions list */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-500">No transactions yet</p>
                  <p className="text-xs text-gray-400 mt-1">Your transactions will appear here</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {filtered.map((tx, i) => {
                    const credit = isCredit(tx);
                    return (
                     <Link key={i} href={`/dashboard/transactions/${tx._id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition cursor-pointer">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                          ${credit ? "bg-green-50 text-green-500" : "bg-red-50 text-red-400"}`}>
                          {tx.type?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-gray-900 truncate capitalize">
                              {tx.description || tx.type}
                            </p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-lg flex-shrink-0 capitalize ${categoryColors[tx.type] || "bg-gray-50 text-gray-500"}`}>
                              {tx.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            {tx.reference} · {new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {new Date(tx.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${credit ? "text-green-500" : "text-red-500"}`}>
                            {credit ? "+" : "-"}${tx.amount?.toFixed(2)}
                          </p>
                          <p className={`text-xs font-medium mt-0.5 capitalize ${tx.status === "completed" ? "text-green-400" : tx.status === "pending" ? "text-yellow-500" : "text-red-400"}`}>
                            {tx.status}
                          </p>
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