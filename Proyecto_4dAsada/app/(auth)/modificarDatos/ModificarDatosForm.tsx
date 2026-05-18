"use client";

import { useState } from "react";
import styles from "../auth.module.css";
import { updateUserDataAction } from "./modificarActions";
import Link from "next/link";

interface ModificarDatosFormProps {
  profile: any;
}

export default function ModificarDatosForm({ profile }: ModificarDatosFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await updateUserDataAction(formData);
      if (result?.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: "Datos actualizados correctamente" });
      }
    } catch (error) {
      setMessage({ type: 'error', text: "Ocurrió un error inesperado" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {message && (
        <div className={message.type === 'success' ? styles.successAlert : styles.errorAlert}>
          {message.text}
        </div>
      )}

      <p className={styles.helpText} style={{ marginBottom: '1rem', textAlign: 'center' }}>
        Si no deseas modificar un campo, déjalo tal como está.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={styles.label}>Nombre(s)</label>
          <div className={styles.inputWrapper}>
            <input 
              name="nombre" 
              placeholder={profile?.nombre}
              className={styles.input} 
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>Apellidos</label>
          <div className={styles.inputWrapper}>
            <input 
              name="apellido" 
              placeholder={profile?.apellido}
              className={styles.input} 
            />
          </div>
        </div>
      </div>

      <div>
        <label className={styles.label}>Teléfono</label>
        <div className={styles.inputWrapper}>
          <input 
            name="telefono" 
            placeholder={profile?.telefono || "10 dígitos"}
            className={styles.input} 
            pattern="[0-9]{10}"
          />
        </div>
      </div>

      <div className={styles.infoBox} style={{ marginTop: '1rem' }}>
        <div className="flex-shrink-0">
          <svg className={styles.infoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m11 3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xs text-gray-600">
          <strong>Aviso:</strong> El correo electrónico no se puede modificar por ser tu identidad institucional.
        </p>
      </div>

      <hr className="my-6 border-gray-200" />

      <h3 className="text-sm font-bold text-gray-900 mb-2">Cambiar Contraseña</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={styles.label}>Nueva Contraseña</label>
          <div className={styles.inputWrapper}>
            <input 
              name="password" 
              type="password" 
              className={styles.input} 
              minLength={8}
              placeholder="Opcional"
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>Confirmar</label>
          <div className={styles.inputWrapper}>
            <input 
              name="confirmPassword" 
              type="password" 
              className={styles.input} 
              minLength={8}
              placeholder="Repetir"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button 
          type="submit" 
          className={styles.buttonPrimary} 
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link href="/perfil" className={styles.link}>
          Volver a mi perfil
        </Link>
      </div>
    </form>
  );
}
