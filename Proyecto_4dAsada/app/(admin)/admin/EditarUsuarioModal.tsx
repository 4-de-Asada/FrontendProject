"use client";

import { useState } from "react";
import styles from "./admin.module.css";
import { actualizarPerfilUsuarioAction } from "./AdministracionActions";

interface User {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string | null;
}

interface EditUserModalProps {
  user: User;
  onClose: () => void;
}

export default function EditUserModal({ user, onClose }: EditUserModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await actualizarPerfilUsuarioAction(user.id, formData);
      onClose();
    } catch (error) {
      alert("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Editar Usuario</h2>
        <form action={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre</label>
            <input 
              name="nombre" 
              defaultValue={user.nombre} 
              className={styles.input} 
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Apellido</label>
            <input 
              name="apellido" 
              defaultValue={user.apellido} 
              className={styles.input} 
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Teléfono</label>
            <input 
              name="telefono" 
              defaultValue={user.telefono || ""} 
              className={styles.input} 
              placeholder="10 dígitos"
              pattern="[0-9]{10}"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Correo (Solo lectura)</label>
            <input 
              className={styles.input} 
              value="Configurado en Auth" 
              disabled 
            />
          </div>

          <div className={styles.modalActions}>
            <button 
              type="button" 
              onClick={onClose} 
              className={styles.btnCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.btnSave}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
