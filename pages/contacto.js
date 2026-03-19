import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14">
    <rect x="5.5" y="1" width="3" height="12" rx="1.5" fill="#F5F5F7"/>
    <rect x="1" y="4.5" width="12" height="3" rx="1.5" fill="#F5F5F7"/>
  </svg>
);

const NAV = [
  { label: "Home", href: "/" },
  { label: "Mision", href: "/mision" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Contacto", href: "/contacto" },
];

export default function Contacto() {
  var formInit = { nombre: "", email: "", mensaje: "" };
  var [sent, setSent] = useState(false);
  var [form, setForm] = useState(formInit);

  function handleChange(e) {
    setForm(Object.assign({}, form, { [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    var subject = encodeURIComponent("Contacto desde Catolicum");
    var body = encodeURIComponent("Nombre: " + form.nombre + "\nEmail: " + form.email + "\n\nMensaje:\n" + form.mensaje);
    window.location.href = "mailto:catolicum@outlook.com?subject=" + subject + "&body=" + body;
    setSent(true);
  }

  var inputStyle = { width: "100%", padding: "10px 14px", border: "0.5px solid #D1D1D6", borderRadius: 8, fontSize: 14, fontFamily: "DM Sans, sans-serif", color: "#1D1D1F", background: "#FFFFFF" };
  var labelStyle = { fontSize: 12, fontWeight: 500, color: "#6E6E73", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "DM Sans, sans-serif", color: "#1D1D1F" }}>
      <Head>
        <title>Contacto - Catolicum</title>
        <meta name="description" content="Contacta con Catolicum para sugerir libros o reportar errores." />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        <aside style={{ width: 220, flexShrink: 0, background: "#FFFFFF", borderRight: "0.5px solid #D1D1D6", display: "flex", flexDirection: "column", padding: "1.5rem 1rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem", cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CrossIcon />
              </div>
              <div style={{ width: 1, height: 28, background: "#D1D1D6", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "EB Garamond, serif", fontSize: 19, fontWeight: 500, color: "#1D1D1F", lineHeight: 1.1 }}>Catolicum</div>
                <div style={{ fontFamily: "EB Garamond, serif", fontSize: 11, fontStyle: "italic", color: "#6E6E73", marginTop: 2 }}>La Libreria Catolica</div>
              </div>
            </div>
          </Link>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
            {NAV.map(function(item) {
              return (
                <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", padding: "9px 10px", borderRadius: 8, fontSize: 14, color: "#3A3A3C", textDecoration: "none" }}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: "1rem", borderTop: "0.5px solid #D1D1D6" }}>
            <Link href="/privacidad" style={{ fontSize: 11, color: "#AEAEB2", textDecoration: "none", padding: "3px 0" }}>Privacidad</Link>
            <Link href="/acerca" style={{ fontSize: 11, color: "#AEAEB2", textDecoration: "none", padding: "3px 0" }}>Acerca de</Link>
          </div>
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ maxWidth: 560, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
            <Link href="/" style={{ fontSize: 13, color: "#6E6E73", textDecoration: "none" }}>← Volver</Link>
            <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: 36, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>Contacto</h1>
            <p style={{ fontSize: 14, color: "#6E6E73", marginBottom: "2rem", lineHeight: 1.6 }}>
              Sugerir un libro, reportar un error en un analisis o simplemente escribirnos.
            </p>

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
                  <textarea name="mensaje" required value={form.mensaje} onChange={handleChange} placeholder="Escribe tu mensaje aqui..." rows={5} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <button type="submit" style={{ height: 44, background: "#1D1D1F", color: "#F5F5F7", border: "none", borderRadius: 8, fontSize: 14, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
                  Enviar mensaje
                </button>
              </form>
            )}

            <div style={{ borderTop: "0.5px solid #D1D1D6", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Privacidad</Link>
              <span>·</span>
              <Link href="/acerca" style={{ color: "#AEAEB2", textDecoration: "none" }}>Acerca de</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}