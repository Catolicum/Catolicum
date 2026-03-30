// components/InstallBanner.js
// Banner pequeño bajo el header móvil para invitar a instalar la app

import { useState } from "react";
import Link from "next/link";
import { useInstallPWA } from "../hooks/useInstallPWA";

export default function InstallBanner() {
  const { canInstall, isInstalled, isIOS, triggerInstall } = useInstallPWA();
  const [dismissed, setDismissed] = useState(false);
  const [installing, setInstalling] = useState(false);

  // No mostrar si ya instalada, descartada, o no instalable
  if (isInstalled || dismissed || !canInstall) return null;

  async function handleInstall() {
    if (isIOS) return; // iOS va a la página de instrucciones
    setInstalling(true);
    await triggerInstall();
    setInstalling(false);
  }

  return (
    <div style={{ background: "#162D4A", borderBottom: "0.5px solid #2A4E7F", padding: "8px 16px", display: "flex", alignItems: "center", gap: 10 }}>
      {/* Icono */}
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#1F3A5F", border: "0.5px solid #2A4E7F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="12" fill="#2A4E7F"/>
          <rect x="8" y="14" width="21" height="34" rx="3" fill="#16263F"/>
          <rect x="10" y="16" width="17" height="30" rx="2" fill="#8AAFD4"/>
          <rect x="30" y="14" width="21" height="34" rx="3" fill="#B8922A"/>
          <rect x="32" y="16" width="17" height="30" rx="2" fill="#F5E9C0"/>
          <rect x="28" y="12" width="4" height="38" rx="2" fill="#0F1E30"/>
        </svg>
      </div>

      {/* Texto */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#FAF7F0", lineHeight: 1.3 }}>Instala Católicum</div>
        <div style={{ fontSize: 11, color: "#8AAFD4" }}>Accede más rápido desde tu móvil</div>
      </div>

      {/* Botón */}
      {isIOS ? (
        <Link href="/instalar" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ padding: "5px 12px", background: "#E1B955", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "#1F3A5F" }}>
            Cómo instalar
          </div>
        </Link>
      ) : (
        <button
          onClick={handleInstall}
          disabled={installing}
          style={{ padding: "5px 12px", background: "#E1B955", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "#1F3A5F", border: "none", cursor: "pointer", flexShrink: 0, fontFamily: "DM Sans, sans-serif" }}
        >
          {installing ? "..." : "Instalar"}
        </button>
      )}

      {/* Cerrar */}
      <button onClick={function() { setDismissed(true); }} style={{ background: "none", border: "none", color: "#4A6A8A", fontSize: 16, cursor: "pointer", padding: 4, flexShrink: 0, lineHeight: 1 }}>
        ✕
      </button>
    </div>
  );
}
