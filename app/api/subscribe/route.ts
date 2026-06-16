import { NextRequest, NextResponse } from "next/server";

async function getZohoAccessToken(): Promise<string> {
  const res = await fetch(
    `https://accounts.zoho.com/oauth/v2/token?refresh_token=${process.env.ZOHO_REFRESH_TOKEN}&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&grant_type=refresh_token`,
    { method: "POST" }
  );
  const data = await res.json() as { access_token?: string };
  if (!data.access_token) throw new Error("Could not obtain Zoho access token");
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json() as { name: string; email: string };
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const accessToken = await getZohoAccessToken();

    const zohoRes = await fetch("https://www.zohoapis.com/crm/v2/Leads", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            Last_Name: name || "Unknown",
            Email: email,
            Lead_Source: "Website Popup",
            Description: "Requested free VoIP setup checklist from needitconsulting.com",
          },
        ],
      }),
    });

    if (!zohoRes.ok) {
      const err = await zohoRes.text();
      console.error("Zoho CRM error:", err);
      return NextResponse.json({ error: "CRM error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
