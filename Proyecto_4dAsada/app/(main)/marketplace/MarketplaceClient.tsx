"use client";

import { useState } from "react";
import ProductGrid from "../components/ui/ProductGrid";
import MarketplaceHero, { SortOption } from "./MarketplaceHero";
import { ProductCardProps } from "../components/ui/ProductCard";

interface MarketplaceClientProps {
  products: ProductCardProps[];
  categorias: string[];
}

export default function MarketplaceClient({ products, categorias }: MarketplaceClientProps) {
  const [categoria, setCategoria] = useState("Todos");
  const [orden, setOrden] = useState<SortOption>("recientes");

  const totalVisible =
    categoria === "Todos"
      ? products.length
      : products.filter((p) => p.category === categoria).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHero
        totalProductos={totalVisible}
        categoriaActiva={categoria}
        ordenActivo={orden}
        onCategoriaChange={setCategoria}
        onOrdenChange={setOrden}
        categorias={categorias}
      />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <ProductGrid
          products={products}
          categoria={categoria}
          orden={orden}
        />
      </div>

      <div style={{ background: "linear-gradient(to right, #00093c, #2d0b00)" }} />
    </div>
  );
}
