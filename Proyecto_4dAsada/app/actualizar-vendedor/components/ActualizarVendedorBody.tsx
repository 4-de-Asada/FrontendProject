"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { uploadComprobante } from "../../(auth)/actions";
import styles from "./ActualizarVendedorBody.module.css";

interface Props {
  perfil: { nombre: string | null; tipo: string | null; url_comprobante: string | null; verificado: boolean | null } | null;
}

export default function ActualizarVendedorBody({ perfil }: Props) {
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const tieneComprobante = !!perfil?.url_comprobante;

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await uploadComprobante(formData);
      setMsg(result);
    });
  }

  return (
    <div className={styles.container}>
      {/* ── Encabezado ─────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.logoCircle}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#041E3A" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className={styles.title}>Convertirme en Vendedor</h1>
        <p className={styles.subtitle}>
          Hola{perfil?.nombre ? `, ${perfil.nombre}` : ""}. Verifica tu identidad para empezar a publicar.
        </p>
      </div>

      {/* ── Tarjeta ────────────────────────────────────────────────────────── */}
      <div className={styles.card}>

        {/* Pasos informativos */}
        <div className={styles.steps}>
          {[
            { n: "1", text: "Sube tu tira de materias o credencial FES Acatlán." },
            { n: "2", text: "El equipo revisa tu solicitud en 24–48 horas." },
            { n: "3", text: "Te activamos como vendedor y ya puedes publicar." },
          ].map((s) => (
            <div key={s.n} className={styles.step}>
              <span className={styles.stepNum}>{s.n}</span>
              <span className={styles.stepText}>{s.text}</span>
            </div>
          ))}
        </div>

        <hr className={styles.divider} />

        {/* Estado si ya tiene comprobante */}
        {tieneComprobante && !msg && (
          <div className={styles.pendingBox}>
            <span style={{ fontSize: "1.4rem" }}>⏳</span>
            <div>
              <p className={styles.pendingTitle}>Solicitud en revisión</p>
              <p className={styles.pendingText}>Ya enviaste un comprobante. Puedes reemplazarlo si fue incorrecto.</p>
            </div>
          </div>
        )}

        {/* Alerta de resultado */}
        {msg && (
          <div className={msg.type === "success" ? styles.alertSuccess : styles.alertError}>
            {msg.text}
            {msg.type === "success" && (
              <Link href="/perfil" className={styles.linkPerfil}>Ver mi perfil →</Link>
            )}
          </div>
        )}

        {/* Formulario */}
        {msg?.type !== "success" && (
          <form className={styles.form} action={handleSubmit}>
            <div>
              <label htmlFor="documento" className={styles.label}>
                Comprobante de alumno activo
                <span className={styles.labelHint}> (PDF, JPG o PNG)</span>
              </label>
              <input
                id="documento"
                name="documento"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                className={styles.input}
              />
              <p className={styles.helpText}>
                Puede ser tu tira de materias o credencial FES Acatlán vigente.
              </p>
            </div>

            <button type="submit" className={styles.btnPrimary} disabled={isPending}>
              {isPending ? "Enviando…" : tieneComprobante ? "Reemplazar comprobante" : "Enviar solicitud"}
            </button>
          </form>
        )}

        <p className={styles.backLink}>
          <Link href="/">← Volver</Link>
        </p>
      </div>
    </div>
  );
}
