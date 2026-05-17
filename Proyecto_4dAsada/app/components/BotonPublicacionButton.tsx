"use client";

import { useState } from "react";
import AutenticacionModal from "./AutenticacionModal";
import { useRouter } from "next/navigation";

interface BotonPublicacionButtonProps {
  user: any; 
  profile: any;
  className?: string;
  children: React.ReactNode;
}

export default function BotonPublicacionButton({ user, profile, className, children }: BotonPublicacionButtonProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoModal, setTipoModal] = useState<"no-auth" | "no-vendedor">("no-auth");
  const router = useRouter();

  const manejarClickButton = () => {
    if (!user) {
      setTipoModal("no-auth");
      setModalAbierto(true);
      return;
    }

    if (profile?.tipo === "comprador") {
      setTipoModal("no-vendedor");
      setModalAbierto(true);
      return;
    }

    if (profile?.tipo === "vendedor") {
      router.push("/publicar");
      return;
    }
  };

  return (
    <>
      <button onClick={manejarClickButton} className={className}>
        {children}
      </button>
      
      <AutenticacionModal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
        type={tipoModal} 
      />
    </>
  );
}
