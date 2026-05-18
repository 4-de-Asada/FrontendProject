"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function solicitarVendedorAction(formData: FormData) {
  const supabase = await createClient();
  
  const telefono = formData.get("telefono") as string;
  const documento = formData.get("documento") as File;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  if (!telefono || !/^[0-9]{10}$/.test(telefono)) {
    return { error: "El teléfono es obligatorio y debe tener 10 dígitos" };
  }

  if (!documento || documento.size === 0) {
    return { error: "El documento es obligatorio" };
  }

  // 1. Subir documento al bucket 'documentos'
  const fileExt = documento.name.split('.').pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `comprobantes/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('documentos')
    .upload(filePath, documento);

  if (uploadError) {
    return { error: "Error al subir el documento: " + uploadError.message };
  }

  // 2. Obtener URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('documentos')
    .getPublicUrl(filePath);

  // 3. Actualizar perfil
  const { error: profileError } = await supabase
    .from("perfiles")
    .update({
      telefono,
      tipo: 'vendedor',
      url_comprobante: publicUrl,
      verificado: false
    })
    .eq("id", user.id);

  if (profileError) {
    return { error: "Error al actualizar el perfil: " + profileError.message };
  }

  revalidatePath("/perfil");
  return { success: true };
}
