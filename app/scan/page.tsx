"use client";

import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ScanPage() {
  const router = useRouter();
  const [scanLinePos, setScanLinePos] = useState(0);

  // Animate the scan line bouncing up and down
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLinePos((prev) => (prev > 95 ? 0 : prev + 2));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: 440,
        margin: "0 auto",
        position: "relative",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── SIMULATED CAMERA BACKGROUND ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(45deg, #1f2937, #111827, #374151)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 10s ease infinite",
          opacity: 0.8,
          zIndex: 0,
        }}
      />
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "40px 20px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "none",
            color: "white",
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 style={{ color: "white", fontSize: "1.2rem", fontWeight: 600, margin: 0 }}>สแกน QR Code</h1>
        <div style={{ width: 40 }} /> {/* spacer */}
      </div>

      {/* ── SCANNER AREA ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          paddingBottom: 100, // Make room for BottomNav and Action buttons
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 32, fontSize: "0.9rem" }}>
          จัดคิวอาร์โค้ดให้อยู่ในกรอบเพื่อสแกน
        </p>

        {/* Scanner Box */}
        <div
          style={{
            width: 250,
            height: 250,
            position: "relative",
          }}
        >
          {/* Top Left Corner */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 40, borderTop: "4px solid #4ade80", borderLeft: "4px solid #4ade80", borderRadius: "12px 0 0 0" }} />
          {/* Top Right Corner */}
          <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, borderTop: "4px solid #4ade80", borderRight: "4px solid #4ade80", borderRadius: "0 12px 0 0" }} />
          {/* Bottom Left Corner */}
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 40, height: 40, borderBottom: "4px solid #4ade80", borderLeft: "4px solid #4ade80", borderRadius: "0 0 0 12px" }} />
          {/* Bottom Right Corner */}
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 40, height: 40, borderBottom: "4px solid #4ade80", borderRight: "4px solid #4ade80", borderRadius: "0 0 12px 0" }} />

          {/* Animated Scan Line */}
          <div
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              height: 2,
              background: "#4ade80",
              boxShadow: "0 0 8px 2px rgba(74, 222, 128, 0.5)",
              top: `${scanLinePos}%`,
              transition: "none",
            }}
          />

          {/* Transparent center to simulate camera focus area */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12
          }} />
        </div>

        {/* Action Buttons Below Scanner */}
        <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
          <ActionButton icon={<ImageIcon />} label="รูปภาพ" />
          <ActionButton icon={<FlashIcon />} label="ไฟฉาย" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: "0.75rem", fontWeight: 500, opacity: 0.9 }}>{label}</span>
    </button>
  );
}

function ImageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
