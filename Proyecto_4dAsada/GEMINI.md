# Garra Deal - Project Guidelines

Este archivo contiene los mandatos fundamentales, patrones arquitectónicos y estándares de ingeniería para el proyecto Garra Deal.

## 🌐 Idioma Predeterminado
- **Idioma del Proyecto:** El español es el idioma oficial para todo el desarrollo. Esto incluye:
    - Comentarios en el código.
    - Documentación técnica (incluyendo este archivo).
    - Mensajes de error y logs (siempre que sea posible).
    - Texto de la interfaz de usuario (UI).
    - Mensajes de commit.

## 🛠 Stack Tecnológico
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4 & CSS Modules
- **Backend/Auth:** Supabase (SSR)

## 📁 Estructura del Proyecto
- `app/`: Contiene las rutas y componentes de página (organizados en Route Groups).
- `components/`: Componentes de UI reutilizables.
- `utils/supabase/`: Configuraciones del cliente de Supabase para cliente y servidor.

## 🏛 Convenciones Arquitectónicas
- **Server Components por Defecto:** Utilizar React Server Components (RSC) siempre que sea posible. Usar `"use client"` solo para componentes interactivos.
- **Integración con Supabase:** Utilizar siempre las funciones de utilidad en `utils/supabase/` para instanciar clientes de Supabase, asegurando el manejo correcto de cookies y soporte para SSR.
- **Estilos:** Preferir Tailwind CSS para el diseño y estilos generales. Usar CSS Modules (`*.module.css`) para estilos complejos y específicos de componentes que requieran un alto aislamiento.

## 📝 Lineamientos de Nomenclatura
Para mantener la consistencia en el código, seguimos este enfoque híbrido:

### A. Archivos (Componentes y Páginas)
- **Formato:** `PascalCase`.
- **Regla:** Identificador en español + Tecnicismo en inglés.
- **Ejemplo:** `RegistroPage.tsx`, `PerfilCard.tsx`, `ListaUsuariosTable.tsx`.

### B. Métodos y Funciones
- **Formato:** `camelCase`.
- **Regla:** Acción/Verbo en español + Entidad en español + Tecnicismo/Acción en inglés (si aplica).
- **Ejemplo:** `obtenerUsuariosList()`, `validarFormSubmit()`, `manejarClickButton()`.

### C. Variables y Estados
- **Formato:** `camelCase`.
- **Regla:** Preferentemente 100% en español, descriptivas.
- **Ejemplo:** `usuarioActual`, `estaCargando`, `listaProductos`.
