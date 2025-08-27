import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { UseGetProfil } from "../../hook/useGetProfil";
import { useAuth } from "../../context/AuthContext";
import { getDataBank } from "../../lib/data/getDataBank";
import { getDataPayment } from "../../lib/data/getDataPayment";
import axiosClient from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const FormLangganan = () => {

      const [loading, setLoading] = useState(true);
       const [status, setStatus] = useState("");
    
         const navigate = useNavigate();

      const { user } = useAuth();
      const { profil } = UseGetProfil(user?.iduser);


        const databank = getDataBank();
        const datapayment = getDataPayment();

        const namapaket = 'Paket Berlangganan 1 Bulan'

  
          const [method, setMethod] = useState("");
          const [bank, setBank] = useState("");
          const [amount, setAmount] = useState(355000);

          const [tax, setTax] = useState(0);

          const total = amount + (amount * tax / 100);

            const [disabled, setDisabled] = useState(false);
           const [textButton, setTextButton] = useState('Bayar Sekarang');

  useEffect(() => {
    if (method === "qris") {
      setTax(0.7);
    } else if (method === "dana") {
      setTax(1.5);
    } else if (method === 'shopeepay'){
      setTax(2);
     } else if (method === 'gopay'){
      setTax(2);
     } else if (method === 'credit_card'){
      setTax(5);
     } else if (method === 'cstore_indomaret'){
      setTax(1);
     } else if (method === 'cstore_alfamart'){
      setTax(0.5);
     }
     else {
      setTax(0);
    }
  }, [method, total]);


   const handleSubmit = async (e) => {

    e.preventDefault();

    if (!method) {
      alert("Pilih metode pembayaran!");
      return;
    }
   
    
    try {
      
    setDisabled(true);
    setTextButton("Prosess");

      const res = await axiosClient.post("/api/midtrans/charge", {
        total,
        method,
        namapaket,
        bank
      });
      console.log(res.data);
      navigate('/berlangganan')
     
    } catch (err) {
      console.error(err);
      setStatus('Pembayaran Gagal. Ada Kesalahan Teknis Mohon Coba Beberapa saat lagi')
         setDisabled(false);
    setTextButton(total);
    }finally {
      setDisabled(false);
      setTextButton("Bayar Sekarang");
      setTimeout(() => setStatus(""), 3000);
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

    return (

        <>
 <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
   
    <div className="flex-1  py-24 top-0 min-h-screen w-[80%]">
          

    {loading ? (

       <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>

       ) : (


        

         // Main content area 
              <div className="w-full h-full  flex items-center justify-start md:px-12 px-2  md:pt-8 ">

                
        <section class="bg-gray-50  px-6 w-full">
          


 {status && 
                                <div 
                                role="alert"
                                className={`text-center py-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }

      
      
  <div class="max-w-6xl border-t border-gray-200 py-4  bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
    
    
 
    <div class="p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
      <div class="space-y-5">

         <div class="flex gap-4">
          <div class="w-1/2">
            <label class="block mb-1 text-sm text-gray-600">Nama Wali Murid</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"> {user?.nama_user || ''}</p>
               </div>
          <div class="w-1/2">
             <label class="block mb-1 text-sm text-gray-600">No HP</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">{profil?.no_telp || ''}</p>
         </div>
        </div>

          <div class="flex gap-4">
          <div class="w-1/2">
                     <label class="block mb-1 text-sm text-gray-600">Nama Anak</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"> {profil?.nama_anak || ''}</p>
          </div>
          <div class="w-1/2">
              <label class="block mb-1 text-sm text-gray-600">Usia Anak</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"> {profil?.usia_anak || ''}</p>
     </div>
        </div>

        <div>
          <label class="block mb-1 text-sm text-gray-600">Email</label>
          <p class="w-full border px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"> {user?.email || '' }</p>
        </div>
        
           </div>

           
        <hr className="pt-8 border-t border-gray-200 space-y-2" />
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
       <h1 className="text-lg font-semibold text-green-800 mb-2">Catatan Penting:</h1>
       <ul className="text-xs text-green-700 space-y-1">
         <li>• Berlangganan akan aktif setelah pembayaran berhasil</li>
         <li>• Akses premium berlaku untuk 1 anak sesuai data profil</li>
         <li>• Pembayaran akan diperpanjang otomatis setiap bulan</li>
         <li>• Hubungi customer service untuk bantuan teknis</li>
       </ul>
     </div>
      
      
    </div>


  


           {/* Hasil transaksi */}
     

            <form onSubmit={handleSubmit} className="space-y-4">
    <div class="bg-gray-50 p-8 border-l border-gray-200">
      <h3 class="text-xl font-semibold text-gray-700 mb-6">Choose Payment Method</h3>

      <div class="space-y-4">
      
      {/* Metode Pembayaran */}
<div>
  <label className="block mb-2 font-semibold text-lg">Metode Pembayaran</label>

 
      <div className="py-4">
         <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="text-sm">-- pilih metode --</option>
            {datapayment.map((m) => (
              <option key={m.id} value={m.value}>
                {m.judul}
              </option>
            ))}
          </select>
      </div>

        {/* Bank VA (hanya muncul kalau pilih VA) */}
        {method === "bank_transfer" && (
          <div>
            <label className="block mb-1 font-medium">Pilih Bank</label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- pilih bank --</option>
              {databank.map((b) => (
                <option key={b.id} value={b.value}>
                  {b.judul}
                </option>
              ))}
            </select>
          </div>
        )}

</div>
    

      <div class="mt-10 border-t pt-6">
        <h4 class="text-gray-700 font-semibold mb-2">Total Pembayaran</h4>
        <div class="flex justify-between text-gray-600">
          <span>Harga Langganan</span>
           <input
           readOnly
           disabled
            value={amount.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
            onChange={(e) => setAmount(e.target.value)}
            className=" text-end  py-2"
          />
        </div>
        <div class="flex justify-between text-gray-600 mt-1">
          <span>Biaya Admin</span>
          
          {tax} %
        </div>
        <div class="flex justify-between text-lg font-bold text-gray-800 mt-4">
          <span>Total</span>
         <span>{total.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}</span>
        </div>

         <button
         type="submit" 
         disabled={disabled}
           className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide text-sm font-semibold bg-green-700 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>                 
         
                      {textButton}
            </button>
  
      </div>
      </div>
      </div>
        </form>
   
      
   
    </div>

</section>
        </div>


       )
       
       }

</div>
</div>
         </>


  
    )
}

export default FormLangganan;