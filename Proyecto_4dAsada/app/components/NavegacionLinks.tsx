"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Inicio",       href: "/" },
  { label: "Acatiaguis",  href: "/acatianguis" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Servicios",   href: "/servicios" },
];

export default function NavegacionLinks() {
  const pathname = usePathname();
  const isActive = (href: string) => href === pathname;

  return (
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
  );
}
