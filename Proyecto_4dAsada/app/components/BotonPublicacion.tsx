"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";
import { useRouter } from "next/navigation";

interface BotonPublicacionProps {
  user: any; 
  profile: any;
  className?: string;
  children: React.ReactNode;
}

export default function BotonPublicacion({ user, profile, className, children }: BotonPublicacionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"no-auth" | "no-vendedor">("no-auth");
  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      setModalType("no-auth");
      setModalOpen(true);
      return;
    }

    if (profile?.tipo === "comprador") {
      setModalType("no-vendedor");
      setModalOpen(true);
      return;
    }

    if (profile?.tipo === "vendedor") {
      router.push("/publicar");
      return;
    }
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      
      <AuthModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        type={modalType} 
      />
    </>
  );
}
