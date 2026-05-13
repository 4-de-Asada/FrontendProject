'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function signup(formData: FormData) {
   const supabase = await createClient()

   const numCuenta = formData.get('numCuenta') as string;
   const contrasenia = formData.get('contrasenia') as string;
   const confirmarContrasenia = formData.get('confirmarContrasenia') as string;
   const nombre = formData.get('nombre') as string;
   const apellido = formData.get('apellidos') as string;
   const telefono = formData.get('telefono') as string || null;

   const email = `${numCuenta}@pcpuma.acatlan.unam.mx`;

   // VALIDACIÓN 
   if (contrasenia !== confirmarContrasenia) {
      redirect('/registro?error=Las contrasenias no coinciden')
   }

   // Crear usuario en Supa
   const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: contrasenia,
      options: {
         // Le dice a Supabase que regrese a la app tras verificar, usando localhost como respaldo
         emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/ingreso/`,
      },
   })

   if (authError) {
      redirect('/registro?error=' + encodeURIComponent(authError.message))
   }

   // Insertar perfil en la tabla perfiles
   if (authData.user) {
      const { error: profileError } = await supabase
         .from('perfiles')
         .insert([
         {
            id: authData.user.id,
            nombre,
            apellido,
            telefono,
            tipo: 'comprador', 
         },
         ])

         console.log('OOOOOOOOOOOO', profileError)

      if (profileError) {
         console.error('Erroralcrearperfil:', profileError.message)
         redirect('/registro?error=ESTA MAL. No se pudo registrar el usuario.')         
      }
   }
   revalidatePath('/', 'layout');
   redirect('/ingreso?message=' + encodeURIComponent('¡Registro exitoso! Revisa tu correo institucional para confirmar tu cuenta.'));
}


export async function login(formData: FormData) {
  const supabase = await createClient()

  const numCuenta = formData.get('numCuenta') as string;
  const contrasenia = formData.get('contrasenia') as string;

  const email = `${numCuenta}@pcpuma.acatlan.unam.mx`

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
  redirect('/') // Redirige al inicio si el login es exitoso
}