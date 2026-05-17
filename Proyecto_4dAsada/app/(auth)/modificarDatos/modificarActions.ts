"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserDataAction(formData: FormData) {
  const supabase = await createClient();
  
  const nombre = formData.get("nombre") as string;
  const apellido = formData.get("apellido") as string;
  const telefono = formData.get("telefono") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  // Obtener datos actuales para no sobreescribir con vacíos si se usaron placeholders
  const { data: currentProfile } = await supabase
    .from("perfiles")
    .select("nombre, apellido, telefono")
    .eq("id", user.id)
    .single();

  // 1. Actualizar Perfil (solo si hay cambios)
  const updateData: any = {};
  if (nombre && nombre !== currentProfile?.nombre) updateData.nombre = nombre;
  if (apellido && apellido !== currentProfile?.apellido) updateData.apellido = apellido;
  if (telefono && telefono !== currentProfile?.telefono) updateData.telefono = telefono;

  if (Object.keys(updateData).length > 0) {
    const { error: profileError } = await supabase
      .from("perfiles")
      .update(updateData)
      .eq("id", user.id);

    if (profileError) return { error: profileError.message };
  }

  // 2. Actualizar Contraseña si se proporcionó
  if (password) {
    if (password !== confirmPassword) {
      return { error: "Las contraseñas no coinciden" };
    }
    if (password.length < 8) {
      return { error: "La contraseña debe tener al menos 8 caracteres" };
    }

    const { error: authError } = await supabase.auth.updateUser({
      password: password
    });

    if (authError) return { error: authError.message };
  }

  revalidatePath("/perfil");
  revalidatePath("/modificarDatos");
  return { success: true };
}
