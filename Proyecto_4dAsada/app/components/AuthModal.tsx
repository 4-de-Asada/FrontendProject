"use client";

import Link from "next/link";
import styles from "./AuthModal.module.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "no-auth" | "no-vendedor";
}

export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        
        <div className={styles.content}>
          {type === "no-auth" ? (
            <>
              <h3 className={styles.title}>¡Hola! Para publicar, primero ingresa</h3>
              <p className={styles.text}>
                Necesitas tener una cuenta institucional activa para poder ofrecer tus productos o servicios en la comunidad.
              </p>
              <div className={styles.actions}>
                <Link href="/ingreso" className={styles.btnPrimary} onClick={onClose}>
                  Iniciar Sesión
                </Link>
                <Link href="/registro" className={styles.btnSecondary} onClick={onClose}>
                  Crear Cuenta
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className={styles.title}>Casi listo... Necesitas ser vendedor</h3>
              <p className={styles.text}>
                Tu cuenta actual es de comprador. Para publicar productos, debes completar tu perfil de vendedor con tu teléfono y comprobante.
              </p>
              <div className={styles.actions}>
                <Link href="/actualizar-vendedor" className={styles.btnPrimary} onClick={onClose}>
                  Convertirme en Vendedor
                </Link>
                <button className={styles.btnSecondary} onClick={onClose}>
                  Tal vez más tarde
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
