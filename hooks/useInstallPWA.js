// hooks/useInstallPWA.js
// Detecta si la PWA es instalable y expone el prompt de instalación

import { useState, useEffect } from "react";

export function useInstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(function() {
    // Detectar iOS
    var ios = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    setIsIOS(ios);

    // Detectar si ya está instalada
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Capturar el evento de instalación (Android/Chrome)
    function handleBeforeInstall(e) {
      e.preventDefault();
      setInstallPrompt(e);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return function() {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  async function triggerInstall() {
    if (!installPrompt) return false;
    installPrompt.prompt();
    var result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setInstallPrompt(null);
      setIsInstalled(true);
      return true;
    }
    return false;
  }

  // Puede instalar: tiene prompt (Android) o es iOS (instrucciones manuales)
  var canInstall = !!installPrompt || isIOS;

  return { canInstall, isInstalled, isIOS, triggerInstall };
}
