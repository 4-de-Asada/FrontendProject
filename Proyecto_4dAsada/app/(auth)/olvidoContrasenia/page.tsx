import Link from "next/link";
import { olvidoContraseniaAction } from '../AutenticacionActions';
import styles from '../auth.module.css';
import AutenticacionLayout from "../AutenticacionLayout";

export default async function OlvidoContraseniaPage(
   {searchParams,}:{searchParams: Promise<{ error?: string, message?: string }>;}
   ) 
   {
   const params = await searchParams;

   return (
      <AutenticacionLayout subtitle="Recupera el acceso a tu cuenta">
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

        <p className="text-sm text-gray-600 mb-6 text-center">
            Ingresa tu número de cuenta y te enviaremos un enlace para restablecer tu contraseña a tu correo institucional.
        </p>

        <form className="space-y-6" action={olvidoContraseniaAction}>
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

            {/* Botón Principal */}
            <div>
            <button type="submit" className={styles.buttonPrimary}>
                Enviar enlace de recuperación
            </button>
            </div>
        </form>

        {/* Enlace de regreso al login */}
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
            ¿Recordaste tu contraseña?{' '}
            <Link href="/ingreso" className={styles.linkBold}>Inicia sesión</Link>
            </p>
        </div>

        {/* Caja de Información */}
        <div className={styles.infoBox}>
            <div className="flex-shrink-0 mt-0.5">
            <svg className={styles.infoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
            <div>
            <h4 className="text-sm font-bold text-gray-900">Correo Institucional</h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                El enlace llegará a tu cuenta @pcpuma.acatlan.unam.mx. Revisa también tu carpeta de spam.
            </p>
            </div>
        </div>
      </AutenticacionLayout>
   );
}
