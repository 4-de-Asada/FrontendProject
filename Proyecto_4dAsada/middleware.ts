import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

  if (!supabaseUrl || !supabaseKey) {
    console.warn('[middleware] Supabase env vars missing, skipping auth')
    return response
  }

  let supabase
  try {
    supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })
  } catch {
    return response
  }

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // 1. Verificar si el usuario está baneado
      const { data: perfil } = await supabase
        .from('perfiles')
        .select('baneado_permanente, baneado_hasta')
        .eq('id', user.id)
        .single()

      if (perfil) {
        const ahora = new Date()
        const esBaneoPermanente = perfil.baneado_permanente
        const esBaneoTemporal = perfil.baneado_hasta && new Date(perfil.baneado_hasta) > ahora

        if ((esBaneoPermanente || esBaneoTemporal) && request.nextUrl.pathname !== '/baneado') {
          return NextResponse.redirect(new URL('/baneado', request.url))
        }
      }

      // 2. Redirección dashboard (existente)
      if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return response
      }
    } else if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/ingreso', request.url))
    }
  } catch {
    // Supabase unavailable, let request through
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
