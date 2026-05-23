import Navbar from "../../components/Navbar";
import ReportesForm from "./ReporteForm";

export default async function ReportesPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 3.5rem)', padding: '2rem 0' }}>
        <ReportesForm />
      </main>
    </>
  );
}
