'use client'

import Link from "next/link";
import styles from '../../auth.module.css';
import {useState} from 'react';

export default function RegistroForm({singupAction}: {singupAction: any }) {	
	const [esVendedor, setEsVendedor] = useState(false);
    return (<>
		<div className={styles.formGroup}>
            {/* Formulario */}
            <form className={styles.formSpacing} action={singupAction}>
                
                {/* Input Nombre y Apellido */}
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
                                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                                required 
                                placeholder="Ej. Hana" 
                                title="No uses numeros ni simbolos especiales"
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
                                pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                                required 
                                placeholder="Ej. Montana" 
                                title="No uses numeros ni simbolos especiales"
                                className={styles.input} 
                            />
                        </div>
                    </div>
                </div>

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

                {/* CHECKBOX PARA SER VENDEDOR */}
                <div className={styles.checkboxWrapper}>
                    <label className={styles.checkboxLabel}>
                        <input 
                            type="checkbox" 
                            name="esVendedor"
                            checked={esVendedor}
                            onChange={(e) => setEsVendedor(e.target.checked)}
                        />
                        Quiero vender productos
                    </label>
                </div>

                {/* Input Teléfono */}
                <div>
                    <label htmlFor="telefono" className={styles.label}>
                        Teléfono {esVendedor ? "(Obligatorio)" : "(Opcional)"}
                    </label>
                    <div className={styles.inputWrapper}>
                        <input 
                            id="telefono"
                            name="telefono" 
                            type="tel" 
                            pattern="[0-9]{10}"
                            maxLength={10}
                            required={esVendedor}
                            title="Ingresa los 10 dígitos de tu número celular"
                            placeholder="55 1234 5678" 
                            className={styles.input} 
                        />
                    </div>
                </div>
                
                {/* SECCIÓN DINÁMICA: SUBIR DOCUMENTO */}
                {esVendedor && (
                    <div className={styles.dynamicSection}>
                        <label htmlFor="documento" className={styles.label}>
                            Tira de materias
                        </label>
                        <div className={styles.inputWrapper}>
                            <input 
                                id="documento"
                                name="documento" 
                                type="file" 
                                accept=".pdf, .jpg, .png, .jpeg"
                                required={esVendedor}
                                className={styles.input}
                                title="pdf, jpg, png, jpeg"
                            />
                        </div>
                        <p className={styles.helpText}>Para vender, necesitamos verificar tu identidad.</p>
                    </div>
                )}

                {/* Input Contraseña y Confirmar Contraseña */}
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
        </div>
	</>);
}