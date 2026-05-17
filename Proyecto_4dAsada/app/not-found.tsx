import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #00093c 0%, #2d0b00 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        textAlign: "center",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo / número */}
      <div
        style={{
          fontSize: "6rem",
          fontWeight: 900,
          color: "#e4ac2e",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          marginBottom: "1rem",
        }}
      >
        404
      </div>

      {/* Ícono */}
      <div
        style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "9999px",
          background: "rgba(228,172,46,0.15)",
          border: "2px solid rgba(228,172,46,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e4ac2e" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      </div>

      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#ffffff",
          margin: "0 0 0.75rem",
        }}
      >
        Página no encontrada
      </h1>

      <p
        style={{
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.65)",
          maxWidth: "360px",
          margin: "0 auto 2rem",
          lineHeight: 1.6,
        }}
      >
        La página que buscas no existe o fue movida. Regresa al inicio y sigue explorando la comunidad.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.6rem 1.75rem",
            background: "#e4ac2e",
            color: "#00093c",
            borderRadius: "0.375rem",
            fontWeight: 700,
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          Ir al inicio
        </Link>
        <Link
          href="/marketplace"
          style={{
            display: "inline-block",
            padding: "0.6rem 1.75rem",
            background: "transparent",
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.3)",
            borderRadius: "0.375rem",
            fontWeight: 600,
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          Ver Marketplace
        </Link>
      </div>
    </div>
  );
}
