export default function HealthDataSection() {
  const score = 72;
  const segments = [
    { color: "#ef4444", label: "ต่ำ" },
    { color: "#f97316", label: "" },
    { color: "#facc15", label: "ปานกลาง" },
    { color: "#4ade80", label: "" },
    { color: "#16a34a", label: "ดี" },
  ];

  // Determine which segment the score falls in (0-100 split into 5 bands)
  const activeSegment = Math.min(Math.floor(score / 20), 4);

  return (
    <div
      className="card animate-fade-in-up"
      style={{ padding: "16px", marginBottom: "16px", animationDelay: "0.1s" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "var(--green-50)",
            border: "1px solid var(--green-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)" }}>สุขภาพของคุณ</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {/* Left: view data button */}
        <button
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: 14,
            borderRadius: 12,
            border: "1.5px solid var(--gray-200)",
            background: "var(--gray-50)",
            cursor: "pointer",
            fontFamily: "inherit",
            textAlign: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--green-300)";
            (e.currentTarget as HTMLButtonElement).style.background = "var(--green-50)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gray-200)";
            (e.currentTarget as HTMLButtonElement).style.background = "var(--gray-50)";
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "var(--green-100)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6"  y1="20" x2="6"  y2="14" />
            </svg>
          </div>
          <span style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)" }}>ดูข้อมูลสุขภาพ</span>
          <span style={{ fontSize: "0.68rem", color: "var(--gray-400)" }}>ข้อมูลแบบละเอียด</span>
        </button>

        {/* Right: health score */}
        <div
          style={{
            padding: 14,
            borderRadius: 12,
            border: "1.5px solid var(--green-100)",
            background: "var(--green-50)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--gray-800)", lineHeight: 1.3 }}>
            คะแนนสุขภาพ
          </p>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: segments[activeSegment].color, lineHeight: 1 }}>
            {score}
          </p>
          <p style={{ fontSize: "0.62rem", color: "var(--gray-500)" }}>เทียบกับ 100 คน</p>
          {/* Color scale bar */}
          <div style={{ display: "flex", gap: 2, height: 6, borderRadius: 4, overflow: "hidden", marginTop: 2 }}>
            {segments.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: s.color,
                  opacity: i === activeSegment ? 1 : 0.3,
                  borderRadius: i === 0 ? "4px 0 0 4px" : i === 4 ? "0 4px 4px 0" : 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
