import Link from "next/link";
import { registrarUsuarioAction } from "../AutenticacionActions";
import styles from '../auth.module.css';
import AutenticacionLayout from "../AutenticacionLayout";
import RegistroForm from "./components/RegistroForm";

export default async function RegistroPage(
	{searchParams,}: {searchParams: Promise<{ error?: string; message?: string }>;}
	) 
	{	
	const params = await searchParams;

	return (
		<AutenticacionLayout subtitle="Crea tu cuenta pa">
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

			<RegistroForm singupAction={registrarUsuarioAction} />

			{/* Enlace al Login */}
			<div className={styles.footerText}>
				<p>
					¿Ya tienes cuenta?{' '}
					<Link href="/ingreso" className={styles.linkBold}>
						Inicia sesión
					</Link>
				</p>
			</div>					
		</AutenticacionLayout>
	);
}