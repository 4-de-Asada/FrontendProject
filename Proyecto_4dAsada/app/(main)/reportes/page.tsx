"use client";

import { useState, useTransition } from "react";
import { enviarReporteAction } from "./ReportesActions";
import styles from "./reportes.module.css";
import Link from "next/link";

export default function ReportesPage() {
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setMsg(null);
    startTransition(async () => {
      const result = await enviarReporteAction(formData);
      setMsg(result);
      if (result.type === "success") {
        // Opcional: limpiar formulario o redirigir
      }
    });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reportar un Problema</h1>
      <p className={styles.subtitle}>
        Ayúdanos a mantener la comunidad segura reportando conductas inapropiadas o estafas.
      </p>

      {msg && (
        <div className={`${styles.alert} ${msg.type === "success" ? styles.alertSuccess : styles.alertError}`}>
          {msg.text}
        </div>
      )}

      <form action={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="numCuenta" className={styles.label}>
            Número de Cuenta del Vendedor
          </label>
          <input
            id="numCuenta"
            name="numCuenta"
            type="text"
            placeholder="Ej. 318294056"
            required
            pattern="[0-9]{9}"
            title="El número de cuenta debe tener 9 dígitos"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="motivo" className={styles.label}>
            Motivo del Reporte
          </label>
          <select id="motivo" name="motivo" required className={styles.select}>
            <option value="">Selecciona una opción</option>
            <option value="estafa">Estafa / Fraude</option>
            <option value="incumplimiento">Incumplimiento de entrega</option>
            <option value="acoso">Acoso o lenguaje inapropiado</option>
            <option value="no_envio">No envió el producto después del pago</option>
            <option value="otro">Otro (especificar abajo)</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="descripcion" className={styles.label}>
            Descripción Detallada (Opcional)
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Proporciona más detalles sobre lo ocurrido..."
            className={styles.textarea}
          />
        </div>

        <button type="submit" disabled={isPending} className={styles.btnSubmit}>
          {isPending ? "Enviando reporte..." : "Enviar Reporte"}
        </button>
      </form>

      <Link href="/perfil" className={styles.backLink}>
        ← Volver a mi perfil
      </Link>
    </div>
  );
}
