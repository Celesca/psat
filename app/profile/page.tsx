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
        background: "var(--gray-50)",
        display: "flex",
        flexDirection: "column",
        paddingBottom: 90,
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          padding: "40px 20px 22px",
          background: "linear-gradient(135deg, var(--green-700), var(--green-500))",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 4px 16px rgba(22,163,74,0.22)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            border: "2.5px solid rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>โปรไฟล์ของฉัน</h1>
          <p style={{ opacity: 0.85, fontSize: "0.84rem", marginTop: 3 }}>sawit@example.com</p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: "16px 14px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>

        {/* ข้อมูลส่วนตัว */}
        <section>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, paddingLeft: 2 }}>
            ข้อมูลส่วนตัว
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <MenuItem label="ข้อมูลทั่วไป"         description="ชื่อ, ที่อยู่, วันเกิด, กรุ๊ปเลือด" icon="👤" bgColor="#f0fdf4" iconColor="#16a34a" />
            <MenuItem label="ข้อมูลสุขภาพ"         description="อัปเดตล่าสุดเมื่อ 2 วันที่แล้ว"       icon="❤️" bgColor="#fef2f2" iconColor="#ef4444" />
            <MenuItem label="ประวัติการแพ้ยา"      description="พบประวัติแพ้ยา 1 รายการ"            icon="💊" bgColor="#fffbeb" iconColor="#f59e0b" />
            <MenuItem label="ผลการตรวจสุขภาพ"     description="ไฟล์ PDF สมบูรณ์"                  icon="📄" bgColor="#eff6ff" iconColor="#3b82f6" />
          </div>
        </section>

        {/* คะแนนสุขภาพ */}
        <section>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, paddingLeft: 2 }}>
            สรุปคะแนน
          </p>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "16px",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fdf4ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "var(--gray-800)", fontSize: "0.95rem" }}>คะแนนสุขภาพ</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <div style={{ flex: 1, height: 5, borderRadius: 4, background: "var(--gray-100)", overflow: "hidden" }}>
                    <div style={{ width: "75%", height: "100%", background: "linear-gradient(90deg, #a855f7, #c084fc)", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#a855f7", minWidth: 40, textAlign: "right" }}>75/100</span>
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: "var(--border)" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fdf4ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "var(--gray-800)", fontSize: "0.95rem" }}>คะแนนพฤติกรรม</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <div style={{ flex: 1, height: 5, borderRadius: 4, background: "var(--gray-100)", overflow: "hidden" }}>
                    <div style={{ width: "82%", height: "100%", background: "linear-gradient(90deg, #a855f7, #c084fc)", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#a855f7", minWidth: 40, textAlign: "right" }}>82/100</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.68rem", color: "var(--gray-400)", textAlign: "center", marginTop: -4 }}>
              คะแนนรวมจะแสดงในหน้าหลักเป็นคะแนนสุขภาพโดยรวม
            </p>
          </div>
        </section>

        {/* อุปกรณ์ที่เชื่อมต่อ */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingLeft: 2 }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              อุปกรณ์ที่เชื่อมต่อ
            </p>
            <span style={{ fontSize: "0.75rem", color: "var(--green-600)", cursor: "pointer", fontWeight: 700 }}>+ เพิ่มอุปกรณ์</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <DeviceCard name="Apple Watch"       status="เชื่อมต่อแล้ว"    lastSync="10 นาทีที่แล้ว" icon="⌚" active />
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
        borderRadius: 14,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "var(--shadow-sm)",
        cursor: "pointer",
        border: "1px solid var(--border)",
        transition: "transform 0.12s ease",
      }}
      onPointerDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.15rem", color: iconColor }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: "var(--gray-800)", fontSize: "0.92rem" }}>{label}</div>
          {description && <div style={{ fontSize: "0.7rem", color: "var(--gray-500)", marginTop: 2 }}>{description}</div>}
        </div>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
}

function DeviceCard({ name, status, icon, active, lastSync }: { name: string; status: string; icon: string; active: boolean; lastSync?: string }) {
  return (
    <div style={{ background: "white", padding: 14, borderRadius: 14, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ fontSize: "1.15rem", marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gray-800)" }}>{name}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: active ? "#22c55e" : "var(--gray-300)" }} />
        <span style={{ fontSize: "0.68rem", color: "var(--gray-500)", fontWeight: 500 }}>{status}</span>
      </div>
      {lastSync && <div style={{ fontSize: "0.62rem", color: "var(--gray-400)", marginTop: 4 }}>ซิงค์ล่าสุด: {lastSync}</div>}
    </div>
  );
}
