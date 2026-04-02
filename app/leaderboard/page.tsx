"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

/* ── Mock leaderboard data ── */
const leaderboard = [
  { rank: 1, name: "ลุงพล สู้ๆ", score: 1200000, avatar: "👨‍🌾" },
  { rank: 2, name: "ป้าแจ๋ว ชวนเดิน", score: 950000, avatar: "👩‍🦳" },
  { rank: 3, name: "น้องกล้วย Healthy", score: 880000, avatar: "🧑‍💻" },
  { rank: 4, name: "ลุงแดง", score: 760000, avatar: "👴" },
  { rank: 5, name: "เต่า ฟิตเฟิร์ม", score: 690000, avatar: "🐢" },
  { rank: 6, name: "น้องกลย", score: 640000, avatar: "👦" },
  { rank: 7, name: "พี่หมี สุขภาพดี", score: 620000, avatar: "🧔" },
  { rank: 8, name: "น้องมิ้นท์", score: 600000, avatar: "👧" },
  { rank: 9, name: "ลุงสม ใจดี", score: 585000, avatar: "👨‍🦰" },
  { rank: 10, name: "ป้าทอง รักสุขภาพ", score: 570000, avatar: "👩" },
  { rank: 11, name: "น้องกล้วย", score: 580000, avatar: "🧒" },
  { rank: 12, name: "เต่า ฟิตเฟิร์ม", score: 440000, avatar: "🐢" },
  { rank: 13, name: "ลุงแดง", score: 330000, avatar: "👴" },
  { rank: 14, name: "น้องกลย", score: 290000, avatar: "👦" },
  { rank: 15, name: "น้องอากาต้า", score: 280000, avatar: "👧" },
  { rank: 16, name: "พี่จอม วิ่งเร็ว", score: 250000, avatar: "🏃" },
  { rank: 17, name: "น้องฟ้า", score: 200000, avatar: "👩‍🎤" },
  { rank: 18, name: "ลุงพล สู้ๆ", score: 150000, avatar: "👨‍🌾", isYou: true },
  { rank: 19, name: "ป้าแก้ว", score: 120000, avatar: "👵" },
  { rank: 20, name: "น้องนิว", score: 100000, avatar: "🧑" },
];

const medals = ["", "🥇", "🥈", "🥉"];
const podiumColors = ["", "#FFD700", "#C0C0C0", "#CD7F32"];

export default function LeaderboardPage() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const myRank = leaderboard.find((u) => u.isYou);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, var(--green-700) 0%, var(--green-800) 280px, var(--gray-50) 280px)",
        paddingBottom: 96,
        maxWidth: 440,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            textDecoration: "none",
            color: "white",
            marginRight: 12,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>
        <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", flex: 1 }}>
          กระดานผู้นำ
        </h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="รวมสุข"
          style={{ width: 34, height: 34, borderRadius: 10, border: "2px solid rgba(255,255,255,0.3)" }}
        />
      </div>

      {/* ── Podium Top 3 ── */}
      <div
        style={{
          padding: "0 20px 24px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 12,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Reorder: 2nd, 1st, 3rd for podium layout */}
        {[top3[1], top3[0], top3[2]].map((user, displayIdx) => {
          const isFirst = displayIdx === 1;
          const podiumHeight = isFirst ? 80 : displayIdx === 0 ? 60 : 48;
          const avatarSize = isFirst ? 68 : 56;
          const badgeColor = podiumColors[user.rank];

          return (
            <div key={user.rank} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              {/* Medal */}
              <span style={{ fontSize: isFirst ? "1.6rem" : "1.2rem", marginBottom: 4 }}>
                {medals[user.rank]}
              </span>

              {/* Avatar */}
              <div
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--green-100), var(--green-200))",
                  border: `3px solid ${badgeColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isFirst ? "1.8rem" : "1.4rem",
                  boxShadow: isFirst ? `0 4px 20px ${badgeColor}60` : `0 2px 10px ${badgeColor}40`,
                  marginBottom: 6,
                }}
              >
                {user.avatar}
              </div>

              {/* Name */}
              <p style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "white",
                textAlign: "center",
                marginBottom: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 100,
              }}>
                {user.name}
              </p>

              {/* Score */}
              <p style={{
                fontSize: "0.62rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                marginBottom: 6,
              }}>
                {user.score.toLocaleString()}
              </p>

              {/* Podium bar */}
              <div
                style={{
                  width: "100%",
                  height: podiumHeight,
                  borderRadius: "12px 12px 0 0",
                  background: isFirst
                    ? "linear-gradient(180deg, #FFD700, #DAA520)"
                    : displayIdx === 0
                    ? "linear-gradient(180deg, #E8E8E8, #C0C0C0)"
                    : "linear-gradient(180deg, #DEB887, #CD7F32)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: 10,
                  boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <span style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.9)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}>
                  {user.rank}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── My rank sticky banner ── */}
      {myRank && (
        <div
          style={{
            margin: "0 14px 10px",
            padding: "10px 14px",
            borderRadius: 14,
            background: "linear-gradient(135deg, var(--green-500), var(--green-600))",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 4px 16px rgba(34,197,94,0.3)",
          }}
        >
          <div style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.85rem",
            fontWeight: 800,
            color: "white",
          }}>
            {myRank.rank}
          </div>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--green-200)",
            border: "2px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
          }}>
            {myRank.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "white" }}>คุณ</p>
            <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.8)" }}>{myRank.name}</p>
          </div>
          <p style={{ fontSize: "0.85rem", fontWeight: 800, color: "white" }}>
            {myRank.score.toLocaleString()}
          </p>
        </div>
      )}

      {/* ── Leaderboard Table ── */}
      <div style={{ padding: "0 14px" }}>
        <div
          className="card"
          style={{
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "48px 40px 1fr 90px",
              alignItems: "center",
              padding: "12px 14px",
              background: "var(--green-50)",
              borderBottom: "1px solid var(--green-100)",
            }}
          >
            <span style={thStyle}>อันดับ</span>
            <span style={thStyle}>โปรไฟล์</span>
            <span style={thStyle}>ชื่อผู้ใช้</span>
            <span style={{ ...thStyle, textAlign: "right" }}>คะแนน</span>
          </div>

          {/* Rows */}
          {rest.map((user, i) => (
            <div
              key={`${user.rank}-${i}`}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 40px 1fr 90px",
                alignItems: "center",
                padding: "10px 14px",
                background: user.isYou ? "var(--green-50)" : i % 2 === 0 ? "white" : "var(--gray-50)",
                borderBottom: "1px solid var(--gray-100)",
                borderLeft: user.isYou ? "3px solid var(--green-500)" : "3px solid transparent",
                transition: "background 0.15s ease",
              }}
            >
              {/* Rank */}
              <span style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: user.isYou ? "var(--green-600)" : "var(--gray-600)",
              }}>
                {user.rank}
              </span>

              {/* Avatar */}
              <div style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: user.isYou ? "var(--green-100)" : "var(--gray-100)",
                border: user.isYou ? "2px solid var(--green-400)" : "2px solid var(--gray-200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
              }}>
                {user.avatar}
              </div>

              {/* Name */}
              <div style={{ paddingLeft: 8, minWidth: 0 }}>
                <p style={{
                  fontSize: "0.78rem",
                  fontWeight: user.isYou ? 700 : 500,
                  color: user.isYou ? "var(--green-700)" : "var(--gray-700)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {user.isYou ? `⭐ ${user.name}` : user.name}
                </p>
              </div>

              {/* Score */}
              <p style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                color: user.isYou ? "var(--green-600)" : "var(--gray-800)",
                textAlign: "right",
              }}>
                {user.score.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

const thStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 700,
  color: "var(--green-700)",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
};
