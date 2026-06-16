"use client";

const sections = [
  {
    title: "Internet Connection",
    items: [
      "Minimum 10 Mbps upload speed per concurrent call",
      "Speed test completed at speedtest.net before setup",
      "Wired connection from modem/router to switch (not Wi-Fi backbone)",
      "Internet stable — no outages or intermittent drops in the past 48 hours",
    ],
  },
  {
    title: "Router & Switch",
    items: [
      "Available ethernet port on router or switch",
      "PoE switch available — OR — power adapter included with phone",
      "SIP ALG disabled on router (causes most registration failures)",
      "RTP ports 10000–12000 open UDP both directions on firewall",
      "SIP port 5060 open TCP/UDP outbound on firewall",
      "QoS configured to prioritize voice traffic (recommended)",
    ],
  },
  {
    title: "Hardware",
    items: [
      "Phone body unboxed and inspected — no visible damage",
      "Handset and coiled cord present (desk phones)",
      "Ethernet cable included and undamaged",
      "Power adapter present if no PoE switch available",
      "Phone stand assembled and stable",
    ],
  },
  {
    title: "VoIP Provider Account",
    items: [
      "Provider account created and login confirmed",
      "SIP username (Register Name) noted and ready",
      "SIP password noted and ready",
      "SIP server address noted and ready",
      "Billing active — account in good standing",
      "Provider welcome email accessible",
    ],
  },
  {
    title: "Before You Plug In",
    items: [
      "Computer available on the same network as the phone",
      "Browser open and ready (Chrome or Firefox recommended)",
      "Phone web interface default login ready: admin / admin",
      "Note the phone's IP address after boot: press OK on phone",
      "Nothing blocking the phone's ethernet port or power supply",
    ],
  },
];

export default function NetworkChecklistPage() {
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
                VoIP Pre-Flight Checklist
              </h1>
              <p style={{ fontSize: 13, color: "#555", margin: 0 }}>
                Complete every item before touching a cable. Most setup headaches come from skipping this step.
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
              <div style={{ width: 24, height: 24, borderRadius: 6, background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>{si + 1}</span>
              </div>
              <h2 style={{ fontSize: 14, fontWeight: 800, color: "#111", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {section.title}
              </h2>
            </div>
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
              {section.items.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "10px 14px",
                    background: i % 2 === 0 ? "#f9fafb" : "#ffffff",
                    borderBottom: i < section.items.length - 1 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <div style={{
                    width: 18, height: 18, border: "2px solid #16a34a", borderRadius: 4,
                    flexShrink: 0, marginTop: 1,
                  }} />
                  <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

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
          <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>VoIP Pre-Flight Checklist · © 2025</p>
        </div>
      </div>
    </>
  );
}
