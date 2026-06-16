"use client";

import { useState } from "react";

export default function ZohoSetupPage() {
  const [fields, setFields] = useState({ code: "", clientId: "", clientSecret: "" });
  const [result, setResult] = useState<{ refresh_token?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const params = new URLSearchParams({
        code: fields.code,
        client_id: fields.clientId,
        client_secret: fields.clientSecret,
        redirect_uri: "https://www.zoho.com/crm",
        grant_type: "authorization_code",
      });
      const res = await fetch(`https://accounts.zoho.com/oauth/v2/token?${params.toString()}`, {
        method: "POST",
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Request failed — check your credentials and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 540, margin: "60px auto", padding: "0 24px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "#fff", border: "2px solid #16a34a", borderRadius: 16, padding: 32 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#16a34a", textTransform: "uppercase", fontWeight: 700, margin: "0 0 6px" }}>
          NeedIT — One-Time Setup
        </p>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>Zoho Refresh Token Generator</h1>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px", lineHeight: 1.6 }}>
          Paste your 5-minute code and credentials below. Click the button within 5 minutes of generating the code in Zoho. Copy the refresh token and add it to Vercel — then delete this page.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { key: "clientId", label: "Client ID", placeholder: "1000.XXXXXXXXXXXX" },
            { key: "clientSecret", label: "Client Secret", placeholder: "abc123..." },
            { key: "code", label: "Authorization Code (5-min code)", placeholder: "1000.XXXX.XXXX" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#374151", marginBottom: 6 }}>
                {label}
              </label>
              <input
                type="text"
                required
                placeholder={placeholder}
                value={fields[key as keyof typeof fields]}
                onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: 13, outline: "none", boxSizing: "border-box" }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{ padding: "12px", borderRadius: 10, background: loading ? "#d1d5db" : "#16a34a", color: "#fff", fontWeight: 800, fontSize: 14, border: "none", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Exchanging…" : "Get My Refresh Token"}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: 24, padding: 20, borderRadius: 10, background: result.refresh_token ? "#f0fdf4" : "#fef2f2", border: `1.5px solid ${result.refresh_token ? "#16a34a" : "#ef4444"}` }}>
            {result.refresh_token ? (
              <>
                <p style={{ fontWeight: 800, color: "#15803d", margin: "0 0 8px" }}>✓ Success — copy your refresh token:</p>
                <code style={{ display: "block", wordBreak: "break-all", background: "#fff", padding: "10px 14px", borderRadius: 8, border: "1px solid #bbf7d0", fontSize: 13, color: "#111", userSelect: "all" }}>
                  {result.refresh_token}
                </code>
                <p style={{ fontSize: 12, color: "#16a34a", marginTop: 10 }}>
                  Add this as <strong>ZOHO_REFRESH_TOKEN</strong> in Vercel environment variables. Then delete this page from your codebase.
                </p>
              </>
            ) : (
              <>
                <p style={{ fontWeight: 800, color: "#dc2626", margin: "0 0 8px" }}>Something went wrong:</p>
                <code style={{ display: "block", wordBreak: "break-all", fontSize: 12, color: "#7f1d1d" }}>
                  {JSON.stringify(result, null, 2)}
                </code>
                <p style={{ fontSize: 12, color: "#dc2626", marginTop: 8 }}>
                  Most common cause: the 5-minute code expired. Go back to Zoho, generate a new code, and try again immediately.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
