"use client";

import Link from "next/link";

const top5 = [
  { rank: 1, name: "ลุงพล สู้ๆ", score: 1200000, avatar: "👨‍🌾" },
  { rank: 2, name: "ป้าแจ๋ว ชวนเดิน", score: 950000, avatar: "👩‍🦳" },
  { rank: 3, name: "น้องกล้วย Healthy", score: 880000, avatar: "🧑‍💻" },
  { rank: 4, name: "ลุงแดง", score: 760000, avatar: "👴" },
  { rank: 5, name: "เต่า ฟิตเฟิร์ม", score: 690000, avatar: "🐢" },
];

const myRank = { rank: 18, name: "คุณ", score: 150000, avatar: "👨‍🌾" };

const medals = ["", "🥇", "🥈", "🥉"];
const podiumColors = ["", "#FFD700", "#C0C0C0", "#CD7F32"];

export default function RankSection() {
  const top3 = top5.slice(0, 3);
  const rest = top5.slice(3);

  return (
    <div
      className="card animate-fade-in-up"
      style={{ overflow: "hidden", marginBottom: 14 }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 14px 0",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "var(--green-50)", border: "1px solid var(--green-100)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
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
            กระดานผู้นำ
          </h3>
        </div>
        <Link
          href="/leaderboard"
          style={{ fontSize: "0.72rem", color: "var(--green-600)", fontWeight: 600, textDecoration: "none" }}
        >
          ดูทั้งหมด →
        </Link>
      </div>

      {/* Mini podium - top 3 */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 8,
        padding: "14px 20px 0",
      }}>
        {[top3[1], top3[0], top3[2]].map((user, displayIdx) => {
          const isFirst = displayIdx === 1;
          const avatarSize = isFirst ? 48 : 40;
          const badgeColor = podiumColors[user.rank];
          const barHeight = isFirst ? 48 : displayIdx === 0 ? 36 : 28;

          return (
            <div key={user.rank} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <span style={{ fontSize: isFirst ? "1rem" : "0.85rem", marginBottom: 2 }}>
                {medals[user.rank]}
              </span>
              <div style={{
                width: avatarSize, height: avatarSize, borderRadius: "50%",
                background: "var(--green-50)", border: `2.5px solid ${badgeColor}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isFirst ? "1.3rem" : "1rem",
                boxShadow: `0 2px 8px ${badgeColor}40`,
                marginBottom: 4,
              }}>
                {user.avatar}
              </div>
              <p style={{
                fontSize: "0.6rem", fontWeight: 700, color: "var(--gray-700)",
                textAlign: "center", marginBottom: 1,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 80,
              }}>
                {user.name}
              </p>
              <p style={{ fontSize: "0.55rem", fontWeight: 600, color: "var(--gray-400)", marginBottom: 4 }}>
                {user.score.toLocaleString()}
              </p>
              <div style={{
                width: "100%", height: barHeight,
                borderRadius: "8px 8px 0 0",
                background: isFirst
                  ? "linear-gradient(180deg, #FFD700, #DAA520)"
                  : displayIdx === 0
                  ? "linear-gradient(180deg, #E8E8E8, #C0C0C0)"
                  : "linear-gradient(180deg, #DEB887, #CD7F32)",
                display: "flex", alignItems: "flex-start", justifyContent: "center",
                paddingTop: 6,
              }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "rgba(255,255,255,0.9)", textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}>
                  {user.rank}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ranks 4-5 preview */}
      <div style={{ padding: "8px 14px 0" }}>
        {rest.map((user, i) => (
          <div key={user.rank} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px",
            background: i % 2 === 0 ? "var(--gray-50)" : "white",
            borderRadius: 10, marginBottom: 4,
          }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--gray-500)", width: 20, textAlign: "center" }}>
              {user.rank}
            </span>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "var(--gray-100)", border: "1.5px solid var(--gray-200)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.85rem",
            }}>
              {user.avatar}
            </div>
            <span style={{ flex: 1, fontSize: "0.78rem", fontWeight: 500, color: "var(--gray-700)" }}>
              {user.name}
            </span>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-800)" }}>
              {user.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* My rank bar */}
      <div style={{
        margin: "6px 14px 14px",
        padding: "8px 12px",
        borderRadius: 10,
        background: "linear-gradient(135deg, var(--green-50), var(--green-100))",
        border: "1.5px solid var(--green-200)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--green-600)", width: 20, textAlign: "center" }}>
          {myRank.rank}
        </span>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "var(--green-200)", border: "2px solid var(--green-400)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.85rem",
        }}>
          {myRank.avatar}
        </div>
        <span style={{ flex: 1, fontSize: "0.78rem", fontWeight: 700, color: "var(--green-700)" }}>
          ⭐ {myRank.name}
        </span>
        <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--green-600)" }}>
          {myRank.score.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
