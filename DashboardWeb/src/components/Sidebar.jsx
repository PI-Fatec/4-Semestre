/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationModal from "./NotificationModal";
import axios from "axios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const checkNotification = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sensor/stats");
        const last = response.data[response.data.length - 1];
        if (last && last.att) {
          setHasNotification(true);
        } else {
          setHasNotification(false);
        }
      } catch (error) {
        setHasNotification(false);
      }
    };
    checkNotification();
    const interval = setInterval(checkNotification, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRedirect = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const [selectedUser] = useState(() => {
    const userData = localStorage.getItem("userData");
    try {
      return userData ? JSON.parse(userData) : { fullName: "Usuário" };
    } catch (error) {
      console.error("Erro ao ler userdata:", error);
      return { fullName: "Usuário" };
    }
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Buscar notificações para a modal
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sensor/stats");
      const nots = response.data
        .filter((item) => item.att)
        .map((item) => ({ id: item.id, att: item.att }));
      setNotifications(nots.reverse());
    } catch {
      setNotifications([]);
    }
  };

  const handleOpenModal = async () => {
    await fetchNotifications();
    setModalOpen(true);
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div
      className={`fixed h-screen bg-gray-800 text-white transition-all duration-300 z-10 ${
        isOpen ? "w-64" : "w-20"
      } lg:block hidden`}
    >
      <div className="flex flex-col w-full ">
        <div className="relative">
          <img
            src="./imgsidebar2.jpg"
            alt="Sidebar Top Image"
            className="w-full h-24 object-cover rounded-t-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 h-24 rounded-t-md">
            <img
              src="./logosite.svg"
              onClick={handleRedirect}
              className="h-30 w-30 cursor-pointer"
              style={{ objectFit: "contain" }}
            />
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
              <span onClick={handleRedirect} className="cursor-pointer">{selectedUser.fullName}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="/configuser"
              className="hover:bg-gray-700 px-4 py-2 rounded-md text-white text-lg flex items-center gap-2"
            >
              <IoIosSettings className="text-white" />
              <p className="text-white">Configurações</p>
            </Link>
            <Link
              to="/dashboard"
              className="hover:bg-gray-700 px-4 py-2 rounded-md text-white text-lg flex items-center gap-2"
            >
              <VscGraph className="text-white" />
              <p className="text-white">Dashboard</p>
            </Link>
            <Link
              to="#"
              onClick={e => {
                e.preventDefault();
                handleOpenModal();
              }}
              className="hover:bg-gray-700 px-4 py-2 rounded-md text-white text-lg flex items-center gap-2 relative"
            >
              <IoMdNotificationsOutline className="text-white text-xl" />
              {hasNotification && (
                <span className="absolute top-1 left-6 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
              )}
              <p className="text-white">Notificações</p>
            </Link>
            <NotificationModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
            />
            <div className="text-white hover:text-red-600">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md transition-colors hover:text-red-600 hover:bg-white hover:border-2 hover:border-red-500 group"
              >
                <FiLogOut className="text-lg text-white transition-colors group-hover:text-red-600" />
                <span className="transition-colors text-white group-hover:text-red-600">
                  Sair
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;