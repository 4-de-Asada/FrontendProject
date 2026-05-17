"use client";

import { useState } from "react";
import styles from "../auth.module.css";
import { solicitarVendedorAction } from "./solicitarActions";
import Link from "next/link";

interface SolicitarVendedorFormProps {
  profile: any;
}

export default function SolicitarVendedorForm({ profile }: SolicitarVendedorFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await solicitarVendedorAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        window.location.href = "/perfil";
      }
    } catch (err) {
      setError("Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className={styles.errorAlert}>
          {error}
        </div>
      )}

      <div>
        <label className={styles.label}>Teléfono (Obligatorio)</label>
        <div className={styles.inputWrapper}>
          <input 
            name="telefono" 
            defaultValue={profile?.telefono || ""} 
            className={styles.input} 
            placeholder="Ej: 5512345678"
            pattern="[0-9]{10}"
            required
          />
        </div>
        {!profile?.telefono && (
          <p className={styles.helpText}>
            Necesitamos un número de contacto de 10 dígitos para validar tu perfil.
          </p>
        )}
      </div>

      <div>
        <label className={styles.label}>Comprobante (Tira de materias / Credencial)</label>
        <div className={styles.inputWrapper}>
          <input 
            name="documento" 
            type="file" 
            className={styles.input} 
            accept="image/*,.pdf"
            required
          />
        </div>
        <p className={styles.helpText}>
          Formatos aceptados: JPG, PNG, PDF. Máximo 5MB. Asegúrate de que tus datos sean legibles.
        </p>
      </div>

      <div className={styles.infoBox}>
        <div className="flex-shrink-0">
          <svg className={styles.infoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">Proceso de Validación</h4>
          <p className="text-xs text-gray-600 mt-1">
            Un administrador revisará tu documento en un plazo de 24-48 horas hábiles.
          </p>
        </div>
      </div>

      <div>
        <button 
          type="submit" 
          className={styles.buttonPrimary} 
          disabled={loading}
        >
          {loading ? "Subiendo Documento..." : "Enviar Solicitud"}
        </button>
      </div>

      <div className="text-center">
        <Link href="/perfil" className={styles.link}>
          Cancelar y volver
        </Link>
      </div>
    </form>
  );
}
