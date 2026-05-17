// Cuerpo de la página Acatiaguis: filtros por categoría y grilla de puestos del mercado.
"use client";

import { useState } from "react";
import ProductCard, { ProductCardProps } from "@/app/components/ui/ProductCard";
import ProductModal from "@/app/components/ui/ProductModal";
import styles from "./AcatiaguisBody.module.css";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Categoria = "Todos" | "Comida" | "Accesorios" | "Ropa" | "Libros" | "Plantas";

const CATEGORIAS: Categoria[] = ["Todos", "Comida", "Accesorios", "Ropa", "Libros", "Plantas"];

// ─── Datos de puestos ─────────────────────────────────────────────────────────

const puestos: ProductCardProps[] = [
  {
    imageSrc: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
    imageAlt: "Tacos de Canasta",
    title: "Tacos de Canasta",
    price: 35,
    description: "Tacos de papa, frijol y chicharrón. Preparados en el momento, receta tradicional.",
    sellerName: "Doña Martha",
    rating: 5,
    category: "Puesto 12, Zona A",
    publishedAt: "2024-01-14",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    imageAlt: "Aretes artesanales",
    title: "Aretes Artesanales de Plata",
    price: 180,
    description: "Aretes hechos a mano con plata .925, diseños únicos inspirados en cultura mexicana.",
    sellerName: "Artesanías Luna",
    rating: 4.9,
    category: "Puesto 5, Zona B",
    publishedAt: "2024-01-13",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
    imageAlt: "Playera universitaria FES",
    title: "Playera Universitaria FES",
    price: 150,
    description: "Playera 100% algodón con diseño exclusivo de FES Acatlán. Tallas S a XL.",
    sellerName: "Tienda Puma",
    rating: 4.7,
    category: "Puesto 8, Zona A",
    publishedAt: "2024-01-12",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
    imageAlt: "Apuntes de Derecho",
    title: "Apuntes de Derecho Completos",
    price: 80,
    description: "Apuntes completos del semestre, incluye resúmenes y casos prácticos.",
    sellerName: "Estudiantes de Derecho",
    rating: 4.5,
    category: "Puesto 15, Zona C",
    publishedAt: "2024-01-11",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80",
    imageAlt: "Suculentas decorativas",
    title: "Suculentas Decorativas",
    price: 45,
    description: "Suculentas variadas en macetas de barro. Perfectas para decorar tu espacio.",
    sellerName: "Jardín Verde",
    rating: 5,
    category: "Puesto 3, Zona B",
    publishedAt: "2024-01-10",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80",
    imageAlt: "Tortas de Chilaquiles",
    title: "Tortas de Chilaquiles",
    price: 50,
    description: "Tortas preparadas al momento con chilaquiles verdes o rojos, pollo y queso.",
    sellerName: "Tortas El Puma",
    rating: 4.8,
    category: "Puesto 1, Zona A",
    publishedAt: "2024-01-09",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80",
    imageAlt: "Pulseras de hilo",
    title: "Pulseras de Hilo Artesanales",
    price: 25,
    description: "Pulseras tejidas a mano con tu nombre o diseño favorito. Colores personalizados.",
    sellerName: "Hilos y Colores",
    rating: 4.9,
    category: "Puesto 7, Zona B",
    publishedAt: "2024-01-08",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
    imageAlt: "Sudadera FES Acatlán",
    title: "Sudadera FES Acatlán",
    price: 320,
    description: "Sudadera con capucha, bordado de alta calidad. Tela gruesa ideal para el frío.",
    sellerName: "Tienda Puma",
    rating: 4.7,
    category: "Puesto 8, Zona A",
    publishedAt: "2024-01-07",
  },
];

// ─── Mapa de categoría real → valor del filtro ────────────────────────────────

const CATEGORIA_MAP: Record<string, Categoria> = {
  "Puesto 12, Zona A": "Comida",
  "Puesto 5, Zona B":  "Accesorios",
  "Puesto 8, Zona A":  "Ropa",
  "Puesto 15, Zona C": "Libros",
  "Puesto 3, Zona B":  "Plantas",
  "Puesto 1, Zona A":  "Comida",
  "Puesto 7, Zona B":  "Accesorios",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AcatiaguisBody() {
  const [categoria, setCategoria] = useState<Categoria>("Todos");
  const [seleccionado, setSeleccionado] = useState<ProductCardProps | null>(null);

  // Filtrar por categoría real
  const visibles =
    categoria === "Todos"
      ? puestos
      : puestos.filter((p) => CATEGORIA_MAP[p.category] === categoria);

  return (
    <section className={styles.body}>

      {/* ── Filtros ──────────────────────────────────────────────────────────── */}
      <div className={styles.filters}>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={[styles.filterBtn, categoria === cat ? styles.active : ""].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Grilla ───────────────────────────────────────────────────────────── */}
      <div className={styles.grid}>
        {visibles.map((puesto) => (
          <ProductCard
            key={puesto.title}
            {...puesto}
            onClick={() => setSeleccionado(puesto)}
          />
        ))}
      </div>

      {/* ── Modal de detalle ─────────────────────────────────────────────────── */}
      {seleccionado && (
        <ProductModal
          {...seleccionado}
          onClose={() => setSeleccionado(null)}
        />
      )}
    </section>
  );
}
