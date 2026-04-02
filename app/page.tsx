"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import RankSection from "@/components/RankSection";
import HealthDataSection from "@/components/HealthDataSection";
import AppIntegrationSection from "@/components/AppIntegrationSection";
import BottomNav from "@/components/BottomNav";

interface UserProfile {
  sex: string;
  birthday: string;
  weight: number;
  height: number;
}

interface UserData {
  email: string;
  provider?: string;
}

/* ── Mock data ── */
const recentActivities = [
  { icon: "🏃", label: "วิ่ง 3.2 กม.", time: "08:30", cal: 245, color: "#16a34a" },
  { icon: "🧘", label: "โยคะ 30 นาที", time: "07:00", cal: 120, color: "#7c3aed" },
  { icon: "🚴", label: "ปั่นจักรยาน 5 กม.", time: "เมื่อวาน", cal: 180, color: "#2563eb" },
  { icon: "🏊", label: "ว่ายน้ำ 45 นาที", time: "เมื่อวาน", cal: 320, color: "#0891b2" },
];

const healthTips = [
  { title: "ดื่มน้ำให้เพียงพอ", desc: "เพิ่มน้ำอีก 3 แก้ววันนี้", icon: "💧", bg: "#dbeafe" },
  { title: "นอนหลับให้ครบ", desc: "เป้าหมาย 8 ชม. คืนนี้", icon: "🌙", bg: "#ede9fe" },
  { title: "เดินเพิ่มอีกนิด", desc: "อีก 1,753 ก้าวถึงเป้า!", icon: "👟", bg: "#dcfce7" },
];

const initialConnectedSources = [
  { name: "Apple Health", status: "synced", time: "5 นาทีที่แล้ว", color: "#16a34a" },
  { name: "Garmin Watch", status: "synced", time: "12 นาทีที่แล้ว", color: "#16a34a" },
  { name: "หมอพร้อม", status: "synced", time: "1 ชม. ที่แล้ว", color: "#16a34a" },
];

const importableApps = [
  "หมอพร้อม",
  "Health Link",
  "กระเป๋าตัง",
  "สมุดสุขภาพ",
  "Persona Health",
  "Telehealth",
  "สปสช.",
  "ทางรัฐ",
  "Medscape",
];

/* ── Page ── */
export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectedSources, setConnectedSources] = useState(initialConnectedSources);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleImportSource = (name: string) => {
    setConnectedSources((prev) => {
      if (prev.some((source) => source.name === name)) {
        return prev.map((source) =>
          source.name === name ? { ...source, time: "เมื่อสักครู่" } : source
        );
      }

      return [
        { name, status: "synced", time: "เมื่อสักครู่", color: "#16a34a" },
        ...prev,
      ];
    });
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const profileData = localStorage.getItem("userProfile");
    if (!userData || !profileData) { router.push("/login"); return; }
    setUser(JSON.parse(userData));
    setProfile(JSON.parse(profileData));
    setLoading(false);
  }, [router]);

  if (loading || !user || !profile) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, var(--green-50) 0%, #ffffff 40%)" }}>
        <div style={{ width: 36, height: 36, border: "3px solid var(--gray-200)", borderTopColor: "var(--green-500)", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, var(--green-50) 0%, #ffffff 22%)", paddingBottom: 96, maxWidth: 440, margin: "0 auto", position: "relative" }}>
      <Header />

      <main style={{ padding: "14px 14px 0" }}>
        {/* Greeting */}
        <div className="animate-fade-in-up" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: "0.78rem", color: "var(--gray-500)", marginBottom: 2 }}>
            {new Date().toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-800)" }}>
            สรุปข้อมูลสุขภาพของคุณ
          </p>
        </div>

        {/* Health Dashboard */}
        <HealthDataSection />

        {/* Leaderboard Preview */}
        <RankSection />

        {/* Data Sources Status */}
        <div className="card animate-fade-in-up" style={{ padding: 14, marginBottom: 14, animationDelay: "0.15s" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--green-50)", border: "1px solid var(--green-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--gray-800)" }}>แหล่งข้อมูลที่เชื่อมต่อ</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button
                type="button"
                onClick={() => setShowImportModal(true)}
                style={{
                  minHeight: 28,
                  borderRadius: 14,
                  border: "1px solid var(--green-200)",
                  background: "var(--green-50)",
                  color: "var(--green-700)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  padding: "0 10px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                + เพิ่ม
              </button>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, background: "var(--green-50)", color: "var(--green-700)", padding: "3px 10px", borderRadius: 20, border: "1px solid var(--green-100)" }}>
                {connectedSources.length} แหล่ง
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {connectedSources.map((src) => (
              <div key={src.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "var(--gray-50)", borderRadius: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: src.color, flexShrink: 0, boxShadow: `0 0 6px ${src.color}40` }} />
                <span style={{ flex: 1, fontSize: "0.78rem", fontWeight: 600, color: "var(--gray-700)" }}>{src.name}</span>
                <span style={{ fontSize: "0.62rem", color: "var(--gray-400)" }}>{src.time}</span>
              </div>
            ))}
          </div>
        </div>

        {showImportModal && (
          <>
            <button
              type="button"
              onClick={() => setShowImportModal(false)}
              aria-label="ปิดหน้าต่างนำเข้าข้อมูล"
              style={{ position: "fixed", inset: 0, border: "none", background: "rgba(0,0,0,0.35)", zIndex: 999 }}
            />
            <div
              role="dialog"
              aria-modal="true"
              style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(92vw, 360px)",
                background: "white",
                borderRadius: 16,
                border: "1px solid var(--gray-200)",
                boxShadow: "0 16px 42px rgba(0,0,0,0.2)",
                padding: 14,
                zIndex: 1000,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color: "var(--gray-800)" }}>นำเข้าข้อมูลจากแอปอื่น</p>
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--gray-200)", background: "white", cursor: "pointer", color: "var(--gray-500)" }}
                >
                  x
                </button>
              </div>

              <div className="hide-scroll" style={{ display: "flex", flexWrap: "wrap", gap: 8, maxHeight: 220, overflowY: "auto" }}>
                {importableApps.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      handleImportSource(name);
                      setShowImportModal(false);
                    }}
                    style={{
                      border: "1px solid var(--green-200)",
                      background: "var(--green-50)",
                      borderRadius: 999,
                      padding: "7px 12px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--green-700)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Health Tips */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--gray-800)" }}>
              คำแนะนำสำหรับคุณ
            </h3>
          </div>
          <div className="hide-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {healthTips.map((tip) => (
              <div key={tip.title} style={{ flex: "0 0 150px", background: "white", borderRadius: 14, border: "1px solid var(--gray-100)", padding: 14, boxShadow: "var(--shadow-sm)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: tip.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: 10 }}>
                  {tip.icon}
                </div>
                <p style={{ fontWeight: 700, fontSize: "0.78rem", color: "var(--gray-800)", marginBottom: 4, lineHeight: 1.3 }}>{tip.title}</p>
                <p style={{ fontSize: "0.65rem", color: "var(--gray-400)", lineHeight: 1.4 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card animate-fade-in-up" style={{ padding: 14, marginBottom: 14, animationDelay: "0.25s" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--gray-800)" }}>กิจกรรมล่าสุด</h3>
            <span style={{ fontSize: "0.68rem", color: "var(--green-600)", fontWeight: 600, cursor: "pointer" }}>ดูทั้งหมด →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recentActivities.map((act, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "var(--gray-50)", borderRadius: 10, transition: "background 0.2s ease" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", border: "1px solid var(--gray-100)", flexShrink: 0 }}>
                  {act.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--gray-800)" }}>{act.label}</p>
                  <p style={{ fontSize: "0.62rem", color: "var(--gray-400)" }}>{act.time}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: act.color }}>{act.cal}</p>
                  <p style={{ fontSize: "0.55rem", color: "var(--gray-400)" }}>kcal</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Integration */}
        <AppIntegrationSection onImportApp={handleImportSource} />
      </main>

      <BottomNav />
    </div>
  );
}
