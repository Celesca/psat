"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const healthApps = [
  {
    name: "Apple Health",
    icon: "🍎",
    color: "#ff2d55",
    status: "เชื่อมต่อ",
    connected: false,
  },
  {
    name: "Google Fit",
    icon: "💪",
    color: "#4285f4",
    status: "เชื่อมต่อ",
    connected: false,
  },
  {
    name: "Samsung Health",
    icon: "💙",
    color: "#1428a0",
    status: "เชื่อมต่อ",
    connected: false,
  },
  {
    name: "Fitbit",
    icon: "⌚",
    color: "#00b0b9",
    status: "เชื่อมต่อ",
    connected: false,
  },
  {
    name: "Strava",
    icon: "🏃",
    color: "#fc4c02",
    status: "เชื่อมต่อ",
    connected: false,
  },
  {
    name: "MyFitnessPal",
    icon: "🥗",
    color: "#0070f3",
    status: "เชื่อมต่อ",
    connected: false,
  },
];

const quickActions = [
  { name: "บันทึกอาหาร", icon: "🍽️", desc: "บันทึกมื้ออาหาร" },
  { name: "ออกกำลังกาย", icon: "🏋️", desc: "เริ่มออกกำลังกาย" },
  { name: "น้ำหนัก", icon: "⚖️", desc: "บันทึกน้ำหนัก" },
  { name: "การนอน", icon: "😴", desc: "บันทึกการนอน" },
];

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const profileData = localStorage.getItem("userProfile");

    if (!userData) {
      router.push("/login");
      return;
    }

    if (!profileData) {
      router.push("/onboarding");
      return;
    }

    setUser(JSON.parse(userData));
    setProfile(JSON.parse(profileData));
    setLoading(false);
  }, [router]);

  if (loading || !profile || !user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #fff7ed 0%, #ffffff 40%)",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid var(--gray-200)",
            borderTopColor: "var(--orange-500)",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const bmi = profile.weight / Math.pow(profile.height / 100, 2);
  const bmiCategory =
    bmi < 18.5
      ? "น้ำหนักต่ำกว่าเกณฑ์"
      : bmi < 25
      ? "น้ำหนักปกติ"
      : bmi < 30
      ? "น้ำหนักเกิน"
      : "อ้วน";
  const bmiColor =
    bmi < 18.5
      ? "#3b82f6"
      : bmi < 25
      ? "#22c55e"
      : bmi < 30
      ? "#f59e0b"
      : "#ef4444";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    router.push("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fff7ed 0%, #ffffff 20%)",
        paddingBottom: 80,
      }}
    >
      {/* Top Header */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--orange-400), var(--orange-600))",
          padding: "20px 20px 28px",
          borderRadius: "0 0 24px 24px",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <p style={{ fontSize: "0.8rem", opacity: 0.9, marginBottom: 2 }}>สวัสดี 👋</p>
            <h1 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              {user.email.split("@")[0]}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 10,
              padding: "8px 12px",
              color: "white",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.75rem",
              fontWeight: 500,
              backdropFilter: "blur(4px)",
            }}
          >
            ออกจากระบบ
          </button>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              borderRadius: 14,
              padding: "12px 8px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.7rem", opacity: 0.85, marginBottom: 4 }}>น้ำหนัก</p>
            <p style={{ fontSize: "1.2rem", fontWeight: 700 }}>{profile.weight}</p>
            <p style={{ fontSize: "0.65rem", opacity: 0.8 }}>กก.</p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              borderRadius: 14,
              padding: "12px 8px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.7rem", opacity: 0.85, marginBottom: 4 }}>ส่วนสูง</p>
            <p style={{ fontSize: "1.2rem", fontWeight: 700 }}>{profile.height}</p>
            <p style={{ fontSize: "0.65rem", opacity: 0.8 }}>ซม.</p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              borderRadius: 14,
              padding: "12px 8px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.7rem", opacity: 0.85, marginBottom: 4 }}>BMI</p>
            <p style={{ fontSize: "1.2rem", fontWeight: 700 }}>{bmi.toFixed(1)}</p>
            <p style={{ fontSize: "0.65rem", opacity: 0.8 }}>{bmiCategory}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "20px 16px",
          maxWidth: 440,
          margin: "0 auto",
        }}
      >
        {/* BMI Card */}
        <div
          className="card animate-fade-in-up"
          style={{
            padding: "18px 20px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--gray-800)" }}>
              ค่าดัชนีมวลกาย (BMI)
            </h3>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: bmiColor,
                background: `${bmiColor}15`,
                padding: "4px 10px",
                borderRadius: 20,
              }}
            >
              {bmiCategory}
            </span>
          </div>
          {/* BMI Bar */}
          <div
            style={{
              width: "100%",
              height: 8,
              background: "var(--gray-100)",
              borderRadius: 4,
              overflow: "hidden",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: `${Math.min((bmi / 40) * 100, 100)}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${bmiColor}, ${bmiColor}cc)`,
                borderRadius: 4,
                transition: "width 1s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>0</span>
            <span style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>18.5</span>
            <span style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>25</span>
            <span style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>30</span>
            <span style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>40</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", marginBottom: 24 }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--gray-800)",
              marginBottom: 12,
            }}
          >
            ⚡ บันทึกกิจกรรม
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {quickActions.map((action) => (
              <button
                key={action.name}
                className="card"
                style={{
                  padding: "14px",
                  border: "1.5px solid var(--gray-100)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  background: "white",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--orange-300)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--gray-100)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{action.icon}</div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gray-800)", marginBottom: 2 }}>
                  {action.name}
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Connected Apps */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--gray-800)",
              marginBottom: 12,
            }}
          >
            🔗 เชื่อมต่อแอปสุขภาพ
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {healthApps.map((app) => (
              <div
                key={app.name}
                className="card"
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${app.color}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    {app.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gray-800)" }}>
                      {app.name}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>
                      {app.connected ? "เชื่อมต่อแล้ว" : "ยังไม่ได้เชื่อมต่อ"}
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    color: app.connected ? "var(--gray-400)" : "var(--orange-500)",
                    background: app.connected ? "var(--gray-100)" : "var(--orange-50)",
                    border: "none",
                    borderRadius: 20,
                    padding: "6px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {app.connected ? "ตัดการเชื่อมต่อ" : "เชื่อมต่อ"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTop: "1px solid var(--gray-100)",
          padding: "8px 0",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          maxWidth: 440,
          margin: "0 auto",
          zIndex: 100,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
        }}
      >
        {[
          { icon: "🏠", label: "หน้าแรก", active: true },
          { icon: "📊", label: "สถิติ", active: false },
          { icon: "📋", label: "บันทึก", active: false },
          { icon: "👤", label: "โปรไฟล์", active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "4px 12px",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{tab.icon}</span>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: tab.active ? 600 : 400,
                color: tab.active ? "var(--orange-500)" : "var(--gray-400)",
              }}
            >
              {tab.label}
            </span>
            {tab.active && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "var(--orange-500)",
                  marginTop: 1,
                }}
              />
            )}
          </button>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
