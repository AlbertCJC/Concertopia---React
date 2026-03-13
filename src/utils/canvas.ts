import { TILE, MAP_W, MAP_H } from '../constants';

// ── PIXEL ART DRAWING ─────────────────────────────────────────────────────
export function drawPixelChar(ctx, x, y, gender, outfit, direction = "down", moving = false, frame = 0) {
  const c = outfit.colors;
  const px = Math.floor(x);
  const py = Math.floor(y);

  ctx.save();
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(px + 16, py + 62, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs animation
  const legOff = moving ? (frame % 2 === 0 ? 2 : -2) : 0;

  // Shoes
  ctx.fillStyle = "#333";
  ctx.fillRect(px + 8, py + 56 + legOff, 8, 4);
  ctx.fillRect(px + 20, py + 56 - legOff, 8, 4);

  // Pants/skirt
  ctx.fillStyle = gender === "girl" ? c[0] : c[1] || "#333";
  if (gender === "girl") {
    // skirt
    ctx.beginPath();
    ctx.moveTo(px + 10, py + 44);
    ctx.lineTo(px + 26, py + 44);
    ctx.lineTo(px + 30, py + 56);
    ctx.lineTo(px + 6, py + 56);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillRect(px + 10, py + 44, 6, 14);
    ctx.fillRect(px + 20, py + 44, 6, 14);
  }

  // Body / shirt
  ctx.fillStyle = c[0];
  ctx.fillRect(px + 10, py + 26, 16, 20);

  // Arms
  const armOff = moving ? (frame % 2 === 0 ? -2 : 2) : 0;
  ctx.fillStyle = c[0];
  ctx.fillRect(px + 4, py + 26 + armOff, 6, 14);
  ctx.fillRect(px + 26, py + 26 - armOff, 6, 14);

  // Skin (hands)
  ctx.fillStyle = "#f5cba7";
  ctx.fillRect(px + 4, py + 38 + armOff, 6, 4);
  ctx.fillRect(px + 26, py + 38 - armOff, 6, 4);

  // Neck
  ctx.fillStyle = "#f5cba7";
  ctx.fillRect(px + 14, py + 20, 8, 8);

  // Head
  ctx.fillStyle = "#f5cba7";
  ctx.fillRect(px + 10, py + 6, 16, 16);

  // Hair
  ctx.fillStyle = c[2] === "#fff0" ? "#1a1a2e" : c[2];
  if (gender === "girl") {
    ctx.fillRect(px + 8, py + 4, 20, 6);
    ctx.fillRect(px + 6, py + 6, 4, 14);
    ctx.fillRect(px + 26, py + 6, 4, 14);
  } else {
    ctx.fillRect(px + 10, py + 4, 16, 5);
    ctx.fillRect(px + 10, py + 4, 4, 9);
  }

  // Eyes
  ctx.fillStyle = "#000";
  if (direction !== "up") {
    ctx.fillRect(px + 13, py + 12, 3, 3);
    ctx.fillRect(px + 20, py + 12, 3, 3);
    // Eye shine
    ctx.fillStyle = "#fff";
    ctx.fillRect(px + 14, py + 12, 1, 1);
    ctx.fillRect(px + 21, py + 12, 1, 1);
  }

  // Accessory (accent color detail)
  ctx.fillStyle = c[1] || "#fff";
  ctx.fillRect(px + 12, py + 26, 12, 3); // collar/neckline detail

  ctx.restore();
}

export function drawVenue(ctx, roomColor, accentColor, beat, beatIntensity, playerX, playerY, username, avatar, stageImg, crowdImages) {
  const W = MAP_W * TILE;
  const H = MAP_H * TILE;
  const t = Date.now();

  // ── BACKGROUND: warm dark venue walls ──────────────────────────────────
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, "#1a0e00");
  bgGrad.addColorStop(0.45, "#2a1500");
  bgGrad.addColorStop(1, "#0e0800");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Venue side walls (dark panels)
  ctx.fillStyle = "#120a00";
  ctx.fillRect(0, 0, TILE * 3, H);
  ctx.fillRect(W - TILE * 3, 0, TILE * 3, H);

  // Wall pillars left
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = "#1e1000";
    ctx.fillRect(TILE * 0.5 + i * TILE, TILE * 2, TILE * 0.4, H - TILE * 4);
    // Pillar light strip
    const pAlpha = 0.2 + Math.sin(t / 600 + i) * 0.1;
    ctx.fillStyle = `rgba(255,160,30,${pAlpha})`;
    ctx.fillRect(TILE * 0.5 + i * TILE + 2, TILE * 2, 3, H - TILE * 5);
  }
  // Wall pillars right
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = "#1e1000";
    ctx.fillRect(W - TILE * 1.5 - i * TILE, TILE * 2, TILE * 0.4, H - TILE * 4);
    const pAlpha = 0.2 + Math.sin(t / 600 + i + 1) * 0.1;
    ctx.fillStyle = `rgba(255,160,30,${pAlpha})`;
    ctx.fillRect(W - TILE * 1.5 - i * TILE + 2, TILE * 2, 3, H - TILE * 5);
  }

  // ── STAGE ──────────────────────────────────────────────────────────────
  const stX = TILE * 5;
  const stY = TILE * 0.5;
  const stW = W - TILE * 10;
  const stH = TILE * 5.5;

  if (stageImg && stageImg.complete) {
    // Draw the custom stage image without stretching
    const targetW = stW + TILE * 3;
    const targetH = stH + TILE * 1.5;
    const imgRatio = stageImg.width / stageImg.height;
    const targetRatio = targetW / targetH;
    
    let drawW, drawH;
    if (imgRatio > targetRatio) {
      drawW = targetW;
      drawH = targetW / imgRatio;
    } else {
      drawH = targetH;
      drawW = targetH * imgRatio;
    }
    
    const dx = (stX - TILE * 1.5) + (targetW - drawW) / 2;
    const dy = (stY - TILE * 0.5) + (targetH - drawH) / 2;
    
    ctx.drawImage(stageImg, dx, dy, drawW, drawH);
  } else {
    // Stage platform base — dark wood
    const stageGrad = ctx.createLinearGradient(stX, stY + stH - TILE, stX, stY + stH);
    stageGrad.addColorStop(0, "#3d2200");
    stageGrad.addColorStop(1, "#5a3410");
    ctx.fillStyle = stageGrad;
    ctx.fillRect(stX, stY + stH - TILE * 0.6, stW, TILE * 0.6);

    // Stage back wall
    ctx.fillStyle = "#0f0800";
    ctx.fillRect(stX, stY, stW, stH - TILE * 0.6);

    // ── LARGE LED SCREEN BACKDROP ──────────────────────────────────────────
    const scrX = stX + TILE * 1.5;
    const scrY = stY + TILE * 0.3;
    const scrW = stW - TILE * 3;
    const scrH = stH - TILE * 1.8;

    // Screen base glow
    const scrGlow = ctx.createRadialGradient(scrX + scrW/2, scrY + scrH/2, 0, scrX + scrW/2, scrY + scrH/2, scrW * 0.7);
    const pulse = 0.55 + beatIntensity * 0.2;
    scrGlow.addColorStop(0,   roomColor + Math.round(pulse * 120).toString(16).padStart(2,"0"));
    scrGlow.addColorStop(0.5, accentColor + "44");
    scrGlow.addColorStop(1,   "transparent");
    ctx.fillStyle = scrGlow;
    ctx.fillRect(scrX - TILE, scrY - TILE * 0.5, scrW + TILE * 2, scrH + TILE);

    // Screen surface
    const scrSurf = ctx.createLinearGradient(scrX, scrY, scrX + scrW, scrY + scrH);
    scrSurf.addColorStop(0,   roomColor + "99");
    scrSurf.addColorStop(0.5, accentColor + "66");
    scrSurf.addColorStop(1,   roomColor + "99");
    ctx.fillStyle = scrSurf;
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // Screen scanlines
    for (let sy = scrY; sy < scrY + scrH; sy += 4) {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(scrX, sy, scrW, 2);
    }

    // Screen pixel art logo text
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = `bold ${TILE * 0.55}px 'Pixelify Sans', monospace`;
    ctx.textAlign = "center";
    ctx.fillText("♪ LIVE ♪", scrX + scrW / 2, scrY + scrH * 0.45);
    ctx.font = `${TILE * 0.38}px 'Pixelify Sans', monospace`;
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("ConcerTopia", scrX + scrW / 2, scrY + scrH * 0.72);
    ctx.textAlign = "left";

    // ── SPEAKER TOWERS ─────────────────────────────────────────────────────
    const spkPulse = 1 + Math.sin(t / 130) * 0.04 * beatIntensity;
    [[stX, stY], [stX + stW - TILE * 1.2, stY]].forEach(([sx, sy]) => {
      // Tower body
      ctx.fillStyle = "#1a1000";
      ctx.fillRect(sx, sy, TILE * 1.2, stH - TILE * 0.5);
      ctx.strokeStyle = "#3d2200";
      ctx.lineWidth = 1;
      ctx.strokeRect(sx, sy, TILE * 1.2, stH - TILE * 0.5);
      // Speaker cones (3 stacked)
      for (let ci = 0; ci < 3; ci++) {
        const cCy = sy + TILE * (0.7 + ci * 1.3);
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.arc(sx + TILE * 0.6, cCy, TILE * 0.42 * spkPulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#3d2200";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // cone inner ring
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(sx + TILE * 0.6, cCy, TILE * 0.22, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Light strip on top
      const lAlpha = 0.5 + Math.sin(t / 200) * 0.3;
      ctx.fillStyle = `rgba(255,160,30,${lAlpha})`;
      ctx.fillRect(sx + 2, sy, TILE * 1.2 - 4, 4);
    });

    // ── STAGE LIGHTS / RIGS ────────────────────────────────────────────────
    const rigY = stY + TILE * 0.2;
    // Lighting rig bar
    ctx.fillStyle = "#2a1800";
    ctx.fillRect(stX + TILE * 1.2, rigY, stW - TILE * 2.4, 5);

    const lights = [0.2, 0.37, 0.5, 0.63, 0.8];
    lights.forEach((frac, li) => {
      const lx = stX + (stW - TILE * 2.4) * frac + TILE * 1.2;
      // Light fixture box
      ctx.fillStyle = "#1a1000";
      ctx.fillRect(lx - 5, rigY + 3, 10, 8);
      // Beam downward
      const beamAlpha = (0.12 + beatIntensity * 0.12) * (0.7 + Math.sin(t / 300 + li * 0.9) * 0.3);
      const beamColors = [roomColor, accentColor, "#ffffff", accentColor, roomColor];
      const bc = beamColors[li % beamColors.length];
      const beamGrad = ctx.createLinearGradient(lx, rigY + 11, lx, stY + stH - TILE * 0.5);
      beamGrad.addColorStop(0, bc + Math.round(beamAlpha * 255).toString(16).padStart(2,"0"));
      beamGrad.addColorStop(1, "transparent");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(lx - 2, rigY + 11);
      ctx.lineTo(lx + 2, rigY + 11);
      ctx.lineTo(lx + TILE * 1.5, stY + stH - TILE * 0.5);
      ctx.lineTo(lx - TILE * 1.5, stY + stH - TILE * 0.5);
      ctx.closePath();
      ctx.fill();
      // Light circle glow
      ctx.fillStyle = bc + "cc";
      ctx.beginPath();
      ctx.arc(lx, rigY + 4, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ── PERFORMER on stage ─────────────────────────────────────────────────
  const perfX = stX + stW / 2;
  const perfY = stY + stH - TILE * 1.4;
  const bobY = Math.sin(t / 220) * (3 + beatIntensity * 4);

  // Performer spotlight
  const perfGlow = ctx.createRadialGradient(perfX, perfY, 0, perfX, perfY, TILE * 3.5);
  perfGlow.addColorStop(0, `rgba(255,210,100,${0.28 + beatIntensity * 0.18})`);
  perfGlow.addColorStop(1, "transparent");
  ctx.fillStyle = perfGlow;
  ctx.fillRect(perfX - TILE * 3.5, perfY - TILE * 2, TILE * 7, TILE * 4);

  // Shadow on stage floor
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.beginPath();
  ctx.ellipse(perfX, perfY + 4, 12, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw performer (pixel art – bigger, detailed)
  const ps = 1.4; // scale
  const px = perfX - 20 * ps;
  const py = perfY - 55 * ps + bobY;
  const frame = Math.floor(t / 250) % 4;
  ctx.save();
  // glow
  ctx.shadowBlur = 14 + beatIntensity * 10;
  ctx.shadowColor = "rgba(255,200,80,0.8)";
  // legs
  ctx.fillStyle = "#1a1000";
  const legD = frame < 2 ? 3 : -3;
  ctx.fillRect(px + 11 * ps, py + 40 * ps + legD, 7 * ps, 14 * ps);
  ctx.fillRect(px + 21 * ps, py + 40 * ps - legD, 7 * ps, 14 * ps);
  // shoes
  ctx.fillStyle = "#111";
  ctx.fillRect(px + 9  * ps, py + 52 * ps + legD, 10 * ps, 4 * ps);
  ctx.fillRect(px + 19 * ps, py + 52 * ps - legD, 10 * ps, 4 * ps);
  // body / shirt
  ctx.fillStyle = "#111";
  ctx.fillRect(px + 9 * ps, py + 20 * ps, 22 * ps, 22 * ps);
  // jacket lapels
  ctx.fillStyle = "#333";
  ctx.fillRect(px + 9 * ps, py + 20 * ps, 6 * ps, 18 * ps);
  ctx.fillRect(px + 25 * ps, py + 20 * ps, 6 * ps, 18 * ps);
  // arms
  ctx.fillStyle = "#111";
  ctx.fillRect(px + 1 * ps, py + 20 * ps, 8 * ps, 16 * ps);
  ctx.fillRect(px + 31 * ps, py + 20 * ps, 8 * ps, 16 * ps);
  // mic hand
  ctx.fillStyle = "#f5cba7";
  ctx.fillRect(px + 31 * ps, py + 34 * ps, 8 * ps, 5 * ps);
  // mic
  ctx.fillStyle = "#ccc";
  ctx.fillRect(px + 37 * ps, py + 22 * ps, 4 * ps, 14 * ps);
  ctx.fillStyle = "#888";
  ctx.beginPath();
  ctx.arc(px + 39 * ps, py + 21 * ps, 5 * ps, 0, Math.PI * 2);
  ctx.fill();
  // neck
  ctx.fillStyle = "#f5cba7";
  ctx.fillRect(px + 16 * ps, py + 13 * ps, 8 * ps, 9 * ps);
  // head
  ctx.fillStyle = "#f5cba7";
  ctx.fillRect(px + 12 * ps, py + 2 * ps, 16 * ps, 14 * ps);
  // hair
  ctx.fillStyle = "#111";
  ctx.fillRect(px + 11 * ps, py,           18 * ps, 6 * ps);
  ctx.fillRect(px + 10 * ps, py + 3 * ps,  4 * ps,  8 * ps);
  // eyes
  ctx.fillStyle = "#111";
  ctx.fillRect(px + 14 * ps, py + 7 * ps, 3 * ps, 3 * ps);
  ctx.fillRect(px + 22 * ps, py + 7 * ps, 3 * ps, 3 * ps);
  ctx.fillStyle = "#fff";
  ctx.fillRect(px + 15 * ps, py + 8 * ps, 1 * ps, 1 * ps);
  ctx.fillRect(px + 23 * ps, py + 8 * ps, 1 * ps, 1 * ps);
  ctx.shadowBlur = 0;
  ctx.restore();

  // ── FLOOR & CROWD AREA ────────────────────────────────────────────────
  // Floor gradient — warm amber glow near stage, darker at back
  const floorY = stY + stH;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0,   "rgba(180,90,10,0.45)");
  floorGrad.addColorStop(0.3, "rgba(80,35,5,0.3)");
  floorGrad.addColorStop(1,   "rgba(10,5,0,0.6)");
  ctx.fillStyle = floorGrad;
  ctx.fillRect(TILE * 3, floorY, W - TILE * 6, H - floorY);

  // Floor tile grid (subtle)
  ctx.strokeStyle = "rgba(100,50,0,0.18)";
  ctx.lineWidth = 0.5;
  const tSz = TILE;
  for (let gx = TILE * 3; gx < W - TILE * 3; gx += tSz) {
    ctx.beginPath(); ctx.moveTo(gx, floorY); ctx.lineTo(gx, H); ctx.stroke();
  }
  for (let gy = floorY; gy < H; gy += tSz) {
    ctx.beginPath(); ctx.moveTo(TILE * 3, gy); ctx.lineTo(W - TILE * 3, gy); ctx.stroke();
  }

  // Stage front lip glow
  const lipGrad = ctx.createLinearGradient(stX, floorY, stX, floorY + TILE);
  lipGrad.addColorStop(0, `rgba(255,160,30,${0.45 + beatIntensity * 0.3})`);
  lipGrad.addColorStop(1, "transparent");
  ctx.fillStyle = lipGrad;
  ctx.fillRect(stX, floorY, stW, TILE);

  // Stage step
  ctx.fillStyle = "#3d2200";
  ctx.fillRect(stX + stW * 0.35, floorY, stW * 0.3, TILE * 0.35);

  // ── NPC CROWD ────────────────────────────────────────────────────────
  const crowdRows = [
    { y: floorY + TILE * 0.9,  count: 14, xStart: TILE * 3.5, npcH: 52 },
    { y: floorY + TILE * 2.1,  count: 12, xStart: TILE * 4,   npcH: 44 },
    { y: floorY + TILE * 3.2,  count: 10, xStart: TILE * 4.5, npcH: 38 },
    { y: floorY + TILE * 4.2,  count: 8,  xStart: TILE * 5,   npcH: 32 },
  ];
  crowdRows.forEach((row, ri) => {
    const spacing = (W - row.xStart * 2) / row.count;
    for (let ci = 0; ci < row.count; ci++) {
      const seed = ri * 100 + ci;
      const rng = seededRand(seed);
      rng();
      const spriteIdx = Math.floor(rng() * 14);
      const cx = row.xStart + ci * spacing + spacing * 0.5;
      const nBob = Math.round(Math.sin(t / 220 + seed * 0.7) * (1 + beatIntensity));
      
      // NPC drawing using presets if available
      if (crowdImages && crowdImages.length > 0) {
        const crowdImg = crowdImages[spriteIdx % crowdImages.length];
        if (crowdImg.complete) {
          ctx.drawImage(crowdImg, cx - 16, row.y - 40 + nBob, 32, 50);
        }
      } else {
        // Fallback to simplified crowd drawing
        const skin = ["#f5cba7","#c8956c","#d4a07a","#8d5524"][spriteIdx % 4];
        const shirt = ["#e74c3c","#3b82f6","#4a7c59","#c084fc","#facc15","#ff6eb4"][spriteIdx % 6];
        ctx.fillStyle = skin;
        ctx.fillRect(cx - 3, row.y - 16 + nBob, 7, 7);
        ctx.fillStyle = "#222";
        ctx.fillRect(cx - 3, row.y - 18 + nBob, 7, 4);
        ctx.fillStyle = shirt;
        ctx.fillRect(cx - 4, row.y - 9 + nBob, 9, 9);
        ctx.fillStyle = "#333";
        ctx.fillRect(cx - 3, row.y + nBob, 3, 6);
        ctx.fillRect(cx + 1, row.y + nBob, 3, 6);
      }
    }
  });

  // ── AMBIENT LIGHT BLOOM FROM STAGE ───────────────────────────────────
  const bloom = ctx.createRadialGradient(W / 2, floorY, 0, W / 2, floorY, W * 0.55);
  bloom.addColorStop(0,   `rgba(255,150,30,${0.18 + beatIntensity * 0.1})`);
  bloom.addColorStop(0.6, `rgba(${hexToRgb(roomColor)},0.07)`);
  bloom.addColorStop(1,   "transparent");
  ctx.fillStyle = bloom;
  ctx.fillRect(0, floorY - TILE, W, H - floorY + TILE);
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}
