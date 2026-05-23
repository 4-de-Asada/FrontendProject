import Link from "next/link";
import Navbar from "../../components/Navbar";

export default async function BaneadoPage() {
  return (
    <>
      <Navbar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 3.5rem)',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '3rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ color: '#0f172a', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Cuenta Suspendida
          </h1>
          <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
            Tu cuenta ha sido suspendida debido a múltiples reportes por parte de la comunidad. 
            Si crees que esto es un error, por favor contacta al administrador de Garra Deal.
          </p>
          <Link 
            href="/" 
            style={{
              display: 'inline-block',
              backgroundColor: '#041E3A',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </>
  );
}
