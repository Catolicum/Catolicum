import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent("Contacto desde Catolicum");
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\n\nMensaje:\n${form.mensaje}`
    );
    window.location.href = `mailto:catolicum@outlook.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>Contacto — Catolicum</title>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem", fontFamily: "'DM Sans', sans-serif", color: "#2C2C2A" }}>
        <Link href="/" style={{ fontSize: 13, color: "#888780", textDecoration: "none" }}>← Volver a Catolicum</Link>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 32, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>Contacto</h1>
        <p style={{ fontSize: 14, color: "#888780", marginBottom: "2rem", lineHeight: 1.6 }}>
          ¿Quieres sugerir un libro, reportar un error en un análisis o simplemente escribirnos? Rellena el formulario y te responderemos lo antes posible.
        </p>

        {sent ? (
          <div style={{ background: "#EAF3DE", border: "0.5px solid #5DCAA5", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#085041", marginBottom: 6 }}>Mensaje enviado</p>
            <p style={{ fontSize: 13, color: "#0F6E56" }}>Se ha abierto tu cliente de correo con el mensaje listo para enviar.</p>
            <Link href="/" style={{ display: "inline-block", marginTop: "1rem", fontSize: 13, color: "#085041" }}>← Volver al inicio</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#888780", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Nombre</label>
              <input
                type="text"
                name="nombre"
                required
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                style={{ width: "100%", height: 44, padding: "0 14px", border: "0.5px solid #D3D1C7", borderRadius: 8, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#2C2C2A", background: "#fff" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#888780", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                style={{ width: "100%", height: 44, padding: "0 14px", border: "0.5px solid #D3D1C7", borderRadius: 8, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#2C2C2A", background: "#fff" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#888780", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Mensaje</label>
              <textarea
                name="mensaje"
                required
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                rows={5}
                style={{ width: "100%", padding: "10px 14px", border: "0.5px solid #D3D1C7", borderRadius: 8, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#2C2C2A", background: "#fff", resize: "vertical" }}
              />
            </div>
            <button
              type="submit"
              style={{ height: 44, background: "#2C2C2A", color: "#FAF8F4", border: "none", borderRadius: 8, fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}
            >
              Enviar mensaje
            </button>
          </form>
        )}

        <div style={{ borderTop: "0.5px solid #D3D1C7", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#B4B2A9" }}>
          <Link href="/privacidad" style={{ color: "#B4B2A9", textDecoration: "none" }}>Política de Privacidad</Link>
          <span>·</span>
          <Link href="/acerca" style={{ color: "#B4B2A9", textDecoration: "none" }}>Acerca de</Link>
        </div>
      </div>
    </>
  );
}