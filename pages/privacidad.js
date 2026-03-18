import Head from "next/head";
import Link from "next/link";

export default function Privacidad() {
  return (
    <>
      <Head>
        <title>Política de Privacidad — Catolicum</title>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem", fontFamily: "'DM Sans', sans-serif", color: "#2C2C2A" }}>
        <Link href="/" style={{ fontSize: 13, color: "#888780", textDecoration: "none" }}>← Volver a Catolicum</Link>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 32, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>Política de Privacidad</h1>
        <p style={{ fontSize: 13, color: "#888780", marginBottom: "2rem" }}>Última actualización: enero 2025</p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>1. Quiénes somos</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "1rem" }}>Catolicum (catolicum.vercel.app) es un proyecto independiente que ofrece análisis doctrinales de libros desde la perspectiva católica, basados en fuentes públicas. No está afiliado a la Iglesia Católica ni a ninguna institución religiosa oficial.</p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>2. Datos que recopilamos</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "1rem" }}>Catolicum no recopila datos personales de forma directa. No hay registro de usuarios, ni formularios de contacto, ni almacenamiento de búsquedas individuales.</p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>3. Cookies y publicidad</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "1rem" }}>Esta web utiliza Google AdSense para mostrar publicidad. Google puede usar cookies para personalizar los anuncios que se muestran. Puedes consultar la política de privacidad de Google en: <a href="https://policies.google.com/privacy" style={{ color: "#5F5E5A" }}>policies.google.com/privacy</a>.</p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>4. Servicios de terceros</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "1rem" }}>La web está alojada en Vercel (vercel.com), que puede registrar datos técnicos de acceso como la dirección IP, el navegador y la página visitada, con fines de seguridad y rendimiento.</p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>5. Tus derechos</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "1rem" }}>Al no recopilar datos personales, no es necesario ejercer derechos de acceso, rectificación o supresión. Si tienes alguna pregunta puedes contactarnos a través de GitHub.</p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>6. Cambios en esta política</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "2rem" }}>Nos reservamos el derecho a actualizar esta política. Los cambios se publicarán en esta misma página.</p>

        <div style={{ borderTop: "0.5px solid #D3D1C7", paddingTop: "1rem", fontSize: 12, color: "#B4B2A9" }}>
          Catolicum — Proyecto independiente, no afiliado a la Iglesia Católica.
        </div>
      </div>
    </>
  );
}