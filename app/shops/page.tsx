"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";

/* ─── types ─── */
type Category = "all" | "restaurant" | "event" | "gym" | "hospital";

interface Place {
  id: number;
  name: string;
  category: Category;
  distance: number;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  rating: number;
}

/* ─── color map ─── */
const categoryMeta: Record<
  Exclude<Category, "all">,
  { color: string; bg: string; label: string; icon: string }
> = {
  restaurant: { color: "#16a34a", bg: "#f0fdf4", label: "ร้านอาหารสุขภาพ", icon: "🥗" },
  event:      { color: "#7c3aed", bg: "#f5f3ff", label: "กิจกรรมสุขภาพ",   icon: "🏃" },
  gym:        { color: "#ca8a04", bg: "#fefce8", label: "Gym",              icon: "🏋️" },
  hospital:   { color: "#dc2626", bg: "#fef2f2", label: "โรงพยาบาล",       icon: "🏥" },
};

/* ─── mock data ─── */
const mockPlaces: Place[] = [
  { id: 1,  name: "Broccoli Revolution",       category: "restaurant", distance: 0.3, address: "สุขุมวิท 49",       phone: "02-662-5001", lat: 55, lng: 62, rating: 4.7 },
  { id: 2,  name: "Veganerie Concept",          category: "restaurant", distance: 0.8, address: "สยามพารากอน",        phone: "02-610-9992", lat: 30, lng: 35, rating: 4.5 },
  { id: 3,  name: "Bangkok Yoga Festival",      category: "event",      distance: 1.2, address: "ลุมพินีสวน",         phone: "081-234-5678", lat: 70, lng: 25, rating: 4.8 },
  { id: 4,  name: "Health Run 2026",            category: "event",      distance: 2.5, address: "สนามกีฬาหัวหมาก",    phone: "081-999-8888", lat: 20, lng: 75, rating: 4.6 },
  { id: 5,  name: "Fitness First สยาม",         category: "gym",        distance: 0.5, address: "สยามดิสคัฟเวอรี่",    phone: "02-658-0100", lat: 42, lng: 48, rating: 4.4 },
  { id: 6,  name: "Virgin Active ทองหล่อ",      category: "gym",        distance: 1.1, address: "ทองหล่อ 10",         phone: "02-392-7777", lat: 65, lng: 58, rating: 4.3 },
  { id: 7,  name: "โรงพยาบาลบำรุงราษฎร์",        category: "hospital",   distance: 1.8, address: "สุขุมวิท 33",       phone: "02-066-8888", lat: 80, lng: 40, rating: 4.9 },
  { id: 8,  name: "โรงพยาบาลสมิติเวช",           category: "hospital",   distance: 2.0, address: "สุขุมวิท 49",       phone: "02-022-2222", lat: 15, lng: 55, rating: 4.7 },
  { id: 9,  name: "Ohana Poke & Salad",         category: "restaurant", distance: 1.5, address: "เอกมัย 12",          phone: "02-381-6789", lat: 48, lng: 80, rating: 4.2 },
  { id: 10, name: "Jetts Fitness เอกมัย",        category: "gym",        distance: 1.9, address: "เอกมัย ซ.10",        phone: "02-381-4455", lat: 35, lng: 18, rating: 4.1 },
];

/* ─── marker pin SVG ─── */
function MapPin({ color, size = 28 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="white" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" fill="white" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

/* ─── page ─── */
export default function ShopsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = mockPlaces
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.address.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.distance - b.distance);

  const categories: { key: Category; label: string; color: string }[] = [
    { key: "all",        label: "ทั้งหมด",          color: "#525252" },
    { key: "restaurant", label: "ร้านอาหารสุขภาพ",  color: "#16a34a" },
    { key: "event",      label: "กิจกรรมสุขภาพ",    color: "#7c3aed" },
    { key: "gym",        label: "Gym",               color: "#ca8a04" },
    { key: "hospital",   label: "โรงพยาบาล",        color: "#dc2626" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: 440,
        margin: "0 auto",
        position: "relative",
        background: "#f0f4f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── SEARCH BAR ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          padding: "12px 16px 0",
          background: "linear-gradient(180deg, rgba(255,255,255,0.95) 60%, transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "white",
            borderRadius: 14,
            padding: "10px 14px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            border: "1px solid var(--gray-100)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="ค้นหาสถานบริการ, ที่อยู่ หรือร้านค้า..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "0.85rem",
              fontFamily: "inherit",
              color: "var(--gray-800)",
              background: "transparent",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>

        {/* ── CATEGORY CHIPS ── */}
        <div
          className="hide-scroll"
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingTop: 10,
            paddingBottom: 6,
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  flexShrink: 0,
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: isActive ? `2px solid ${cat.color}` : "1px solid var(--gray-200)",
                  background: isActive ? cat.color : "white",
                  color: isActive ? "white" : "var(--gray-700)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? `0 2px 8px ${cat.color}40` : "0 1px 3px rgba(0,0,0,0.05)",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAP AREA ── */}
      <div
        style={{
          height: "52vh",
          position: "relative",
          overflow: "hidden",
          background: "#e8f0e8",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, position: "absolute", inset: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            selectedPlace 
              ? `${selectedPlace.name} ${selectedPlace.address}` 
              : searchQuery ? searchQuery : "สวนสาธารณะ กรุงเทพ"
          )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
      </div>

      {/* ── BOTTOM SHEET: NEARBY LIST ── */}
      <div
        style={{
          flex: 1,
          background: "white",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: -20,
          zIndex: 15,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          paddingBottom: 90,
          minHeight: "40vh",
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--gray-300)" }} />
        </div>

        {/* Header */}
        <div style={{ padding: "8px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gray-800)" }}>
            📍 สถานที่ใกล้คุณ
          </h2>
          <span style={{ fontSize: "0.7rem", color: "var(--gray-400)", fontWeight: 500 }}>
            {filteredPlaces.length} แห่ง
          </span>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
          {filteredPlaces.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--gray-400)", fontSize: "0.85rem" }}>
              ไม่พบสถานที่ที่ค้นหา
            </div>
          )}
          {filteredPlaces.map((place) => {
            const meta = categoryMeta[place.category as Exclude<Category, "all">];
            const isSelected = selectedPlace?.id === place.id;
            return (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(isSelected ? null : place)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 12px",
                  borderRadius: 14,
                  marginBottom: 8,
                  background: isSelected ? meta.bg : "var(--gray-50)",
                  border: isSelected ? `1.5px solid ${meta.color}40` : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: meta.bg,
                    border: `1px solid ${meta.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                  }}
                >
                  {meta.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--gray-800)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {place.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        color: meta.color,
                        background: meta.bg,
                        padding: "2px 8px",
                        borderRadius: 10,
                        border: `1px solid ${meta.color}25`,
                      }}
                    >
                      {meta.label}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "var(--gray-400)" }}>
                      {place.address}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                    <span style={{ fontSize: "0.65rem", color: "#f59e0b" }}>★</span>
                    <span style={{ fontSize: "0.68rem", color: "var(--gray-500)", fontWeight: 500 }}>{place.rating}</span>
                  </div>
                </div>

                {/* Right side: Distance + actions */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--gray-700)",
                      background: "var(--gray-100)",
                      padding: "3px 8px",
                      borderRadius: 8,
                    }}
                  >
                    {place.distance} กม.
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    {/* Phone */}
                    <a
                      href={`tel:${place.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "#f0fdf4",
                        border: "1px solid #dcfce7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      title={place.phone}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </a>
                    {/* Navigate */}
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(place.name + " " + place.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #4ade80, #16a34a)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        textDecoration: "none",
                        boxShadow: "0 2px 6px rgba(34,197,94,0.3)",
                      }}
                      title="นำทาง"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />

      {/* scrollbar hide */}
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
