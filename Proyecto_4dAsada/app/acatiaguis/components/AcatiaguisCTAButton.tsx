// Botón CTA para registro de vendedores en Acatiaguis.
"use client";

import styles from "./AcatiaguisCTA.module.css";

export default function AcatiaguisCTAButton() {
  return (
    <a href="/registro-vendedor" className={styles.btn}>
      Registrarme como Vendedor
    </a>
  );
}
