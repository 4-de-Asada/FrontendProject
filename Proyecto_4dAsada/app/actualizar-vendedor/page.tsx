import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ActualizarVendedorBody from "./components/ActualizarVendedorBody";

export const metadata = {
  title: "Convertirme en Vendedor – Garra Deal",
  description: "Sube tu comprobante para vender en la comunidad de FES Acatlán.",
};

export default async function ActualizarVendedorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/ingreso");

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("nombre, tipo, url_comprobante, verificado")
    .eq("id", user.id)
    .single();

  // Si ya es vendedor, mandarlo al perfil
  if (perfil?.tipo === "vendedor") redirect("/perfil");

  return (
    <div className="min-h-screen bg-gray-50">
      <ActualizarVendedorBody perfil={perfil} />
    </div>
  );
}
