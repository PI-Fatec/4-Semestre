import { useEffect, useState } from "react";
import Navbar from "../components/MenuMoblie";
import Sidebarmenu from "../components/Sidebar";
import { DashboardSkeleton } from "../components/Skeleton";
import CardDash from "./CardsDahs";
import { useNavigate } from "react-router";
import Breadcrumb from "../components/BreadCrumb";
import { useTheme } from "../contexts/ThemeContext"; 

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/login");
      return;
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [navigate]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark-bg dark-text" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Navbar />
      <Sidebarmenu isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`ml-0 md:ml-64 p-4 transition-all mt-20 md:mt-0 duration-300`}
      >
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div>
            <Breadcrumb items={[]} currentPage="Dashboard" />
            <CardDash />
          </div>
        )}
      </div>
    </div>
  );
}