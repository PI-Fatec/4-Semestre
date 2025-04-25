import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputEmail from "../components/Inputemail";
import Button from "../components/Button";
import InputPassword from "../components/InputSenha";
import InputText from "../components/InputText";

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const sanitizedData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
    };
    console.log("Dados enviados:", sanitizedData);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Cadastro realizado com sucesso! ");
      } else {
        if (result.error.includes("já está cadastrado")) {
          toast.error(result.error, {
            autoClose: 6000,
          });
        } else {
          toast.error(result.error || "Erro ao realizar cadastro");
        }
      }
    } catch (error) {
      toast.error("Não foi possível conectar ao servidor", {});
      console.error("Erro na requisição:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel ">
        <h2 className="text-4xl text-center">Bem vindo ao dashboard do AgroSense</h2>
      </div>
      <div className="right-panel">
        <h1 className="text-center mb-8 text-4xl">Criar conta</h1>
        <p className="mb-4">
          Já possui uma conta? <a href="/login">Login</a>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
          <div className="input-group mb-5">
            <InputText
              placeholder="Nome"
              register={register}
              name="firstName"
              error={errors.firstName}
            />
            <InputText
              placeholder="Sobrenome"
              register={register}
              name="lastName"
              error={errors.lastName}
            />
          </div>

          <InputEmail register={register} />

          <InputPassword register={register} />

          <Button
            loading={isSubmitting}
            label={isSubmitting ? "Cadastrando..." : "Criar conta"}
            className="full-width"
          />
        </form>
      </div>
    </div>
  );
}
