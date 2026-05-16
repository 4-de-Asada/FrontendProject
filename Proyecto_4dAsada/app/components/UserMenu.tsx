"use client";

import { useState, useRef, useEffect } from "react";
import { logout } from "../(auth)/actions";
import styles from "./UserMenu.module.css";
import Link from "next/link";

interface UserMenuProps {
  user: any | null;
  profile: any | null;
}

export default function UserMenu({ user, profile }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Determinar color del avatar según el tipo
  const getAvatarColor = () => {
    if (!user) return styles.colorGuest; // Gris
    if (profile?.tipo === "vendedor") return styles.colorSeller; // Morado
    return styles.colorBuyer; // Dorado
  };

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        onClick={toggleMenu}
        aria-label="Menú de usuario"
        className={`${styles.avatarButton} ${getAvatarColor()}`}
      >
        <svg
          className={styles.avatarIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {user ? (
            <>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{profile?.nombre || "Usuario"}</p>
                <p className={styles.userEmail}>{user.email}</p>
                <span className={styles.userBadge}>
                  {profile?.tipo === "vendedor" ? "Vendedor" : "Comprador"}
                </span>
              </div>
              
              <div className={styles.divider} />
              
              <Link 
                href="/perfil" 
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
                Mi Perfil
              </Link>
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }} 
                className={styles.logoutButton}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link 
              href="/ingreso" 
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              Inicia sesión
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
