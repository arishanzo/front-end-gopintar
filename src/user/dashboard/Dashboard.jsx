
import Category from "./Category";
import DaftarGuru from "../guru/DaftarGuru";
import GuruPrivate from "../guru/GuruPrivate";
import { useAuth } from "../../context/AuthContext";
import SideNav from "../components/SideNav";
import { UseGetOrder } from "../../hook/useGetOrder";

const Dashboard = () => {
    const { user } = useAuth();
     const { result, loading  } = UseGetOrder(user?.iduser);

  

  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
     {loading ? (

       <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
            
       ) : (

         // Main content area 
              <div className="w-full h-full py-16 p-4 sm:pt-20 ">
            <GuruPrivate result={result} />
            <Category />
            <DaftarGuru  result={result}/>
        </div>

       )}

      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Dashboard;