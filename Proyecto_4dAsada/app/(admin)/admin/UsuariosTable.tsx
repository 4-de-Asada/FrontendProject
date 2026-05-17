"use client";

import { useState } from "react";
import styles from "./admin.module.css";
import RolSelector from "./RolSelector";
import EliminarUsuarioButton from "./EliminarUsuarioButton";
import EditarUsuarioModal from "./EditarUsuarioModal";
import { validarVendedorAction, verificarEmailUsuarioAction } from "@/app/(auth)/AutenticacionActions";

interface Perfil {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string | null;
  tipo: string;
  verificado: boolean;
  url_comprobante: string | null;
  created_at: string;
}

interface UsersTableProps {
  perfiles: Perfil[];
}

export default function UsersTable({ perfiles }: UsersTableProps) {
  const [editingUser, setEditingUser] = useState<Perfil | null>(null);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Estado / Doc</th>
            <th>Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {perfiles.map((u) => (
            <tr key={u.id}>
              <td>
                <div className={styles.userCell}>
                  <span className={styles.userName}>{u.nombre} {u.apellido}</span>
                  <span className={styles.userPhone}>{u.telefono || "Sin tel"}</span>
                </div>
              </td>
              <td>
                <RolSelector userId={u.id} currentRole={u.tipo} />
              </td>
              <td>
                <div className={styles.statusCol}>
                  <span className={`${styles.badge} ${u.verificado ? styles.bgSuccess : (u.url_comprobante ? styles.bgWarning : styles.bgDanger)}`}>
                    {u.verificado ? "Vendedor OK" : (u.url_comprobante ? "En Proceso" : "Sin Doc")}
                  </span>
                  {u.url_comprobante && (
                    <a 
                      href={u.url_comprobante} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.docLink}
                    >
                      Ver Comprobante
                    </a>
                  )}
                </div>
              </td>
              <td className={styles.dateCell}>
                {new Date(u.created_at).toLocaleDateString()}
              </td>
              <td>
                <div className={styles.actionsCell}>
                  <button 
                    onClick={() => setEditingUser(u)} 
                    className={`${styles.btnAction} ${styles.btnEdit}`}
                  >
                    Editar
                  </button>
                  {!u.verificado && u.url_comprobante && (
                    <button 
                      onClick={() => validarVendedorAction(u.id, true)} 
                      className={styles.btnAction}
                    >
                      Validar
                    </button>
                  )}
                  <EliminarUsuarioButton userId={u.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <EditarUsuarioModal 
          user={editingUser} 
          onClose={() => setEditingUser(null)} 
        />
      )}
    </div>
  );
}
