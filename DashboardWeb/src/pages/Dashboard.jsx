import { useEffect, useState } from "react";
import Navbar from "../components/MenuMoblie";
import Sidebarmenu from "../components/Sidebar";
import { DashboardSkeleton } from "../components/Skeleton";
import CardDash from "./CardsDahs";
import { useNavigate } from "react-router"; 
import Breadcrumb from "../components/BreadCrumb";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 


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
        }, 2000); 
      }, []);
      
    return (
        <div className="relative">
      <Navbar />
      <Sidebarmenu isOpen={isOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`ml-0 md:ml-64 p-4 transition-all mt-20 md:mt-0 duration-300`}>
        {loading ? (
          <DashboardSkeleton  /> 
        ) : (
          <div>
              <Breadcrumb
        items={[]}
        currentPage="Dashboard"
      />
            <CardDash/>
            <p></p>
          </div>
        )}
      </div>
    </div>
    );
}