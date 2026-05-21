"use client";

import { useState, useRef, useEffect } from "react";
import { cerrarSesionAction } from "../(auth)/AutenticacionActions";
import styles from "./UserMenu.module.css";
import Link from "next/link";

interface UsuarioMenuProps {
  user: any | null;
  profile: any | null;
}

export default function UsuarioMenu({ user: usuario, profile: perfil }: UsuarioMenuProps) {
  const [estaAbierto, setEstaAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Determinar color del avatar según el tipo
  const obtenerColorAvatar = () => {
    if (!usuario) return styles.colorGuest; // Gris
    if (perfil?.tipo === "admin") return styles.colorAdmin; // Negro
    if (perfil?.tipo === "vendedor") return styles.colorSeller; // Morado
    return styles.colorBuyer; // Dorado
  };

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    function manejarClickFuera(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setEstaAbierto(false);
      }
    }
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  const alternarMenu = () => setEstaAbierto(!estaAbierto);

  const manejarCerrarSesionClick = async () => {
    setEstaAbierto(false);
    await cerrarSesionAction();
  };

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        onClick={alternarMenu}
        aria-label="Menú de usuario"
        className={`${styles.avatarButton} ${obtenerColorAvatar()}`}
      >
        <svg
          className={styles.avatarIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.25}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </button>

      {estaAbierto && (
        <div className={styles.dropdown}>
          {usuario ? (
            <>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{perfil?.nombre || "Usuario"}</p>
                <p className={styles.userEmail}>{usuario.email}</p>
                <span className={`${styles.userBadge} ${perfil?.tipo === 'admin' ? styles.badgeAdmin : ''}`}>
                  {perfil?.tipo === "admin" ? "Administrador" : perfil?.tipo === "vendedor" ? "Vendedor" : "Comprador"}
                </span>
              </div>
              
              <div className={styles.divider} />
              
              {perfil?.tipo === "admin" && (
                <Link 
                  href="/admin" 
                  className={styles.adminLink}
                  onClick={() => setEstaAbierto(false)}
                >
                  Panel de Administración
                </Link>
              )}

              <Link 
                href="/perfil" 
                className={styles.menuItem}
                onClick={() => setEstaAbierto(false)}
              >
                Mi Perfil
              </Link>

              <Link 
                href="/reportes" 
                className={styles.menuItem}
                onClick={() => setEstaAbierto(false)}
              >
                Reportar un Problema
              </Link>
              
              <button 
                onClick={manejarCerrarSesionClick} 
                className={styles.logoutButton}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link 
              href="/ingreso" 
              className={styles.loginLink}
              onClick={() => setEstaAbierto(false)}
            >
              Inicia sesión
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
