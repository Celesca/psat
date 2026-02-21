"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [sex, setSex] = useState<"male" | "female" | "">("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!sex) newErrors.sex = "กรุณาเลือกเพศ";
    if (!birthDay || !birthMonth || !birthYear) newErrors.birthday = "กรุณากรอกวันเกิด";
    if (!weight) newErrors.weight = "กรุณากรอกน้ำหนัก";
    if (!height) newErrors.height = "กรุณากรอกส่วนสูง";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const profile = {
      sex,
      birthday: `${birthDay}/${birthMonth}/${birthYear}`,
      weight: Number(weight),
      height: Number(height),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    router.push("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #fff7ed 0%, #ffffff 30%)",
        padding: "0 16px",
      }}
    >
      {/* Top orange accent bar */}
      <div
        style={{
          width: "100%",
          height: 4,
          background: "linear-gradient(90deg, var(--orange-400), var(--orange-600))",
          borderRadius: "0 0 4px 4px",
        }}
      />

      {/* Header */}
      <div
        className="animate-fade-in-up"
        style={{
          textAlign: "center",
          padding: "32px 0 24px",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--orange-400), var(--orange-600))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 6px 20px rgba(249,115,22,0.3)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--gray-900)",
            marginBottom: 8,
          }}
        >
          ใช้งาน Persona Health ครั้งแรก
        </h1>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--gray-500)",
            lineHeight: 1.6,
            maxWidth: 320,
            margin: "0 auto",
          }}
        >
          ข้อมูลของคุณจะช่วยให้เรา
          <br />
          วิเคราะห์สุขภาพของคุณได้ดียิ่งขึ้น
        </p>
      </div>

      {/* Form */}
      <div
        className="animate-fade-in-up"
        style={{
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          flex: 1,
          animationDelay: "0.1s",
        }}
      >
        {/* Sex */}
        <div>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--gray-700)",
              marginBottom: 8,
              display: "block",
            }}
          >
            เพศ
          </label>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: 8 }}>
            เลือกเพศที่ใช้ในการวิเคราะห์ค่าสุขภาพของคุณ
          </p>
          <div className="toggle-group">
            <button
              type="button"
              className={`toggle-btn ${sex === "male" ? "active" : ""}`}
              onClick={() => setSex("male")}
            >
              👨 ชาย
            </button>
            <button
              type="button"
              className={`toggle-btn ${sex === "female" ? "active" : ""}`}
              onClick={() => setSex("female")}
            >
              👩 หญิง
            </button>
          </div>
          {errors.sex && (
            <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4 }}>{errors.sex}</p>
          )}
        </div>

        {/* Birthday */}
        <div>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--gray-700)",
              marginBottom: 8,
              display: "block",
            }}
          >
            วันเกิด
          </label>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: 8 }}>
            ตัวอย่าง: 31 / 03 / 1998 พ.ศ.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="input-field"
              type="text"
              inputMode="numeric"
              placeholder="DD"
              maxLength={2}
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value.replace(/\D/g, ""))}
              style={{ textAlign: "center", flex: 1 }}
            />
            <input
              className="input-field"
              type="text"
              inputMode="numeric"
              placeholder="MM"
              maxLength={2}
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value.replace(/\D/g, ""))}
              style={{ textAlign: "center", flex: 1 }}
            />
            <input
              className="input-field"
              type="text"
              inputMode="numeric"
              placeholder="YYYY"
              maxLength={4}
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value.replace(/\D/g, ""))}
              style={{ textAlign: "center", flex: 1.5 }}
            />
          </div>
          {errors.birthday && (
            <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4 }}>{errors.birthday}</p>
          )}
        </div>

        {/* Weight */}
        <div>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--gray-700)",
              marginBottom: 8,
              display: "block",
            }}
          >
            น้ำหนัก
          </label>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: 8 }}>
            ตัวอย่าง: 65 กิโลกรัม
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              className="input-field"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value.replace(/[^\d.]/g, ""))}
              style={{ textAlign: "center", flex: 1 }}
            />
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--gray-500)",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              กิโลกรัม
            </span>
          </div>
          {errors.weight && (
            <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4 }}>{errors.weight}</p>
          )}
        </div>

        {/* Height */}
        <div>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--gray-700)",
              marginBottom: 8,
              display: "block",
            }}
          >
            ส่วนสูง
          </label>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginBottom: 8 }}>
            ตัวอย่าง: 170 เซนติเมตร
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              className="input-field"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={height}
              onChange={(e) => setHeight(e.target.value.replace(/[^\d.]/g, ""))}
              style={{ textAlign: "center", flex: 1 }}
            />
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--gray-500)",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              เซนติเมตร
            </span>
          </div>
          {errors.height && (
            <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4 }}>{errors.height}</p>
          )}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: 16 }} />

        {/* Submit Button */}
        <div
          style={{
            paddingBottom: 32,
          }}
        >
          <button
            type="button"
            className="btn-orange-gradient"
            onClick={handleSubmit}
            style={{
              fontSize: "1.1rem",
              padding: "16px 32px",
            }}
          >
            <span>ดำเนินการต่อ</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
