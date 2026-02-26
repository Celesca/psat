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
      <div style={{ padding: "16px 16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        
        {/* Profile Settings Segment */}
        <section>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <MenuItem label="ข้อมูลทั่วไป" description="ชื่อ, ที่อยู่, วันเกิด, กรุ๊ปเลือด" icon="👤" bgColor="#f0fdf4" iconColor="#16a34a" />
            <MenuItem label="ข้อมูลสุขภาพ" description="อัปเดตสถานะล่าสุดเมื่อ 2 วันที่แล้ว" icon="❤️" bgColor="#fef2f2" iconColor="#ef4444" />
            <MenuItem label="ข้อมูลการแพ้ยา" description="ค้นพบประวัติแพ้ยา 1 รายการ" icon="💊" bgColor="#fffdeb" iconColor="#f59e0b" />
            <MenuItem label="ผลการตรวจสุขภาพ" description="ไฟล์ PDF สมบูรณ์" icon="📄" bgColor="#eff6ff" iconColor="#3b82f6" />
          </div>
        </section>

        {/* Combined Scores Section */}
        <section>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: 8, paddingLeft: 4 }}>สรุปคะแนนของคุณ (Scores)</div>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "16px",
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
        </section>

        {/* Linked Devices */}
        <section>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: 8, paddingLeft: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>อุปกรณ์ที่เชื่อมต่อ (Devices)</span>
             <span style={{ fontSize: "0.7rem", color: "#16a34a", cursor: "pointer", fontWeight: 600 }}>+ เพิ่มอุปกรณ์</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <DeviceCard name="Apple Watch" status="เชื่อมต่อแล้ว" lastSync="10 นาทีที่แล้ว" icon="⌚" active />
            <DeviceCard name="เครื่องชั่ง Mi Scale" status="ไม่ได้เชื่อมต่อ" icon="⚖️" active={false} />
          </div>
        </section>

      </div>

      <BottomNav />
    </div>
  );
}

function MenuItem({ label, description, icon, bgColor, iconColor }: { label: string; description?: string; icon: string; bgColor: string; iconColor: string }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        cursor: "pointer",
        border: "1px solid var(--gray-100)",
        transition: "transform 0.1s ease",
      }}
      onPointerDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: iconColor }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: "var(--gray-800)", fontSize: "0.95rem" }}>{label}</div>
          {description && (
            <div style={{ fontSize: "0.7rem", color: "var(--gray-500)", marginTop: 2 }}>
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

function DeviceCard({ name, status, icon, active, lastSync }: { name: string; status: string; icon: string; active: boolean; lastSync?: string }) {
  return (
    <div style={{ background: "white", padding: 14, borderRadius: 16, border: "1px solid var(--gray-100)", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
      <div style={{ fontSize: "1.2rem", marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gray-800)" }}>{name}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: active ? "#22c55e" : "#d1d5db" }} />
        <span style={{ fontSize: "0.65rem", color: "var(--gray-500)" }}>{status}</span>
      </div>
      {lastSync && <div style={{ fontSize: "0.6rem", color: "var(--gray-400)", marginTop: 4 }}>ซิงค์ล่าสุด: {lastSync}</div>}
    </div>
  );
}
