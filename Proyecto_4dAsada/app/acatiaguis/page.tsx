// Página principal de Acatiaguis: mercado semanal de la comunidad FES Acatlán.
import AcatiaguisHero from "./components/AcatiaguisHero";
import AcatiaguisInfoBar from "./components/AcatiaguisInfoBar";
import AcatiaguisBody from "./components/AcatiaguisBody";

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
    </div>
  );
}
