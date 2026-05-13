// Barra de navegación principal: logo, enlaces de sección, botón de publicar y avatar de usuario.
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Enlaces de navegación ──────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Inicio",       href: "/" },
  { label: "Acatiaguis",  href: "/acatianguis" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Servicios",   href: "/servicios" },
];

// ─── Componente ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => href === pathname;

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100 shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-14">

        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {/* Imagen Generica */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#1a2b5e]/20 bg-[#1a2b5e]">
            <Image
              src="https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=64&q=80"
              alt="UNAM campus"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="font-bold text-[#1a2b5e] text-base tracking-tight">
            Garra Deal
          </span>
        </Link>

        {/* ── Enlaces centrados ───────────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150",
                    active
                      ? "bg-[#1a2b5e] text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Acciones a la derecha ──────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Botón de publicar */}
          <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#1a2b5e] transition-colors">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
            </svg>
            Publicar
          </button>

          {/* Avatar del usuario */}
          <button
            aria-label="Mi perfil"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            // href="/perfil"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
