import React from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-dark-blue/theme.css"; // Tema
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/login.css"; // Estilos personalizados
import { IoIosWater } from "react-icons/io";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Resposta do servidor:", result);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h2>Bem vindo de volta! <IoIosWater/> </h2>
      </div>
      <div className="right-panel">
        <h1>Entrar</h1>
        <p>Não tem uma conta? <a href="/">Cadastre-se</a></p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText 
          required
            placeholder="Email" 
            {...register("email")} 
            className="full-width" 
          />

          <Password 
          required
            placeholder="Sua senha" 
            {...register("password")} 
            className="full-width" 
            feedback={false} 
            toggleMask 
          />


          <Button 
            label="Entrar" 
            className="full-width p-button-rounded p-button-primary" 
          />

          <div className="divider">Ou entre com o Google</div>

          <div className="social-buttons">
            <Button 
              label="Google" 
              icon="pi pi-google" 
              className="p-button-outlined" 
            />
          </div>
        </form>
      </div>
    </div>
  );
}
