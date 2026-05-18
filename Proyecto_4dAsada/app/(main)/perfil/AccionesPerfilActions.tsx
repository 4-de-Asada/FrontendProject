"use client";

import { useState } from "react";
import { degradarRolAction } from "./PerfilActions";
import styles from "./perfil.module.css";
import Link from "next/link";

interface AccionesPerfilActionsProps {
    userId: string;
    tipo: 'comprador' | 'vendedor' | 'admin';
    verificado: boolean;
    url_comprobante: string | null;
}

export default function AccionesPerfilActions({ userId, tipo, verificado, url_comprobante }: AccionesPerfilActionsProps) {
    const [estaCargando, setEstaCargando] = useState(false);

    const manejarDegradarRolClick = async () => {
        const confirmMsg = tipo === 'vendedor' && verificado 
            ? "¿Estás seguro de que quieres dejar de ser contribuyente? Perderás tus privilegios de publicación."
            : "¿Estás seguro de que quieres cancelar tu solicitud?";
        
        if (!window.confirm(confirmMsg)) return;

        setEstaCargando(true);
        try {
            const result = await degradarRolAction(userId);
            if (!result.success) {
                alert("Error: " + result.error);
            }
        } catch (error) {
            alert("Ocurrió un error inesperado.");
        } finally {
            setEstaCargando(false);
        }
    };

    return (
        <div className={styles.actions}>
            <Link href="/modificarDatos" className={styles.btnEdit}>
                Editar Perfil
            </Link>

            {tipo === 'comprador' && (
                <Link href="/solicitarVendedor" className={styles.btnPromote}>
                    Ser Vendedor
                </Link>
            )}

            {tipo === 'vendedor' && (
                <button 
                    onClick={manejarDegradarRolClick} 
                    className={styles.btnDegrade}
                    disabled={estaCargando}
                >
                    {estaCargando ? "Procesando..." : (verificado ? "Dejar de contribuir" : "Cancelar petición")}
                </button>
            )}
        </div>
    );
}
