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

/* ─── static data ─── */
const knowledgeCards = [
  { title: "โภชนาการที่ดี",       subtitle: "เคล็ดลับการกินอาหาร" },
  { title: "ลดน้ำหนักอย่างยั่งยืน", subtitle: "วิธีที่ได้ผลระยะยาว" },
  { title: "คุณภาพการนอนหลับ",     subtitle: "พักผ่อนให้เพียงพอ" },
  { title: "สุขภาพจิตใจ",         subtitle: "ดูแลใจให้แข็งแรง" },
];

const nearbyServices = [
  { title: "ร้านอาหารสุขภาพ", icon: "🥗" },
  { title: "ฟิตเนส",           icon: "🏋️" },
  { title: "คลินิก",           icon: "🏥" },
  { title: "สวนสาธารณะ",       icon: "🌳" },
];

const activityCards = [
  { title: "วิ่งออกกำลังกาย", icon: "🏃" },
  { title: "ว่ายน้ำ",         icon: "🏊" },
  { title: "โยคะ",           icon: "🧘" },
  { title: "ปั่นจักรยาน",    icon: "🚴" },
];

/* ─── page ─── */
export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData    = localStorage.getItem("user");
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
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, var(--green-50) 0%, #ffffff 22%)", paddingBottom: 96, maxWidth: 440, margin: "0 auto", position: "relative" }}>
      <Header />

      <main style={{ padding: "14px 14px 0" }}>
        <RankSection />

        {/* โฆษณา */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.05s", marginBottom: 14 }}>
          <div
            style={{
              border: "1.5px dashed var(--green-300)",
              borderRadius: 14,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--green-50)",
              minHeight: 56,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--green-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--green-700)" }}>โฆษณา</span>
            </div>
            <span style={{ fontSize: "0.68rem", color: "var(--green-600)", fontWeight: 500, opacity: 0.8 }}>สปอนเซอร์</span>
          </div>
        </div>

        <HealthDataSection />

        <AppIntegrationSection />

        {/* โฆษณาภาครัฐ */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", marginBottom: 14 }}>
          <div
            style={{
              border: "1.5px dashed var(--orange-300)",
              borderRadius: 14,
              padding: "14px 16px",
              background: "var(--orange-50)",
              minHeight: 56,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--orange-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--orange-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--orange-600)" }}>โฆษณาภาครัฐ</span>
              </div>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, background: "var(--orange-100)", color: "var(--orange-600)", borderRadius: 20, padding: "3px 10px", border: "1px solid var(--orange-200)" }}>
                10 สัปดาห์
              </span>
            </div>
          </div>
        </div>

        {/* บทความสุขภาพ */}
        <div className="card animate-fade-in-up" style={{ padding: 14, marginBottom: 14, animationDelay: "0.25s" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--gray-800)", marginBottom: 4, lineHeight: 1.4 }}>
                เนื้อหาพัฒนาสุขภาพในแอปพลิเคชัน
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--gray-500)", marginBottom: 10, lineHeight: 1.5 }}>
                จำนวนก้าวต่อวัน — พื้นฐานสุขภาพที่ดี
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--orange-50)", border: "1px solid var(--orange-200)", borderRadius: 20, padding: "3px 12px" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--orange-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--orange-600)" }}>100 คะแนน</span>
              </div>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: "var(--green-100)", flexShrink: 0 }} />
          </div>
        </div>

        {/* ความรู้ด้านสุขภาพ */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)" }}>
              ความรู้ด้านสุขภาพ
            </h3>
            <span style={{ fontSize: "0.72rem", color: "var(--green-600)", fontWeight: 600, cursor: "pointer" }}>ดูทั้งหมด →</span>
          </div>
          <div className="hide-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, scrollSnapType: "x mandatory" }}>
            {knowledgeCards.map((c) => (
              <div key={c.title} style={{ flex: "0 0 130px", scrollSnapAlign: "start", background: "white", borderRadius: 12, border: "1px solid var(--gray-100)", boxShadow: "var(--shadow-sm)", padding: 10, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ width: "100%", height: 72, borderRadius: 8, background: "var(--green-100)", marginBottom: 4 }} />
                <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)", lineHeight: 1.3 }}>{c.title}</p>
                <p style={{ fontSize: "0.68rem", color: "var(--gray-400)" }}>{c.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ร้านค้าและบริการใกล้คุณ */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.35s", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)" }}>
              บริการใกล้คุณ
            </h3>
            <span style={{ fontSize: "0.72rem", color: "var(--green-600)", fontWeight: 600, cursor: "pointer" }}>ดูทั้งหมด →</span>
          </div>
          <div className="hide-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, scrollSnapType: "x mandatory" }}>
            {nearbyServices.map((s) => (
              <div key={s.title} style={{ flex: "0 0 120px", scrollSnapAlign: "start", background: "white", borderRadius: 12, border: "1px solid var(--gray-100)", boxShadow: "var(--shadow-sm)", padding: 10, display: "flex", flexDirection: "column", gap: 4, alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "100%", height: 72, borderRadius: 8, background: "var(--green-50)", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                  {s.icon}
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)" }}>{s.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* กิจกรรมสุขภาพ */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)" }}>
              กิจกรรมสุขภาพ
            </h3>
            <span style={{ fontSize: "0.72rem", color: "var(--green-600)", fontWeight: 600, cursor: "pointer" }}>ดูทั้งหมด →</span>
          </div>
          <div className="hide-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, scrollSnapType: "x mandatory" }}>
            {activityCards.map((a) => (
              <div key={a.title} style={{ flex: "0 0 120px", scrollSnapAlign: "start", background: "white", borderRadius: 12, border: "1px solid var(--gray-100)", boxShadow: "var(--shadow-sm)", padding: 10, display: "flex", flexDirection: "column", gap: 4, alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "100%", height: 72, borderRadius: 8, background: "var(--green-50)", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                  {a.icon}
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)" }}>{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
