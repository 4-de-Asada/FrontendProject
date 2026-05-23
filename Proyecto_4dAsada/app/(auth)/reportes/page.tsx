import Navbar from "../../components/Navbar";
import ReportesForm from "./ReporteForm";

export default async function ReportesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'linear-gradient(135deg, #00093c 0%, #1a0600 100%)', minHeight: 'calc(100vh - 3.5rem)', padding: '2rem 0' }}>
        <ReportesForm />
      </main>
    </>
  );
}
