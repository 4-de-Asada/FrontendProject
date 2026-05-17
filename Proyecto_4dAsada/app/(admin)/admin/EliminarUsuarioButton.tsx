"use client";

import styles from "./admin.module.css";
import { eliminarUsuarioAdminAction } from "@/app/(auth)/AutenticacionActions";

export default function DeleteUserButton({ userId }: { userId: string }) {
  return (
    <button 
      className={`${styles.btnAction} ${styles.btnDanger}`}
      onClick={async () => {
        if (confirm("¿Estás seguro de eliminar permanentemente a este usuario? Esta acción no se puede deshacer.")) {
          await eliminarUsuarioAdminAction(userId);
        }
      }}
    >
      Eliminar
    </button>
  );
}
