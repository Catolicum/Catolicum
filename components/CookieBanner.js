import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(function() {
    var consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1D1D1F", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", zIndex: 1000, flexWrap: "wrap" }}>
      <p style={{ fontSize: 13, color: "#F5F5F7", lineHeight: 1.5, flex: 1, margin: 0 }}>
        Usamos cookies para mostrar publicidad personalizada a traves de Google AdSense.
        Puedes aceptar o rechazar su uso.{" "}
        <a href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "underline" }}>Mas informacion</a>
      </p>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button onClick={reject} style={{ padding: "8px 16px", background: "transparent", border: "0.5px solid #6E6E73", borderRadius: 8, fontSize: 13, color: "#AEAEB2", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
          Rechazar
        </button>
        <button onClick={accept} style={{ padding: "8px 16px", background: "#F5F5F7", border: "none", borderRadius: 8, fontSize: 13, color: "#1D1D1F", cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>
          Aceptar
        </button>
      </div>
    </div>
  );
}