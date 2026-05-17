// Grilla de productos: aplica filtros y ordenamiento, y gestiona el modal de detalle seleccionado.
"use client";

import { useState } from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import ProductModal from "./ProductModal";
import { SortOption } from "../../marketplace/MarketplaceHero";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface ProductGridProps {
  products: ProductCardProps[];
  categoria: string;
  orden: SortOption;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function filtrarYOrdenar(
  productos: ProductCardProps[],
  categoria: string,
  orden: SortOption
): ProductCardProps[] {
  // Filtrar por categoría
  const filtrados =
    categoria === "Todos"
      ? productos
      : productos.filter((p) => p.category === categoria);

  // Ordenar según la opción seleccionada
  return [...filtrados].sort((a, b) => {
    if (orden === "precio-asc") return a.price - b.price;
    if (orden === "precio-desc") return b.price - a.price;
    // "recientes": ordenar por fecha de publicación descendente
    return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
  });
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function ProductGrid({ products, categoria, orden }: ProductGridProps) {
  const [seleccionado, setSeleccionado] = useState<ProductCardProps | null>(null);

  const productosVisibles = filtrarYOrdenar(products, categoria, orden);

  if (productosVisibles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg className="w-12 h-12 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
        <p className="text-sm font-medium">No hay productos disponibles</p>
        <p className="text-xs mt-1">Aún no se han publicado productos en esta categoría.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productosVisibles.map((producto) => (
          <ProductCard
            key={producto.title}
            {...producto}
            onClick={() => setSeleccionado(producto)}
          />
        ))}
      </div>

      {seleccionado && (
        <ProductModal
          {...seleccionado}
          onClose={() => setSeleccionado(null)}
        />
      )}
    </>
  );
}
