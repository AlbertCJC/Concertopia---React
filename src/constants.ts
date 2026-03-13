export const TILE = 32;
export const MAP_W = 30;
export const MAP_H = 18;

export const COLORS = {
  bg: "#0a0a1a",
  primary: "#ff6eb4",
  secondary: "#c084fc",
  accent: "#facc15",
  stage: "#1e1b4b",
  floor: "#1a1a2e",
  floorLine: "#16213e",
  wall: "#0f0f23",
  spotlight1: "rgba(255,110,180,0.15)",
  spotlight2: "rgba(192,132,252,0.15)",
  spotlight3: "rgba(250,204,21,0.12)",
  text: "#f0e6ff",
  muted: "#9d8ec0",
};

export const OUTFITS = {
  girl: [
    { id: "g1", name: "Pop Star", colors: ["#ff6eb4", "#fff", "#facc15"] },
    { id: "g2", name: "Rock Queen", colors: ["#000", "#c084fc", "#fff"] },
    { id: "g3", name: "Neon Rave", colors: ["#00ffcc", "#ff00aa", "#fff0"] },
    { id: "g4", name: "Pastel Dream", colors: ["#f9a8d4", "#bfdbfe", "#fff"] },
  ],
  boy: [
    { id: "b1", name: "Pop Star", colors: ["#3b82f6", "#fff", "#facc15"] },
    { id: "b2", name: "Rock King", colors: ["#111", "#ef4444", "#fff"] },
    { id: "b3", name: "Neon Rave", colors: ["#00ffcc", "#a855f7", "#fff0"] },
    { id: "b4", name: "Street Cool", colors: ["#f97316", "#1c1c1c", "#fff"] },
  ],
};

export const GIRL_AVATARS = [
  { id: "g1", name: "Base Girl", image: "/characterpreset/basegirl.png" },
  { id: "g2", name: "Emo Girl", image: "/characterpreset/emogirl.png" },
  { id: "g3", name: "Orange Girl", image: "/characterpreset/orangegirl.png" },
  { id: "g4", name: "Pink Head Girl", image: "/characterpreset/pinkheadgirl.png" },
  { id: "g5", name: "Purple Girl", image: "/characterpreset/purplegirl.png" },
  { id: "g6", name: "Redhead Girl", image: "/characterpreset/redheadgirl.png" },
  { id: "g7", name: "Sparkly Girl", image: "/characterpreset/sparklygirl.png" },
  { id: "g8", name: "White Girl", image: "/characterpreset/whitegirl.png" },
  { id: "g9", name: "White Head Girl", image: "/characterpreset/whiteheadgirl.png" },
];

export const BOY_AVATARS = [
  { id: "b1", name: "Base Boy", image: "/characterpreset/baseboy.png" },
  { id: "b2", name: "Green Boy", image: "/characterpreset/greenboy.png" },
  { id: "b3", name: "Grey Boy", image: "/characterpreset/greyboy.png" },
  { id: "b4", name: "Hoody Boy", image: "/characterpreset/hoodyboy.png" },
  { id: "b5", name: "Purple Boy", image: "/characterpreset/purpleboy.png" },
  { id: "b6", name: "White Boy", image: "/characterpreset/whiteboy.png" },
];

export const ROOMS = [
  {
    id: 1,
    name: "Taylor Swift",
    artist: "TAYLOR SWIFT",
    genre: "Pop",
    color: "#d12b5a",
    accent: "#f48fb1",
    emoji: "🎤",
    viewers: 312,
    desc: "Eras Tour vibes",
  },
  {
    id: 2,
    name: "Ariana Grande",
    artist: "ARIANA GRANDE",
    genre: "Pop",
    color: "#6a1b9a",
    accent: "#b39ddb",
    emoji: "⭐",
    viewers: 487,
    desc: "Positions vibes",
  },
  {
    id: 3,
    name: "Chappell Roan",
    artist: "CHAPPELL ROAN",
    genre: "Pop",
    color: "#e65100",
    accent: "#ffcc80",
    emoji: "🎧",
    viewers: 203,
    desc: "Midwest Princess vibes",
  },
  {
    id: 4,
    name: "Velvet Lounge",
    artist: "MOONSONG",
    genre: "Indie",
    color: "#f9a8d4",
    accent: "#c084fc",
    emoji: "🌙",
    viewers: 145,
    desc: "Dreamy indie folk under velvet lights",
  },
];

export const CHAT_MESSAGES = [
  { user: "pixelfan88", text: "THIS IS AMAZING 🔥", color: "#ff6eb4" },
  { user: "neonkid", text: "best concert ever!!", color: "#00ffcc" },
  { user: "stargazer", text: "AURORA PLS PLAY MY FAV SONG", color: "#facc15" },
  { user: "rave_queen", text: "lets gooooo 🎉", color: "#c084fc" },
  { user: "bass_master", text: "the drop is coming...", color: "#3b82f6" },
  { user: "pixel_rose", text: "i drove 0 miles to be here lol", color: "#f9a8d4" },
  { user: "synth_wave", text: "🎵🎵🎵", color: "#a3e635" },
  { user: "concertopia", text: "Welcome everyone! 🎤", color: "#fff" },
];

export const FAN_CHANTS = ["GO GO GO!", "WE LOVE YOU!", "ONE MORE SONG!", "LETS GOOOO!", "🔥🔥🔥", "ENCORE!", "AMAZING!", "💜💜💜"];
