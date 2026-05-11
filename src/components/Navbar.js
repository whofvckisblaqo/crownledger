"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  const translateRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "de", label: "German", flag: "🇩🇪" },
    { code: "it", label: "Italian", flag: "🇮🇹" },
    { code: "pt", label: "Portuguese", flag: "🇵🇹" },
    { code: "ru", label: "Russian", flag: "🇷🇺" },
    { code: "zh-CN", label: "Chinese", flag: "🇨🇳" },
    { code: "ja", label: "Japanese", flag: "🇯🇵" },
    { code: "ko", label: "Korean", flag: "🇰🇷" },
    { code: "ar", label: "Arabic", flag: "🇸🇦" },
    { code: "hi", label: "Hindi", flag: "🇮🇳" },
    { code: "yo", label: "Yoruba", flag: "🇳🇬" },
    { code: "ig", label: "Igbo", flag: "🇳🇬" },
    { code: "ha", label: "Hausa", flag: "🇳🇬" },
    { code: "sw", label: "Swahili", flag: "🇰🇪" },
    { code: "nl", label: "Dutch", flag: "🇳🇱" },
    { code: "tr", label: "Turkish", flag: "🇹🇷" },
    { code: "pl", label: "Polish", flag: "🇵🇱" },
    { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
    { code: "th", label: "Thai", flag: "🇹🇭" },
    { code: "id", label: "Indonesian", flag: "🇮🇩" },
    { code: "ms", label: "Malay", flag: "🇲🇾" },
    { code: "fa", label: "Persian", flag: "🇮🇷" },
    { code: "uk", label: "Ukrainian", flag: "🇺🇦" },
    { code: "el", label: "Greek", flag: "🇬🇷" },
    { code: "he", label: "Hebrew", flag: "🇮🇱" },
    { code: "ro", label: "Romanian", flag: "🇷🇴" },
    { code: "cs", label: "Czech", flag: "🇨🇿" },
    { code: "hu", label: "Hungarian", flag: "🇭🇺" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (translateRef.current && !translateRef.current.contains(e.target)) {
        setTranslateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const changeLanguage = (lang) => {
    setCurrentLang(lang.label);
    setTranslateOpen(false);
    setMenuOpen(false);

    // Wait for Google Translate to be ready
    const tryChange = (attempts = 0) => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event("change"));
      } else if (attempts < 10) {
        setTimeout(() => tryChange(attempts + 1), 300);
      }
    };
    tryChange();
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline flex-shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h20M6 20V10l6-7 6 7v10" />
              <path d="M10 20v-5h4v5" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[18px] font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Crownledger
            </span>
            <span className="text-[9px] font-medium text-gray-400 tracking-[2px] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Private Banking
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6 list-none">
          <li><Link href="/#features" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">Features</Link></li>
          <li><Link href="/#accounts" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">Accounts</Link></li>
          <li><Link href="/#pricing" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">Pricing</Link></li>
          <li><Link href="/#security" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">Security</Link></li>
          <li><Link href="/about" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">About</Link></li>
        </ul>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-2">

          {/* Translate dropdown */}
          <div className="relative" ref={translateRef}>
            <button
              onClick={() => setTranslateOpen(!translateOpen)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 font-medium transition px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 hover:border-blue-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{currentLang}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-200 ${translateOpen ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {translateOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-2.5 border-b border-gray-50 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Select Language
                  </p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-blue-50 transition text-left
                        ${currentLang === lang.label ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
                    >
                      <span className="text-base flex-shrink-0">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {currentLang === lang.label && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-200"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile right — translate + hamburger */}
        <div className="lg:hidden flex items-center gap-2">

          {/* Mobile translate button */}
          <div className="relative" ref={translateRef}>
            <button
              onClick={() => setTranslateOpen(!translateOpen)}
              className="flex items-center gap-1 text-xs text-gray-500 px-2.5 py-2 rounded-lg border border-gray-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>

            {translateOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden z-50">
                <div className="px-3 py-2 border-b border-gray-50 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Language</p>
                </div>
                <div className="max-h-56 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs hover:bg-blue-50 transition text-left
                        ${currentLang === lang.label ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          <Link href="/#features" className="text-sm text-gray-600 font-medium hover:text-blue-600 py-1" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="/#accounts" className="text-sm text-gray-600 font-medium hover:text-blue-600 py-1" onClick={() => setMenuOpen(false)}>Accounts</Link>
          <Link href="/#pricing" className="text-sm text-gray-600 font-medium hover:text-blue-600 py-1" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/#security" className="text-sm text-gray-600 font-medium hover:text-blue-600 py-1" onClick={() => setMenuOpen(false)}>Security</Link>
          <Link href="/about" className="text-sm text-gray-600 font-medium hover:text-blue-600 py-1" onClick={() => setMenuOpen(false)}>About</Link>

          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <Link href="/login" className="text-sm font-medium text-center text-gray-600 border border-gray-200 py-2.5 rounded-xl hover:border-blue-300 transition" onClick={() => setMenuOpen(false)}>
              Log in
            </Link>
            <Link href="/signup" className="text-sm font-medium text-center text-white bg-blue-600 py-2.5 rounded-xl hover:bg-blue-700 transition" onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}