"use client";

import { useState } from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import ProductModal from "./ProductModal";

interface ProductGridProps {
  products: ProductCardProps[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selected, setSelected] = useState<ProductCardProps | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.title}
            {...product}
            onClick={() => setSelected(product)}
          />
        ))}
      </div>

      {selected && (
        <ProductModal
          {...selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

