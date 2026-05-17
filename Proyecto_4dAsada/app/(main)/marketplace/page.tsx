// Página principal del marketplace: gestiona el estado de filtros y ordena los productos de prueba.
"use client";

import { useState } from "react";
import ProductGrid from "@/app/components/ui/ProductGrid";
import MarketplaceHero, { Categoria, SortOption } from "./MarketplaceHero";
import { ProductCardProps } from "@/app/components/ui/ProductCard";

// ─── Datos de prueba ──────────────────────────────────────────────────────────

const productos: ProductCardProps[] = [
  {
    imageSrc: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80",
    imageAlt: "iPhone 12 Pro",
    title: "iPhone 12 Pro 128GB",
    price: 8500,
    description: "iPhone en excelente estado, batería al 89%, incluye cargador original y funda. Sin detalles estéticos.",
    sellerName: "Carlos Mendoza",
    sellerRating: 3.5,
    sellerReviewCount: 23,
    rating: 4.8,
    category: "Electrónica",
    publishedAt: "2024-01-14",
    whatsappNumber: "521234567890",
    reviewCount: 2,
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80",
    imageAlt: "Libro de cálculo",
    title: "Cálculo: Trascendentes Tempranas",
    price: 350,
    description: "Stewart 8va edición. Algunas notas a lápiz, excelente estado general.",
    sellerName: "Laura Pérez",
    sellerRating: 4.8,
    sellerReviewCount: 10,
    rating: 4.5,
    category: "Libros",
    publishedAt: "2024-01-12",
    whatsappNumber: "521234567891",
    reviewCount: 5,
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80",
    imageAlt: "Balón de basquetbol",
    title: "Balón NBA Spalding",
    price: 600,
    description: "Balón oficial de juego interior. Poco uso, grip perfecto.",
    sellerName: "Miguel Torres",
    sellerRating: 4.2,
    sellerReviewCount: 7,
    rating: 4.3,
    category: "Deportes",
    publishedAt: "2024-01-10",
    whatsappNumber: "521234567892",
    reviewCount: 3,
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
    imageAlt: "Audífonos Sony",
    title: "Sony WH-1000XM4",
    price: 4200,
    description: "Cancelación de ruido activa. Batería al 95%, incluye estuche y cable USB-C.",
    sellerName: "Ana Ruiz",
    sellerRating: 5.0,
    sellerReviewCount: 18,
    rating: 4.9,
    category: "Electrónica",
    publishedAt: "2024-01-11",
    whatsappNumber: "521234567893",
    reviewCount: 8,
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    imageAlt: "Mochila Herschel",
    title: "Mochila Herschel Little America",
    price: 950,
    description: 'Color negro, compartimento para laptop de 15". Impecable.',
    sellerName: "Diego Soto",
    sellerRating: 4.0,
    sellerReviewCount: 4,
    rating: 4.6,
    category: "Accesorios",
    publishedAt: "2024-01-09",
    whatsappNumber: "521234567894",
    reviewCount: 1,
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    imageAlt: "Libros de programación",
    title: "Clean Code – Robert C. Martin",
    price: 280,
    description: "Edición en inglés. Subrayado mínimo en los primeros 3 capítulos.",
    sellerName: "Sofía Vega",
    sellerRating: 4.7,
    sellerReviewCount: 12,
    rating: 4.7,
    category: "Libros",
    publishedAt: "2024-01-08",
    whatsappNumber: "521234567895",
    reviewCount: 4,
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80",
    imageAlt: "Apple Watch",
    title: "Apple Watch SE 2da Gen",
    price: 3800,
    description: "44mm, GPS, correa deportiva negra. Con caja original y cargador.",
    sellerName: "Rodrigo Luna",
    sellerRating: 4.6,
    sellerReviewCount: 9,
    rating: 4.8,
    category: "Electrónica",
    publishedAt: "2024-01-13",
    whatsappNumber: "521234567896",
    reviewCount: 6,
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80",
    imageAlt: "Guantes de box",
    title: "Guantes de Box Everlast 14oz",
    price: 520,
    description: "Usados 3 meses, sin roturas. Incluye vendas de regalo.",
    sellerName: "José Herrera",
    sellerRating: 3.9,
    sellerReviewCount: 6,
    rating: 4.1,
    category: "Deportes",
    publishedAt: "2024-01-07",
    whatsappNumber: "521234567897",
    reviewCount: 2,
  },
];

// ─── Página ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [categoria, setCategoria] = useState<Categoria>("Todos");
  const [orden, setOrden] = useState<SortOption>("recientes");

  // Calcular cuántos productos coinciden con la categoría activa
  const totalVisible =
    categoria === "Todos"
      ? productos.length
      : productos.filter((p) => p.category === categoria).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sección hero con filtros */}
      <MarketplaceHero
        totalProductos={totalVisible}
        categoriaActiva={categoria}
        ordenActivo={orden}
        onCategoriaChange={setCategoria}
        onOrdenChange={setOrden}
      />

      {/* Grilla de productos */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <ProductGrid
          products={productos}
          categoria={categoria}
          orden={orden}
        />
      </div>

      {/* Footer */}
      <div style={{ background: "linear-gradient(to right, #00093c, #2d0b00)" }}>
      </div>
    </div>
  );
}
