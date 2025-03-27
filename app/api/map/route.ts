import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get("address")

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 })
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

  // Return a signed URL or just the status that the API key exists
  return NextResponse.json({
    hasApiKey: !!apiKey,
    // We don't return the actual API key, just whether it exists
  })
}

