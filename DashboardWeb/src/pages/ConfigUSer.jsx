/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FiMail, FiLock, FiKey } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import InputPassword from "../components/InputSenhatt";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/MenuMoblie";

export default function UpdateUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userData");

    if (!authToken) {
      navigate("/login");
      return;
    }

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setEmail(userData.email);
    }

    setLoading(false);
  }, [navigate]);

  const [selectedUser] = useState(() => {
    const userData = localStorage.getItem("userData");
    try {
      return userData ? JSON.parse(userData) : { fullName: "Usuário" };
    } catch (error) {
      console.error("Erro ao ler userdata:", error);
      return { fullName: "Usuário" };
    }
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("userData"));
  
    if (!authToken || !storedUser) {
      toast.error("Erro de autenticação. Faça login novamente.");
      navigate("/login");
      return;
    }
  
    // Verificar se precisa de senha antiga
    if (password && !oldPassword) {
      toast.error("Por favor, informe a senha atual para alterar a senha");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({
          email,
          password: password || undefined,
          oldPassword: oldPassword || undefined
        })
      });
  
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Usuário atualizado com sucesso!");
        localStorage.setItem("userData", JSON.stringify({ 
          ...storedUser, 
          email 
        }));
        setPassword("");
        setOldPassword("");
      } else {
        if (response.status === 401) {
          toast.error("Sessão expirada. Faça login novamente.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          navigate("/login");
        } else {
          toast.error(data.error || "Erro ao atualizar usuário.");
        }
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    }

    
  }

    return (
      <div className="flex min-h-screen">
         
      <Sidebar />
      <Navbar/>
     
      <div className="flex-1 ml-0 md:ml-64 p-4 mt-20 md:mt-0 transition-all duration-300">
    <div className="mb-4">
      <Breadcrumb items={[]} currentPage="Configurações do usuário" />
    </div>

    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200">
  <div className="relative">
    <div 
      className="h-32 w-full bg-cover bg-center rounded-t-2xl"
      style={{ backgroundImage: 'url(./fundo.jpg)' }}
    ></div>

    <div className="px-4 pb-8 -mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6 space-x-4">
          <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">
            {selectedUser.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="text-2xl text-white">
            <span className="cursor-pointer hover:underline">
              {selectedUser.fullName}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Atualizar Informações
        </h2>

    {loading ? (
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
        <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
      </div>
    ) : (
      <form onSubmit={handleUpdate} className="space-y-5 mt-10">
        <div className="relative">
          <FiMail className="absolute left-4 top-3.5 text-gray-500 text-lg" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
            placeholder="Novo E-mail"
          />
        </div>

        <div className="relative">
          <InputPassword
            placeholder="Senha Atual (obrigatória para alterar senha)"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required={password !== ""}
            className="pl-12"
            iconStart={<FiKey className=" text-gray-500 " />}
          />
        </div>

        <div className="relative">
          <InputPassword
            placeholder="Nova Senha (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showStrength
            iconStart={<FiLock className=" text-gray-500 " />}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md"
        >
          Atualizar
        </button>
      </form>
    )}
  </div>
</div>
</div>
</div>

      </div>
    </div>
    
  );
}