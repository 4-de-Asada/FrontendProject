# Guía de Configuración: Sistema de Reportes y Sanciones

Para que el sistema de reportes funcione correctamente, debes ejecutar el siguiente código SQL en el **SQL Editor** de tu panel de Supabase.

## 1. Configuración de la Base de Datos

```sql
-- 1. Crear tabla de reportes
CREATE TABLE IF NOT EXISTS public.reportes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    id_reportador UUID REFERENCES public.perfiles(id) ON DELETE SET NULL,
    num_cuenta_reportado TEXT NOT NULL,
    motivo TEXT NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Habilitar RLS para reportes
ALTER TABLE public.reportes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Los usuarios autenticados pueden crear reportes" 
ON public.reportes FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id_reportador);

CREATE POLICY "Los administradores pueden ver todos los reportes" 
ON public.reportes FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM perfiles 
    WHERE id = auth.uid() AND tipo = 'admin'
  )
);

-- 3. Modificar tabla perfiles para soportar sanciones y número de cuenta
ALTER TABLE public.perfiles 
ADD COLUMN IF NOT EXISTS num_cuenta TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS strikes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS baneado_hasta TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS baneado_permanente BOOLEAN DEFAULT false;

-- 4. (Opcional) Poblar num_cuenta para usuarios existentes basado en su email
-- Esto solo funciona si el email sigue el patrón numeroCuenta@pcpuma.acatlan.unam.mx
-- UPDATE perfiles 
-- SET num_cuenta = split_part((SELECT email FROM auth.users WHERE auth.users.id = perfiles.id), '@', 1);
```

## 2. Lógica de Sanciones Automáticas

El sistema está configurado para actuar de la siguiente manera al recibir un reporte:
- **Strikes 1 y 2**: Solo se registra el reporte y se incrementa el contador.
- **Strike 3**: La cuenta se bloquea automáticamente por **30 días**.
- **Strike 4 o más**: La cuenta se bloquea de forma **permanente**.

## 3. Verificación de Baneos

El `middleware.ts` del proyecto ha sido actualizado para verificar estas condiciones en cada petición. Si un usuario intenta acceder estando baneado, será redirigido a una página informativa.
