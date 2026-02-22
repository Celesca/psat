"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: "🏠", label: "หน้าหลัก", href: "/" },
    { icon: "🎁", label: "สิทธิ์แลก", href: "/rewards" },
    { icon: "⭐", label: "สะสม", href: "/collect" },
    { icon: "🎮", label: "เกมส์\nและรางวัล", href: "/games" },
    { icon: "👤", label: "ข้อมูล\nส่วนบุคคล", href: "/profile" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        borderTop: "1px solid var(--gray-100)",
        padding: "6px 0 8px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        maxWidth: 440,
        margin: "0 auto",
        zIndex: 100,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {navItems.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.label} href={tab.href} legacyBehavior>
            <a
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: "4px 6px",
                fontFamily: "inherit",
                minWidth: 56,
                textDecoration: "none"
              }}
            >
              <span style={{ fontSize: "1.15rem" }}>{tab.icon}</span>
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "var(--green-600)" : "var(--gray-400)",
                  textAlign: "center",
                  lineHeight: 1.3,
                  whiteSpace: "pre-line",
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--green-500)",
                    marginTop: 1,
                  }}
                />
              )}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
