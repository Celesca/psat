"use client";

import Link from "next/link";
import { useState } from "react";
import InvitationModal from "./InvitationModal";

export default function Header() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, var(--green-500), var(--green-700))",
          padding: "18px 16px 22px",
          borderRadius: "0 0 24px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 10 }}>
          {/* Profile button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 12,
              padding: "8px 14px",
              color: "white",
              cursor: "pointer",
              fontFamily: "inherit",
              outline: "none",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>👤</span>
            <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>Profile</span>
          </button>

          {/* Points */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 14,
              padding: "8px 18px",
              color: "white",
            }}
          >
            <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>Point</span>
            <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>275</span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setIsInviteOpen(true)}
              title="เพิ่มเพื่อน"
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
              }}
            >
              ➕
            </button>
            <Link href="/notifications" legacyBehavior>
              <a
                title="การแจ้งเตือน"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  textDecoration: "none"
                }}
              >
                🔔
                {/* Notification badge dot */}
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ef4444",
                    border: "1.5px solid var(--green-600)",
                  }}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <InvitationModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </>
  );
}
