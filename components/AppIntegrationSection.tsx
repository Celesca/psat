"use client";

import { useState } from "react";

interface AppItem {
  name: string;
  src: string;
  href?: string;
}

interface Category {
  label: string;
  icon: string;
  apps: AppItem[];
}

const categories: Category[] = [
  {
    label: "การเข้าถึงข้อมูลและการจัดการสุขภาพส่วนบุคคล",
    icon: "📋",
    apps: [
      { name: "หมอพร้อม", src: "/logos/mhoprom.png", href: "https://mohpromtstation.moph.go.th/login" },
      { name: "Health Link", src: "/logos/healthlink.png", href: "https://healthlink.go.th/" },
      { name: "กระเป๋าตัง", src: "/logos/paotang.png" },
      { name: "สมุดสุขภาพ", src: "/logos/health_profile.png" },
    ],
  },
  {
    label: "การประเมินความเสี่ยง",
    icon: "🩺",
    apps: [
      { name: "Persona Health", src: "/logos/persona_health.png" },
    ],
  },
  {
    label: "การเข้าถึงบริการทางการแพทย์",
    icon: "🏥",
    apps: [
      { name: "Telehealth", src: "/logos/telemedicine.webp" },
      { name: "สปสช.", src: "/logos/สปสช.png" },
    ],
  },
  {
    label: "บริการภาครัฐ",
    icon: "🏛️",
    apps: [
      { name: "ทางรัฐ", src: "/logos/ทางรัฐ.png" },
      { name: "Medscape", src: "/logos/medscape_icon.png", href: "https://reference.medscape.com/drug-interactionchecker" },
    ],
  },
];

interface AppIntegrationSectionProps {
  onImportApp?: (name: string) => void;
}

export default function AppIntegrationSection({ onImportApp }: AppIntegrationSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [importedApps, setImportedApps] = useState<string[]>([]);

  const handleImport = (app: AppItem) => {
    setImportedApps((prev) => (prev.includes(app.name) ? prev : [...prev, app.name]));
    onImportApp?.(app.name);
    setSelectedApp(null);
  };

  return (
    <div
      className="card animate-fade-in-up"
      style={{
        padding: "16px",
        marginBottom: "16px",
        animationDelay: "0.15s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background hint */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 200,
          height: 200,
          background: "radial-gradient(circle at top right, var(--green-50), transparent 70%)",
          zIndex: 0,
          opacity: 0.8,
        }}
      />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{
          background: "var(--green-50)",
          padding: 7,
          borderRadius: 10,
          display: "flex",
          border: "1px solid var(--green-100)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--gray-800)", margin: 0 }}>
            เชื่อมต่อแอปสุขภาพ
          </p>
          <p style={{ fontSize: "0.65rem", color: "var(--gray-400)", margin: 0 }}>
            AI วิเคราะห์ข้อมูลจากแหล่งที่เชื่อมต่อ
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div
        className="hide-scroll"
        style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          marginBottom: 14,
          position: "relative",
          zIndex: 1,
        }}
      >
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 14px",
              borderRadius: 20,
              border: activeCategory === i ? "1.5px solid var(--green-300)" : "1.5px solid var(--gray-200)",
              background: activeCategory === i ? "var(--green-50)" : "white",
              color: activeCategory === i ? "var(--green-700)" : "var(--gray-500)",
              fontSize: "0.72rem",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "0.85rem" }}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* App grid for active category */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        {categories[activeCategory].apps.map((app, idx) => {
          const isImported = importedApps.includes(app.name);
          return (
            <button
              key={idx}
              title={app.name}
              onClick={() => setSelectedApp(app)}
              type="button"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "12px 4px",
                borderRadius: 14,
                background: "white",
                border: "1px solid var(--gray-100)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--green-300)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gray-100)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.src}
                alt={app.name}
                style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>';
                }}
              />
              <span style={{
                fontSize: "0.58rem",
                color: "var(--gray-600)",
                fontWeight: 600,
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                lineHeight: 1.2,
              }}>
                {app.name}
              </span>
              {isImported ? (
                <span style={{
                  fontSize: "0.5rem",
                  color: "var(--green-600)",
                  fontWeight: 600,
                  background: "var(--green-50)",
                  borderRadius: 6,
                  padding: "1px 6px",
                  border: "1px solid var(--green-100)",
                }}>
                  เชื่อมต่อแล้ว
                </span>
              ) : (
                <span style={{
                  fontSize: "0.5rem",
                  color: "var(--gray-500)",
                  fontWeight: 600,
                  background: "var(--gray-50)",
                  borderRadius: 6,
                  padding: "1px 6px",
                  border: "1px solid var(--gray-100)",
                }}>
                  แตะเพื่อจัดการ
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedApp && (
        <>
          <button
            type="button"
            onClick={() => setSelectedApp(null)}
            aria-label="ปิดหน้าต่างเชื่อมต่อแอป"
            style={{
              position: "fixed",
              inset: 0,
              border: "none",
              background: "rgba(0,0,0,0.35)",
              zIndex: 999,
            }}
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
              padding: 16,
              zIndex: 1000,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedApp.src}
                alt={selectedApp.name}
                style={{ width: 42, height: 42, objectFit: "contain", borderRadius: 10, border: "1px solid var(--gray-100)" }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: "var(--gray-800)" }}>{selectedApp.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: "0.68rem", color: "var(--gray-500)" }}>นำเข้าข้อมูลสุขภาพและเปิดแอปปลายทาง</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: "1px solid var(--gray-200)",
                  background: "white",
                  color: "var(--gray-500)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                x
              </button>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => handleImport(selectedApp)}
                style={{
                  flex: 1,
                  minHeight: 42,
                  borderRadius: 12,
                  border: "1px solid var(--green-300)",
                  background: "var(--green-50)",
                  color: "var(--green-700)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                นำเข้าข้อมูล
              </button>

              <button
                type="button"
                disabled={!selectedApp.href}
                onClick={() => {
                  if (selectedApp.href) {
                    window.open(selectedApp.href, "_blank", "noopener,noreferrer");
                  }
                }}
                style={{
                  flex: 1,
                  minHeight: 42,
                  borderRadius: 12,
                  border: "none",
                  background: selectedApp.href ? "var(--green-600)" : "var(--gray-200)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  cursor: selectedApp.href ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                }}
              >
                {selectedApp.href ? "เปิดแอปปลายทาง" : "ยังไม่มีลิงก์แอป"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
