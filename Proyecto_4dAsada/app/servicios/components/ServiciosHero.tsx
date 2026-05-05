import Image from "next/image";
import styles from "./ServiciosHero.module.css";

export default function ServiciosHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textGroup}>
          <h1 className={styles.title}>Servicios</h1>
          <p className={styles.subtitle}>Encuentra expertos de nuestra comunidad para asesorías, tareas y más.</p>
        </div>

        <div className={styles.logoWrapper}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Escudo-UNAM-escalable.svg"
            alt="UNAM"
            width={55}
            height={55}
            className={styles.logo}
          />
        </div>
      </div>
    </section>
  );
}
