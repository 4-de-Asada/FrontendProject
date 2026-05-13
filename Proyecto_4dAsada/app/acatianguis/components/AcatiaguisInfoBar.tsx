// Barra de información del mercado Acatiaguis: ubicación, horario y vendedores activos.
import styles from "./AcatiaguisInfoBar.module.css";

export default function AcatiaguisInfoBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>

        {/* Ubicación */}
        <span className={styles.item}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" />
            <circle cx="12" cy="8" r="2" />
          </svg>
          Explanada Central, FES Acatlán
        </span>

        <span className={styles.divider} aria-hidden="true" />

        {/* Horario */}
        <span className={styles.item}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 7v5l3 3" />
          </svg>
          9:00 AM – 5:00 PM
        </span>

        <span className={styles.divider} aria-hidden="true" />

        {/* Vendedores activos */}
        <span className={styles.item}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          6 vendedores activos
        </span>

      </div>
    </div>
  );
}
