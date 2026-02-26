"use client";

import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: 440,
        margin: "0 auto",
        position: "relative",
        background: "#f0f4f0",
        display: "flex",
        flexDirection: "column",
        paddingBottom: 90,
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          padding: "40px 20px 20px",
          background: "linear-gradient(135deg, #16a34a, #4ade80)",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "3px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <h1 style={{ fontSize: "1.7rem", fontWeight: 700, margin: 0 }}>Profile</h1>
          <p style={{ opacity: 0.9, fontSize: "0.85rem", marginTop: 2 }}>sawit@example.com</p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: "24px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        
        {/* Menu Items */}
        <MenuItem label="ข้อมูลทั่วไป" description="ชื่อ, ที่อยู่, วันเกิด" icon="👤" />
        <MenuItem label="ข้อมูลสุขภาพ" description="ที่แชร์ / ที่ไม่แชร์" icon="❤️" />
        <MenuItem label="ข้อมูลการแพ้ยา" icon="💊" />
        <MenuItem label="ผลการตรวจสุขภาพ" icon="📄" />
        
        {/* Combined Scores Section */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "16px",
            marginTop: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            position: "relative",
            border: "1px solid var(--gray-100)"
          }}
        >
          {/* subtle bracket effect on the right matching the sketch */}
          <div style={{
            position: "absolute",
            right: 16,
            top: 24,
            bottom: 24,
            width: 8,
            borderRight: "2px solid #a855f7",
            borderTop: "2px solid #a855f7",
            borderBottom: "2px solid #a855f7",
            borderRadius: "0 8px 8px 0",
            opacity: 0.7
          }} />

          <div style={{ 
            position: "absolute", 
            right: 32, 
            top: "50%", 
            transform: "translateY(-50%)", 
            fontSize: "0.65rem", 
            color: "#a855f7", 
            fontWeight: 600, 
            maxWidth: 60, 
            textAlign: "right", 
            lineHeight: 1.3 
          }}>
            ประมวลผลรวมกันจะแสดงในหน้าแรกเป็นคะแนนรวมสุขภาพ
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingRight: 80 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fdf4ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "#a855f7" }}>
              ⭐
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--gray-800)", fontSize: "0.95rem" }}>คะแนนสุขภาพ</div>
              <div style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>75/100</div>
            </div>
          </div>
          
          <div style={{ width: "calc(100% - 80px)", height: 1, background: "var(--gray-100)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingRight: 80 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fdf4ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "#a855f7" }}>
              🎯
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--gray-800)", fontSize: "0.95rem" }}>คะแนนพฤติกรรม</div>
              <div style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>82/100</div>
            </div>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}

function MenuItem({ label, description, icon }: { label: string; description?: string; icon: string }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "pointer",
        border: "1px solid var(--gray-100)",
        transition: "transform 0.1s ease",
      }}
      onPointerDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", border: "1px solid #dcfce7" }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: "var(--gray-800)", fontSize: "0.95rem" }}>{label}</div>
          {description && (
            <div style={{ fontSize: "0.75rem", color: "var(--gray-500)", marginTop: 2 }}>
              {description}
            </div>
          )}
        </div>
      </div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
}
