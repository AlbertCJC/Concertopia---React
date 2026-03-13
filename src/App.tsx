/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { AuthScreen } from "./components/AuthScreen";
import { AvatarScreen } from "./components/AvatarScreen";
import { RoomSelectScreen } from "./components/RoomSelectScreen";
import { ConcertRoom } from "./components/ConcertRoom";

export default function App() {
  const [screen, setScreen] = useState("welcome"); // welcome | auth | avatar | rooms | concert
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [room, setRoom] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Pixelify Sans', sans-serif; }
      `}</style>

      {screen === "welcome" && <WelcomeScreen onDone={() => setScreen("auth")} />}
      {screen === "auth" && <AuthScreen onLogin={(u) => { setUser(u); setScreen("avatar"); }} />}
      {screen === "avatar" && <AvatarScreen username={user?.username} onComplete={(av) => { setAvatar(av); setScreen("rooms"); }} />}
      {screen === "rooms" && (
        <RoomSelectScreen
          username={user?.username}
          avatar={avatar}
          onJoin={(r) => { setRoom(r); setScreen("concert"); }}
          onLogout={() => { setUser(null); setAvatar(null); setScreen("welcome"); }}
        />
      )}
      {screen === "concert" && (
        <ConcertRoom
          username={user?.username}
          avatar={avatar}
          room={room}
          onLeave={() => setScreen("rooms")}
        />
      )}
    </div>
  );
}
