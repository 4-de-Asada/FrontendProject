import React from 'react';
import styles from './auth.module.css'; 
import Link from 'next/link';

interface AutenticacionLayoutProps {
  children: React.ReactNode;
  subtitle: string;
}

export default function AutenticacionLayout({ children, subtitle }: AutenticacionLayoutProps) {
  return (
    <div className={styles.container}>
      {/* <Link href="/" className={styles.backHome}> */}
        {/* ← Volver al inicio */}
      {/* </Link> */}
      
      <div className={styles.header}>
        <Link href={"/"} className={styles.backHome}>
          <div className={styles.logoCircle}>
            <img 
            className={styles.logoText}
            src="/Icono.jpeg"
            alt="GarraDeal"
            />
          </div>
          <h2 className={styles.title}>Garra Deal</h2>
        </Link>        
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardInner}>
          {children}
        </div>
      </div>
      
    </div>
  );
}