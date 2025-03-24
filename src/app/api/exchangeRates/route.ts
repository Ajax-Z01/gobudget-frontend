import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const baseCurrency = searchParams.get("baseCurrency");

  if (!baseCurrency) {
    return NextResponse.json({ error: "Missing baseCurrency" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching exchange rates:", error);
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 500 });
  }
}
