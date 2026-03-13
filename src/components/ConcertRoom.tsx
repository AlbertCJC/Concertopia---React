import { useState, useEffect, useRef } from "react";
import { drawVenue, drawPixelChar } from "../utils/canvas";
import { TILE, MAP_W, MAP_H, BOY_AVATARS, GIRL_AVATARS } from "../constants";

export function ConcertRoom({ username, avatar, room, onLeave }) {
  const canvasRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { user: "beryllium", text: "WOW" },
    { user: "alberto", text: "YAHHH" },
    { user: "vince", text: "TAYYY" },
    { user: "mario", text: "MOTHEER!!" },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { user: username, text: message }]);
      setMessage("");
    }
  };

  const stateRef = useRef({
    x: MAP_W * TILE / 2 - 16,
    y: MAP_H * TILE - 3 * TILE,
    keys: {},
    frame: 0,
    moving: false,
    direction: "down",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const img = new Image();
    img.src = avatar?.outfit?.image || (avatar?.gender === 'boy' ? '/boy.png' : '/girl.png');

    const stageImg = new Image();
    stageImg.src = '/stage.png';

    const crowdImages = [];
    [...BOY_AVATARS, ...GIRL_AVATARS].forEach(av => {
      const cImg = new Image();
      cImg.src = av.image;
      crowdImages.push(cImg);
    });

    const loop = () => {
      const s = stateRef.current;
      const speed = 2.5;
      
      // Handle keyboard movement
      if (s.keys["ArrowLeft"] || s.keys["a"] || s.keys["A"]) s.x -= speed;
      if (s.keys["ArrowRight"] || s.keys["d"] || s.keys["D"]) s.x += speed;
      if (s.keys["ArrowUp"] || s.keys["w"] || s.keys["W"]) s.y -= speed;
      if (s.keys["ArrowDown"] || s.keys["s"] || s.keys["S"]) s.y += speed;

      // Handle button movement
      if (s.buttonMove === "left") s.x -= speed;
      if (s.buttonMove === "right") s.x += speed;

      // Boundaries
      const minX = 20;
      const maxX = MAP_W * TILE - 60;
      const minY = TILE * 7.5; 
      const maxY = MAP_H * TILE - 110;

      s.x = Math.max(minX, Math.min(maxX, s.x));
      s.y = Math.max(minY, Math.min(maxY, s.y));

      // Handle jump
      let yOffset = 0;
      if (s.isJumping) {
        const jumpTime = Date.now() - s.jumpStart;
        if (jumpTime < 500) {
          yOffset = Math.sin((jumpTime / 500) * Math.PI) * 40;
        } else {
          s.isJumping = false;
        }
      }

      // Handle headbang
      let rotation = 0;
      if (s.isHeadbanging) {
        const hbTime = Date.now() - s.headbangStart;
        if (hbTime < 1000) {
          rotation = Math.sin((hbTime / 200) * Math.PI * 2) * 0.3;
        } else {
          s.isHeadbanging = false;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawVenue(ctx, room.color, room.accent, 0, 0.5, s.x, s.y, username, avatar, stageImg, crowdImages);
      
      // Draw shadow
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.ellipse(s.x + 16, s.y + 62, 16, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw character image
      if (img.complete) {
        ctx.save();
        ctx.translate(s.x + 16, s.y + 18 - yOffset);
        ctx.rotate(rotation);
        ctx.drawImage(img, -32, -50, 64, 100);
        ctx.restore();
      } else {
        drawPixelChar(ctx, s.x, s.y - yOffset, avatar?.gender || "boy", { colors: ["#3b82f6", "#fff", "#facc15"] }, s.direction, true, 0);
      }
      
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [room, avatar, username]);

  useEffect(() => {
    const onDown = (e) => stateRef.current.keys[e.key] = true;
    const onUp = (e) => stateRef.current.keys[e.key] = false;
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  const styles = getStyles(room);

  return (
    <div style={styles.root}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.artistBadge}>
          <img src={avatar?.outfit?.image || (avatar?.gender === 'boy' ? '/boy.png' : '/girl.png')} alt="avatar" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', background: '#333' }} />
          {room.artist}
        </div>
        <div style={styles.logo}>ConcerTopia</div>
        <div style={styles.topIcons}>
          <button style={styles.iconBtn} onClick={() => setIsMuted(!isMuted)}>{isMuted ? "🔇" : "🔊"}</button>
          <button style={styles.iconBtn} onClick={onLeave}>🚪</button>
          <button style={styles.iconBtn} onClick={() => console.log("Open Settings")}>⚙️</button>
        </div>
      </div>

      {/* Main Area */}
      <div style={styles.mainArea}>
        <div style={styles.leftPanel}>
          <div style={styles.cardTitle}>now playing</div>
          <div style={styles.card}>{room.name}</div>
        </div>
        <div style={styles.centerStage}>
          <canvas ref={canvasRef} width={MAP_W * TILE} height={MAP_H * TILE} style={styles.canvas} />
          <div style={styles.stageControls}>
            <div style={styles.walkBtns}>
              <button 
                style={styles.btn} 
                onMouseDown={() => stateRef.current.buttonMove = "left"}
                onMouseUp={() => stateRef.current.buttonMove = null}
                onMouseLeave={() => stateRef.current.buttonMove = null}
                onTouchStart={() => stateRef.current.buttonMove = "left"}
                onTouchEnd={() => stateRef.current.buttonMove = null}
              >walk L</button>
              <button 
                style={styles.btn}
                onMouseDown={() => stateRef.current.buttonMove = "right"}
                onMouseUp={() => stateRef.current.buttonMove = null}
                onMouseLeave={() => stateRef.current.buttonMove = null}
                onTouchStart={() => stateRef.current.buttonMove = "right"}
                onTouchEnd={() => stateRef.current.buttonMove = null}
              >walk R</button>
            </div>
            <div style={styles.actionBtns}>
              <button 
                style={styles.btn}
                onClick={() => {
                  if (!stateRef.current.isJumping) {
                    stateRef.current.isJumping = true;
                    stateRef.current.jumpStart = Date.now();
                  }
                }}
              >jump</button>
              <button 
                style={styles.btn}
                onClick={() => {
                  if (!stateRef.current.isHeadbanging) {
                    stateRef.current.isHeadbanging = true;
                    stateRef.current.headbangStart = Date.now();
                  }
                }}
              >headbang</button>
            </div>
          </div>
        </div>
        <div style={styles.rightPanel}>
          <div style={styles.cardTitle}>live chat</div>
          <div style={styles.chatBox}>
            {messages.map((m, i) => (
              <div key={i}>
                <strong>{m.user}:</strong> {m.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.profile}>👤 {username}, 20 - swiftie</div>
        <input 
          style={styles.chatInput} 
          placeholder="type message here ..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button style={styles.sendBtn} onClick={handleSend}>send</button>
      </div>
    </div>
  );
}

function getStyles(room) {
  const primary = room.color;
  const accent = room.accent;
  const dark = "#111";
  const light = "#f5d7a3";
  const border = accent;

  return {
    root: { width: "100vw", height: "100vh", background: primary, display: "flex", flexDirection: "column", color: "#fff", fontFamily: "'Pixelify Sans', sans-serif" },
    topBar: { height: 60, background: dark, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" },
    artistBadge: { background: accent, padding: "5px 15px", borderRadius: 30, fontSize: 14, color: "#000", fontWeight: "bold", display: "flex", alignItems: "center", gap: 10 },
    logo: { fontSize: 24, fontWeight: "bold" },
    topIcons: { fontSize: 20, display: "flex", gap: 10 },
    iconBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 20 },
    mainArea: { flex: 1, display: "flex", padding: 20, gap: 20 },
    cardTitle: { fontSize: 14, marginBottom: 10, textTransform: "uppercase" },
    card: { background: accent, color: dark, padding: 15, borderRadius: 15, height: 150 },
    leftPanel: { width: 200 },
    rightPanel: { width: 200 },
    centerStage: { flex: 1, display: "flex", flexDirection: "column", gap: 10 },
    canvas: { flex: 1, background: "#000", borderRadius: 10 },
    stageControls: { display: "flex", justifyContent: "space-between" },
    walkBtns: { display: "flex", gap: 10 },
    actionBtns: { display: "flex", gap: 10 },
    btn: { background: accent, border: "none", borderRadius: 20, padding: "10px 20px", cursor: "pointer" },
    chatBox: { background: accent, color: dark, padding: 15, borderRadius: 15, height: 400 },
    bottomBar: { height: 70, background: dark, display: "flex", alignItems: "center", padding: "0 20px", gap: 20, borderTop: "4px solid " + accent },
    profile: { background: accent, color: dark, padding: "10px 20px", borderRadius: 20 },
    chatInput: { flex: 1, padding: "10px 20px", borderRadius: 30, border: "4px solid " + border, background: light, color: dark, fontSize: 14 },
    sendBtn: { background: light, border: "4px solid " + border, borderRadius: 30, padding: "10px 30px", cursor: "pointer", color: dark, fontWeight: "bold" },
  };
}
