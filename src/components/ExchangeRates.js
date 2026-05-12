"use client";

import { useState, useEffect } from "react";

export default function ExchangeRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("1");
  const [lastUpdated, setLastUpdated] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/user/rates");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setRates(data.rates || []);
      setLastUpdated(data.lastUpdated || "");
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredRates = rates.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase())
  );

  const displayedRates = expanded ? filteredRates : filteredRates.slice(0, 6);

  const convertedAmount = (rate) => {
    const num = parseFloat(amount) || 1;
    return (num * rate).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Exchange Rates
            </h3>
            {lastUpdated && (
              <p className="text-xs text-gray-400">Updated {lastUpdated}</p>
            )}
          </div>
        </div>
        <button
          onClick={fetchRates}
          className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Amount input */}
      <div className="px-5 py-3 border-b border-gray-50 bg-gray-50">
        <p className="text-xs text-gray-400 font-medium mb-2">
          Convert from USD
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1">
            <span className="text-sm font-bold text-blue-600">🇺🇸</span>
            <span className="text-xs font-semibold text-gray-500">USD</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 text-sm font-bold text-gray-900 bg-transparent outline-none text-right"
              placeholder="1.00"
              min="0"
            />
          </div>
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 py-3 border-b border-gray-50">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search currency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition"
          />
        </div>
      </div>

      {/* Rates list */}
      <div className="divide-y divide-gray-50">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-400 mb-2">Failed to load rates</p>
            <button
              onClick={fetchRates}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Try again
            </button>
          </div>
        ) : filteredRates.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-400">No currency found</p>
          </div>
        ) : (
          <>
            {displayedRates.map((rate, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">{rate.flag}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      {rate.code}
                    </p>
                    <p className="text-xs text-gray-400">{rate.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    {convertedAmount(rate.rate)}
                  </p>
                  <p className="text-xs text-gray-400">
                    1 USD = {rate.rate.toFixed(4)} {rate.code}
                  </p>
                </div>
              </div>
            ))}

            {/* Show more / less */}
            {filteredRates.length > 6 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full py-3 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-1"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {expanded ? (
                  <>
                    Show Less
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </>
                ) : (
                  <>
                    Show All {filteredRates.length} Currencies
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Rates are for informational purposes only · Powered by ExchangeRate-API
        </p>
      </div>
    </div>
  );
}