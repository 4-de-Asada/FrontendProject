import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AutenticacionLayout from "../AutenticacionLayout";
import ModificarDatosForm from "./ModificarDatosForm";

export default async function ModificarDatosPage() {
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

  return (
    <AutenticacionLayout subtitle="Actualiza tu información personal y contraseña">
      <ModificarDatosForm profile={profile} />
    </AutenticacionLayout>
  );
}
