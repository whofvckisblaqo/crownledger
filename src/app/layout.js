import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import TawkTo from "@/components/TawkTo";
import GoogleTranslate from "@/components/GoogleTranslate";

export const metadata = {
  title: "Crownledger — Private Banking",
  description: "Banking built for the modern world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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