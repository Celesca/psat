"use client";

import { useState } from "react";

// ── Mock health data ────────────────────────────────────────────
const healthScore = 78;
const todayData = {
  steps: 8247,
  stepsGoal: 10000,
  calories: 1840,
  caloriesGoal: 2200,
  heartRate: 72,
  heartRateMin: 58,
  heartRateMax: 124,
  sleep: 7.2,
  sleepGoal: 8,
  water: 5,
  waterGoal: 8,
  bmi: 22.4,
  weight: 68.5,
  bloodPressure: { sys: 118, dia: 76 },
  bloodOxygen: 98,
};

const weeklySteps = [
  { day: "จ", value: 6200 },
  { day: "อ", value: 8900 },
  { day: "พ", value: 7400 },
  { day: "พฤ", value: 9100 },
  { day: "ศ", value: 5800 },
  { day: "ส", value: 11200 },
  { day: "อา", value: 8247 },
];

const segments = [
  { color: "#ef4444", label: "ต่ำ" },
  { color: "#f97316", label: "" },
  { color: "#facc15", label: "ปานกลาง" },
  { color: "#4ade80", label: "" },
  { color: "#16a34a", label: "ดี" },
];

export default function HealthDataSection() {
  const [activeTab, setActiveTab] = useState<"today" | "week">("today");
  const activeSegment = Math.min(Math.floor(healthScore / 20), 4);
  const maxSteps = Math.max(...weeklySteps.map((d) => d.value));

  const stepsPercent = Math.min((todayData.steps / todayData.stepsGoal) * 100, 100);
  const calPercent = Math.min((todayData.calories / todayData.caloriesGoal) * 100, 100);
  const sleepPercent = Math.min((todayData.sleep / todayData.sleepGoal) * 100, 100);
  const waterPercent = Math.min((todayData.water / todayData.waterGoal) * 100, 100);

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", marginBottom: 14 }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--green-50)", border: "1px solid var(--green-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gray-800)" }}>Dashboard สุขภาพ</h3>
        </div>
        {/* Tab toggle */}
        <div style={{ display: "flex", gap: 4, background: "var(--gray-100)", borderRadius: 20, padding: 2 }}>
          {(["today", "week"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "4px 12px",
                borderRadius: 18,
                border: "none",
                fontSize: "0.68rem",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                background: activeTab === tab ? "white" : "transparent",
                color: activeTab === tab ? "var(--green-700)" : "var(--gray-400)",
                boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {tab === "today" ? "วันนี้" : "สัปดาห์"}
            </button>
          ))}
        </div>
      </div>

      {/* Health Score Card */}
      <div className="card" style={{ padding: 16, marginBottom: 10, background: "linear-gradient(135deg, var(--green-50) 0%, white 60%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Circular score */}
          <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
            <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="40" cy="40" r="34" fill="none" stroke="var(--gray-100)" strokeWidth="8" />
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke={segments[activeSegment].color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(healthScore / 100) * 213.6} 213.6`}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: segments[activeSegment].color, lineHeight: 1 }}>{healthScore}</span>
              <span style={{ fontSize: "0.55rem", color: "var(--gray-400)", fontWeight: 500 }}>/ 100</span>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--gray-800)", marginBottom: 4 }}>คะแนนสุขภาพรวม</p>
            <p style={{ fontSize: "0.7rem", color: "var(--gray-500)", lineHeight: 1.4, marginBottom: 8 }}>
              สุขภาพโดยรวมอยู่ในเกณฑ์ดี เพิ่มการออกกำลังกายอีกนิดจะยอดเยี่ยม
            </p>
            <div style={{ display: "flex", gap: 2, height: 6, borderRadius: 4, overflow: "hidden" }}>
              {segments.map((s, i) => (
                <div key={i} style={{ flex: 1, background: s.color, opacity: i <= activeSegment ? 1 : 0.2, borderRadius: i === 0 ? "4px 0 0 4px" : i === 4 ? "0 4px 4px 0" : 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeTab === "today" ? (
        <>
          {/* Steps + Calories row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            {/* Steps */}
            <div className="card" style={{ padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--green-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green-700)" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--gray-500)" }}>ก้าวเดิน</span>
              </div>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--gray-800)", lineHeight: 1 }}>
                {todayData.steps.toLocaleString()}
              </p>
              <p style={{ fontSize: "0.65rem", color: "var(--gray-400)", marginBottom: 8 }}>
                เป้าหมาย {todayData.stepsGoal.toLocaleString()}
              </p>
              <div style={{ height: 6, borderRadius: 4, background: "var(--gray-100)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #4ade80, #16a34a)", width: `${stepsPercent}%`, transition: "width 0.6s ease" }} />
              </div>
            </div>

            {/* Calories */}
            <div className="card" style={{ padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--orange-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--orange-600)" strokeWidth="2.5"><path d="M12 22c-4.97 0-9-2.69-9-6s4.03-6 9-6 9 2.69 9 6-4.03 6-9 6z" /><path d="M12 14c-2.21 0-4-1.34-4-3 0-2 2-3.5 4-6 2 2.5 4 4 4 6 0 1.66-1.79 3-4 3z" /></svg>
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--gray-500)" }}>แคลอรี่</span>
              </div>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--gray-800)", lineHeight: 1 }}>
                {todayData.calories.toLocaleString()}
              </p>
              <p style={{ fontSize: "0.65rem", color: "var(--gray-400)", marginBottom: 8 }}>
                เป้าหมาย {todayData.caloriesGoal.toLocaleString()} kcal
              </p>
              <div style={{ height: 6, borderRadius: 4, background: "var(--gray-100)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #fb923c, #ea580c)", width: `${calPercent}%`, transition: "width 0.6s ease" }} />
              </div>
            </div>
          </div>

          {/* Heart Rate + Sleep + Water row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            {/* Heart Rate */}
            <div className="card" style={{ padding: 12, textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </div>
              <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ef4444", lineHeight: 1 }}>{todayData.heartRate}</p>
              <p style={{ fontSize: "0.6rem", color: "var(--gray-400)", marginTop: 2 }}>bpm</p>
              <p style={{ fontSize: "0.55rem", color: "var(--gray-400)", marginTop: 4 }}>{todayData.heartRateMin}-{todayData.heartRateMax}</p>
            </div>

            {/* Sleep */}
            <div className="card" style={{ padding: 12, textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              </div>
              <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#7c3aed", lineHeight: 1 }}>{todayData.sleep}</p>
              <p style={{ fontSize: "0.6rem", color: "var(--gray-400)", marginTop: 2 }}>ชั่วโมง</p>
              <div style={{ height: 4, borderRadius: 2, background: "var(--gray-100)", overflow: "hidden", marginTop: 6 }}>
                <div style={{ height: "100%", borderRadius: 2, background: "#7c3aed", width: `${sleepPercent}%` }} />
              </div>
            </div>

            {/* Water */}
            <div className="card" style={{ padding: 12, textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
              </div>
              <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#2563eb", lineHeight: 1 }}>{todayData.water}</p>
              <p style={{ fontSize: "0.6rem", color: "var(--gray-400)", marginTop: 2 }}>/ {todayData.waterGoal} แก้ว</p>
              <div style={{ height: 4, borderRadius: 2, background: "var(--gray-100)", overflow: "hidden", marginTop: 6 }}>
                <div style={{ height: "100%", borderRadius: 2, background: "#2563eb", width: `${waterPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Vitals row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            {/* BMI */}
            <div className="card" style={{ padding: 12, textAlign: "center" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--gray-500)", marginBottom: 4 }}>BMI</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--green-600)", lineHeight: 1 }}>{todayData.bmi}</p>
              <p style={{ fontSize: "0.55rem", color: "var(--green-600)", fontWeight: 600, marginTop: 4, background: "var(--green-50)", borderRadius: 8, padding: "2px 6px", display: "inline-block" }}>ปกติ</p>
            </div>

            {/* Blood Pressure */}
            <div className="card" style={{ padding: 12, textAlign: "center" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--gray-500)", marginBottom: 4 }}>ความดัน</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--gray-800)", lineHeight: 1 }}>{todayData.bloodPressure.sys}/{todayData.bloodPressure.dia}</p>
              <p style={{ fontSize: "0.55rem", color: "var(--gray-400)", marginTop: 4 }}>mmHg</p>
            </div>

            {/* Blood Oxygen */}
            <div className="card" style={{ padding: 12, textAlign: "center" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--gray-500)", marginBottom: 4 }}>ออกซิเจน</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#2563eb", lineHeight: 1 }}>{todayData.bloodOxygen}%</p>
              <p style={{ fontSize: "0.55rem", color: "#2563eb", fontWeight: 600, marginTop: 4, background: "#dbeafe", borderRadius: 8, padding: "2px 6px", display: "inline-block" }}>SpO2</p>
            </div>
          </div>
        </>
      ) : (
        /* ── Weekly view ── */
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--gray-800)" }}>ก้าวเดินรายสัปดาห์</p>
            <p style={{ fontSize: "0.7rem", color: "var(--green-600)", fontWeight: 600 }}>
              เฉลี่ย {Math.round(weeklySteps.reduce((a, b) => a + b.value, 0) / 7).toLocaleString()} ก้าว
            </p>
          </div>
          {/* Bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, marginBottom: 4 }}>
            {weeklySteps.map((d, i) => {
              const height = (d.value / maxSteps) * 100;
              const isToday = i === weeklySteps.length - 1;
              return (
                <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: "0.55rem", fontWeight: 600, color: "var(--gray-500)" }}>
                    {(d.value / 1000).toFixed(1)}k
                  </span>
                  <div
                    style={{
                      width: "100%",
                      height: `${height}%`,
                      borderRadius: "6px 6px 2px 2px",
                      background: isToday
                        ? "linear-gradient(180deg, #4ade80, #16a34a)"
                        : "var(--green-100)",
                      transition: "height 0.4s ease",
                      minHeight: 8,
                      boxShadow: isToday ? "0 2px 8px rgba(34,197,94,0.3)" : "none",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {weeklySteps.map((d, i) => (
              <div key={d.day} style={{ flex: 1, textAlign: "center" }}>
                <span style={{
                  fontSize: "0.6rem",
                  fontWeight: i === weeklySteps.length - 1 ? 700 : 500,
                  color: i === weeklySteps.length - 1 ? "var(--green-700)" : "var(--gray-400)",
                }}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
