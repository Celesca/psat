"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "ยินดีต้อนรับเข้าสู่ Persona Health",
      desc: "กรุณากรอกข้อมูลส่วนตัวเพื่อการวิเคราะห์สุขภาพที่แม่นยำยิ่งขึ้น",
      time: "2 นาทีที่แล้ว",
      unread: true,
      icon: "🎉",
      bg: "var(--green-100)",
    },
    {
      id: 2,
      title: "เชื่อมต่อแอปสำเร็จ",
      desc: "Apple Health ของคุณซิงก์ข้อมูลเรียบร้อยแล้ว",
      time: "3 ชั่วโมงที่แล้ว",
      unread: true,
      icon: "🔗",
      bg: "var(--orange-100)", // Using orange here for variety, was blue
    },
    {
      id: 3,
      title: "รับแต้มฟรี 10 Point",
      desc: "เพียงดู VDO แนะนำการใช้งาน ครบ 1 นาที",
      time: "เมื่อวาน",
      unread: false,
      icon: "🪙",
      bg: "var(--orange-100)",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--gray-50)",
        paddingBottom: 90,
        maxWidth: 440,
        margin: "0 auto",
        position: "relative",
        boxShadow: "0 0 10px rgba(0,0,0,0.02)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "16px",
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--gray-100)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" legacyBehavior>
          <a
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "var(--gray-100)",
              textDecoration: "none",
              color: "var(--gray-800)",
              marginRight: 12,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </a>
        </Link>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--gray-800)" }}>
          การแจ้งเตือน
        </h1>
      </div>

      <main style={{ flex: 1, padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                padding: 16,
                borderRadius: 12,
                border: "1px solid",
                borderColor: n.unread ? "var(--green-200)" : "var(--gray-100)",
                background: n.unread ? "white" : "rgba(249, 250, 251, 0.5)",
                display: "flex",
                gap: 12,
                boxShadow: n.unread ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  flexShrink: 0,
                  background: n.bg,
                }}
              >
                {n.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: n.unread ? "var(--gray-900)" : "var(--gray-600)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {n.title}
                  </h3>
                  {n.unread && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#ef4444",
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                  )}
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--gray-500)",
                    lineHeight: 1.4,
                    marginBottom: 8,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {n.desc}
                </p>
                <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "var(--gray-400)" }}>
                  {n.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
