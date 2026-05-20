'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const mov = useRouter();

    return (
        <div
            style={{
                background: "#FBA922",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: "20px",
            }}>
            <h1
                style={{
                    color: "#002855",
                    textAlign: "center",
                    fontFamily: "Magra",
                    fontSize: "28px",
                    marginTop: "50px",
                    fontWeight: "bold",
                }}>
                Lo siento, no pudimos encontrar la página que busca
            </h1>

            <img
                src="/cat.png"
                alt="NotFound"
                style={{
                    height: "50vh",
                    display: "block",
                    margin: "auto",
                }}
            />
            <p
                style={{
                    color: "#002855",
                    textAlign: "center",
                    fontFamily: "Magra",
                    fontSize: "20px",
                    marginBottom: "50px",
                    fontWeight: "bold",
                    maxWidth: "650px",
                }}>
                Buscamos por todo el acatianguis el puesto de mercancía que buscas,
                pero... al parecer era puesto de un dinosaurio que ya no pertenece a la FESA :/
            </p>

            <button
                onClick={() => mov.back()}
                style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontFamily: "Magra",
                    fontSize: "20px",
                    marginBottom: "75px",
                    borderRadius: "35px",
                    background: "#002855",
                    padding: "10px 55px",
                    transition: ".3s",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0px)";
                }}>
                Buscar otras mercancías
            </button>
        </div>
    );
}