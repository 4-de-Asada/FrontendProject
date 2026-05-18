import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import styles from "./perfil.module.css";
import Link from "next/link";
import AccionesPerfilActions from "./AccionesPerfilActions";

export default async function PerfilPage() {
    const supabase = await createClient();
    const { data: { user: usuario } } = await supabase.auth.getUser();

    if (!usuario) {
        redirect("/ingreso");
    }

    const { data: perfil } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", usuario.id)
        .single();

    // Mock Data para simulación
    const mockContribuyente = {
        tianguisCount: 2,
        marketCount: 0,
        serviciosCount: 1,
        rating: 4.5
    };

    const mockAdmin = {
        totalTianguis: 154,
        totalMarket: 87,
        totalServicios: 42
    };

    const rol = perfil?.tipo || 'comprador';
    const esVendedor = rol === 'vendedor';
    const esAdmin = rol === 'admin';
    const esComprador = rol === 'comprador';

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.topActions}>
                    <Link href="/" className={styles.btnHome}>
                        ← Volver al Inicio
                    </Link>
                </div>

                {/* HEADER SECCIÓN */}
                <div className={styles.header}>
                    <div className={`${styles.avatar} ${esAdmin ? styles.avatarAdmin : esVendedor ? styles.avatarSeller : styles.avatarBuyer}`}>
                        {perfil?.nombre?.[0] || usuario.email?.[0]}
                    </div>
                    <div className={styles.headerInfo}>
                        <h1 className={styles.name}>{perfil?.nombre} {perfil?.apellido}</h1>
                        
                        {esComprador && (
                            <span className={`${styles.roleBadge} ${styles.badgePuma}`}>
                                🐾 Puma Amigo
                            </span>
                        )}

                        {esVendedor && (
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`${styles.roleBadge} ${styles.badgeContribuyente}`}>
                                    🤝 Contribuyente
                                </span>
                                <div className={styles.tagContainer}>
                                    <span className={`${styles.tag} ${styles.tagTianguis}`}>Acatianguis</span>
                                    <span className={`${styles.tag} ${styles.tagMarket}`}>Market</span>
                                    <span className={`${styles.tag} ${styles.tagServicios}`}>Servicios</span>
                                </div>
                            </div>
                        )}

                        {esAdmin && (
                            <span className={`${styles.roleBadge} ${styles.badgeAdmin}`}>
                            	Administrador
                            </span>
                        )}
                    </div>
                </div>

                <div className={`${styles.grid} ${esComprador ? styles.singleCardGrid : ""}`}>
                    {/* CARD: INFORMACIÓN DE LA CUENTA */}
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Información de la Cuenta</h2>
                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Correo Institucional</span>
                                <span className={styles.infoValue}>{usuario.email}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Número de Cuenta</span>
                                <span className={styles.infoValue}>{usuario.email?.split('@')[0]}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Teléfono</span>
                                <span className={styles.infoValue}>{perfil?.telefono || "No registrado"}</span>
                            </div>
                            
                            {!esAdmin && (
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Estado de Usuario</span>
                                    <div className={styles.statusWrapper}>
                                        {esComprador ? (
                                            <span className={`${styles.status} ${styles.verified}`}>
                                                Verificado
                                            </span>
                                        ) : (
                                            <span className={`${styles.status} ${
                                                perfil?.verificado ? styles.verified : 
                                                perfil?.url_comprobante ? styles.pending : styles.rejected
                                            }`}>
                                                {perfil?.verificado ? "Validado" : 
                                                 perfil?.url_comprobante ? "En proceso de validación" : "Rechazado"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CARD: ACTIVIDAD EN LA COMUNIDAD / MÉTRICAS */}
                    {!esComprador && (
						<div className={styles.card}>
						{(esAdmin || esVendedor) && (
							<h2 className={styles.cardTitle}>
                            {esAdmin ? "Métricas Globales" : "Tu Actividad"}
                        	</h2>
						)}
                                                
                        {esVendedor && (
                            <>
                                {(mockContribuyente.tianguisCount === 0 && mockContribuyente.marketCount === 0 && mockContribuyente.serviciosCount === 0) ? (
                                    <div className={styles.ctaBox}>
                                        <p className={styles.ctaText}>Sin contribuciones, publica tu primer producto o servicio</p>
                                        <Link href="/marketplace" className={styles.btnCTA}>Publicar Ahora</Link>
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.statsGrid}>
                                            {mockContribuyente.tianguisCount > 0 && (
                                                <div className={styles.statBox}>
                                                    <span className={styles.statValue}>{mockContribuyente.tianguisCount}</span>
                                                    <span className={styles.statLabel}>Tianguis</span>
                                                </div>
                                            )}
                                            {mockContribuyente.marketCount > 0 && (
                                                <div className={styles.statBox}>
                                                    <span className={styles.statValue}>{mockContribuyente.marketCount}</span>
                                                    <span className={styles.statLabel}>Market</span>
                                                </div>
                                            )}
                                            {mockContribuyente.serviciosCount > 0 && (
                                                <div className={styles.statBox}>
                                                    <span className={styles.statValue}>{mockContribuyente.serviciosCount}</span>
                                                    <span className={styles.statLabel}>Servicios</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.scoreContainer}>
                                            <span className={styles.scoreValue}>
                                                {mockContribuyente.rating > 0 ? mockContribuyente.rating.toFixed(1) : "Sin calificaciones"}
                                            </span>
                                            <span className={styles.scoreLabel}>Calificación Promedio</span>
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {esAdmin && (
                            <>
                                <div className={styles.statsGrid}>
                                    <div className={styles.statBox}>
                                        <span className={styles.statValue}>{mockAdmin.totalTianguis}</span>
                                        <span className={styles.statLabel}>Tianguis</span>
                                    </div>
                                    <div className={styles.statBox}>
                                        <span className={styles.statValue}>{mockAdmin.totalMarket}</span>
                                        <span className={styles.statLabel}>Market</span>
                                    </div>
                                    <div className={styles.statBox}>
                                        <span className={styles.statValue}>{mockAdmin.totalServicios}</span>
                                        <span className={styles.statLabel}>Servicios</span>
                                    </div>
                                </div>
                                <div className={styles.scoreContainer}>
                                    <span className={styles.scoreValue} style={{ color: '#1e293b', fontSize: '1.1rem' }}>
                                        Comportese joven
                                    </span>
                                    {/* <span className={styles.scoreLabel}>Nivel de Acceso</span> */}
                                </div>
                            </>
                        )}
                    </div>
					)}

                </div>

                {/* BOTONES DE ACCIÓN */}
                <AccionesPerfilActions 
                    userId={usuario.id} 
                    tipo={rol as any} 
                    verificado={perfil?.verificado || false}
                    url_comprobante={perfil?.url_comprobante || null}
                />
            </div>
        </div>
    );
}
