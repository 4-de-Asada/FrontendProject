"use client";

import React, { useState } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

/**
 * Componente interno para manejar las secciones colapsables (Accordions)
 */
interface fut {
  titulo: string;
  children: React.ReactNode;
}
/*Esta creara una eqitueta para que pueda hacer las pesta */
const Menus = ({ titulo, children }: fut) => {
  const [abierto, setabierto] = useState(false);

  return (
    <div className={`${styles['footer-section']} ${abierto ? styles['is-active'] : ''}`}>
      <button 
        className={styles['section-header']} 
        onClick={() => setabierto(!abierto)}
        aria-expanded={abierto}
      >
        <h3 className={styles['section-title']}>{titulo}</h3>
        <span className={styles['arrow-icon']}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div className={styles['section-content']}>
        <div className={styles['content-inner']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-main']}>

        {/* Priemra columa*/}
        <div className={styles['footer-brand']}>
          <div className={styles['logo-group']}>
            <div className={styles['logo-icon-wrapper']}>
              <div>
                <img
                className={styles['logo-shape']}
                src="/Icono.jpeg"
                alt='G'
                />
              </div>
            </div>
            <h2 className={styles['company-name']}>Garra Deal</h2>
          </div>
          <p className={styles['company-description']}>
            Plataforma de compra-venta para la comunidad de FES Acatlán UNAM.
          </p>
        </div>

        {/* Secciones de las pestañas*/}

        {/*Segunda columna Enlaces rapidos*/}
        <div className={styles['footer-nav']}>
          <Menus titulo="Enlaces Rápidos">
            <ul className={styles['links-list']}>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/acatiaguis">Acatiaguis</Link></li>
              <li><Link href="/marketplace">Marketplace</Link></li>
              <li><Link href="/servicios">Servicios</Link></li>
            </ul>
          </Menus>


          {/*Tercera columna Enlaces rapidos*/}

          <Menus titulo="Soporte">
            <ul className={styles['links-list']}>
              <li><Link href="/soporte/ayuda">Centro de Ayuda</Link></li>
              <li><Link href="/soporte/terminos">Términos y Condiciones</Link></li>
              <li><Link href="/soporte/privacidad">Política de Privacidad</Link></li>
              <li><Link href="/soporte/contacto">Contacto</Link></li>
            </ul>
          </Menus>

          {/*Tercera columna Enlaces rapidos*/}

          <Menus titulo="Institucional">
            <div className={styles['institutional-content']}>
              <p className={styles['address-text']}>
                <Link href="/institucional/unam" className={styles['link-highlight']}>
                  FES Acatlán - UNAM
                </Link>
                <br />
                <a 
                  href="https://maps.app.goo.gl/xKfA3UKtWDJwjAix8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Av. Alcanfores y San Juan Totoltepec s/n, Naucalpan, Edo. Méx.
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
          </Menus>
        </div>
      </div>

      <div className={styles['footer-bottom']}>
        <div className={styles['footer-bottom-content']}>
          <p className={styles['copyright-text']}>
            © {currentYear} Garra Deal. Todos los derechos reservados.
          </p>
          <p className={styles['powered-by']}>
            Powered by <span>4 de Asada</span>
          </p>
        </div>
      </div>
    </footer>
  );
}