import { useState } from "react";

const ONBOARDING_SLIDES = [
  {
    slide: 0,
    welcomeTo: "Welcome to",
    title: "ConcerTopia.",
    subtitle: "Reimagining Concerts Through Pixels",
    tagline: null,
    bullets: null,
  },
  {
    slide: 1,
    welcomeTo: null,
    title: "ConcerTopia.",
    tagline: "Your Concert,\nYour Way.",
    subtitle: "Here's what's waiting for you:",
    bullets: [
      "🎤 Artist Selection – Pick from a lineup of your fav musicians.",
      "🎭 Custom Experiences – Bring a personalized festival ambiance to life.",
      "🎶 Real-Time – Vibe along during your favorite beats and hits.",
      "🌟 Engaging Crowd – Interact through fan chants, emotes, and more.",
    ],
  },
  {
    slide: 2,
    welcomeTo: null,
    title: "ConcerTopia.",
    tagline: "Let's Get You on\nStage!",
    subtitle: null,
    bullets: [
      "Step into a world of pixel-perfect performances.",
      "Create your avatar, pick your room, and lose yourself in the music.",
      "Your front-row experience awaits — no tickets needed.",
    ],
  },
];

export function WelcomeScreen({ onDone }) {
  const [slide, setSlide] = useState(0);
  const total = ONBOARDING_SLIDES.length;
  const s = ONBOARDING_SLIDES[slide];

  return (
    <div style={ob.root}>
      <div style={ob.scanlines} />
      <div style={ob.topBar}>
        {slide > 0
          ? <button style={ob.navBtn} onClick={() => setSlide(slide - 1)}>Back</button>
          : <div style={{ width: 40 }} />}
        <div style={{ width: 40 }} />
      </div>
      <div style={ob.body}>
        {slide === 0 ? (
          <div style={ob.slide0Content}>
            <p style={ob.welcomeTag}>Welcome to</p>
            <h1 style={ob.bigTitle}>ConcerTopia.</h1>
            <p style={ob.subtitle0}>Reimagining Concerts Through Pixels</p>
          </div>
        ) : (
          <div style={ob.slideContent}>
            <p style={ob.slideSmallTitle}>{s.title}</p>
            <h2 style={ob.tagline}>{s.tagline}</h2>
            {s.subtitle && <p style={ob.slideSubtitle}>{s.subtitle}</p>}
            <div style={ob.bullets}>
              {s.bullets.map((b, i) => (
                <p key={i} style={ob.bullet}>{b}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={ob.bottom}>
        <div style={ob.dots}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{ ...ob.dot, ...(i === slide ? ob.dotActive : {}) }}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
        <button
          style={ob.nextBtn}
          onClick={() => slide < total - 1 ? setSlide(slide + 1) : onDone()}
        >
          {slide < total - 1 ? "Next" : "Get Started"}
        </button>
      </div>
    </div>
  );
}

const ob = {
  root: {
    width: "100vw", height: "100vh",
    background: "#000",
    display: "flex", flexDirection: "column",
    fontFamily: "'Pixelify Sans', sans-serif",
    color: "#fff",
    padding: "0 32px",
    position: "fixed",
    top: 0, left: 0,
    overflow: "hidden",
    userSelect: "none",
  },
  scanlines: {
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "48px 0 0",
    minHeight: 64,
    position: "relative",
    zIndex: 1,
  },
  navBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontFamily: "'Pixelify Sans', sans-serif",
    fontSize: 15,
    cursor: "pointer",
    padding: 0,
    opacity: 0.85,
    letterSpacing: 0.3,
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: 440,
    margin: "0 auto",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  slide0Content: {
    display: "flex", flexDirection: "column", gap: 12,
  },
  welcomeTag: {
    fontSize: 17,
    color: "#fff",
    margin: 0,
    fontStyle: "italic",
    fontFamily: "'Pixelify Sans', sans-serif",
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  bigTitle: {
    fontSize: 54,
    fontWeight: "bold",
    margin: 0,
    color: "#fff",
    fontFamily: "'Pixelify Sans', sans-serif",
    lineHeight: 1.05,
    letterSpacing: -0.5,
  },
  subtitle0: {
    fontSize: 12,
    color: "#888",
    margin: 0,
    fontFamily: "'Pixelify Sans', sans-serif",
    fontStyle: "italic",
    letterSpacing: 0.4,
    marginTop: 4,
  },
  slideContent: {
    display: "flex", flexDirection: "column", gap: 10, width: "100%",
  },
  slideSmallTitle: {
    fontSize: 16,
    color: "#ff6eb4",
    margin: "0 0 2px",
    fontFamily: "'Pixelify Sans', sans-serif",
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: 34,
    color: "#ff6eb4",
    margin: "0 0 14px",
    lineHeight: 1.2,
    fontFamily: "'Pixelify Sans', sans-serif",
    fontWeight: "bold",
    whiteSpace: "pre-line",
  },
  slideSubtitle: {
    fontSize: 12,
    color: "#aaa",
    margin: "0 0 10px",
    fontFamily: "'Pixelify Sans', sans-serif",
    letterSpacing: 0.2,
  },
  bullets: { display: "flex", flexDirection: "column", gap: 8 },
  bullet: {
    fontSize: 12,
    color: "#ccc",
    margin: 0,
    lineHeight: 1.65,
    fontFamily: "'Pixelify Sans', sans-serif",
    paddingLeft: 2,
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 52,
    maxWidth: 440,
    margin: "0 auto",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  dots: { display: "flex", gap: 7, alignItems: "center" },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#333",
    cursor: "pointer",
    transition: "all 0.25s",
  },
  dotActive: {
    background: "#ff6eb4",
    width: 22,
    borderRadius: 4,
  },
  nextBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontFamily: "'Pixelify Sans', sans-serif",
    fontSize: 15,
    cursor: "pointer",
    padding: "2px 0",
    borderBottom: "1px solid rgba(255,255,255,0.35)",
    letterSpacing: 0.3,
  },
};
