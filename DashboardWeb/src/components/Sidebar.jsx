import { useState } from "react";
import { Link } from "react-router";
import {FiLogOut} from "react-icons/fi"
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); 

  const handleLogout = () => {
    localStorage.removeItem('userdata');
    
    window.location.href = '/login';
    
  
  };

  const [selectedUser] = useState(() => {
    const userData = localStorage.getItem('userData');
    try {
      return userData ? JSON.parse(userData) : { fullName: 'Usuário' };
    } catch (error) {
      console.error('Erro ao ler userdata:', error);
      return { fullName: 'Usuário' };
    }
  });

  // eslint-disable-next-line no-unused-vars
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
    className={`fixed h-screen bg-gray-800 text-white transition-all duration-300 z-10 ${
      isOpen ? 'w-64' : 'w-20'
    } lg:block hidden`}  
  >      <div className="flex flex-col w-full ">
        <div className="relative">
          <img
            src="./imgsidebar.jpg" 
            alt="Sidebar Top Image"
            className="w-full h-24 object-cover rounded-t-md"
          />
          <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 h-24 rounded-t-md">
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 rounded-md p-2">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg">
              {selectedUser.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="text-sm text-white">
              <span>{selectedUser.fullName}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-4 p-4">
            
            <Link to="/settings" className="hover:bg-gray-700 px-4 py-2 rounded-md">
              configurações
            </Link>
            <Link 
        to="#" 
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
        className="flex bg-red-600 items-center gap-2 text-white hover:text-red-600 hover:bg-white hover:border-2 hover:border-red-500 px-4 py-2 rounded-md transition-colors"
      >
        <FiLogOut className="text-lg text-white hover:text-red-600" />
        <span className="text-white hover:text-red-600">Logout</span>
      </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
