'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function registrarUsuarioAction(formData: FormData) {
   const supabase = await createClient()

   // Extracción de datos
   const nombre = formData.get('nombre') as string;
   const apellidos = formData.get('apellidos') as string;
   const numeroCuenta = formData.get('numCuenta') as string;
   const esVendedor = formData.get('esVendedor') === 'on';
   const telefono = formData.get('telefono') as string;
   const contrasenia = formData.get('contrasenia') as string;
   const confirmarContrasenia = formData.get('confirmarContrasenia') as string;
   const documento = formData.get('documento') as File | null;

   // 1. Validaciones básicas
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

   // 2. Validaciones específicas para vendedor
   if (esVendedor) {
      if (!telefono || !/^[0-9]{10}$/.test(telefono)) {
         redirect('/registro?error=' + encodeURIComponent('Para ser vendedor, el teléfono de 10 dígitos es obligatorio.'))
      }
      if (!documento || documento.size === 0) {
         redirect('/registro?error=' + encodeURIComponent('Para ser vendedor, debes subir tu tira de materias.'))
      }
   }

   const email = `${numeroCuenta}@pcpuma.acatlan.unam.mx`;

   // 3. Registro en Supabase Auth
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
      // Manejo de cuenta ya existente (Flujo de Recuperación)
      if (errorAutenticacion.message.toLowerCase().includes("user already registered") || 
          errorAutenticacion.message.toLowerCase().includes("usuario ya registrado")) {
         redirect('/ingreso?error=' + encodeURIComponent('Este número de cuenta ya está registrado. Si no fuiste tú, por favor utiliza la opción "Olvidé mi contraseña" para recuperar tu cuenta con tu correo institucional.'));
      }
      redirect('/registro?error=' + encodeURIComponent(errorAutenticacion.message))
   }

   if (datosAutenticacion.user) {
      let urlComprobante = null;

      // 4. Carga de documento si es vendedor
      if (esVendedor && documento) {
         const fileExt = documento.name.split('.').pop();
         const fileName = `${datosAutenticacion.user.id}-${Math.random()}.${fileExt}`;
         const filePath = `comprobantes/${fileName}`;

         const { error: uploadError } = await supabase.storage
            .from('documentos')
            .upload(filePath, documento);

         if (uploadError) {
            console.error('Error al subir documento:', uploadError.message);
            // Podríamos decidir si fallar todo el registro o continuar sin el doc
            // Por ahora, lanzamos error ya que es obligatorio para vendedores
            redirect('/registro?error=' + encodeURIComponent('Error al subir el comprobante. Intenta de nuevo.'))
         }

         const { data: { publicUrl } } = supabase.storage
            .from('documentos')
            .getPublicUrl(filePath);
         
         urlComprobante = publicUrl;
      }

      // 5. Insertar perfil en la tabla perfiles
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
         console.error('Error al crear perfil:', errorPerfil.message)
         // Nota: En un entorno real, aquí se debería limpiar el usuario de Auth si falla el perfil
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

  const data = {
    email: email,
    password: contrasenia,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Aquí podrías redirigir a una página de error o manejarlo con estados
    redirect('/ingreso?error=Credenciales%20invalidas')
  }

  revalidatePath('/', 'layout')
  redirect('/?login=success') // Redirige al inicio con parámetro de éxito
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

   // --- ACCIONES DE ADMINISTRADOR ---

   export async function eliminarUsuarioAdminAction(userId: string) {
      const supabaseAdmin = (await import('@/utils/supabase/admin')).createAdminClient();

      // Borrar de auth.users (esto borra en cascada en perfiles si está configurado)
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