import { useEffect, useRef, useState } from "react";

export default function BarcodeScanner({ onDetected, onClose }) {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(function() {
    var Quagga;
    async function startScanner() {
      try {
        var module = await import("quagga");
        Quagga = module.default;
        setScanning(true);
        Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              facingMode: "environment",
              width: { min: 300 },
              height: { min: 200 },
            },
          },
          decoder: {
            readers: ["ean_reader", "ean_8_reader", "isbn_reader"],
          },
          locate: true,
        }, function(err) {
          if (err) {
            setError("No se pudo acceder a la camara. Comprueba los permisos.");
            setScanning(false);
            return;
          }
          Quagga.start();
        });

        Quagga.onDetected(function(result) {
          var code = result.codeResult.code;
          if (code && code.length >= 10) {
            Quagga.stop();
            onDetected(code);
          }
        });
      } catch(e) {
        setError("Error al iniciar el escaner.");
        setScanning(false);
      }
    }

    startScanner();

    return function() {
      if (Quagga) {
        try { Quagga.stop(); } catch(e) {}
      }
    };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <p style={{ color: "#F5F5F7", fontSize: 15, fontFamily: "DM Sans, sans-serif" }}>
            Apunta al codigo de barras del libro
          </p>
          <button onClick={onClose} style={{ background: "none", border: "0.5px solid #6E6E73", borderRadius: 8, color: "#F5F5F7", padding: "6px 12px", cursor: "pointer", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>
            Cerrar
          </button>
        </div>

        {error ? (
          <div style={{ background: "#FCEBEB", border: "0.5px solid #F09595", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#791F1F", fontFamily: "DM Sans, sans-serif" }}>{error}</p>
          </div>
        ) : (
          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#000" }}>
            <div ref={scannerRef} style={{ width: "100%", height: 280 }} />
            <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: 2, background: "#1D9E75", transform: "translateY(-50%)", boxShadow: "0 0 8px #1D9E75" }} />
            {!scanning && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ color: "#F5F5F7", fontSize: 14, fontFamily: "DM Sans, sans-serif" }}>Iniciando camara...</p>
              </div>
            )}
          </div>
        )}

        <p style={{ color: "#6E6E73", fontSize: 12, textAlign: "center", marginTop: ".75rem", fontFamily: "DM Sans, sans-serif" }}>
          Compatible con codigos EAN-13 e ISBN
        </p>
      </div>
    </div>
  );
}