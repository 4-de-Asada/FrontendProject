'use client';

import { useEffect } from 'react';
import styles from "./admin.module.css";
import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.card} style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 className={styles.title} style={{ marginBottom: '1rem' }}>Algo salió mal al cargar el panel</h2>
          <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>
            Hubo un error al conectar con la base de datos. Por favor, intenta de nuevo.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              className={styles.btnHome}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              Reintentar
            </button>
            <Link href="/" className={styles.btnAction}>
              Volver al Inicio
            </Link>
          </div>
          {error.message && (
            <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
              Error: {error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
