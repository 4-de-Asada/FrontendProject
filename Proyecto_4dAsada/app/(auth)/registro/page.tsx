import Link from "next/link";
import { signup } from "../actions";
import styles from '../auth.module.css';
import AuthLayout from "../authLayout";

export default async function RegisterPage(
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

			{/* Formulario */}
			<form className={styles.formSpacing} action={signup}>
				
				{/* Nombre y Apellido (Siempre 2 columnas) */}
				<div className={styles.grid2}>
					<div>
						<label htmlFor="nombre" className={styles.label}>Nombre</label>
						<div className={styles.inputWrapper}>
							<input 	
								id="nombre"	
								name="nombre" 
								type="text"
								minLength={2}
								maxLength={50} 
								required 
								placeholder="Ej. Hana" 
								className={styles.input} 
							/>
						</div>
					</div>
					<div>
						<label htmlFor="apellidos" className={styles.label}>Apellido s</label>
						<div className={styles.inputWrapper}>
							<input
								id="apellidos" 
								name="apellidos" 
								type="text" 
								minLength={2}
								maxLength={100} 
								required 
								placeholder="Ej. Montana" 
								className={styles.input} 
							/>
						</div>
					</div>
				</div>

				{/* Correo Institucional
				<div>
					<label className={styles.label}>Numero de cuenta</label>
					<div className={styles.inputWrapper}>
						<input 
							name="email" 
							type="email" 
							required 
							pattern="^[a-zA-Z0-9._%+-]+@pcpuma\.acatlan\.unam\.mx$"
							title="Debes usar tu correo @pcpuma.acatlan.unam.mx"
							placeholder="usuario@pcpuma.acatlan.unam.mx"
							className={styles.input} 
						/>
					</div>
				</div> */}

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

				{/* Teléfono */}
				<div>
					<label htmlFor="telefono" className={styles.label}>Teléfono (Opcional)</label>
					<div className={styles.inputWrapper}>
						<input 
							id="telefono"
							name="telefono" 
							type="tel" 
							pattern="[0-9]{10}"
							maxLength={10}
							title="Ingresa los 10 dígitos de tu número celular"
							placeholder="55 1234 5678" 
							className={styles.input} 
						/>
					</div>
				</div>

				<div className={styles.gridVertical}>
					<div>
						<label htmlFor="contrasenia" className={styles.label}>Contraseña</label>
						<div className={styles.inputWrapper}>
							<input 
								id="contrasenia"
								name="contrasenia" 
								type="password" 
								required 
								minLength={8} 
								maxLength={64}
								placeholder="••••••••" 
								className={styles.input} 
							/>
						</div>
					</div>
					<div>
						<label htmlFor="confirmarContrasenia" className={styles.label}>Confirma contraseña</label>
						<div className={styles.inputWrapper}>
							<input 
								id="confirmarContrasenia"
								name="confirmarContrasenia" 
								type="password" 
								required 
								minLength={8} 
								maxLength={64}
								placeholder="••••••••" 
								className={styles.input} 
							/>
						</div>
					</div>
				</div>

				{/* Botón Principal */}
				<div>
					<button type="submit" className={styles.buttonPrimary}>
						Registrarme
					</button>
				</div>
			</form>

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