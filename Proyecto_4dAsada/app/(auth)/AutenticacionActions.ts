'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function registrarUsuarioAction(formData: FormData) {
   const supabase = await createClient()

   const nombre = formData.get('nombre') as string;
   const apellidos = formData.get('apellidos') as string;
   const numeroCuenta = formData.get('numCuenta') as string;
   const esVendedor = formData.get('esVendedor') === 'on';
   const telefono = formData.get('telefono') as string;
   const contrasenia = formData.get('contrasenia') as string;
   const confirmarContrasenia = formData.get('confirmarContrasenia') as string;
   const documento = formData.get('documento') as File | null;

   if (!nombre || !apellidos || !numeroCuenta || !contrasenia || !confirmarContrasenia) {
      redirect('/registro?error=' + encodeURIComponent('Todos los campos obligatorios deben ser completados.'))
   }

   if (contrasenia !== confirmarContrasenia) {
      redirect('/registro?error=' + encodeURIComponent('Las contraseñas no coinciden.'))
   }

   if (contrasenia.length < 8) {
      redirect('/registro?error=' + encodeURIComponent('La contraseña debe tener al menos 8 caracteres.'))
   }

   if (!/^[0-9]{9}$/.test(numeroCuenta)) {
      redirect('/registro?error=' + encodeURIComponent('El número de cuenta debe tener 9 dígitos.'))
   }

   if (esVendedor) {
      if (!telefono || !/^[0-9]{10}$/.test(telefono)) {
         redirect('/registro?error=' + encodeURIComponent('Para ser vendedor, el teléfono de 10 dígitos es obligatorio.'))
      }
      if (!documento || documento.size === 0) {
         redirect('/registro?error=' + encodeURIComponent('Para ser vendedor, debes subir tu tira de materias.'))
      }
   }

   const email = `${numeroCuenta}@pcpuma.acatlan.unam.mx`;

   const { data: datosAutenticacion, error: errorAutenticacion } = await supabase.auth.signUp({
      email,
      password: contrasenia,
      options: {
         emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/ingreso/`,
         data: {
            nombre,
            apellidos,
         }
      },
   })

   if (errorAutenticacion) {
      if (errorAutenticacion.message.toLowerCase().includes("user already registered")) {
         redirect('/ingreso?error=' + encodeURIComponent('Este número de cuenta ya está registrado. Si no fuiste tú, por favor utiliza la opción "Olvidé mi contraseña" para recuperar tu cuenta con tu correo institucional.'));
      }
      redirect('/registro?error=' + encodeURIComponent(errorAutenticacion.message))
   }

   if (datosAutenticacion.user) {
      let urlComprobante = null;

      if (esVendedor && documento) {
         const fileExt = documento.name.split('.').pop();
         const fileName = `${datosAutenticacion.user.id}-${Math.random()}.${fileExt}`;
         const filePath = `comprobantes/${fileName}`;

         const { error: uploadError } = await supabase.storage
            .from('documentos')
            .upload(filePath, documento);

         if (uploadError) {
            redirect('/registro?error=' + encodeURIComponent('Error al subir el comprobante. Intenta de nuevo.'))
         }

         const { data: { publicUrl } } = supabase.storage
            .from('documentos')
            .getPublicUrl(filePath);
         
         urlComprobante = publicUrl;
      }

      const { error: errorPerfil } = await supabase
         .from('perfiles')
         .insert([
            {
               id: datosAutenticacion.user.id,
               nombre,
               apellido: apellidos,
               telefono: telefono || null,
               tipo: esVendedor ? 'vendedor' : 'comprador',
               url_comprobante: urlComprobante,
               verificado: false,
            },
         ])

      if (errorPerfil) {
         redirect('/registro?error=' + encodeURIComponent('No se pudo completar el registro del perfil.'))         
      }
   }

   revalidatePath('/', 'layout');
   redirect('/ingreso?message=' + encodeURIComponent('¡Registro exitoso! Revisa tu correo institucional para confirmar tu cuenta.'));
}

export async function iniciarSesionAction(formData: FormData) {
  const supabase = await createClient()

  const numeroCuenta = formData.get('numCuenta') as string;
  const contrasenia = formData.get('contrasenia') as string;

  const email = `${numeroCuenta}@pcpuma.acatlan.unam.mx`

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: contrasenia,
  })

  if (error) {
    redirect('/ingreso?error=Credenciales%20invalidas')
  }

  revalidatePath('/', 'layout')
  redirect('/?login=success')
}

export async function olvidoContraseniaAction(formData: FormData) {
   const supabase = await createClient()

   const numeroCuenta = formData.get('numCuenta') as string;

   if (!numeroCuenta || !/^[0-9]{9}$/.test(numeroCuenta)) {
      redirect('/olvidoContrasenia?error=' + encodeURIComponent('Por favor, ingresa un número de cuenta válido de 9 dígitos.'))
   }

   const email = `${numeroCuenta}@pcpuma.acatlan.unam.mx`

   const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/modificarDatos/`,
   })

   if (error) {
      redirect('/olvidoContrasenia?error=' + encodeURIComponent(error.message))
   }

   redirect('/olvidoContrasenia?message=' + encodeURIComponent('Se ha enviado un enlace de recuperación a tu correo institucional.'))
}

export async function cerrarSesionAction() {
   const supabase = await createClient()
   await supabase.auth.signOut()
   revalidatePath('/', 'layout')
   redirect('/?logout=success')
}

// --- ACCIONES DE PERFIL ---

export async function updatePerfil(
  formData: FormData
): Promise<{ type: "success" | "error"; text: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { type: "error", text: "No hay sesión activa." };

  const nombre   = (formData.get("nombre")   as string)?.trim();
  const apellido = (formData.get("apellido") as string)?.trim();
  const telefono = (formData.get("telefono") as string)?.trim() || null;

  if (!nombre || !apellido) {
    return { type: "error", text: "Nombre y apellidos son obligatorios." };
  }

  if (telefono && !/^[0-9]{10}$/.test(telefono)) {
    return { type: "error", text: "El teléfono debe tener 10 dígitos." };
  }

  const { error } = await supabase
    .from("perfiles")
    .update({ nombre, apellido, telefono })
    .eq("id", user.id);

  if (error) return { type: "error", text: "No se pudieron guardar los cambios." };

  revalidatePath("/perfil");
  return { type: "success", text: "Datos actualizados correctamente." };
}

export async function uploadComprobante(
  formData: FormData
): Promise<{ type: "success" | "error"; text: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { type: "error", text: "No hay sesión activa." };

  const documento = formData.get("documento") as File | null;

  if (!documento || documento.size === 0) {
    return { type: "error", text: "Selecciona un archivo antes de enviar." };
  }

  const fileExt = documento.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `comprobantes/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("documentos")
    .upload(filePath, documento, { upsert: true });

  if (uploadError) {
    return { type: "error", text: "Error al subir el archivo. Intenta de nuevo." };
  }

  const { data: { publicUrl } } = supabase.storage
    .from("documentos")
    .getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("perfiles")
    .update({ url_comprobante: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return { type: "error", text: "Archivo subido pero no se pudo guardar el enlace." };
  }

  revalidatePath("/perfil");
  return { type: "success", text: "Comprobante enviado. El equipo revisará tu solicitud." };
}

// --- ACCIONES DE ADMINISTRADOR ---

export async function eliminarUsuarioAdminAction(userId: string) {
   const supabaseAdmin = (await import('@/utils/supabase/admin')).createAdminClient();
   const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
   if (error) throw new Error(error.message);
   revalidatePath('/admin');
}

export async function actualizarRolUsuarioAction(userId: string, newRole: 'comprador' | 'vendedor' | 'admin') {
   const supabase = await createClient();
   const { error } = await supabase
      .from('perfiles')
      .update({ tipo: newRole })
      .eq('id', userId);
   if (error) throw new Error(error.message);
   revalidatePath('/admin');
}

export async function verificarEmailUsuarioAction(userId: string) {
   const supabaseAdmin = (await import('@/utils/supabase/admin')).createAdminClient();
   const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      email_confirm: true
   });
   if (error) throw new Error(error.message);
   revalidatePath('/admin');
}

export async function validarVendedorAction(userId: string, status: boolean) {
   const supabase = await createClient();
   const { error } = await supabase
      .from('perfiles')
      .update({ verificado: status })
      .eq('id', userId);
   if (error) throw new Error(error.message);
   revalidatePath('/admin');
}

export async function actualizarPerfilAdminAction(userId: string, data: { nombre: string, apellido: string, telefono: string }) {
   const supabase = await createClient();
   const { error } = await supabase
      .from('perfiles')
      .update({
         nombre: data.nombre,
         apellido: data.apellido,
         telefono: data.telefono || null
      })
      .eq('id', userId);
   if (error) throw new Error(error.message);
}
