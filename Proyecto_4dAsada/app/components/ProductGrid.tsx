"use client";

import ProductCard, { ProductCardProps } from "./ProductCard";

interface ProductGridProps {
  products: ProductCardProps[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.title}
          {...product}
          onClick={() => console.log("Clicked:", product.title)}
        />
      ))}
    </div>
  );
}
