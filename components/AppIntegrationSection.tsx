// import Image from "next/image";

export default function AppIntegrationSection() {
  const appLogos = [
    { name: "App 1", src: "/logos/app1.png" },
    { name: "App 2", src: "/logos/app2.png" },
    { name: "App 3", src: "/logos/app3.png" },
    { name: "App 4", src: "/logos/app4.png" },
  ];

  return (
    <div
      className="card animate-fade-in-up"
      style={{
        padding: "16px",
        marginBottom: "16px",
        animationDelay: "0.15s",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background hint */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 150,
          height: 150,
          background: "linear-gradient(225deg, var(--green-50), transparent)",
          borderBottomLeftRadius: "100%",
          zIndex: 0,
          opacity: 0.5
        }} 
      />
      
      <div style={{ marginBottom: 16, position: "relative", zIndex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--gray-800)", letterSpacing: "-0.02em" }}>
          🔗 app ส่งข้อมูล จากที่ใช้งานอยู่ แล้ว app AI ประมวลผล
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, position: "relative", zIndex: 1 }}>
        
        {/* LEFT: ดู VDO */}
        <div
          style={{
            textAlign: "center",
            background: "var(--gray-50)",
            border: "1px solid var(--gray-100)",
            padding: "12px",
            borderRadius: "12px",
            minWidth: 100,
            flexShrink: 0,
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--green-50)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--green-200)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--gray-50)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--gray-100)";
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>▶️</div>
          <p style={{ fontWeight: 700, fontSize: "0.75rem", color: "var(--green-700)", marginBottom: 6 }}>
            ดู VDO รับแต้ม
          </p>
          <div
            style={{
              background: "var(--green-100)",
              border: "1px solid var(--green-300)",
              borderRadius: "20px",
              padding: "2px 8px",
              display: "inline-block"
            }}
          >
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--green-700)" }}>
              10 Point
            </span>
          </div>
        </div>

        {/* RIGHT: App Icons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, flexWrap: "wrap", flex: 1 }}>
          {appLogos.map((app, idx) => (
            <div 
              key={idx} 
              title={app.name}
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "white",
                border: "1px solid var(--gray-200)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={app.src} 
                alt={app.name} 
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  (e.target as HTMLElement).parentElement!.innerHTML = `<span style="font-size: 0.75rem; color: var(--gray-400); font-weight: 700;">${app.name.replace('App', '')}</span>`;
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
