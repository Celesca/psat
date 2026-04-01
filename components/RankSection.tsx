export default function RankSection() {
  const rankItems = [
    { rank: 1, label: "สุขภาพโดยรวม", score: "92/100", color: "#16a34a" },
    { rank: 2, label: "การออกกำลังกาย", score: "78/100", color: "#22c55e" },
    { rank: 3, label: "กลุ่มกิจกรรม",    score: "65/100", color: "#4ade80" },
  ];

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div
      className="card animate-fade-in-up"
      style={{ padding: "16px", marginBottom: "16px" }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)" }}>
            อันดับของคุณ
          </h3>
        </div>
        <span style={{ fontSize: "0.72rem", color: "var(--green-600)", fontWeight: 600, cursor: "pointer" }}>
          ดูทั้งหมด →
        </span>
      </div>

      {/* Rank items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rankItems.map((r, i) => (
          <div
            key={r.rank}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              background: i === 0 ? "var(--green-50)" : "var(--gray-50)",
              borderRadius: 10,
              border: i === 0 ? "1px solid var(--green-100)" : "1px solid transparent",
            }}
          >
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{medals[i]}</span>
            <span style={{ flex: 1, fontSize: "0.88rem", fontWeight: i === 0 ? 700 : 500, color: i === 0 ? "var(--gray-900)" : "var(--gray-700)" }}>
              {r.label}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: r.color,
                background: "white",
                border: `1px solid ${r.color}30`,
                borderRadius: 20,
                padding: "2px 10px",
              }}
            >
              {r.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
