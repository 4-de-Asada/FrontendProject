import { createClient } from "@/utils/supabase/server";
import MarketplaceClient from "./MarketplaceClient";
import { ProductCardProps } from "../components/ui/ProductCard";

type ProductoRow = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  imagen_alt: string | null;
  calificacion: number | null;
  created_at: string;
  categoria_id: number | null;
  perfiles: { nombre: string | null; apellido: string | null; telefono: string | null } | null;
};

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export default async function MarketplacePage() {
  if (!supabaseConfigured) {
    return <MarketplaceClient products={[]} categorias={["Todos"]} />;
  }

  const supabase = await createClient();

  const [{ data: productosRaw }, { data: categoriasRaw }] = await Promise.all([
    supabase
      .from("productos")
      .select("id, titulo, descripcion, precio, imagen_url, imagen_alt, calificacion, created_at, categoria_id, perfiles(nombre, apellido, telefono)")
      .order("created_at", { ascending: false }),
    supabase
      .from("categorias")
      .select("id, nombre")
      .eq("seccion", "marketplace")
      .order("nombre"),
  ]);

  const catIds = new Set((categoriasRaw ?? []).map((c) => c.id));
  const catMap = new Map((categoriasRaw ?? []).map((c) => [c.id, c.nombre]));

  const products: ProductCardProps[] = ((productosRaw ?? []) as unknown as ProductoRow[])
    .filter((p) => p.categoria_id != null && catIds.has(p.categoria_id))
    .map((p) => {
      const perfil = p.perfiles ?? null;
      return {
        imageSrc: p.imagen_url,
        imageAlt: p.imagen_alt ?? undefined,
        title: p.titulo,
        price: Number(p.precio),
        description: p.descripcion,
        sellerName: perfil
          ? [perfil.nombre, perfil.apellido].filter(Boolean).join(" ") || "Vendedor"
          : "Vendedor",
        rating: Number(p.calificacion ?? 0),
        category: catMap.get(p.categoria_id ?? -1) ?? "Sin categoría",
        publishedAt: p.created_at?.split("T")[0],
        whatsappNumber: perfil?.telefono ?? undefined,
      };
    });

  const categorias = ["Todos", ...(categoriasRaw ?? []).map((c) => c.nombre)];

  return <MarketplaceClient products={products} categorias={categorias} />;
}
