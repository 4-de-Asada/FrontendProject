"use client";

import styles from "./admin.module.css";
import { actualizarRolUsuarioAction } from "./AdministracionActions";

interface RoleSelectorProps {
  userId: string;
  currentRole: string;
}

export default function RolSelector({ userId, currentRole }: RoleSelectorProps) {
  return (
    <form action={(formData) => actualizarRolUsuarioAction(userId, formData)}>
      <select 
        name="tipo" 
        defaultValue={currentRole} 
        className={styles.select}
        onChange={(e) => e.target.form?.requestSubmit()}
      >
        <option value="comprador">Comprador</option>
        <option value="vendedor">Vendedor</option>
        <option value="admin">Admin</option>
      </select>
    </form>
  );
}
