import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import BotonPublicacion from "./BotonPublicacion";
import NavbarLinks from "./NavbarLinks";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100 shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-14">

        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#1a2b5e]/20 bg-[#1a2b5e]">
            <Image
              src="https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=64&q=80"
              alt="UNAM campus"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="font-bold text-[#1a2b5e] text-base tracking-tight">
            Garra Deal
          </span>
        </Link>

        {/* Enlaces centrados - NavbarLinks maneja el estado activo en el cliente */}
        <NavbarLinks />

        <div className="flex items-center gap-3">
          {/* Botón de publicar con validación */}
          <BotonPublicacion 
            user={user} 
            profile={profile}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#1a2b5e] transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
            </svg>
            Publicar
          </BotonPublicacion>

          {/* Menú de usuario (maneja internamente sesión e invitado) */}
          <UserMenu user={user} profile={profile} />
        </div>

      </nav>
    </header>
  );
}
