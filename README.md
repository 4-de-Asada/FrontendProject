<div align="center">

# 🐾 GARRA DEAL

Plataforma de compra-venta para la comunidad de **FES Acatlán UNAM**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://frontend-project-two-mu.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<a href="https://frontend-project-two-mu.vercel.app" target="_blank">
  <img src="https://img.shields.io/badge/🌐 Ver sitio en vivo-e4ac2e?style=for-the-badge&logoColor=black" width="250" />
</a>

</div>

---

## Secciones

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con productos destacados |
| `/marketplace` | Compra y venta de productos de segunda mano |
| `/servicios` | Servicios ofrecidos por alumnos |
| `/acatianguis` | Mercado semanal del campus |
| `/perfil` | Perfil del usuario autenticado |
| `/actualizar-vendedor` | Solicitud para convertirse en vendedor |

## Equipo

| Integrante | Áreas |
|------------|-------|
| Carlos | NavBar, Hero del Marketplace, Acatianguis, Página de Inicio |
| Samuel | Vistas de Login, Autenticación con Supabase |
| Saúl | Página de Servicios |
| Antonio | Footer, Vistas de Login |
| Rafael | Conexión con Supabase, Perfil de usuario, Vista Solicitud Vendedor, 404 |

## Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Correr en local

```bash
pnpm install
pnpm run dev
```
