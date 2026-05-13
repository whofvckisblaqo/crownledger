import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ids = [
      "bitcoin", "ethereum", "tether", "binancecoin", "solana",
      "ripple", "usd-coin", "cardano", "avalanche-2", "dogecoin",
      "tron", "chainlink", "polkadot", "matic-network", "shiba-inu",
      "litecoin", "bitcoin-cash", "uniswap", "cosmos", "stellar"
    ].join(",");

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error("Failed to fetch prices");

    const data = await res.json();

    return NextResponse.json({ prices: data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch prices." }, { status: 500 });
  }
}