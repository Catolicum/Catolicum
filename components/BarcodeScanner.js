import { useEffect, useRef, useState } from "react";

export default function BarcodeScanner({ onDetected, onClose }) {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(function() {
    var Quagga;
    var stopped = false;

    async function startScanner() {
      try {
        var module = await import("quagga");
        Quagga = module.default;

        Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              facingMode: "environment",
              width: { ideal: 640 },
              height: { ideal: 480 },
            },
            area: {
              top: "20%",
              right: "10%",
              left: "10%",
              bottom: "20%",
            },
          },
          decoder: {
            readers: ["ean_reader", "ean_8_reader"],
          },
          locate: true,
          numOfWorkers: 2,
          frequency: 10,
        }, function(err) {
          if (err || stopped) {
            if (!stopped) setError("No se pudo acceder a la camara. Comprueba los permisos del navegador.");
            return;
          }
          Quagga.start();
          setReady(true);

          setTimeout(function() {
            if (!scannerRef.current) return;
            var video = scannerRef.current.querySelector("video");
            if (video) {
              video.style.cssText = "width:100% !important; height:100% !important; object-fit:cover !important; position:absolute !important; top:0 !important; left:0 !important;";
            }
            var canvas = scannerRef.current.querySelectorAll("canvas");
            canvas.forEach(function(c) {
              c.style.cssText = "width:100% !important; height:100% !important; position:absolute !important; top:0 !important; left:0 !important;";
            });
          }, 500);
        });

        Quagga.onDetected(function(result) {
          var code = result.codeResult.code;
          if (code && code.length >= 10 && !stopped) {
            stopped = true;
            Quagga.stop();
            onDetected(code);
          }
        });

      } catch(e) {
        setError("Error al iniciar el escaner. Intenta recargar la pagina.");
      }
    }

    startScanner();

    return function() {
      stopped = true;
      if (Quagga) {
        try { Quagga.stop(); } catch(e) {}
      }
    };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.95)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem" }}>

      <div style={{ width: "100%", maxWidth: 420 }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <p style={{ color: "#F5F5F7", fontSize: 15, fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>
            Escanea el codigo de barras
          </p>
          <button onClick={onClose} style={{ background: "none", border: "0.5px solid #6E6E73", borderRadius: 8, color: "#AEAEB2", padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>
            Cerrar
          </button>
        </div>

        {error ? (
          <div style={{ background: "#1D1D1F", border: "0.5px solid #3A3A3C", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#AEAEB2", fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 }}>{error}</p>
            <button onClick={onClose} style={{ marginTop: "1rem", padding: "8px 20px", background: "#F5F5F7", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
              Volver
            </button>
          </div>
        ) : (
          <div>
            <div style={{ position: "relative", width: "100%", height: 300, borderRadius: 14, overflow: "hidden", background: "#000" }}>
              <div ref={scannerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "20%", left: "10%", right: "10%", bottom: "20%", border: "2px solid #1D9E75", borderRadius: 8 }} />
                <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: 2, background: "#1D9E75", opacity: 0.8, transform: "translateY(-50%)" }} />
              </div>
              {!ready && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
                  <p style={{ color: "#6E6E73", fontSize: 14, fontFamily: "DM Sans, sans-serif" }}>Iniciando camara...</p>
                </div>
              )}
            </div>
            <p style={{ color: "#6E6E73", fontSize: 12, textAlign: "center", marginTop: ".75rem", fontFamily: "DM Sans, sans-serif" }}>
              Centra el codigo de barras dentro del recuadro verde
            </p>
          </div>
        )}
      </div>
    </div>
  );
}