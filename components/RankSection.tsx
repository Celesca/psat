export default function RankSection() {
  const rankItems = [
    { rank: 1, label: "สุขภาพ" },
    { rank: 2, label: "การออกกำลังกาย" },
    { rank: 3, label: "กลุ่มกิจกรรม" },
  ];

  return (
    <div
      className="card animate-fade-in-up"
      style={{
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <h3
        style={{
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "var(--gray-800)",
          marginBottom: "10px",
        }}
      >
        🏆 Rank
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {rankItems.map((r) => (
          <div
            key={r.rank}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              background: "var(--gray-50)",
              borderRadius: 10,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--green-600)",
                minWidth: 20,
              }}
            >
              {r.rank}.
            </span>
            <span style={{ fontSize: "0.9rem", color: "var(--gray-700)" }}>
              {r.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
