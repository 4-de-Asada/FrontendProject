// Hero de la página de inicio: bienvenida, descripción y acciones principales.
import Link from "next/link";
import styles from "./InicioHero.module.css";

export default function InicioHero() {
  return (
    <section className={styles.hero}>
      {/* Imagen de fondo con overlay */}
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.content}>
        {/* Título */}
        <h1 className={styles.title}>
          Bienvenido a{" "}
          <span className={styles.titleAccent}>Garra Deal</span>
        </h1>

        {/* Subtítulo */}
        <p className={styles.subtitle}>
          La plataforma oficial de compra-venta para la comunidad de FES Acatlán.
          <br />
          Conecta con estudiantes, compra y vende de forma segura dentro del campus.
        </p>

        {/* Botones */}
        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary}>
            Explorar Marketplace
          </Link>
          <Link href="/publicar" className={styles.btnSecondary}>
            Publicar Producto
          </Link>
        </div>
      </div>
    </section>
  );
}
