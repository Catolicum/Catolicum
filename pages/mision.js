import Head from "next/head";
import Link from "next/link";

export default function Mision() {
  return (
    <div>
      <Head>
        <title>Nuestra Mision - Catolicum</title>
        <meta name="description" content="La mision de Catolicum: ayudar a lectores catolicos a elegir libros compatibles con su fe." />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem", fontFamily: "DM Sans, sans-serif", color: "#2C2C2A" }}>
        <Link href="/" style={{ fontSize: 13, color: "#888780", textDecoration: "none" }}>
          Volver a Catolicum
        </Link>
        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: 36, fontWeight: 500, margin: "1.5rem 0 1rem" }}>
          Nuestra Mision
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: "#5F5E5A", marginBottom: "1.5rem" }}>
          Catolicum nacio de una necesidad real: ayudar a los catolicos a navegar el mundo editorial con criterio de fe. Cada ano se publican miles de libros, y no siempre es facil saber cuales son compatibles con la doctrina catolica y cuales no.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: "#5F5E5A", marginBottom: "1.5rem" }}>
          Nuestra mision es sencilla: ofrecer un analisis honesto, documentado y accesible de los libros mas leidos, desde la perspectiva de la fe catolica. No para prohibir ni condenar, sino para orientar.
        </p>
        <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 24, fontWeight: 500, margin: "2rem 0 .75rem" }}>
          Lo que nos guia
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: "#5F5E5A", marginBottom: "1rem" }}>
          Cada analisis se basa en fuentes publicas: el Catecismo de la Iglesia Catolica, enciclicas papales, documentos del Concilio Vaticano II y la tradicion teologica. No somos una institucion eclesiastica ni hablamos en nombre de la Iglesia. Somos catolicos que quieren ayudar a otros catolicos.
        </p>
        <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 24, fontWeight: 500, margin: "2rem 0 .75rem" }}>
          Un proyecto independiente
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: "#5F5E5A", marginBottom: "2rem" }}>
          Catolicum es un proyecto independiente y gratuito. Se financia mediante publicidad no intrusiva y enlaces de afiliado a librerias online. Toda la informacion que ofrecemos se basa en fuentes publicas y el juicio final siempre corresponde al lector.
        </p>
        <div style={{ borderTop: "0.5px solid #D3D1C7", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#B4B2A9" }}>
          <Link href="/privacidad" style={{ color: "#B4B2A9", textDecoration: "none" }}>
            Politica de Privacidad
          </Link>
          <span style={{ color: "#D3D1C7" }}>·</span>
          <Link href="/acerca" style={{ color: "#B4B2A9", textDecoration: "none" }}>
            Acerca de
          </Link>
          <span style={{ color: "#D3D1C7" }}>·</span>
          <Link href="/contacto" style={{ color: "#B4B2A9", textDecoration: "none" }}>
            Contacto
          </Link>
        </div>
      </div>
    </div>
  );
}