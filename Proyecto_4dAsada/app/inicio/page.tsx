// Página de inicio: landing principal de Garra Deal.
import InicioHero from "./components/InicioHero";
import InicioBody from "./components/InicioBody";
import Footer from "../Footer/Footer";

export const metadata = {
  // title: "Inicio – Garra Deal",
  title: "Inicio – Garra GARRONA",
  description: "La plataforma oficial de compra-venta para la comunidad de FES Acatlán UNAM.",
};

export default function InicioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero de bienvenida */}
      <InicioHero />

      {/* Cuerpo: módulos y productos destacados */}
      <InicioBody />

      {/* CTA + Footer */}
      <div style={{ background: "linear-gradient(to right, #00093c, #2d0b00)" }}>

        {/* Sección ¿Listo para comenzar? */}
        <div style={{ textAlign: "center", padding: "3.5rem 1.5rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            ¿Listo para comenzar?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto 1.75rem" }}>
            Únete a la comunidad de Garra Deal y descubre todo lo que tus compañeros tienen para ofrecer
          </p>
          <a
            href="/registro"
            style={{
              display: "inline-block",
              padding: "0.7rem 2rem",
              background: "#e4ac2e",
              border: "2px solid #e4ac2e",
              color: "#00093c",
              borderRadius: "0.4rem",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            Crear Cuenta Gratis
          </a>
        </div>

        {/* Footer compartido */}
        <Footer />
      </div>
    </div>
  );
}
