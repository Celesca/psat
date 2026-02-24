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
  { title: "การกินอาหาร", subtitle: "เคล็ดลับโภชนาการ" },
  { title: "ลดน้ำหนักระยะยาว", subtitle: "วิธีที่ยั่งยืน" },
  { title: "การนอนหลับ", subtitle: "พักผ่อนอย่างมีคุณภาพ" },
  { title: "สุขภาพจิต", subtitle: "ดูแลใจให้แข็งแรง" },
];

const nearbyServices = [
  { title: "ร้านอาหารสุขภาพ", icon: "🥗" },
  { title: "ฟิตเนส", icon: "🏋️" },
  { title: "คลินิก", icon: "🏥" },
  { title: "สวนสาธารณะ", icon: "🌳" },
];

const activityCards = [
  { title: "กีฬาวิ่ง", icon: "🏃" },
  { title: "ว่ายน้ำ", icon: "🏊" },
  { title: "โยคะ", icon: "🧘" },
  { title: "ปั่นจักรยาน", icon: "🚴" },
];

/* ─── page ─── */
export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userData = localStorage.getItem("user");
    let profileData = localStorage.getItem("userProfile");

    if (!userData || !profileData) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));
    setProfile(JSON.parse(profileData));
    setLoading(false);
  }, [router]);

  if (loading || !user || !profile) {
    return (
      <div 
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, var(--green-50) 0%, #ffffff 40%)"
        }}
      >
        <div 
          style={{
            width: 40,
            height: 40,
            border: "4px solid var(--gray-200)",
            borderTopColor: "var(--green-500)",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite"
          }} 
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, var(--green-50) 0%, #ffffff 20%)",
        paddingBottom: 90,
        maxWidth: 440,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Header />

      <main style={{ padding: "16px" }}>
        <RankSection />

        {/* ── 3. Advertisement ── */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.05s", marginBottom: 16 }}>
          <div 
            style={{
              border: "2px dashed var(--green-400)",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--green-50)",
              minHeight: 60
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--green-700)" }}>
              📢 Advertisement
            </span>
          </div>
        </div>

        <HealthDataSection />

        <AppIntegrationSection />

        {/* ── 6. Government Advertisement ── */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", marginBottom: 16 }}>
          <div 
            style={{
              border: "2px dashed var(--orange-300)",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--orange-50)",
              minHeight: 60
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--orange-600)" }}>
                📢 Advertisement ของรัฐ
              </span>
              <span 
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  background: "var(--orange-100)",
                  color: "var(--orange-600)",
                  borderRadius: 20,
                  padding: "4px 10px"
                }}
              >
                10 สัปดาห์
              </span>
            </div>
          </div>
        </div>

        {/* ── 7. Article / Content Teaser ── */}
        <div 
          className="card animate-fade-in-up" 
          style={{ padding: 16, marginBottom: 16, animationDelay: "0.25s" }}
        >
          <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--gray-800)", marginBottom: 4 }}>
            📝 เนื้อหาพัฒนาเนื้อหาในแอพ ดี แนวข้อมูล
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: 10 }}>
            จำนวนก้าวกากลิ้ง พื้นฐาน
          </p>
          <div 
            style={{
              display: "inline-block",
              background: "var(--orange-50)",
              border: "1px solid var(--orange-200)",
              borderRadius: 20,
              padding: "4px 12px"
            }}
          >
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--orange-600)" }}>
              100 ลิมิต
            </span>
          </div>
        </div>

        {/* ── 8. ความรู้ด้าน สุขภาพ ── */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: 10 }}>
            💡 ความรู้ด้าน สุขภาพ
          </h3>
          <div 
            className="hide-scroll"
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 8,
              scrollSnapType: "x mandatory"
            }}
          >
            {knowledgeCards.map((c) => (
              <div 
                key={c.title} 
                style={{
                  flex: "0 0 130px",
                  scrollSnapAlign: "start",
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid var(--gray-100)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4
                }}
              >
                <div style={{ width: "100%", height: 76, borderRadius: 8, background: "var(--green-100)", marginBottom: 4 }} />
                <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)", lineHeight: 1.3 }}>{c.title}</p>
                <p style={{ fontSize: "0.68rem", color: "var(--gray-400)" }}>{c.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 9. ร้านค้าและบริการใกล้คุณ ── */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.35s", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: 10 }}>
            📍 ร้านค้าและบริการใกล้คุณ
          </h3>
          <div 
            className="hide-scroll"
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 8,
              scrollSnapType: "x mandatory"
            }}
          >
            {nearbyServices.map((s) => (
              <div 
                key={s.title} 
                style={{
                  flex: "0 0 130px",
                  scrollSnapAlign: "start",
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid var(--gray-100)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <div style={{ width: "100%", height: 76, borderRadius: 8, background: "var(--green-50)", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                  {s.icon}
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)" }}>{s.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 10. การเล่าเรียนกิจกรรมสุขภาพ ── */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s", marginBottom: 8 }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)", marginBottom: 10 }}>
            🎯 การเล่าเรียนกิจกรรมสุขภาพ
          </h3>
          <div 
            className="hide-scroll"
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 8,
              scrollSnapType: "x mandatory"
            }}
          >
            {activityCards.map((a) => (
              <div 
                key={a.title} 
                style={{
                  flex: "0 0 130px",
                  scrollSnapAlign: "start",
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid var(--gray-100)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <div style={{ width: "100%", height: 76, borderRadius: 8, background: "var(--green-50)", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                  {a.icon}
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--gray-800)" }}>{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
      
      {/* Scrollbar hide helper */}
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
