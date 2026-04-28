// Hero de la página Acatiaguis: muestra título, subtítulo y el día de mercado.
import styles from "./AcatiaguisHero.module.css";

// ─── Componente ──────────────────────────────────────────────────────────────

export default function AcatiaguisHero() {

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        {/* Texto principal */}
        <div className={styles.textGroup}>
          <h1 className={styles.title}>Acatiaguis</h1>
          <p className={styles.subtitle}>Mercado semanal de la comunidad FES Acatlán</p>
        </div>

        {/* Badge del día */}
        <div className={styles.badge}>
          <span className={styles.badgeDay}>Jueves</span>
          <span className={styles.badgeLabel}>Día de mercado</span>
        </div>
      </div>
    </section>
  );
}
