"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ProductCardProps } from "./ProductCard";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-MX")}`;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <svg
            key={i}
            className={`w-4 h-4 ${filled || half ? "text-amber-400" : "text-gray-300"}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      })}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ProductModalProps extends ProductCardProps {
  onClose: () => void;
}

export default function ProductModal({
  imageSrc,
  imageAlt,
  title,
  price,
  description,
  sellerName,
  sellerRating = 4,
  sellerReviewCount = 0,
  category,
  publishedAt,
  whatsappNumber,
  reviewCount = 0,
  onClose,
}: ProductModalProps) {
  // Close on Escape key
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, estoy interesado en: ${title}`)}`
    : undefined;

  return (
    <>
      {/* ── Blurred / darkened backdrop ─────────────────────────────────────── */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300"
        aria-hidden="true"
      />

      {/* ── Modal panel ─────────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl pointer-events-auto animate-modal-in overflow-hidden">

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col sm:flex-row">
            {/* ── Left: image + seller info ─────────────────────────────────── */}
            <div className="sm:w-48 shrink-0 bg-gray-50 flex flex-col">
              {/* Product image */}
              <div className="relative h-44 sm:flex-1">
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  fill
                  className="object-contain p-5"
                  sizes="192px"
                />
              </div>

              {/* Seller info */}
              <div className="border-t border-gray-100 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Información del Vendedor
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">{sellerName}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarRating rating={sellerRating} />
                      {sellerReviewCount > 0 && (
                        <span className="text-xs text-gray-400">({sellerReviewCount} reseñas)</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: details ────────────────────────────────────────────── */}
            <div className="flex flex-col flex-1 p-5 gap-4 sm:border-l border-gray-100">
              {/* Title + price */}
              <div className="flex items-start justify-between gap-3 pr-6">
                <h2 className="font-bold text-gray-900 text-lg leading-snug">{title}</h2>
                <span className="text-amber-500 font-bold text-xl whitespace-nowrap">
                  {formatPrice(price)}
                </span>
              </div>

              {/* Meta row: category + date */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {category}
                </span>
                {publishedAt && (
                  <span className="text-xs text-gray-400">
                    Publicado: {formatDate(publishedAt)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Descripción
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
              </div>

              {/* Contact button */}
              <a
                href={whatsappHref ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-150"
              >
                {/* WhatsApp icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contactar Vendedor
              </a>

              {/* Safe transaction notice */}
              <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3">
                <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-blue-700">Transacciones Seguras</p>
                  <p className="text-xs text-blue-600 mt-0.5 leading-snug">
                    Coordina la entrega y el pago directamente con el vendedor en el campus.
                  </p>
                </div>
              </div>

              {/* Reviews accordion */}
              <details className="group border-t border-gray-100 pt-3">
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-gray-700 select-none">
                  Reseñas del Producto ({reviewCount})
                  <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="mt-2 text-xs text-gray-400 italic">
                  {reviewCount === 0 ? "Aún no hay reseñas para este producto." : "Reseñas próximamente..."}
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
