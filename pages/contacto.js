import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import SidebarClub from "../components/SidebarClub";

export default function Contacto() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  function handleChange(e) {
    setForm(Object.assign({}, form, { [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    var subject = encodeURIComponent("Contacto desde Católicum");
    var body = encodeURIComponent("Nombre: " + form.nombre + "\nEmail: " + form.email + "\n\nMensaje:\n" + form.mensaje);
    window.location.href = "mailto:catolicum@outlook.com?subject=" + subject + "&body=" + body;
    setSent(true);
  }

  var inputStyle = { width: "100%", padding: "10px 14px", border: "0.5px solid #C8D4E0", borderRadius: 8, fontSize: 14, fontFamily: "DM Sans, sans-serif", color: "#1F2937", background: "#FFFFFF" };
  var labelStyle = { fontSize: 12, fontWeight: 500, color: "#1F3A5F", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 };

  const NAV_MOBILE = [
    { label: "Home", href: "/" },
    { label: "Club de lectura", href: "/club" },
    { label: "Libros recomendados", href: "/recomendados" },
    { label: "Misión", href: "/mision" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937" }}>
      <Head>
        <title>Contacto - Católicum</title>
        <meta name="description" content="Contacta con Católicum para sugerir libros o reportar errores." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {!isMobile && <SidebarClub currentPath="/contacto" />}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {isMobile && (
            <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: "#FAF7F0" }}>Católicum</span>
              </Link>
              <button onClick={function() { setMenuOpen(!menuOpen); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
              </button>
            </div>
          )}

          {isMobile && menuOpen && (
            <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: ".5rem 1rem 1rem" }}>
              {NAV_MOBILE.map(function(item) {
                return (<Link key={item.href} href={item.href} onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#8AAFD4", textDecoration: "none", borderBottom: "0.5px solid #2A4E7F" }}>{item.label}</Link>);
              })}
            </div>
          )}

          {/* HERO COMPACTO */}
          <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: isMobile ? "1.25rem 1.25rem 1rem" : "1.5rem 2rem 1.25rem", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 24 : 30, fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2, marginBottom: ".4rem" }}>
              Contacto
            </h1>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 14 : 15, fontStyle: "italic", color: "#E1B955", display: "inline-block", padding: "0 1rem", borderLeft: "2px solid #2A4E7F", borderRight: "2px solid #2A4E7F" }}>
              Sugerir un libro, reportar un error, o simplemente escribirnos
            </p>
          </div>

          <div style={{ maxWidth: 560, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2.5rem 1.5rem", width: "100%" }}>

            {sent ? (
              <div style={{ background: "#EAF3DE", border: "0.5px solid #5DCAA5", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#085041", marginBottom: 6 }}>Mensaje preparado</p>
                <p style={{ fontSize: 13, color: "#0F6E56" }}>Se ha abierto tu cliente de correo con el mensaje listo para enviar.</p>
                <Link href="/" style={{ display: "inline-block", marginTop: "1rem", fontSize: 13, color: "#085041" }}>← Volver al inicio</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input type="text" name="nombre" required value={form.nombre} onChange={handleChange} placeholder="Tu nombre" style={{ ...inputStyle, height: 44 }} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="tu@email.com" style={{ ...inputStyle, height: 44 }} />
                </div>
                <div>
                  <label style={labelStyle}>Mensaje</label>
                  <textarea name="mensaje" required value={form.mensaje} onChange={handleChange} placeholder="Escribe tu mensaje aquí..." rows={5} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <button type="submit" style={{ height: 44, background: "#1F3A5F", color: "#FAF7F0", border: "none", borderRadius: 8, fontSize: 14, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
                  Enviar mensaje
                </button>
              </form>
            )}

            <div style={{ borderTop: "0.5px solid #D8D0BC", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Privacidad</Link>
              <span style={{ color: "#D8D0BC" }}>·</span>
              <Link href="/acerca" style={{ color: "#AEAEB2", textDecoration: "none" }}>Acerca de</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}