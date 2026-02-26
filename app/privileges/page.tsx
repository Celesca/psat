"use client";

import BottomNav from "@/components/BottomNav";

export default function PrivilegesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: 440,
        margin: "0 auto",
        position: "relative",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        paddingBottom: 90,
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          padding: "24px 20px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--gray-100)",
          position: "sticky",
          top: 0,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          zIndex: 20,
        }}
      >
        <h1 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--gray-800)", margin: 0 }}>
          สิทธิพิเศษทั้งหมด
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "0.5rem", fontWeight: 800, lineHeight: 1, textAlign: "center" }}>บางจาก<br/>พอยท์</span>
          </div>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f59e0b" }}>209</span>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="hide-scroll" style={{ display: "flex", gap: 8, padding: "16px 20px", overflowX: "auto" }}>
        <button style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0", fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <span>👍</span> แนะนำ
        </button>
        <button style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, background: "var(--gray-50)", color: "var(--gray-700)", border: "1px solid var(--gray-200)", fontSize: "0.8rem", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ background: "#65a30d", color: "white", padding: "2px 4px", borderRadius: 4, fontSize: "0.55rem", fontWeight: 700 }}>NEW</span> ล่าสุด
        </button>
        <button style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, background: "var(--gray-50)", color: "var(--gray-700)", border: "1px solid var(--gray-200)", fontSize: "0.8rem", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
          <span>📊</span> คะแนนจากน้อย &gt; มาก
        </button>
      </div>

      {/* ── GRID CONTENT ── */}
      <div style={{ padding: "0 16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <CouponCard value="20" points="100" />
        <CouponCard value="30" points="150" />
        <CouponCard value="50" points="250" />
        <CouponCard value="100" points="400" />
      </div>

      <BottomNav />

      {/* scrollbar hide styles */}
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function CouponCard({ value, points }: { value: string; points: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, cursor: "pointer", transition: "transform 0.1s ease" }} onPointerDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")} onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")} onPointerLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      
      {/* Top Banner Box */}
      <div style={{ 
        background: "linear-gradient(180deg, #86efac, #22c55e)", 
        borderRadius: 16, 
        padding: "16px 12px 60px", 
        position: "relative",
        boxShadow: "0 4px 12px rgba(34,197,94,0.15)",
        overflow: "hidden"
      }}>
        {/* Fake decorative element */}
        <div style={{ position: "absolute", bottom: -20, left: -20, right: -20, height: 80, background: "white", borderRadius: "50% 50% 0 0", opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: 10, right: 10, width: 40, height: 40, background: "rgba(255,255,255,0.2)", borderRadius: "50%" }} />
        
        <div style={{ color: "white", fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.2, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
          คูปองแทนเงินสด
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 }}>
          <span style={{ color: "white", fontSize: "0.75rem", opacity: 0.9, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>มูลค่า</span>
          <span style={{ color: "white", fontSize: "2.8rem", fontWeight: 800, fontStyle: "italic", textShadow: "0 2px 4px rgba(0,0,0,0.15)", letterSpacing: -1 }}>{value}</span>
          <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 600, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>บาท</span>
        </div>
      </div>

      {/* Text Info */}
      <div style={{ padding: "0 4px" }}>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gray-800)", lineHeight: 1.4, margin: "0 0 8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          แลกรับคูปองแทนเงินสด {value} บาท สำหรับสมาชิกบางจาก...
        </p>

        {/* Points Cost */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "0.35rem", fontWeight: 800, lineHeight: 1, textAlign: "center" }}>BZ</span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-500)", margin: 0 }}>
            ใช้ <span style={{ color: "#f59e0b", fontWeight: 700 }}>{points}</span> คะแนน
          </p>
        </div>
      </div>

    </div>
  );
}
