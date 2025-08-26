
import SideNav from "../components/SideNav";
import CardLangganan from "./CardLangganan";
import { useAuth } from "../../context/AuthContext";
import { UseGetOrder } from "../../hook/useGetOrder";
import Checkout from "./Checkout";

const Langganan = () => {

    const { user } = useAuth(); 

    const { result, loading  } = UseGetOrder(user?.iduser);

   
 
    console.log(result);

    return (

    <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
   
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
    {loading ? (

       <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>

       ) : (


         // Main content area 
            <div className="w-full h-full flex items-center justify-start md:px-12 px-2 md:pt-8">
            <div className="w-full max-w-full">
              {result?.statuspembayaran === "pending" && <Checkout />}

              {result?.statuspembayaran === "settlement" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Pembayaran Berhasil
                  </h1>
                  <p className="text-gray-600 text-lg mb-8">
                    Terima kasih sudah berlangganan. Saat ini berlangganan Anda
                    sudah aktif.
                  </p>
                  <a
                    href="/guru"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Booking Guru Privat Sekarang
                  </a>
                </div>
              )}

              {result?.statuspembayaran === "expire" && <CardLangganan />}

              {!result?.statuspembayaran && <CardLangganan />}
            </div>
          </div>
        )}
         

        </div>
        </div>
  
    )
}

export default Langganan;