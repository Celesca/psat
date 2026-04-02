"use client";

import Link from "next/link";
import { useState } from "react";
import InvitationModal from "./InvitationModal";

export default function Header() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [showRewardHelp, setShowRewardHelp] = useState(false);

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, var(--green-600) 0%, var(--green-700) 60%, var(--green-800) 100%)",
          padding: "16px 16px 20px",
          borderRadius: "0 0 28px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background shapes */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -24, left: -24, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 10, left: "40%", width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

        {/* Top row: Logo + brand + actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 10, marginBottom: 14 }}>
          {/* Logo + Brand */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpg"
              alt="รวมสุข"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: "2px solid rgba(255,255,255,0.3)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                objectFit: "cover",
              }}
            />
            <div>
              <p style={{ fontSize: "1.1rem", color: "white", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.2 }}>รวมสุข</p>
              <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.7)", fontWeight: 500, letterSpacing: "0.04em" }}>Health Hub</p>
            </div>
          </Link>

          {/* Actions */}
          <div style={{ display: "flex", gap: 6 }}>
            <Link
              href="/profile"
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <button
              onClick={() => setIsInviteOpen(true)}
              aria-label="เชิญเพื่อน"
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
                transition: "background 0.2s ease",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </button>

            <Link
              href="/notifications"
              aria-label="การแจ้งเตือน"
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ef4444",
                  border: "1.5px solid var(--green-700)",
                }}
              />
            </Link>
          </div>
        </div>

        {/* Points banner */}
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 14,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>คะแนนสะสม</p>
              <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "white", lineHeight: 1.1 }}>275 <span style={{ fontSize: "0.75rem", fontWeight: 500, opacity: 0.85 }}>คะแนน</span></p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button
              type="button"
              aria-label="วิธีรับคะแนนและเงื่อนไขรางวัล"
              title="วิธีรับคะแนนและเงื่อนไขรางวัล"
              onClick={() => setShowRewardHelp((prev) => !prev)}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                fontSize: "0.85rem",
                fontWeight: 800,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ?
            </button>
            <Link
              href="/privileges"
              aria-label="ไปหน้าแลกรับสิทธิ์"
              style={{
                textDecoration: "none",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "white",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 20,
                padding: "5px 12px",
                cursor: "pointer",
              }}
            >
              แลกรับสิทธิ์ →
            </Link>
          </div>

          {showRewardHelp && (
            <>
              <button
                type="button"
                aria-label="ปิดหน้าต่างช่วยเหลือคะแนน"
                onClick={() => setShowRewardHelp(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  border: "none",
                  zIndex: 999,
                  cursor: "pointer",
                }}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-label="วิธีรับคะแนนและแลกรางวัล"
                style={{
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "min(92vw, 360px)",
                  background: "white",
                  color: "var(--gray-700)",
                  borderRadius: 14,
                  border: "1px solid var(--gray-200)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.25)",
                  padding: 14,
                  zIndex: 1000,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "var(--gray-800)" }}>
                    วิธีรับคะแนนและแลกรางวัล
                  </p>
                  <button
                    type="button"
                    aria-label="ปิด"
                    onClick={() => setShowRewardHelp(false)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "1px solid var(--gray-200)",
                      background: "white",
                      color: "var(--gray-600)",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      lineHeight: 1,
                    }}
                  >
                    x
                  </button>
                </div>

                <p style={{ margin: 0, fontSize: "0.75rem", lineHeight: 1.6, color: "var(--gray-600)" }}>
                  สะสมคะแนนจากกิจกรรมสุขภาพประจำวัน แล้วกด "แลกรับสิทธิ์" เพื่อใช้คะแนนแลกคูปองและรางวัล
                </p>

                <Link
                  href="/privileges"
                  onClick={() => setShowRewardHelp(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 12,
                    padding: "7px 12px",
                    borderRadius: 999,
                    textDecoration: "none",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "white",
                    background: "var(--green-600)",
                  }}
                >
                  ไปหน้าแลกรับสิทธิ์
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <InvitationModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </>
  );
}
