import { ROOMS } from '../constants';

export function RoomSelectScreen({ username, avatar, onJoin, onLogout }) {
  return (
    <div style={styles.fullscreen}>
      <div style={styles.roomBg}>
        <div style={styles.roomSelectContainer}>
          <div style={styles.topBar}>
            <span style={{ fontFamily: "'Pixelify Sans', monospace", color: "#ff6eb4", fontSize: 14 }}>ConcerTopia</span>
            <button style={styles.btnSmall} onClick={onLogout}>LOGOUT</button>
          </div>
          <h2 style={styles.sectionTitle}>SELECT A CONCERT ROOM</h2>
          <div style={styles.roomGrid}>
            {ROOMS.map(room => (
              <div key={room.id} style={{ ...styles.roomCard, borderColor: room.color + "88" }} onClick={() => onJoin(room)}>
                <div style={{ ...styles.roomCardHeader, background: room.color + "22" }}>
                  <span style={{ fontSize: 40 }}>{room.emoji}</span>
                </div>
                <div style={styles.roomCardBody}>
                  <h3 style={{ ...styles.roomName, color: room.color }}>{room.name}</h3>
                  <p style={styles.roomArtist}>🎤 {room.artist}</p>
                  <button style={{ ...styles.btnPrimary, background: room.color }}>JOIN ROOM</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  fullscreen: { width: "100vw", height: "100vh", overflow: "hidden", fontFamily: "'Pixelify Sans', sans-serif", position: "fixed", top: 0, left: 0 },
  roomBg: { width: "100%", height: "100%", background: "#0a0a1a", overflowY: "auto", position: "relative" },
  roomSelectContainer: { maxWidth: 900, margin: "0 auto", padding: "24px" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 },
  sectionTitle: { color: "#ff6eb4", fontSize: 20, margin: "0 0 8px", textAlign: "center" },
  roomGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20, marginTop: 24 },
  roomCard: { border: "1px solid", borderRadius: 14, overflow: "hidden", cursor: "pointer", background: "rgba(255,255,255,0.03)" },
  roomCardHeader: { padding: "24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  roomCardBody: { padding: "16px" },
  roomName: { fontSize: 14, margin: "0 0 8px" },
  roomArtist: { color: "#ccc", fontSize: 12, margin: "0 0 4px" },
  btnPrimary: { width: "100%", padding: "8px 16px", border: "none", borderRadius: 8, color: "#000", fontSize: 10, cursor: "pointer", fontWeight: "bold" },
  btnSmall: { padding: "6px 12px", background: "transparent", border: "1px solid #ff6eb4", borderRadius: 6, color: "#ff6eb4", fontSize: 10, cursor: "pointer" },
};
