import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
      { next: { revalidate: 3600 } } // cache for 1 hour
    );

    if (!res.ok) {
      throw new Error("Failed to fetch rates");
    }

    const data = await res.json();

    // Pick the currencies we want to show
    const currencies = [
      { code: "EUR", name: "Euro", flag: "🇪🇺" },
      { code: "GBP", name: "British Pound", flag: "🇬🇧" },
      { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
      { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
      { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
      { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
      { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
      { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
      { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
      { code: "MXN", name: "Mexican Peso", flag: "🇲🇽" },
      { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
      { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
      { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
      { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭" },
      { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
      { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
    ];

    const rates = currencies.map((c) => ({
      ...c,
      rate: data.rates[c.code] || 0,
    }));

    return NextResponse.json(
      {
        base: "USD",
        rates,
        lastUpdated: data.date,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Rates error:", err.message);
    return NextResponse.json(
      { message: "Failed to fetch exchange rates." },
      { status: 500 }
    );
  }
}