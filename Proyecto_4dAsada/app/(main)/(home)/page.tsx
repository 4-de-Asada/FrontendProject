import { createClient } from "@/utils/supabase/server";
import InicioHero from "./components/InicioHero";
import InicioBody from "./components/InicioBody";
import BienvenidaSection from "@/app/components/BienvenidaSection";
import { ProductCardProps } from "../../components/ui/ProductCard";

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
  title: "Inicio – Garra Deal",
  description: "La plataforma oficial de compra-venta para la comunidad de FES Acatlán UNAM.",
};

export default async function InicioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Categorías marketplace para los productos destacados
  const { data: categoriasRaw } = await supabase
    .from("categorias")
    .select("id, nombre")
    .eq("seccion", "marketplace");

  const catIds = (categoriasRaw ?? []).map((c) => c.id);
  const catMap = new Map((categoriasRaw ?? []).map((c) => [c.id, c.nombre]));

  const { data: productosRaw } = await supabase
    .from("productos")
    .select("id, titulo, descripcion, precio, imagen_url, imagen_alt, calificacion, created_at, categoria_id, perfiles (nombre, apellido, telefono)")
    .in("categoria_id", catIds.length > 0 ? catIds : [-1])
    .order("created_at", { ascending: false })
    .limit(3);

  const destacados: ProductCardProps[] = ((productosRaw ?? []) as unknown as ProductoRow[]).map((p) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <BienvenidaSection />
      
      <InicioHero />
      <InicioBody destacados={destacados} isLoggedIn={!!user} />

      {!user && (
        <div style={{ background: "linear-gradient(to right, #00093c, #2d0b00)" }}>
          <div style={{ textAlign: "center", padding: "3.5rem 1.5rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              ¿Listo para comenzar?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto 1.75rem" }}>
              Únete a la comunidad de Garra Deal y descubre todo lo que tus compañeros tienen para ofrecer
            </p>
            <a
              href="/registro"
              style={{
                display: "inline-block",
                padding: "0.7rem 2rem",
                background: "#e4ac2e",
                border: "2px solid #e4ac2e",
                color: "#00093c",
                borderRadius: "0.4rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              Crear Cuenta Gratis
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
