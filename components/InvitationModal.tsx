"use client";

import { useState } from "react";

export default function InvitationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div
      className="animate-fade-in-up"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 24,
          width: "100%",
          maxWidth: 340,
          padding: 24,
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "var(--gray-400)",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "var(--gray-50)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gray-600)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray-400)")}
        >
          ✕
        </button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "var(--green-100)",
              color: "var(--green-600)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              margin: "0 auto 16px",
              transform: "scale(1.1)",
            }}
          >
            🤝
          </div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: 8 }}>
            เชิญเพื่อนมาใช้งาน
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", lineHeight: 1.5 }}>
            แชร์โค้ดหรือลิงก์คำเชิญของคุณ<br />เพื่อให้เพื่อนเข้าร่วม Persona Health
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--gray-500)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 8,
                display: "block",
              }}
            >
              รหัสคำเชิญของคุณ
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  background: "var(--gray-50)",
                  border: "1px solid var(--gray-200)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: "1.1rem",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: "0.2em",
                  color: "var(--gray-800)",
                }}
              >
                HEALTH-275
              </div>
              <button
                style={{
                  background: "var(--green-500)",
                  color: "white",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-600)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-500)")}
                onClick={() => {
                  alert("คัดลอกรหัสแล้ว!");
                }}
              >
                คัดลอก
              </button>
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "8px 0" }}>
            <div style={{ flexGrow: 1, borderTop: "1px solid var(--gray-200)" }}></div>
            <span style={{ flexShrink: 0, margin: "0 16px", color: "var(--gray-400)", fontSize: "0.75rem", fontWeight: 600 }}>
              หรือ
            </span>
            <div style={{ flexGrow: 1, borderTop: "1px solid var(--gray-200)" }}></div>
          </div>

          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#00B900",
              color: "white",
              borderRadius: 16,
              padding: "14px 16px",
              fontWeight: 600,
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(0,185,0,0.2)",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#00A000")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#00B900")}
          >
            <span style={{ fontSize: "1.2rem" }}>💬</span>
            แชร์ผ่าน LINE
          </button>
        </div>
      </div>
    </div>
  );
}
