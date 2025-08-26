
import DaftarGuru from "./DaftarGuru";
import GuruPrivate from "./Guruprivate";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";

const Guru = () => {
   const [load, setLoad] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoad(false), 2000);
      return () => clearTimeout(timer);
    }, []);


  
  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
     {load ? (

       <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
            
       ) : (

         // Main content area 
              <div className="w-full h-full sm:pt-20 ">
            <GuruPrivate />
            <DaftarGuru/>
        </div>

       )}

      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Guru;