// Grilla de productos: aplica filtros y ordenamiento, y gestiona el modal de detalle seleccionado.
"use client";

import { useState } from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import ProductModal from "./ProductModal";
import { Categoria, SortOption } from "./MarketplaceHero";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface ProductGridProps {
  products: ProductCardProps[];
  categoria: Categoria;
  orden: SortOption;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function filtrarYOrdenar(
  productos: ProductCardProps[],
  categoria: Categoria,
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
