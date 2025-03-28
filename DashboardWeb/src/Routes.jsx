import { Route, Routes } from "react-router";
import Login from "./Login/Login";
import Cadastro from "./Login/cadastro";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import UpdateUser from "./pages/ConfigUSer";

export default function Rotas() {
    return (
        <><ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <Routes>
             
            <Route path="/" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/configuser" element={<UpdateUser/>}/>

        </Routes>
        </>
    );
}
