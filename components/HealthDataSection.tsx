export default function HealthDataSection() {
  return (
    <div
      className="card animate-fade-in-up"
      style={{
        padding: "16px",
        marginBottom: "16px",
        animationDelay: "0.1s",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Left */}
        <button
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            padding: 14,
            borderRadius: 12,
            border: "1.5px solid var(--gray-200)",
            background: "var(--gray-50)",
            cursor: "pointer",
            fontFamily: "inherit",
            textAlign: "center",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--green-300)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--gray-200)")}
        >
          <span style={{ fontSize: "1.4rem", marginBottom: 4 }}>📊</span>
          <span style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)" }}>
            กดเพื่อดูข้อมูล
          </span>
          <span style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>
            ภาคดิจิตอล ฯลฯ
          </span>
        </button>
        {/* Right */}
        <div
          style={{
            padding: 14,
            borderRadius: 12,
            border: "1.5px solid var(--green-200, var(--gray-200))",
            background: "var(--green-50)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)", marginBottom: 4, lineHeight: 1.2 }}>
            คะแนน ด้านสุขภาพ<br/>ของคุณ
          </p>
          <p style={{ fontSize: "0.65rem", color: "var(--gray-400)", marginBottom: 8 }}>
            (เทียบ 100 คนมส.)
          </p>
          {/* Color scale bar */}
          <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ flex: 1, background: "#ef4444" }} />
            <div style={{ flex: 1, background: "#f97316" }} />
            <div style={{ flex: 1, background: "#facc15" }} />
            <div style={{ flex: 1, background: "#4ade80" }} />
            <div style={{ flex: 1, background: "#16a34a" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
