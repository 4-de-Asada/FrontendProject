'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function enviarReporteAction(formData: FormData): Promise<{ type: "success" | "error"; text: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { type: "error", text: "Debes iniciar sesión para enviar un reporte." }

  const numCuentaReportado = formData.get('numCuenta') as string
  const motivo = formData.get('motivo') as string
  const descripcion = formData.get('descripcion') as string

  if (!numCuentaReportado || !motivo) {
    return { type: "error", text: "El número de cuenta y el motivo son obligatorios." }
  }

  // 1. Registrar el reporte en la tabla 'reportes'
  const { error: reportError } = await supabase
    .from('reportes')
    .insert([{
      id_reportador: user.id,
      num_cuenta_reportado: numCuentaReportado,
      motivo,
      descripcion
    }])

  if (reportError) {
    return { type: "error", text: "No se pudo registrar el reporte. Inténtalo más tarde." }
  }

  // 2. Buscar al usuario reportado en la tabla 'perfiles' por su num_cuenta
  // Nota: num_cuenta debe estar poblado en la base de datos para que esto funcione
  const { data: perfilReportado, error: searchError } = await supabase
    .from('perfiles')
    .select('id, strikes')
    .eq('num_cuenta', numCuentaReportado)
    .single()

  if (searchError || !perfilReportado) {
    // Si no encontramos al usuario por num_cuenta, aún registramos el reporte pero no podemos aplicar strikes automáticos
    return { type: "success", text: "Reporte recibido. El equipo revisará los detalles ya que el número de cuenta no fue validado automáticamente." }
  }

  // 3. Incrementar strikes y aplicar sanciones
  const nuevosStrikes = (perfilReportado.strikes || 0) + 1
  let updateData: any = { strikes: nuevosStrikes }

  if (nuevosStrikes === 3) {
    // Baneo de 30 días
    const fechaBan = new Date()
    fechaBan.setDate(fechaBan.getDate() + 30)
    updateData.baneado_hasta = fechaBan.toISOString()
  } else if (nuevosStrikes > 3) {
    // Baneo permanente
    updateData.baneado_permanente = true
  }

  const { error: updateError } = await supabase
    .from('perfiles')
    .update(updateData)
    .eq('id', perfilReportado.id)

  if (updateError) {
    return { type: "success", text: "Reporte recibido, pero hubo un problema al actualizar las sanciones automáticamente." }
  }

  revalidatePath('/admin')
  return { type: "success", text: "Reporte enviado con éxito. Gracias por ayudar a mantener segura la comunidad." }
}
