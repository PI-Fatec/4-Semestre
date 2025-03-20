import React from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import "primereact/resources/themes/lara-dark-blue/theme.css"; // Tema
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tag } from 'primereact/tag';
        
import "../styles/login.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cadastro() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Cadastro bem-sucedido
        toast.success("Cadastro realizado com sucesso! ");
        console.log("Usuário registrado:", result.user);
        
        // Redirecionar ou fazer login automático se necessário
        // history.push('/login');
      } else {
        // Tratar erros específicos do servidor
        if (result.error.includes("já está cadastrado")) {
          toast.error(result.error, {
            icon: "⚠️",
            autoClose: 6000
          });
        } else {
          toast.error(result.error || "Erro ao realizar cadastro");
        }
      }
      
    } catch (error) {
      // Erros de rede/exceção
      toast.error("Não foi possível conectar ao servidor", {
        
      });
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h2>Bem vindo ao dashboard do P.I</h2>
      </div>
      <div className="right-panel">
        <h1>Criar conta</h1>
        <p>Já possui uma conta? <a href="/login">Login</a></p>

        <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
          <div className="input-group">
            <InputText placeholder="Nome"  {...register("firstName")}  required/>
            <InputText placeholder="Sobrenome"  {...register("lastName")} required/>
          </div>

          <InputText placeholder="Email" {...register("email")} className="full-width" required />
          <Password placeholder="Sua senha" {...register("password")} className="full-width" required feedback={false} toggleMask />

          

          <Button label="Criar conta" className="full-width p-button-rounded p-button-primary mt-5" />

          
        </form>
      </div>
    </div>
  );
}
