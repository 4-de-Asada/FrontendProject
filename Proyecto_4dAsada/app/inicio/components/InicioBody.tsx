// Cuerpo de la página de inicio: tarjetas de módulos y productos destacados.
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ProductCard, { ProductCardProps } from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import styles from "./InicioBody.module.css";

// ─── Módulos del sitio ────────────────────────────────────────────────────────

const MODULES = [
  {
    title: "Acatiaguis",
    badge: "Mercado Semanal",
    badgeClass: styles.badgeYellow,
    description: "Descubre el mercado semanal con vendedores locales, comida, artesanías y más.",
    link: "/acatiaguis",
    linkLabel: "Ver productos",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=70",
    imgAlt: "Mercado Acatiaguis",
  },
  {
    title: "Marketplace",
    badge: "Permanente",
    badgeClass: styles.badgeBlue,
    description: "Compra y vende productos de segunda mano: libros, electrónica, ropa y más.",
    link: "/",
    linkLabel: "Explorar productos",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=70",
    imgAlt: "Marketplace electrónica",
  },
  {
    title: "Servicios",
    badge: "Profesionales",
    badgeClass: styles.badgeRed,
    description: "Encuentra asesorías, diseño, traducción y servicios profesionales.",
    link: "/servicios",
    linkLabel: "Ver servicios",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=70",
    imgAlt: "Servicios profesionales",
  },
];

// ─── Productos destacados ──────────────────────────────────────────────────────

const DESTACADOS: ProductCardProps[] = [
  {
    imageSrc: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80",
    imageAlt: "iPhone 12 Pro",
    title: "iPhone 12 Pro 128GB",
    price: 8500,
    description: "iPhone en excelente estado, batería al 89%, incluye cargador original y funda. Sin detalles estéticos.",
    sellerName: "Carlos Mendoza",
    rating: 4.8,
    category: "Electrónica",
    publishedAt: "2024-01-14",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80",
    imageAlt: "Cálculo diferencial",
    title: "Cálculo Diferencial e Integral",
    price: 350,
    description: "Libro en buen estado, sin rayaduras ni anotaciones. Ideal para estudiantes de ingeniería.",
    sellerName: "María López",
    rating: 4.5,
    category: "Libros",
    publishedAt: "2024-01-12",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    imageAlt: "Mochila North Face",
    title: "Mochila North Face Original",
    price: 650,
    description: "Mochila resistente al agua, múltiples compartimentos, perfecta para laptop de 15\".",
    sellerName: "Jorge Ramírez",
    rating: 4.6,
    category: "Accesorios",
    publishedAt: "2024-01-10",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function InicioBody() {
  const [seleccionado, setSeleccionado] = useState<ProductCardProps | null>(null);

  return (
    <section className={styles.body}>

      {/* ── Tarjetas de módulos ───────────────────────────────────────────── */}
      <div className={styles.modulesGrid}>
        {MODULES.map((mod) => (
          <div key={mod.title} className={styles.moduleCard}>
            <Image
              src={mod.img}
              alt={mod.imgAlt}
              width={600}
              height={140}
              className={styles.moduleImg}
            />
            <div className={styles.moduleBody}>
              <div className={styles.moduleMeta}>
                <h2 className={styles.moduleTitle}>{mod.title}</h2>
                <span className={`${styles.moduleBadge} ${mod.badgeClass}`}>
                  {mod.badge}
                </span>
              </div>
              <p className={styles.moduleDesc}>{mod.description}</p>
              <Link href={mod.link} className={styles.moduleLink}>
                {mod.linkLabel} →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Productos Destacados ──────────────────────────────────────────── */}
      <div className={styles.featuredHeader}>
        <h2 className={styles.featuredTitle}>Productos Destacados</h2>
        <Link href="/" className={styles.verTodos}>
          Ver todos →
        </Link>
      </div>

      <div className={styles.featuredGrid}>
        {DESTACADOS.map((producto) => (
          <ProductCard
            key={producto.title}
            {...producto}
            onClick={() => setSeleccionado(producto)}
          />
        ))}
      </div>

      {/* Modal de detalle */}
      {seleccionado && (
        <ProductModal
          {...seleccionado}
          onClose={() => setSeleccionado(null)}
        />
      )}
    </section>
  );
}
