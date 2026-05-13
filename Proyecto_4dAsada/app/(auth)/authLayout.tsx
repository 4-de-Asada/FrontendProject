import React from 'react';
import styles from './auth.module.css'; // Ajusta la ruta de los puntos según dónde guardes el archivo

interface AuthLayoutProps {
  children: React.ReactNode;
  subtitle: string;
}

export default function AuthLayout({ children, subtitle }: AuthLayoutProps) {
  return (
    <div className={styles.container}>
      
      {/* Logo y Título (Abstraído) */}
      <div className={styles.header}>
        <div className={styles.logoCircle}>
          <span className={styles.logoText}>G</span>
        </div>
        <h2 className={styles.title}>Garra Deal</h2>
        {/* Aquí pasamos el parámetro dinámico */}
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* Tarjeta Contenedora (Abstraída) */}
      <div className={styles.card}>
        <div className={styles.cardInner}>
          {/* Aquí se inyectará el formulario, los errores y la info */}
          {children}
        </div>
      </div>
      
    </div>
  );
}