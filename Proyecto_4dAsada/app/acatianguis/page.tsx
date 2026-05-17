// Página principal de Acatiaguis: mercado semanal de la comunidad FES Acatlán.
import { createClient } from "@/utils/supabase/server";
import AcatiaguisHero from "./components/AcatiaguisHero";
import AcatiaguisInfoBar from "./components/AcatiaguisInfoBar";
import AcatiaguisBody from "./components/AcatiaguisBody";
import AcatiaguisCTAButton from "./components/AcatiaguisCTAButton";
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

export const metadata = {
  title: "Acatiaguis – Garra Deal",
  description: "Mercado semanal de la comunidad FES Acatlán UNAM.",
};

export default async function AcatiaguisPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: productosRaw }, { data: categoriasRaw }] = await Promise.all([
    supabase
      .from("productos")
      .select("id, titulo, descripcion, precio, imagen_url, imagen_alt, calificacion, created_at, categoria_id, perfiles(nombre, apellido, telefono)")
      .order("created_at", { ascending: false }),
    supabase
      .from("categorias")
      .select("id, nombre")
      .eq("seccion", "acatianguis")
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AcatiaguisHero />
      <AcatiaguisInfoBar />
      <AcatiaguisBody products={products} categorias={categorias} />

      {!user && (
        <div style={{ background: "linear-gradient(to right, #00093c, #2d0b00)" }}>
          <div style={{ textAlign: "center", padding: "3.5rem 1.5rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              ¿Quieres vender en Acatiaguis?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto 1.75rem" }}>
              Regístrate como vendedor y forma parte del mercado semanal más grande de FES Acatlán
            </p>
            <AcatiaguisCTAButton />
          </div>
        </div>
      )}
    </div>
  );
}
