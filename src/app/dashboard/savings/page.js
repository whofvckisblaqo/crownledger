"use client";

import { useState } from "react";
import Link from "next/link";

export default function SavingsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");
  const [depositError, setDepositError] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  const goals = [
    { name: "Emergency Fund", current: 71820, target: 100000, color: "bg-blue-500", icon: "🛡️" },
    { name: "Vacation Fund", current: 3200, target: 8000, color: "bg-purple-500", icon: "✈️" },
    { name: "New Car", current: 12000, target: 35000, color: "bg-green-500", icon: "🚗" },
    { name: "Home Down Payment", current: 28000, target: 80000, color: "bg-amber-500", icon: "🏠" },
  ];

  const history = [
    { type: "deposit", amount: 2000, date: "May 1, 2026", balance: 71820 },
    { type: "deposit", amount: 1500, date: "Apr 15, 2026", balance: 69820 },
    { type: "withdrawal", amount: 500, date: "Apr 3, 2026", balance: 68320 },
    { type: "deposit", amount: 3000, date: "Mar 28, 2026", balance: 68820 },
    { type: "deposit", amount: 2500, date: "Mar 1, 2026", balance: 65820 },
    { type: "interest", amount: 358.10, date: "Mar 1, 2026", balance: 63320 },
    { type: "deposit", amount: 2000, date: "Feb 15, 2026", balance: 62961.90 },
    { type: "withdrawal", amount: 1000, date: "Feb 3, 2026", balance: 60961.90 },
  ];

  const handleDeposit = async (e) => {
    e.preventDefault();
    setDepositError("");
    setDepositSuccess("");

    if (!depositAmount || isNaN(depositAmount) || Number(depositAmount) <= 0) {
      setDepositError("Please enter a valid amount.");
      return;
    }
    if (Number(depositAmount) > 12430) {
      setDepositError("Insufficient funds in your checking account.");
      return;
    }

    setDepositLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDepositLoading(false);
    setDepositSuccess(`$${Number(depositAmount).toFixed(2)} deposited successfully!`);
    setDepositAmount("");
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setWithdrawError("");
    setWithdrawSuccess("");

    if (!withdrawAmount || isNaN(withdrawAmount) || Number(withdrawAmount) <= 0) {
      setWithdrawError("Please enter a valid amount.");
      return;
    }
    if (Number(withdrawAmount) > 71820) {
      setWithdrawError("Insufficient funds in your savings account.");
      return;
    }

    setWithdrawLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setWithdrawLoading(false);
    setWithdrawSuccess(`$${Number(withdrawAmount).toFixed(2)} withdrawn successfully!`);
    setWithdrawAmount("");
  };

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
            Savings Account
          </h1>
          <p className="text-xs text-gray-400">5.00% APY — High Yield Savings</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Balance hero */}
        <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-2">Total Savings Balance</p>
              <p className="text-5xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                $71,820.00
              </p>
              <p className="text-blue-200 text-sm">+$358.10 interest earned this month</p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
                <p className="text-blue-200 text-xs font-medium mb-1">Annual Yield (APY)</p>
                <p className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>5.00%</p>
              </div>
              <p className="text-blue-200 text-xs text-center sm:text-right">
                Estimated yearly: <span className="text-white font-semibold">+$3,591.00</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Interest This Month", value: "$358.10", color: "text-green-500" },
            { label: "Interest This Year", value: "$1,842.30", color: "text-green-500" },
            { label: "Total Deposited", value: "$68,000.00", color: "text-blue-600" },
            { label: "Account Since", value: "Jan 2024", color: "text-gray-900" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 font-medium mb-2 leading-tight">{stat.label}</p>
              <p className={`text-lg font-bold ${stat.color}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {["overview", "deposit", "withdraw", "history"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-max px-4 sm:px-6 py-4 text-sm font-semibold capitalize transition border-b-2
                  ${activeTab === tab
                    ? "text-blue-600 border-blue-600 bg-blue-50/50"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                  }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">

            {/* Overview tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Savings Goals
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {goals.map((goal, i) => {
                      const percent = Math.min((goal.current / goal.target) * 100, 100).toFixed(1);
                      return (
                        <div key={i} className="bg-gray-50 rounded-2xl p-5 hover:bg-blue-50/30 transition">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{goal.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                {goal.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className={`${goal.color} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs text-gray-400">{percent}% complete</p>
                            <p className="text-xs font-semibold text-gray-600">
                              ${(goal.target - goal.current).toLocaleString()} left
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interest projection */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-800 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Interest Projection
                      </p>
                      <p className="text-xs text-green-700 leading-relaxed">
                        At your current balance of $71,820 with 5.00% APY, you'll earn approximately{" "}
                        <span className="font-bold">$3,591.00</span> in interest over the next 12 months.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Deposit tab */}
            {activeTab === "deposit" && (
              <form onSubmit={handleDeposit} className="max-w-md space-y-5">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Deposit to Savings
                  </h3>
                  <p className="text-sm text-gray-500">Transfer from your checking account.</p>
                </div>

                {depositError && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {depositError}
                  </div>
                )}

                {depositSuccess && (
                  <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {depositSuccess}
                  </div>
                )}

                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">Amount to Deposit</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>$</span>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => { setDepositAmount(e.target.value); setDepositError(""); setDepositSuccess(""); }}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="text-5xl font-bold text-gray-900 bg-transparent border-none outline-none text-center w-48 placeholder-gray-300"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Available in checking: <span className="font-semibold text-gray-600">$12,430.00</span>
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {["100", "500", "1000", "2000"].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition
                        ${depositAmount === amt
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                        }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {[
                    { label: "From", value: "Checking Account" },
                    { label: "To", value: "Savings Account" },
                    { label: "APY", value: "5.00%" },
                    { label: "Transfer Fee", value: "Free" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-xs text-gray-400">{item.label}</span>
                      <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={depositLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {depositLoading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Deposit to Savings
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Withdraw tab */}
            {activeTab === "withdraw" && (
              <form onSubmit={handleWithdraw} className="max-w-md space-y-5">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Withdraw from Savings
                  </h3>
                  <p className="text-sm text-gray-500">Transfer to your checking account.</p>
                </div>

                {withdrawError && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {withdrawError}
                  </div>
                )}

                {withdrawSuccess && (
                  <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {withdrawSuccess}
                  </div>
                )}

                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">Amount to Withdraw</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>$</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => { setWithdrawAmount(e.target.value); setWithdrawError(""); setWithdrawSuccess(""); }}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="text-5xl font-bold text-gray-900 bg-transparent border-none outline-none text-center w-48 placeholder-gray-300"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Available in savings: <span className="font-semibold text-gray-600">$71,820.00</span>
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {["100", "500", "1000", "2000"].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setWithdrawAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition
                        ${withdrawAmount === amt
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                        }`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <p className="text-xs text-yellow-700 leading-relaxed">
                    Withdrawing from savings may affect your interest earnings for this month.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={withdrawLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {withdrawLoading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Withdraw to Checking
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* History tab */}
            {activeTab === "history" && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Savings History
                </h3>
                <div className="divide-y divide-gray-50">
                  {history.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 py-3.5 hover:bg-gray-50 rounded-xl px-2 transition">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                        ${item.type === "deposit" ? "bg-green-50" : item.type === "interest" ? "bg-blue-50" : "bg-red-50"}`}>
                        {item.type === "deposit" && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                          </svg>
                        )}
                        {item.type === "withdrawal" && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                          </svg>
                        )}
                        {item.type === "interest" && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 capitalize">{item.type}</p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${item.type === "withdrawal" ? "text-red-500" : "text-green-500"}`}>
                          {item.type === "withdrawal" ? "-" : "+"}${item.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">Bal: ${item.balance.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}