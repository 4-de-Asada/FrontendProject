import ServiciosBody from "./components/ServiciosBody";
import ServiciosHero from "./components/ServiciosHero";
import Footer from "../Footer/Footer";

export const metadata = {
  title: "Servicios – Garra Deal",
  description: "Servicios por alumnos de la comunidad FES Acatlán UNAM.",
};

export default function ServiciosPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <ServiciosHero />
            <ServiciosBody />
            <Footer />
        </div>
    );
}