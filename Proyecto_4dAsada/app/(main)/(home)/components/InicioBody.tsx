// Cuerpo de la página de inicio: tarjetas de módulos y productos destacados.
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ProductCard, { ProductCardProps } from "@/app/components/ui/ProductCard";
import ProductModal from "@/app/components/ui/ProductModal";
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

// ─── Pasos ¿Cómo funciona? ───────────────────────────────────────────────────

const STEPS = [
  {
    num: "1",
    name: "Regístrate",
    desc: "Usa tu correo institucional @pcunam.acatlan.unam.mx para crear tu cuenta.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
      </svg>
    ),
  },
  {
    num: "2",
    name: "Explora",
    desc: "Busca productos y ve avisos publicados por la comunidad universitaria.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: "3",
    name: "Contacta",
    desc: "Chatea directamente con vendedores para acordar detalles de entrega.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: "4",
    name: "Intercambia",
    desc: "Realiza la transacción de forma segura en el campus universitario.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function InicioBody({ isLoggedIn }: { isLoggedIn?: boolean }) {
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

      {/* ── ¿Cómo funciona? ───────────────────────────────────────────────── */}
      {!isLoggedIn && (
        <div className={styles.howSection}>
          <h2 className={styles.howTitle}>¿Cómo funciona Garra Deal?</h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <p className={styles.stepName}>{step.num}. {step.name}</p>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
