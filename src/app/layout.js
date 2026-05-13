import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import TawkTo from "@/components/TawkTo";
import GoogleTranslate from "@/components/GoogleTranslate";

export const metadata = {
  title: "Crownledger — Private Banking",
  description: "Banking built for the modern world. Open a free account today.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  themeColor: "#1a56db",
  openGraph: {
    title: "Crownledger — Private Banking",
    description: "Banking built for the modern world.",
    url: "https://www.crownledgerapp.com",
    siteName: "Crownledger",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1a56db" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .goog-te-banner-frame { display: none !important; }
          .goog-te-balloon-frame { display: none !important; }
          .goog-te-ftab-float { display: none !important; }
          .skiptranslate { display: none !important; }
          body { top: 0 !important; }
          .goog-tooltip { display: none !important; }
          .goog-tooltip:hover { display: none !important; }
          .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
          }

          /* Scroll zoom animation */
          .scroll-zoom {
            opacity: 0;
            transform: scale(0.92);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }
          .scroll-zoom.visible {
            opacity: 1;
            transform: scale(1);
          }

          /* Scroll fade up animation */
          .scroll-fade-up {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          .scroll-fade-up.visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Stagger delays */
          .delay-100 { transition-delay: 0.1s; }
          .delay-200 { transition-delay: 0.2s; }
          .delay-300 { transition-delay: 0.3s; }
          .delay-400 { transition-delay: 0.4s; }
        `}</style>
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <SessionWrapper>
          {children}
        </SessionWrapper>
        <GoogleTranslate />
        <TawkTo />
      </body>
    </html>
  );
}