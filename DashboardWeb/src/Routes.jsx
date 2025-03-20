import { Route, Routes } from "react-router";
import Login from "./Login/Login";
import Cadastro from "./Login/cadastro";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

        </Routes>
        </>
    );
}
