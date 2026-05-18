"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./Bienvenida.module.css";

export default function BienvenidaSection() {
  const searchParams = useSearchParams();
  const [notification, setNotification] = useState<{ type: 'login' | 'logout', show: boolean } | null>(null);

  useEffect(() => {
    const loginSuccess = searchParams.get("login") === "success";
    const logoutSuccess = searchParams.get("logout") === "success";

    if (loginSuccess || logoutSuccess) {
      setNotification({ 
        type: loginSuccess ? 'login' : 'logout', 
        show: true 
      });
      
      // Limpiar la URL sin recargar la página
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      // Ocultar después de 4 segundos
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!notification?.show) return null;

  const isLogin = notification.type === 'login';

  return (
    <div className={`${styles.toast} ${isLogin ? styles.loginToast : styles.logoutToast}`}>
      <div className={styles.progress} />
      <div className={styles.icon}>
        {isLogin ? (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{isLogin ? "¡Hola de nuevo! 👋" : "Sesión cerrada"}</p>
        <p className={styles.message}>
          {isLogin 
            ? <>Has iniciado sesión con éxito en <strong>Garra Deal</strong>. ¡Disfruta de la comunidad!</>
            : <>Tu sesión se ha cerrado de forma segura. ¡Esperamos verte pronto!</>
          }
        </p>
      </div>
      <button className={styles.close} onClick={() => setNotification(null)}>
        &times;
      </button>
    </div>
  );
}
