"use client";

import { useState, useTransition } from "react";
import styles from "./PerfilBody.module.css";
import { updatePerfil, uploadComprobante } from "../../(auth)/actions";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface PerfilData {
  nombre: string | null;
  apellido: string | null;
  telefono: string | null;
  tipo: string | null;
  email_confirmado: boolean | null;
  url_comprobante: string | null;
  verificado: boolean | null;
  created_at: string | null;
}

interface PerfilBodyProps {
  user: { id: string; email?: string };
  perfil: PerfilData | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(nombre: string | null, apellido: string | null): string {
  const n = nombre?.[0] ?? "";
  const a = apellido?.[0] ?? "";
  return (n + a).toUpperCase() || "?";
}

function getNumCuenta(email?: string): string {
  return email?.split("@")[0] ?? "—";
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function PerfilBody({ user, perfil }: PerfilBodyProps) {
  const [msg, setMsg]     = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [msgDoc, setMsgDoc] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isPendingDoc, startTransitionDoc] = useTransition();

  const esVendedor = perfil?.tipo === "vendedor";
  const verificado = perfil?.verificado === true;
  const tieneComprobante = !!perfil?.url_comprobante;

  // ── Guardar datos personales ──────────────────────────────────────────────

  async function handleGuardar(formData: FormData) {
    startTransition(async () => {
      const result = await updatePerfil(formData);
      setMsg(result);
    });
  }

  // ── Subir comprobante ─────────────────────────────────────────────────────

  async function handleComprobante(formData: FormData) {
    startTransitionDoc(async () => {
      const result = await uploadComprobante(formData);
      setMsgDoc(result);
    });
  }

  return (
    <div className={styles.page}>

      {/* ── Encabezado ─────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={`${styles.avatar} ${esVendedor ? styles.avatarVendedor : styles.avatarComprador}`}>
          {getInitials(perfil?.nombre ?? null, perfil?.apellido ?? null)}
        </div>
        <div className={styles.headerInfo}>
          <h1 className={styles.headerName}>
            {[perfil?.nombre, perfil?.apellido].filter(Boolean).join(" ") || "Usuario"}
          </h1>
          <p className={styles.headerEmail}>{user.email}</p>
          <div className={styles.badgesRow}>
            <span className={`${styles.badge} ${esVendedor ? styles.badgeVendedor : styles.badgeComprador}`}>
              {esVendedor ? "Vendedor" : "Comprador"}
            </span>
            {esVendedor && (
              <span className={`${styles.badge} ${verificado ? styles.badgeVerificado : styles.badgePendiente}`}>
                {verificado ? "✓ Verificado" : "Pendiente de verificación"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Datos de cuenta (solo lectura) ──────────────────────────────────── */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Datos de cuenta</h2>
        <div className={styles.grid2}>
          <div className={styles.readField}>
            <span className={styles.readLabel}>Número de cuenta</span>
            <span className={styles.readValue}>{getNumCuenta(user.email)}</span>
          </div>
          <div className={styles.readField}>
            <span className={styles.readLabel}>Correo institucional</span>
            <span className={styles.readValue}>{user.email}</span>
          </div>
          <div className={styles.readField}>
            <span className={styles.readLabel}>Miembro desde</span>
            <span className={styles.readValue}>
              {perfil?.created_at ? new Date(perfil.created_at).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" }) : "—"}
            </span>
          </div>
          <div className={styles.readField}>
            <span className={styles.readLabel}>Email confirmado</span>
            <span className={styles.readValue}>{perfil?.email_confirmado ? "Sí" : "No"}</span>
          </div>
        </div>
      </div>

      {/* ── Editar datos personales ──────────────────────────────────────────── */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Datos personales</h2>

        {msg && (
          <div className={msg.type === "success" ? styles.alertSuccess : styles.alertError} style={{ marginBottom: "1rem" }}>
            {msg.text}
          </div>
        )}

        <form className={styles.form} action={handleGuardar}>
          <div className={styles.grid2}>
            <div>
              <label htmlFor="nombre" className={styles.label}>Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                defaultValue={perfil?.nombre ?? ""}
                required
                minLength={2}
                maxLength={50}
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="Solo letras y espacios"
                className={styles.input}
              />
            </div>
            <div>
              <label htmlFor="apellido" className={styles.label}>Apellidos</label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                defaultValue={perfil?.apellido ?? ""}
                required
                minLength={2}
                maxLength={100}
                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                title="Solo letras y espacios"
                className={styles.input}
              />
            </div>
          </div>
          <div>
            <label htmlFor="telefono" className={styles.label}>Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              defaultValue={perfil?.telefono ?? ""}
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="10 dígitos"
              className={styles.input}
            />
          </div>
          <div className={styles.btnRow}>
            <button type="submit" className={styles.btnPrimary} disabled={isPending}>
              {isPending ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>

      {/* ── Cuenta de vendedor ───────────────────────────────────────────────── */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Cuenta de vendedor</h2>

        {esVendedor ? (
          <div className={styles.vendedorStatus}>
            <span style={{ fontSize: "1.5rem" }}>{verificado ? "✅" : "⏳"}</span>
            <div>
              <p className={styles.vendedorStatusText}>
                {verificado
                  ? "Tu cuenta está verificada. Puedes publicar productos."
                  : "Tu solicitud está siendo revisada por el equipo de Garra Deal."}
              </p>
              {!verificado && (
                <p className={styles.helpText}>Recibirás una notificación cuando se complete la revisión.</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <p style={{ fontSize: "0.9rem", color: "#374151", marginBottom: "1rem" }}>
              Para publicar productos necesitas ser vendedor verificado. Sube tu tira de materias y el equipo revisará tu solicitud.
            </p>

            {tieneComprobante && (
              <div className={styles.vendedorStatus} style={{ marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.5rem" }}>⏳</span>
                <div>
                  <p className={styles.vendedorStatusText}>Ya tienes un comprobante en revisión.</p>
                  <p className={styles.helpText}>Puedes subir uno nuevo si el anterior fue incorrecto.</p>
                </div>
              </div>
            )}

            {msgDoc && (
              <div className={msgDoc.type === "success" ? styles.alertSuccess : styles.alertError} style={{ marginBottom: "1rem" }}>
                {msgDoc.text}
              </div>
            )}

            <form className={styles.form} action={handleComprobante}>
              <div>
                <label htmlFor="documento" className={styles.label}>
                  Tira de materias <span style={{ color: "#6b7280", fontWeight: 400 }}>(PDF, JPG o PNG)</span>
                </label>
                <input
                  id="documento"
                  name="documento"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className={styles.input}
                />
                <p className={styles.helpText}>Este documento confirma que eres alumno activo de FES Acatlán.</p>
              </div>
              <div className={styles.btnRow}>
                <button type="submit" className={styles.btnSecondary} disabled={isPendingDoc}>
                  {isPendingDoc ? "Subiendo…" : "Solicitar ser vendedor"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

    </div>
  );
}
