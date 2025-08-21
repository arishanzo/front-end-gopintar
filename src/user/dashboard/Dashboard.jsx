
import Tentor from "../../landingpage/tentor";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";
import Card from "./Card";
import Category from "./Category";
import DaftarGuru from "./DaftarGuru";
import GuruPrivate from "./GuruPrivate";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { loading } = useAuth();
  
  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
    );
  }
  
  return (

    <>
  {/* Navbar di atas */}
 

  <div className="flex bg-green-10">

    {/* Sidebar di kiri */}
    <Sidebar />
 <NavbarUser />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
    
      <GuruPrivate />
<Category />



    
<Card />
  <DaftarGuru />

 </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Dashboard;