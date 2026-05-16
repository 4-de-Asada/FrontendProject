"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./Bienvenida.module.css";

export default function Bienvenida() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      setShow(true);
      
      // Limpiar la URL sin recargar la página
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      // Ocultar después de 5 segundos
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.progress} />
      <div className={styles.icon}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>¡Hola de nuevo! 👋</p>
        <p className={styles.message}>Has iniciado sesión con éxito en <strong>Garra Deal</strong>. ¡Disfruta de la comunidad!</p>
      </div>
      <button className={styles.close} onClick={() => setShow(false)}>
        &times;
      </button>
    </div>
  );
}
