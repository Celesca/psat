"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      const userData = {
        email,
        loggedIn: true,
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Check if profile exists
      const profile = localStorage.getItem("userProfile");
      if (profile) {
        router.push("/");
      } else {
        router.push("/onboarding");
      }
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const userData = {
        email: `user@${provider}.com`,
        provider,
        loggedIn: true,
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(userData));

      const profile = localStorage.getItem("userProfile");
      if (profile) {
        router.push("/");
      } else {
        router.push("/onboarding");
      }
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #fff7ed 0%, #ffffff 40%)",
        padding: "24px 16px",
      }}
    >
      {/* Logo & Title */}
      <div
        className="animate-fade-in-up"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--orange-400), var(--orange-600))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            boxShadow: "0 8px 24px rgba(249,115,22,0.3)",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--gray-900)",
            marginBottom: 4,
          }}
        >
          Persona Health
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--gray-400)" }}>
          เชื่อมต่อทุกแอปสุขภาพของคุณ
        </p>
      </div>

      {/* Login Card */}
      <div
        className="card animate-fade-in-up"
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "28px 24px",
          animationDelay: "0.1s",
        }}
      >
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "var(--gray-800)",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          เข้าสู่ระบบ
        </h2>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Email / Phone */}
          <div>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--gray-600)",
                marginBottom: 6,
                display: "block",
              }}
            >
              อีเมล / เบอร์โทร
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--gray-400)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                className="input-field"
                type="text"
                placeholder="กรอกอีเมลหรือเบอร์โทร"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: 42 }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--gray-600)",
                marginBottom: 6,
                display: "block",
              }}
            >
              รหัสผ่าน
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--gray-400)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                className="input-field"
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: 42, paddingRight: 42 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--gray-400)",
                  padding: 0,
                }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <div style={{ textAlign: "right", marginTop: 6 }}>
              <a
                href="#"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--orange-500)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ลืมรหัสผ่าน?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn-orange-gradient"
            disabled={isLoading}
            style={{
              marginTop: 4,
              opacity: isLoading ? 0.7 : 1,
              position: "relative",
            }}
          >
            {isLoading ? (
              <span
                style={{
                  width: 20,
                  height: 20,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.6s linear infinite",
                }}
              />
            ) : (
              "เข้าสู่ระบบ"
            )}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "20px 0",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "var(--gray-200)" }} />
          <span style={{ fontSize: "0.8rem", color: "var(--gray-400)", fontWeight: 500 }}>
            หรือ
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--gray-200)" }} />
        </div>

        {/* Digital ID Section */}
        <div style={{ marginBottom: 8 }}>
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--gray-600)",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            เข้าระบบด้วย Digital ID
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* ThaiID */}
            <button className="social-btn" onClick={() => handleSocialLogin("thaiid")}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <span style={{ fontWeight: 500 }}>แอปพลิเคชัน ThaiID</span>
            </button>

            {/* Facebook */}
            <button className="social-btn" onClick={() => handleSocialLogin("facebook")}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: "#1877F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span style={{ fontWeight: 500 }}>Facebook</span>
            </button>

            {/* Google */}
            <button className="social-btn" onClick={() => handleSocialLogin("google")}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: "white",
                  border: "1px solid var(--gray-200)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
              <span style={{ fontWeight: 500 }}>Google</span>
            </button>
          </div>
        </div>
      </div>

      {/* Register link */}
      <div
        className="animate-fade-in-up"
        style={{
          marginTop: 24,
          textAlign: "center",
          animationDelay: "0.2s",
        }}
      >
        <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>
          ยังไม่มีบัญชี?{" "}
          <a
            href="#"
            style={{
              color: "var(--orange-500)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ลงทะเบียน
          </a>
        </p>
      </div>

      {/* Spinner keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
