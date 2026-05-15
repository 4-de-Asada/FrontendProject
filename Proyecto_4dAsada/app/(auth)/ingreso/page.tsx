import Link from "next/link";
import { login } from '../actions';
import styles from '../auth.module.css'; // Subimos un nivel para encontrar el CSS
import AuthLayout from "../authLayout";

export default async function LoginPage(  
   {searchParams,}:{searchParams: Promise<{ error?: string, message?: string }>;}
   )    
   {
   
   const params = await searchParams;

   return (
      <AuthLayout subtitle="Inicia sesión en tu cuenta pa">
         {params?.error && (
            <div className={styles.errorAlert}>
               {params.error}
            </div>
         )}

         {params?.message && (
				<div className={styles.successAlert}>
					{params.message}
				</div>
			)}

         <form className="space-y-6" action={login}>            
            {/* Input Numero de cuenta */}
            <div>
               <label htmlFor="numCuenta" className={styles.label}>Número de Cuenta</label>
               <div className={styles.inputWrapper}>
                  <input
                     id="numCuenta"          
                     name="numCuenta"        
                     type="text"             
                     inputMode="numeric"     
                     pattern="[0-9]{9}"      
                     maxLength={9}           
                     required
                     title="Ingresa los 9 dígitos de tu número de cuenta"
                     placeholder="Ej: 312345678"
                     className={styles.input}
                  />
               </div>
            </div>

            {/* Input Contraseña */}
            <div>
               <label htmlFor="contrasenia" className={styles.label}>Contraseña</label>
               <div className="mt-1">
                  <input
                     id="contrasenia"
                     name="contrasenia"
                     type="password"
                     maxLength={64}
                     required
                     placeholder="Tu contraseña"
                     className={styles.input}
                  />
               </div>
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between">
               <div className="flex items-center">
                  <input
                     id="remember-me"
                     name="remember-me"
                     type="checkbox"
                     className="h-4 w-4 text-[#041E3A] focus:ring-[#041E3A] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Recordarme</label>
               </div>
            
               <div className="text-sm">
                  <Link href="/olvidoContrasenia" className={styles.link}>¿Olvidaste tu contraseña?</Link>
               </div>
            </div>

            {/* Botón Principal */}
            <div>
            <button type="submit" className={styles.buttonPrimary}>Iniciar Sesión</button>
            </div>
         </form>

         {/* Enlace a Registro */}
         <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
               ¿No tienes cuenta?{' '}
               <Link href="/registro" className={styles.linkBold}>Regístrate aquí</Link>
            </p>
         </div>

         {/* Caja de Información */}
         <div className={styles.infoBox}>
            <div className="flex-shrink-0 mt-0.5">
               <svg className={styles.infoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
            </div>
            <div>
               <h4 className="text-sm font-bold text-gray-900">Acceso Seguro</h4>
               <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Solo estudiantes activos con correo institucional @pcpuma.acatlan.unam.mx pueden acceder a la plataforma.
               </p>
            </div>
         </div>               
      </AuthLayout>
   );
}