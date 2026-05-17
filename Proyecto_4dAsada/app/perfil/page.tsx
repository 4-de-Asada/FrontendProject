import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PerfilBody from "./components/PerfilBody";

export const metadata = {
  title: "Mi Perfil – Garra Deal",
  description: "Administra tu información personal en Garra Deal.",
};

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/ingreso");
  }

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("nombre, apellido, telefono, tipo, email_confirmado, url_comprobante, verificado, created_at")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <PerfilBody user={user} perfil={perfil} />
    </div>
  );
}
