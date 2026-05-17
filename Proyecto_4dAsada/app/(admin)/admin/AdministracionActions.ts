"use server";
import * as AutenticacionActions from "@/app/(auth)/AutenticacionActions";
import { revalidatePath } from "next/cache";

export async function actualizarRolUsuarioAction(userId: string, formData: FormData) {
  const newRole = formData.get("tipo") as 'comprador' | 'vendedor' | 'admin';
  await AutenticacionActions.actualizarRolUsuarioAction(userId, newRole);
}

export async function actualizarPerfilUsuarioAction(userId: string, formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const apellido = formData.get("apellido") as string;
  const telefono = formData.get("telefono") as string;

  await AutenticacionActions.actualizarPerfilAdminAction(userId, { nombre, apellido, telefono });
  revalidatePath("/admin");
}
