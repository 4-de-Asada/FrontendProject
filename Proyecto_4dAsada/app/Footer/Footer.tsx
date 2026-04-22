"use client";
import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-top']}>
        {/* Columna 1: Logo y Descripción */}
        <div className={`${styles['footer-column']} ${styles['logo-column']}`}>
          <div className={styles['logo-group']}>
            <div className={styles['logo-icon-wrapper']}>
              <div className={styles['logo-shape']}>G</div>
            </div>
            <h2 className={styles['company-name']}>Garra Deal</h2>
          </div>
          <p className={styles['company-description']}>
            Plataforma de compra-venta para la comunidad de FES Acatlán UNAM <br/><br/>
            Presidenta con "a" de pendeja, no se te olvide.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos (Módulos independientes) */}
        <div className={`${styles['footer-column']} ${styles['links-column']}`}>
          <h3 className={styles['column-title']}>Enlaces Rápidos</h3>
          <ul className={styles['links-list']}>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/acatiaguis">Acatiaguis</Link></li>
            <li><Link href="/marketplace">Marketplace</Link></li>
            <li><Link href="/servicios">Servicios</Link></li>
          </ul>
        </div>

        {/* Columna 3: Soporte (Módulos de soporte) */}
        <div className={`${styles['footer-column']} ${styles['links-column']}`}>
          <h3 className={styles['column-title']}>Soporte</h3>
          <ul className={styles['links-list']}>
            <li><Link href="/soporte/ayuda">Centro de Ayuda</Link></li>
            <li><Link href="/soporte/terminos">Términos y Condiciones</Link></li>
            <li><Link href="/soporte/privacidad">Política de Privacidad</Link></li>
            <li><Link href="/soporte/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 4: Institucional */}
        <div className={`${styles['footer-column']} ${styles['contact-column']}`}>
          <h3 className={styles['column-title']}>Institucional</h3>
          <p className={styles['address-text']}>
            {/* Link a módulo interno institucional */}
            <Link href="/institucional/unam">
              FES Acatlán - UNAM
            </Link>
            <br />
            <a 
              href="https://maps.app.goo.gl/xKfA3UKtWDJwjAix8" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Av. Alcanfores y San Juan Totoltepec s/n, Santa Cruz Acatlán, Naucalpan, Estado de México
            </a>
          </p>
          <div className={styles['email-wrapper']}>
            <svg
              className={styles['email-icon']}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e4ac2e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a href="mailto:soporte@garradeal.com" className={styles['email-link']}>
              soporte@garradeal.com
            </a>
          </div>
        </div>
      </div>

      <div className={styles['footer-bottom']}>
        <p className={styles['copyright-text']}>
          © 2026 Garra Deal. Todos los derechos reservados.
        </p>
        <p className={styles['powered-by']}>
          Powered by <strong>4 de Asada</strong>
        </p>
      </div>
    </footer>
  );
}