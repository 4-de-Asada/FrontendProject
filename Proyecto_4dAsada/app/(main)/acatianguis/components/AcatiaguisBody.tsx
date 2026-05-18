"use client";

import { useState } from "react";
import ProductCard, { ProductCardProps } from "@/app/components/ui/ProductCard";
import ProductModal from "@/app/components/ui/ProductModal";
import styles from "./AcatiaguisBody.module.css";

interface AcatiaguisBodyProps {
  products: ProductCardProps[];
  categorias: string[];
}

export default function AcatiaguisBody({ products, categorias }: AcatiaguisBodyProps) {
  const [categoria, setCategoria] = useState("Todos");
  const [seleccionado, setSeleccionado] = useState<ProductCardProps | null>(null);

  const visibles =
    categoria === "Todos"
      ? products
      : products.filter((p) => p.category === categoria);

  return (
    <section className={styles.body}>

      {/* ── Filtros ──────────────────────────────────────────────────────────── */}
      <div className={styles.filters}>
        {categorias.map((cat) => (
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
      {visibles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="w-12 h-12 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="text-sm font-medium">No hay puestos disponibles</p>
          <p className="text-xs mt-1">Aún no se han publicado puestos en esta categoría.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {visibles.map((puesto) => (
            <ProductCard
              key={puesto.title}
              {...puesto}
              onClick={() => setSeleccionado(puesto)}
            />
          ))}
        </div>
      )}

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
