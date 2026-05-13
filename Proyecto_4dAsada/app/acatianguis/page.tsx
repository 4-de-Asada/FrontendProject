// Página principal de Acatiaguis: mercado semanal de la comunidad FES Acatlán.
import AcatiaguisHero from "./components/AcatiaguisHero";
import AcatiaguisInfoBar from "./components/AcatiaguisInfoBar";
import AcatiaguisBody from "./components/AcatiaguisBody";
import AcatiaguisCTAButton from "./components/AcatiaguisCTAButton";

export const metadata = {
  title: "Acatiaguis – Garra Deal",
  description: "Mercado semanal de la comunidad FES Acatlán UNAM.",
};

export default function AcatiaguisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero con título y día de mercado */}
      <AcatiaguisHero />

      {/* Barra de información: ubicación, horario y vendedores */}
      <AcatiaguisInfoBar />

      {/* Cuerpo: filtros y grilla de puestos */}
      <AcatiaguisBody />

      {/* CTA para vendedores + Footer */}
      <div style={{ background: "linear-gradient(to right, #00093c, #2d0b00)" }}>

        {/* Sección de llamada a la acción */}
        <div style={{ textAlign: "center", padding: "3.5rem 1.5rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            ¿Quieres vender en Acatiaguis?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto 1.75rem" }}>
            Regístrate como vendedor y forma parte del mercado semanal más grande de FES Acatlán
          </p>
          <AcatiaguisCTAButton />
        </div>
      </div>
    </div>
  );
}
