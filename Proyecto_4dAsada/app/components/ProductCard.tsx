"use client";

import Image from "next/image";

export interface ProductCardProps {
  imageSrc: string;
  
  imageAlt?: string;
  
  title: string;
 
  price: number;
 
  description: string;
  
  sellerName: string;
  
  rating: number;
 
  category: string;
  
  onClick?: () => void;
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-MX")}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductCard({
  imageSrc,
  imageAlt,
  title,
  price,
  description,
  sellerName,
  rating,
  category,
  onClick,
}: ProductCardProps) {
  return (
    <article
      onClick={onClick}
      className={[
        "group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100",
        "overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        onClick ? "cursor-pointer" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Image ──────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {/* Title + Price */}
        <div className="flex items-baseline justify-between gap-2">
          <h2
            className="font-bold text-gray-900 text-base truncate flex-1"
            title={title}
          >
            {title}
          </h2>
          <span className="text-amber-500 font-bold text-base whitespace-nowrap">
            {formatPrice(price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-snug line-clamp-2">
          {description}
        </p>

        {/* Seller + Rating */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            {/* Person icon */}
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span className="truncate max-w-[100px]">{sellerName}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600">
            <svg
              className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Category badge */}
        <div className="pt-1">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
    </article>
  );
}
