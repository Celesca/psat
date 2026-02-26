"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: "หน้าหลัก",
      href: "/",
    },
    {
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
      label: "สิทธิพิเศษ",
      href: "/privileges",
    },
    {
      // Scan – special center button
      icon: (_active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      label: "Scan",
      href: "/scan",
      isScan: true,
    },
    {
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "ร้านค้า",
      href: "/shops",
    },
    {
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#a3a3a3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: "ข้อมูลส่วนตัว",
      href: "/profile",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid var(--gray-100)",
        padding: "0 0 env(safe-area-inset-bottom, 6px)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
        maxWidth: 440,
        margin: "0 auto",
        zIndex: 100,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
      }}
    >
      {navItems.map((tab) => {
        const isActive = pathname === tab.href;

        if (tab.isScan) {
          return (
            <Link key={tab.label} href={tab.href} legacyBehavior>
              <a
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  textDecoration: "none",
                  marginTop: -18,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4ade80, #16a34a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(34, 197, 94, 0.4)",
                    border: "3px solid white",
                    transition: "all 0.3s ease",
                  }}
                >
                  {tab.icon(false)}
                </div>
                <span
                  style={{
                    fontSize: "0.55rem",
                    fontWeight: 600,
                    color: "var(--green-600)",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  {tab.label}
                </span>
              </a>
            </Link>
          );
        }

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
                padding: "8px 4px 6px",
                fontFamily: "inherit",
                minWidth: 56,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              {tab.icon(isActive)}
              <span
                style={{
                  fontSize: "0.55rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "var(--green-600)" : "var(--gray-400)",
                  textAlign: "center",
                  lineHeight: 1.3,
                  whiteSpace: "pre-line",
                  marginTop: 2,
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
