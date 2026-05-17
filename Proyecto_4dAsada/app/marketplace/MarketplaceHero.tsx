"use client";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type SortOption = "recientes" | "precio-asc" | "precio-desc";

export type Categoria = string;

interface MarketplaceHeroProps {
  totalProductos: number;
  categoriaActiva: Categoria;
  ordenActivo: SortOption;
  onCategoriaChange: (cat: Categoria) => void;
  onOrdenChange: (orden: SortOption) => void;
  categorias: string[];
}

// ─── Opciones de ordenamiento ─────────────────────────────────────────────────

const OPCIONES_ORDEN: { value: SortOption; label: string }[] = [
  { value: "recientes", label: "Más recientes" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function MarketplaceHero({
  totalProductos,
  categoriaActiva,
  ordenActivo,
  onCategoriaChange,
  onOrdenChange,
  categorias,
}: MarketplaceHeroProps) {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-4">

        {/* ── Encabezado ───────────────────────────────────────────────────── */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Marketplace
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Descubre productos de segunda mano publicados por la comunidad
            universitaria
          </p>
        </div>

        {/* ── Filtros y ordenamiento ───────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3">

          {/* Botones de categoría */}
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => {
              const activo = cat === categoriaActiva;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoriaChange(cat)}
                  className={[
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150",
                    activo
                      ? "bg-[#1a2b5e] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Selector de ordenamiento */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="whitespace-nowrap">Ordenar por:</span>
            <select
              value={ordenActivo}
              onChange={(e) => onOrdenChange(e.target.value as SortOption)}
              className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a2b5e]/30 cursor-pointer"
            >
              {OPCIONES_ORDEN.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Contador de resultados ───────────────────────────────────────── */}
        <p className="mt-4 text-xs text-gray-400">
          Mostrando{" "}
          <span className="font-semibold text-gray-600">{totalProductos}</span>{" "}
          {totalProductos === 1 ? "producto" : "productos"}
        </p>
      </div>
    </section>
  );
}
