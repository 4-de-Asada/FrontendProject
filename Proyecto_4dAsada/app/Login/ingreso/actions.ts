'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server' 

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
    redirect('/Login/ingreso?error=Credenciales%20invalidas')
  }

  revalidatePath('/', 'layout')
  redirect('/') // Redirige al inicio si el login es exitoso
}