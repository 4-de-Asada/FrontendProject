// Página de inicio: landing principal de Garra Deal.
import InicioHero from "./components/InicioHero";

export const metadata = {
  title: "Inicio – Garra Deal",
  description: "La plataforma oficial de compra-venta para la comunidad de FES Acatlán UNAM.",
};

export default function InicioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero de bienvenida */}
      <InicioHero />

      {/* Contenido futuro de la página de inicio */}
    </div>
  );
}
