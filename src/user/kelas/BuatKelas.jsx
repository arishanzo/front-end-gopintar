import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
import FormKelas from './FormKelas';

const BuatKelas = () => {
    const navigate = useNavigate();
    const idguru = localStorage.getItem('selectedGuruId');
    const [pageLoading, setPageLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoading(false);
            if (!idguru) {
                setShowModal(true);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [idguru]);

    const handleRedirectToGuru = () => {
        setShowModal(false);
        navigate('/guru');
    };

    return (
        <>
        
 <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
   
    <div className="flex-1  py-24 top-0 min-h-screen w-[80%]">
            {pageLoading ? (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
            ) : (
                         <div className="w-full h-full  flex items-center justify-start md:px-12 px-2  md:pt-8 ">

                
                    <section className="bg-gray-50  px-6 w-full">
                              <FormKelas />
                        </section>

            </div>
            )}

            {/* Modal Popup */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Guru Belum Dipilih</h3>
                            <p className="text-sm text-gray-500 mb-4">Silakan pilih guru terlebih dahulu sebelum membuat kelas.</p>
                            <button
                                onClick={handleRedirectToGuru}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Cek Daftar Guru
                            </button>
                        </div>
                    </div>
                </div>
            )}

            </div>
            </div>
        </>
    )
}

export default BuatKelas;