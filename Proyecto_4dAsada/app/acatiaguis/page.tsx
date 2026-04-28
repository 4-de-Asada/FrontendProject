// Página principal de Acatiaguis: mercado semanal de la comunidad FES Acatlán.
import AcatiaguisHero from "./components/AcatiaguisHero";
import AcatiaguisInfoBar from "./components/AcatiaguisInfoBar";

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

      {/* Contenido futuro de la página */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Aquí irá el contenido del mercado Acatiaguis */}
      </div>
    </div>
  );
}
