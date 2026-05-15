import Link from "next/link";
import { signup } from "../actions";
import styles from '../auth.module.css';
import AuthLayout from "../authLayout";
import RegistroForm from "./components/form";

export default async function RegistroPage(
	{searchParams,}: {searchParams: Promise<{ error?: string; message?: string }>;}
	) 
	{	
	const params = await searchParams;

	return (
		<AuthLayout subtitle="Crea tu cuenta pa">
			{/* Mensajes de Error y Éxito */}
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

			<RegistroForm singupAction={signup} />

			{/* Enlace al Login */}
			<div className={styles.footerText}>
				<p>
					¿Ya tienes cuenta?{' '}
					<Link href="/ingreso" className={styles.linkBold}>
						Inicia sesión
					</Link>
				</p>
			</div>					
		</AuthLayout>
	);
}