"use client";

const sections = [
  {
    title: "Registration Confirmation",
    items: [
      "Phone web interface Status tab shows Registered",
      "Phone screen shows extension or line active — no Unregistered message",
      "Date and time displaying correctly on phone screen",
    ],
  },
  {
    title: "Outbound Call Test",
    items: [
      "Dial an external number (a cell phone works)",
      "Call connects within 3–5 rings",
      "Remote caller hears you clearly — no echo, no static",
      "You hear remote caller clearly",
      "No one-way audio (both sides can hear each other)",
      "Call remains stable for at least 2 minutes",
    ],
  },
  {
    title: "Inbound Call Test",
    items: [
      "Have someone call your business number from outside",
      "Phone rings correctly",
      "Answer and confirm two-way audio",
      "Caller ID displays correctly on phone screen",
    ],
  },
  {
    title: "Hold & Transfer",
    items: [
      "Place caller on hold — confirm hold music plays (if configured)",
      "Resume call — confirm audio returns immediately",
      "Blind transfer to another extension completes correctly",
      "Attended transfer (announce before transfer) completes correctly",
    ],
  },
  {
    title: "Voicemail",
    items: [
      "Let a test call go to voicemail",
      "Voicemail greeting plays correctly",
      "Message records and saves",
      "Voicemail-to-email received within 2 minutes (if configured)",
      "Voicemail playback is clear and audible",
    ],
  },
  {
    title: "Headset (if applicable)",
    items: [
      "Headset audio routes correctly — not coming from speaker",
      "Headset Prior set to Enabled in phone web interface: Features → Audio",
      "Mute button works — caller cannot hear when muted (check LED)",
      "Volume controls functional on headset",
      "DECT/wireless headset stays connected at full expected range",
    ],
  },
  {
    title: "If Issues Found — Quick Reference",
    accent: true,
    items: [
      "Phone won't register → Check SIP password and server address on Account tab",
      "One-way audio → Confirm RTP ports 10000–12000 are open UDP both directions",
      "Echo on calls → Reduce speaker volume, disable SIP ALG on router",
      "Calls drop after a few minutes → Set Register Expiry to 120 on Account → Basic",
      "Can't access web interface → Confirm phone IP on Status screen, must be on same network",
      "Caller ID not displaying correctly → Contact carrier to confirm Caller ID was set up in their portal, then check your phone management platform to confirm nothing is blocking or overriding the Caller ID sent from your carrier",
    ],
  },
];

export default function CallQualityPage() {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 0.6in; }
        }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      `}</style>

      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg shadow hover:bg-green-500 transition-colors"
        >
          Save as PDF
        </button>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px", color: "#111" }}>

        {/* Header */}
        <div style={{ borderBottom: "3px solid #16a34a", paddingBottom: 16, marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#16a34a", textTransform: "uppercase", fontWeight: 700, margin: 0 }}>
                NeedIT Consulting LLC
              </p>
              <h1 style={{ fontSize: 28, fontWeight: 800, margin: "6px 0 4px", color: "#111" }}>
                Call Quality Testing Checklist
              </h1>
              <p style={{ fontSize: 13, color: "#555", margin: 0 }}>
                Run through every section after setup is complete. Don&apos;t sign off until all tests pass.
              </p>
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: "#888", flexShrink: 0, marginLeft: 24 }}>
              <p style={{ margin: 0 }}>needitconsulting.com</p>
              <p style={{ margin: "2px 0 0" }}>Fredericksburg, VA</p>
            </div>
          </div>
        </div>

        {/* Info row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Business / Client", value: "" },
            { label: "Phone Model", value: "" },
            { label: "Date", value: "" },
          ].map(({ label, value }) => (
            <div key={label} style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 14px" }}>
              <p style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px", fontWeight: 600 }}>{label}</p>
              <div style={{ borderBottom: "1px solid #d1d5db", minHeight: 20 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, si) => (
          <div key={section.title} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: section.accent ? "#f97316" : "#16a34a",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>{si + 1}</span>
              </div>
              <h2 style={{ fontSize: 14, fontWeight: 800, color: "#111", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {section.title}
              </h2>
            </div>
            <div style={{ border: `1px solid ${section.accent ? "#fed7aa" : "#e5e7eb"}`, borderRadius: 10, overflow: "hidden" }}>
              {section.items.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "10px 14px",
                    background: section.accent
                      ? (i % 2 === 0 ? "#fff7ed" : "#ffffff")
                      : (i % 2 === 0 ? "#f9fafb" : "#ffffff"),
                    borderBottom: i < section.items.length - 1 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <div style={{
                    width: 18, height: 18,
                    border: `2px solid ${section.accent ? "#f97316" : "#16a34a"}`,
                    borderRadius: 4, flexShrink: 0, marginTop: 1,
                  }} />
                  <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Pass / Fail sign-off */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {["Pass — Setup Complete", "Fail — Issues Noted"].map((label, i) => (
            <div key={label} style={{
              border: `2px solid ${i === 0 ? "#16a34a" : "#ef4444"}`,
              borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 20, height: 20,
                border: `2px solid ${i === 0 ? "#16a34a" : "#ef4444"}`,
                borderRadius: 4, flexShrink: 0,
              }} />
              <p style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "#15803d" : "#dc2626", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px", marginBottom: 24, background: "#f9fafb" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", margin: "0 0 8px" }}>Notes</p>
          {[1, 2, 3].map((n) => (
            <div key={n} style={{ borderBottom: "1px solid #e5e7eb", height: 28, marginBottom: 4 }} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>NeedIT Consulting LLC · Fredericksburg, VA · needitconsulting.com</p>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Call Quality Testing Checklist · © 2025</p>
        </div>
      </div>
    </>
  );
}
