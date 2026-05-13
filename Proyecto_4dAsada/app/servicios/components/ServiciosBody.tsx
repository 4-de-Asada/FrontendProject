"use client";

import { useState } from "react";
import ProductCard, { ProductCardProps } from "../../components/ui/ProductCard";
import ProductModal from "../../components/ui/ProductModal";
import styles from "./ServiciosBody.module.css";

// ─── Tipos de servicio ────────────────────────────────────────────────────────────────────

type Categoria = "Todos" | "Ciencias" | "Matemáticas y programación" | "Idiomas" | "Diseño" | "Fotografía"| "Servicios Técnicos" | "Artes" | "Otros";

const CATEGORIAS: Categoria[] = ["Todos", "Ciencias", "Matemáticas y programación", "Idiomas", "Diseño", "Fotografía", "Servicios Técnicos", "Artes", "Otros"];

// ─── Datos de servicios ─────────────────────────────────────────────────────────
const lista_servicios: ProductCardProps[] = [
  {
    "imageSrc": "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Tutoría de Matemáticas",
    "title": "Tutorías de Matemáticas",
    "price": 150,
    "description": "Apoyo en cálculo, álgebra lineal y ecuaciones diferenciales.",
    "sellerName": "Carlos Mendoza",
    "rating": 4.9,
    "category": "Matemáticas y programación",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1455540904194-fc101941273a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Clases de Inglés",
    "title": "Clases de Inglés",
    "price": 120,
    "description": "Mejora tu Inglés con clases interactivas y personalizadas.",
    "sellerName": "Laura González",
    "rating": 5.0,
    "category": "Idiomas",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Asesorías de Desarrollo Web",
    "title": "Asesorías de Desarrollo Web (JavaScript/React)",
    "price": 200,
    "description": "Aprende a desarrollar aplicaciones web modernas con tecnologías actuales.",
    "sellerName": "Miguel Ángel Torres",
    "rating": 4.8,
    "category": "Matemáticas y programación",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1692847605408-05e2e516e859?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Diseño Gráfico",
    "title": "Diseño Gráfico Profesional",
    "price": 250,
    "description": "Logos, flyers, banners y diseños personalizados para tus proyectos.",
    "sellerName": "Sofía Hernández",
    "rating": 4.9,
    "category": "Diseño",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Edición de Fotografía",
    "title": "Edición y Retoque Fotográfico",
    "price": 220,
    "description": "Edición profesional de fotos con Lightroom, Photoshop y Capture One.",
    "sellerName": "Diego Rosales",
    "rating": 4.8,
    "category": "Fotografía",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1590098563734-bcea80ce34c7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Diseño de Presentaciones",
    "title": "Diseño de Presentaciones (PPT/Canva)",
    "price": 140,
    "description": "Crea presentaciones impactantes y profesionales para tus exposiciones.",
    "sellerName": "Valentina Soto",
    "rating": 4.7,
    "category": "Diseño",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Python y Data Science",
    "title": "Asesoría de Python, Pandas y Análisis de Datos",
    "price": 300,
    "description": "Aprende a analizar datos con Python, visualización y machine learning básico.",
    "sellerName": "Juan Sánchez",
    "rating": 4.9,
    "category": "Matemáticas y programación",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1657812159077-90649115008c?q=80&w=1126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Diseño Web UX/UI",
    "title": "Diseño Web (UX/UI)",
    "price": 250,
    "description": "Diseño de interfaces intuitivas y atractivas para aplicaciones web.",
    "sellerName": "Martina Reyes",
    "rating": 4.8,
    "category": "Diseño",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Tutoría de Física",
    "title": "Tutoría de Física (Mecánica y Termodinámica)",
    "price": 170,
    "description": "Apoyo en física clásica, problemas complejos y laboratorios.",
    "sellerName": "Andrés Gutiérrez",
    "rating": 4.8,
    "category": "Ciencias",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1636751179475-516561a802c4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Tutoría de Química",
    "title": "Tutoría de Química Orgánica e Inorgánica",
    "price": 175,
    "description": "Explicación clara de conceptos, reacciones y ecuaciones químicas.",
    "sellerName": "Lucía Vargas",
    "rating": 5.0,
    "category": "Ciencias",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1604754742629-3e5728249d73?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Reparación de Computadoras y Celulares",
    "title": "Diagnóstico y Reparación de Computadoras y Celulares",
    "price": 250,
    "description": "Diagnóstico, reparación y optimización del rendimiento de tu equipo.",
    "sellerName": "Óscar Ramírez",
    "rating": 4.8,
    "category": "Servicios Técnicos",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1593697972679-c4041d132a46?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Clases de Guitarra y Piano",
    "title": "Clases de Guitarra y Piano",
    "price": 140,
    "description": "Aprende a tocar desde cero o mejora tus habilidades musicales.",
    "sellerName": "Natalia Cifuentes",
    "rating": 4.9,
    "category": "Artes",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Estadística y Métodos",
    "title": "Asesorías de Estadística SPSS, R y Métodos Cuantitativos",
    "price": 200,
    "description": "Análisis estadístico avanzado para trabajos de investigación y tesis.",
    "sellerName": "Gabriela Mora",
    "rating": 5.0,
    "category": "Matemáticas y programación",
  },
  {
    "imageSrc": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "imageAlt": "Corrección y Redacción Jurídica",
    "title": "Corrección y Redacción Jurídica",
    "price": 50,
    "description": "Revisión y mejora de tus trabajos escritos para que tengan claridad, coherencia y estilo jurídico adecuado. Incluye corrección de ortografía, redacción formal, estructura argumentativa y formato académico (APA o jurídico). Precio por página.",
    "sellerName": "Mariana López",
    "rating": 5.0,
    "category": "Otros",
  }
]

export default function ServiciosBody () {
  const [categoria, setCategoria] = useState<Categoria>("Todos");
  const [seleccionado, setSeleccionado] = useState<ProductCardProps | null>(null);

  const visibles =
    categoria === "Todos"
      ? lista_servicios
      : lista_servicios.filter((s) => s.category === categoria);

  return (
    <section className={styles.body}>

      {/* ── Filtros ──────────────────────────────────────────────────────────── */}
      <div className={styles.filters}>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={[styles.filterBtn, categoria === cat ? styles.active : ""].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Grilla ───────────────────────────────────────────────────────────── */}
      <div className={styles.grid}>
        {visibles.map((servicio) => (
          <ProductCard
            key={servicio.title}
            {...servicio}
            onClick={() => setSeleccionado(servicio)}
          />
        ))}
      </div>

      {/* ── Modal de detalle ─────────────────────────────────────────────────── */}
      {seleccionado && (
        <ProductModal
          {...seleccionado}
          onClose={() => setSeleccionado(null)}
        />
      )}
      </section>
    );
}