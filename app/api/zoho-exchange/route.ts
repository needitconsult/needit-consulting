import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, clientId, clientSecret } = await req.json() as {
      code: string;
      clientId: string;
      clientSecret: string;
    };

    const params = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: "https://www.zoho.com/crm",
      grant_type: "authorization_code",
    });

    const res = await fetch("https://accounts.zoho.com/oauth/v2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Zoho exchange error:", err);
    return NextResponse.json({ error: "Exchange failed" }, { status: 500 });
  }
}
