import { useEffect, useState } from "react";
import Navbar from "../components/MenuMoblie";
import Sidebarmenu from "../components/Sidebar";
import { DashboardSkeleton } from "../components/Skeleton";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000); 
      }, []);
    return (
        <div className="relative">
      <Navbar />
      <Sidebarmenu isOpen={isOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`ml-0 md:ml-64 p-4 transition-all duration-300`}>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {loading ? (
          <DashboardSkeleton  /> 
        ) : (
          <div>
            
            <p></p>
          </div>
        )}
      </div>
    </div>
    );
}