import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import styles from "./admin.module.css";
import Link from "next/link";
import UsuariosTable from "./UsuariosTable";

interface AdminDashboardProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminDashboard({ searchParams }: AdminDashboardProps) {
  const supabase = await createClient();
  const { tab = "usuarios" } = await searchParams;
  
  const { data: perfiles, error: perfilesError } = await supabase
    .from("perfiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (perfilesError) {
    throw new Error("No se pudieron cargar los perfiles de usuario.");
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Panel de Administración</h1>
            <Link href="/" className={styles.btnHome}>
              ← Volver al Inicio
            </Link>
          </div>
          <p className={styles.subtitle}>Gestión centralizada de la plataforma Garra Deal</p>
        </header>

        <nav className={styles.tabs}>
          <Link 
            href="/admin?tab=usuarios" 
            className={`${styles.tab} ${tab === 'usuarios' ? styles.tabActive : ''}`}
          >
            Usuarios
          </Link>
          <Link 
            href="/admin?tab=acatianguis" 
            className={`${styles.tab} ${tab === 'acatianguis' ? styles.tabActive : ''}`}
          >
            Acatianguis
          </Link>
          <Link 
            href="/admin?tab=marketplace" 
            className={`${styles.tab} ${tab === 'marketplace' ? styles.tabActive : ''}`}
          >
            Marketplace
          </Link>
          <Link 
            href="/admin?tab=servicios" 
            className={`${styles.tab} ${tab === 'servicios' ? styles.tabActive : ''}`}
          >
            Servicios
          </Link>
        </nav>

        <div className={styles.card}>
          {tab === "usuarios" && (
            <UsuariosTable perfiles={perfiles || []} />
          )}

          {tab === "acatianguis" && (
            <div className={styles.emptyState}>
              <h3>Gestión de Acatianguis</h3>
              <p>Próximamente: Control de puestos y suscripciones.</p>
            </div>
          )}

          {tab === "marketplace" && (
            <div className={styles.emptyState}>
              <h3>Gestión de Marketplace</h3>
              <p>Próximamente: Moderación de productos y categorías.</p>
            </div>
          )}

          {tab === "servicios" && (
            <div className={styles.emptyState}>
              <h3>Gestión de Servicios</h3>
              <p>Próximamente: Directorio de servicios estudiantiles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
