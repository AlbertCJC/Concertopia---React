import { useState } from "react";

export function AuthScreen({ onLogin }) {
  const [view, setView] = useState("login"); // login | signup | forgot | otp | reset
  const [form, setForm] = useState({
    email: "", username: "", password: "", confirm: "",
    otp: ["", "", "", ""],
  });
  const [error, setError] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleLogin = () => {
    if (!form.email.trim()) { setError("Enter your email or username."); return; }
    if (!form.password.trim()) { setError("Enter your password."); return; }
    onLogin({ username: form.email.trim().split("@")[0] || form.email.trim() });
  };

  const handleSignup = () => {
    if (!form.username.trim()) { setError("Enter a username."); return; }
    if (!form.email.trim()) { setError("Enter your email."); return; }
    if (!form.password.trim()) { setError("Enter a password."); return; }
    if (form.password !== form.confirm) { setError("Passwords don't match."); return; }
    onLogin({ username: form.username.trim() });
  };

  const root = {
    width: "100vw", height: "100vh",
    background: "#000",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "32px 24px",
    fontFamily: "'Pixelify Sans', sans-serif",
    color: "#fff",
    position: "fixed",
    top: 0, left: 0,
    overflowY: "auto",
  };

  if (view === "login") return (
    <div style={root}>
      <div style={auth.card}>
        <h2 style={auth.title}>Log In</h2>
        <div style={auth.field}>
          <input style={auth.input} placeholder="Username or Email" value={form.email} onChange={e => { set("email", e.target.value); setError(""); }} onKeyDown={e => e.key === "Enter" && handleLogin()} autoFocus />
        </div>
        <div style={auth.field}>
          <input style={auth.input} type="password" placeholder="Password" value={form.password} onChange={e => { set("password", e.target.value); setError(""); }} onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        {error && <p style={auth.error}>{error}</p>}
        <p style={auth.forgotLink} onClick={() => { setError(""); setView("forgot"); }}>Forgot Password?</p>
        <button style={auth.btn} onClick={handleLogin}>Log In</button>
        <p style={auth.switchRow}>Create an Account? <span style={auth.link} onClick={() => { setError(""); setView("signup"); }}>Sign Up</span></p>
      </div>
    </div>
  );

  if (view === "signup") return (
    <div style={root}>
      <div style={auth.card}>
        <h2 style={auth.title}>Sign Up</h2>
        <div style={auth.field}><input style={auth.input} placeholder="Username" value={form.username} onChange={e => { set("username", e.target.value); setError(""); }} /></div>
        <div style={auth.field}><input style={auth.input} placeholder="Email" value={form.email} onChange={e => { set("email", e.target.value); setError(""); }} /></div>
        <div style={auth.field}><input style={auth.input} type="password" placeholder="Password" value={form.password} onChange={e => { set("password", e.target.value); setError(""); }} /></div>
        <div style={auth.field}><input style={auth.input} type="password" placeholder="Confirm Password" value={form.confirm} onChange={e => { set("confirm", e.target.value); setError(""); }} /></div>
        {error && <p style={auth.error}>{error}</p>}
        <button style={auth.btn} onClick={handleSignup}>Create Account</button>
        <p style={auth.switchRow}>Already have an Account? <span style={auth.link} onClick={() => { setError(""); setView("login"); }}>Log In</span></p>
      </div>
    </div>
  );

  return <div style={root}>View {view} not implemented</div>;
}

const auth = {
  card: { width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 14 },
  title: { fontSize: 30, fontWeight: "bold", color: "#fff", fontFamily: "'Pixelify Sans', sans-serif", margin: "0 0 6px" },
  field: { display: "flex", alignItems: "center", gap: 10, background: "#111", border: "1px solid #2a2a2a", borderRadius: 10, padding: "0 14px" },
  input: { flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 14, padding: "14px 0", fontFamily: "'Pixelify Sans', sans-serif" },
  error: { color: "#f87171", fontSize: 12, margin: "-4px 0", fontFamily: "'Pixelify Sans', sans-serif" },
  forgotLink: { color: "#888", fontSize: 12, cursor: "pointer", textAlign: "right", fontFamily: "'Pixelify Sans', sans-serif", margin: "-6px 0", textDecoration: "underline" },
  btn: { background: "#ff6eb4", border: "none", borderRadius: 10, color: "#fff", fontFamily: "'Pixelify Sans', sans-serif", fontWeight: "bold", fontSize: 15, padding: "15px", cursor: "pointer", width: "100%", marginTop: 2 },
  switchRow: { textAlign: "center", color: "#666", fontSize: 12, fontFamily: "'Pixelify Sans', sans-serif", margin: "4px 0" },
  link: { color: "#ff6eb4", cursor: "pointer", textDecoration: "underline" },
};
