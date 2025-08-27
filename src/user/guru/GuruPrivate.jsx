

import { useNavigate } from "react-router-dom";
import { getDataMentor } from "../../lib/data/getDataMentor";
import {  useRef, useState } from 'react';

const GuruPrivate = ( { result }) => {


  const scrollRef = useRef(null);
  const datamentor = getDataMentor();

    const [showModal, setShowModal] = useState(false);
   const Navigate = useNavigate();


     const handleRedirectToPembayaran = () => {
        setShowModal(false);
        Navigate('/berlangganan');
    };
  
     const handleRedirectToGuru = () => {
        setShowModal(false);
        Navigate('/kelas/buatkelas');
    };
  
    
      const handleSubmit = async (idguru) => {
        const selectedGuruId = localStorage.getItem('selectedGuruId');

        if(result.statuspembayaran === 'pending' || result.statuspembayaran === 'expire' || !result ){
          
          setShowModal(true);
        }else if (selectedGuruId) {
           setShowModal(true);
        }else{
         localStorage.setItem('selectedGuruId', idguru);
        Navigate('/kelas/buatkelas');
        }
      }

    return (

        <>


<div class="pt-8 md:py-2 sm:py-8    overflow-x-hidden" id='mentor'>
  
    <div class="mx-auto px-2 md:px-8"  >
        <div className="mb-2 text-center">
            <div className="flex items-center justify-between gap-12">
               <h2 className="text-sm font-bold text-green-800 lg:text-xl">Guru Terdekat</h2>
       
            </div>
         

       
        </div>



    <div className="">
      <div 
        ref={scrollRef}
        className="flex gap-8 pt-2 overflow-x-auto scrollbar-hide cursor-grab scroll-smooth focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        tabIndex={0}
      >
        {datamentor.map((mentor, i) => (
          <div key={i} className="relative group flex-shrink-0 w-40 py-4 ">
            <div className="relative overflow-hidden group bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
              <div className="bg-gray-200 rounded-xl overflow-hidden relative h-40 w-40">
                <img 
                  src={mentor.img || 'https://via.placeholder.com/300'}
                  alt={mentor.Name || "Mentor"}
                  className="w-full h-full object-cover object-center"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xs font-semibold mb-2">{mentor.Name|| "Mentor Name"}</h3>
                <p className="text-green-600 mb-4">{mentor.subject || "Subject Expert"}</p>
              </div>
             <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out shadow-lg rounded-t-lg">
                <p className="text-sm text-gray-700 mb-3">
                  {mentor.text || "Experienced mentor with years of teaching expertise."}
                </p>
                <button 
                type="button"
                onClick={() => handleSubmit(mentor?.id || '')}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200">
                  Pilih Guru 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


    {/* Modal Popup */}
            {showModal && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div 
                        className="bg-white rounded-lg p-6 max-w-sm mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            { result.statuspembayaran === 'pending' || result.statuspembayaran === 'expire' || !result  ? (
                              <>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">Maaf Anda Belum Berlangganan</h3>
                                <p className="text-sm text-gray-500 mb-4">Anda Belum Berlangganan Mohon Langganan Terlebih Dahulu</p>
                                  <button
                                onClick={handleRedirectToPembayaran}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                              Langganan Sekarang
                            </button>
                          </>
                            ) :(
                              <>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Guru Sudah Dipilih</h3>
                            <p className="text-sm text-gray-500 mb-4">Anda Sudah Memilih Guru Sebelumnya Silahkan Cek Kelas Anda</p>
                              <button
                                onClick={handleRedirectToGuru}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Cek Daftar Kelas
                            </button>
                          </>
                            ) }
                          
                        </div>
                    </div>
                </div>
            )}


</div>


</div>   


      
    </>
    );
}

export default GuruPrivate;