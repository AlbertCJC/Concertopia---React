import { useState } from "react";
import { GIRL_AVATARS, BOY_AVATARS } from '../constants';

export function AvatarScreen({ username, onComplete }) {
  const [gender, setGender] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState(2);

  const avatars = gender === "boy" ? BOY_AVATARS : GIRL_AVATARS;

  if (step === 1) return (
    <div style={av.root}>
      <h2 style={av.title}>Pick a Base Style</h2>
      <div style={av.baseRow}>
        {["girl", "boy"].map((g) => {
          const isSelected = gender === g;
          return (
            <div 
              key={g} 
              style={{ 
                ...av.imageContainer, 
                transform: isSelected ? "scale(1.2) translateY(-10px)" : "scale(0.8) translateY(0)",
                filter: isSelected ? "brightness(1.1)" : "brightness(0.6)"
              }} 
              onClick={() => setGender(g)}
            >
              <img 
                src={g === 'boy' ? '/boy.png' : '/girl.png'} 
                alt={g} 
                style={av.characterImage} 
              />
              <div style={{
                ...av.spotlight,
                opacity: isSelected ? 1 : 0,
              }} />
            </div>
          );
        })}
      </div>
      <button style={{ ...av.confirmBtn, opacity: gender ? 1 : 0.45 }} onClick={() => { if (gender) { setSelectedIdx(Math.floor(avatars.length / 2)); setStep(2); } }}>CONFIRM</button>
    </div>
  );

  return (
    <div style={av.root}>
      <h2 style={av.title}>Select Avatar</h2>
      <div style={av.carouselRow}>
        {avatars.map((a, i) => {
          const isSelected = i === selectedIdx;
          return (
            <div 
              key={a.id} 
              onClick={() => setSelectedIdx(i)} 
              style={{ 
                ...av.imageContainer, 
                transform: isSelected ? "scale(1.2) translateY(-10px)" : "scale(0.8) translateY(0)",
                filter: isSelected ? "brightness(1.1)" : "brightness(0.6)",
                margin: "10px 10px"
              }}
            >
              <img src={a.image} alt={a.name} style={av.characterImage} />
              <div style={{
                ...av.spotlight,
                opacity: isSelected ? 1 : 0,
              }} />
              <p style={{ ...av.avatarLabel, opacity: isSelected ? 1 : 0 }}>{a.name}</p>
            </div>
          );
        })}
      </div>
      <button style={av.confirmBtn} onClick={() => onComplete({ gender, outfit: { id: avatars[selectedIdx].id, name: avatars[selectedIdx].name, image: avatars[selectedIdx].image } })}>CONFIRM</button>
      <button style={av.backBtn} onClick={() => setStep(1)}>← Back</button>
    </div>
  );
}

const av = {
  root: { width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "fixed", top: 0, left: 0, fontFamily: "'Pixelify Sans', sans-serif", color: "#fff", overflow: "hidden" },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", margin: "0 0 32px", letterSpacing: 1, textAlign: "center" },
  baseRow: { display: "flex", gap: 40, alignItems: "flex-end", justifyContent: "center", marginBottom: 40, minHeight: 250 },
  imageContainer: { position: "relative", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", margin: "0 20px", display: "flex", flexDirection: "column", alignItems: "center" },
  characterImage: { width: 120, height: 200, objectFit: 'contain', position: "relative", zIndex: 1, imageRendering: "pixelated" },
  spotlight: { position: "absolute", bottom: -10, width: 100, height: 20, background: "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)", transition: "opacity 0.3s ease", pointerEvents: "none", zIndex: 0 },
  confirmBtn: { background: "#ff6eb4", border: "none", borderRadius: 30, color: "#fff", fontFamily: "'Pixelify Sans', sans-serif", fontWeight: "bold", fontSize: 14, padding: "14px 64px", cursor: "pointer", letterSpacing: 2, marginBottom: 12, transition: "opacity 0.3s" },
  backBtn: { background: "none", border: "none", color: "#666", fontFamily: "'Pixelify Sans', sans-serif", fontSize: 13, cursor: "pointer", padding: "6px 12px" },
  genderLabel: { color: "#ccc", fontSize: 13, margin: "10px 0 0", textTransform: "capitalize" },
  carouselRow: { display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap", justifyContent: "center", maxWidth: "900px", minHeight: 250 },
  avatarCard: { padding: 20, border: "1px solid #333", borderRadius: 10, cursor: "pointer" },
  avatarLabel: { position: "absolute", bottom: -30, color: "#fff", fontSize: 14, fontWeight: "bold", whiteSpace: "nowrap", transition: "opacity 0.3s ease", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }
};
