
import Tentor from "../../landingpage/tentor";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";
import Card from "./Card";
import Category from "./Category";
import DaftarGuru from "./DaftarGuru";
import GuruPrivate from "./Guruprivate";

const Dashboard = () => {
  return (

    <>
  {/* Navbar di atas */}
  <NavbarUser />

  <div className="flex bg-green-10">
    {/* Sidebar di kiri */}
    <Sidebar />

    {/* Main content area */}
    <div className="flex-1 p-8 md:p-[50px] md:p-28 md:pt-48 pt-24  min-h-screen w-[80%]">
      <h1 className="md:text-2xl text-green-900 font-bold mb-4 text-center md:text-center">Selamat Datang Di Go Pintar</h1>
    
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