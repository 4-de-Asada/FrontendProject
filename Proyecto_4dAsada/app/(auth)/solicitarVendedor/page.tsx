import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AutenticacionLayout from "../AutenticacionLayout";
import SolicitarVendedorForm from "./SolicitarVendedorForm";

export default async function SolicitarVendedorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/ingreso");
  }

  const { data: profile } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile?.verificado) {
    redirect("/perfil");
  }

  return (
    <AutenticacionLayout subtitle="Sube tu comprobante (tira de materias) para validar tu cuenta">
      <SolicitarVendedorForm profile={profile} />
    </AutenticacionLayout>
  );
}
