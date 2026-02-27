// import Image from "next/image";

export default function AppIntegrationSection() {
  const appLogos = [
    { name: "Medscape", src: "/logos/medscape_icon.png", href: "https://reference.medscape.com/drug-interactionchecker" },
    { name: "Health", src: "/logos/health.png" },
    { name: "Apple Fit", src: "/logos/apple-fit.png" },
    { name: "Garmin", src: "/logos/garmin.png" },
    { name: "Strava", src: "/logos/strava.png" },
    { name: "Fitbit", src: "/logos/fitbit.png" },
    { name: "Oura", src: "/logos/oura.png" },
    { name: "MyFitnessPal", src: "/logos/myfitness.png" },
    { name: "Health-Link", src: "/logos/healthlink.png", href: "https://healthlink.go.th/" },
    { name: "หมอพร้อม", src: "/logos/mhoprom.png", href: "https://mohpromtstation.moph.go.th/login" },
  ];

  return (
    <div
      className="card animate-fade-in-up"
      style={{
        padding: "20px",
        marginBottom: "16px",
        animationDelay: "0.15s",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
        border: "1px solid var(--gray-100)"
      }}
    >
      {/* Background hint */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 250,
          height: 250,
          background: "radial-gradient(circle at top right, var(--green-50), transparent 70%)",
          zIndex: 0,
          opacity: 0.8
        }} 
      />
      
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ 
          background: "var(--green-50)", 
          padding: "8px", 
          borderRadius: "10px", 
          display: "flex",
          border: "1px solid var(--green-100)"
        }}>
          <span style={{ fontSize: "1.1rem" }}>🔗</span>
        </div>
        <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--gray-800)", margin: 0, letterSpacing: "-0.01em" }}>
          แอปส่งข้อมูล จากที่ใช้งานอยู่ แล้ว AI ประมวลผล
        </p>
      </div>

      <div style={{ display: "flex", gap: 14, position: "relative", zIndex: 1, flexDirection: "row", alignItems: "stretch" }}>
        
        {/* LEFT: ดู VDO */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(145deg, var(--gray-50) 0%, white 100%)",
            border: "1px solid var(--gray-200)",
            padding: "16px 8px",
            borderRadius: "16px",
            width: "110px",
            flexShrink: 0,
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(145deg, var(--green-50) 0%, white 100%)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--green-200)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(145deg, var(--gray-50) 0%, white 100%)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--gray-200)";
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
          }}
        >
          <div style={{ 
            fontSize: "1.8rem", 
            marginBottom: 10, 
            background: "white", 
            borderRadius: "50%", 
            width: 50, 
            height: 50, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
          }}>▶️</div>
          <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--gray-700)", marginBottom: 10, textAlign: "center" }}>
            ดู VDO รับแต้ม
          </p>
          <div
            style={{
              background: "var(--green-500)",
              borderRadius: "20px",
              padding: "4px 12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              boxShadow: "0 2px 8px rgba(34, 197, 94, 0.25)"
            }}
          >
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "white" }}>
              +10 Point
            </span>
          </div>
        </div>

        {/* RIGHT: App Icons */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: 8, 
          flex: 1,
          alignContent: "center"
        }}>
          {appLogos.map((app, idx) => {
            const IconWrapper = app.href ? "a" : "div";
            return (
              <IconWrapper 
                key={idx} 
                title={app.name}
                href={app.href}
                target={app.href ? "_blank" : undefined}
                rel={app.href ? "noopener noreferrer" : undefined}
                style={{
                  aspectRatio: "1/1",
                  borderRadius: 12,
                  background: "white",
                  border: "1px solid var(--gray-200)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  cursor: app.href ? "pointer" : "default",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  padding: "4px"
                }}
                onMouseEnter={(e) => {
                  if (app.href) {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.05)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--green-300)";
                    (e.currentTarget as HTMLElement).style.zIndex = "2";
                  }
                }}
                onMouseLeave={(e) => {
                  if (app.href) {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.02)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--gray-200)";
                    (e.currentTarget as HTMLElement).style.zIndex = "1";
                  }
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={app.src} 
                  alt={app.name} 
                  style={{ width: "24px", height: "24px", objectFit: "contain", marginBottom: "4px" }}
                  onError={(e) => {
                    // Fallback to a default app icon on error to prevent layout jump
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>';
                  }}
                />
                <span style={{ 
                  fontSize: "0.5rem", 
                  color: "var(--gray-600)", 
                  fontWeight: 600, 
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  lineHeight: 1
                }}>
                  {app.name}
                </span>
              </IconWrapper>
            );
          })}
        </div>

      </div>
    </div>
  );
}
