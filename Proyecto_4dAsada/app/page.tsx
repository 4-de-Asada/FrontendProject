import ProductGrid from "./components/ProductGrid";
import { ProductCardProps } from "./components/ProductCard";

// ─── Sample data (replace with real API / props later) ───────────────────────
const products: ProductCardProps[] = [
  {
    imageSrc: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80",
    imageAlt: "iPhone 12 Pro",
    title: "iPhone 12 Pro",
    price: 8500,
    description: "iPhone en excelente estado, batería al 89%, incluye cargador y caja original.",
    sellerName: "Carlos Mendoza",
    rating: 4.8,
    category: "Electrónica",
  }
];

// ─── Page (Server Component) ──────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Productos disponibles</h1>
      <ProductGrid products={products} />
    </div>
  );
}
