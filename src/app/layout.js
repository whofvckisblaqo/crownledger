import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Crownledger — Private Banking",
  description: "Banking built for the modern world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}